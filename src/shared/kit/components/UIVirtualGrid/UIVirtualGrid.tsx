'use client';

import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { VirtuosoGrid, type VirtuosoGridHandle } from 'react-virtuoso';
import { cn } from '../../lib/cn';
import { UIIcons } from '../../icons';

export interface IUIVirtualGridProps<T> {
  readonly testId?: string;
  readonly items: readonly T[];
  readonly renderItem: (item: T, index: number) => ReactNode;
  readonly getItemKey?: (item: T, index: number) => string | number;
  /** Классы для CSS-grid контейнера (колонки задаются здесь). Default: `grid-cols-3 gap-3 p-3`. */
  readonly gridClassName?: string;
  /**
   * Вертикальный отступ внутри сетки, px. Задаётся отдельно от `gridClassName`:
   * Virtuoso пишет спискy свой инлайн `padding-top/bottom` под окно виртуализации и
   * затирает вертикальные классы, поэтому из `p-*` работают только боковые. Default: `12`.
   */
  readonly verticalPadding?: number;
  /** Высота скролл-контейнера. Default: `500px`. */
  readonly height?: number | string;
  readonly empty?: ReactNode;
  readonly onEndReached?: () => void | Promise<void>;
  readonly hasMore?: boolean;
  readonly loader?: ReactNode;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly endReachedThreshold?: number;
}

export interface UIVirtualGridHandle {
  scrollToIndex: (index: number, behavior?: 'auto' | 'smooth') => void;
}

/**
 * Виртуализированная сетка на react-virtuoso.
 * Колонки задаются через `gridClassName` (обычный Tailwind grid), библиотека сама
 * измеряет высоту ячеек и рендерит только видимые ряды.
 *
 * @example
 * <UIVirtualGrid items={products} renderItem={p => <Card p={p} />} gridClassName="grid-cols-4 gap-4 p-4" />
 */
function UIVirtualGridInner<T>(
  {
    testId,
    items,
    renderItem,
    getItemKey,
    gridClassName = 'grid-cols-3 gap-3 p-3',
    verticalPadding = 12,
    height = 500,
    empty,
    onEndReached,
    hasMore = false,
    loader,
    className,
    style,
    endReachedThreshold = 300,
  }: IUIVirtualGridProps<T>,
  ref: React.Ref<UIVirtualGridHandle>,
): ReactNode {
  const handleRef = useRef<VirtuosoGridHandle>(null);

  const resolvedStyle = useMemo<CSSProperties>(
    () => ({ height: typeof height === 'number' ? `${String(height)}px` : height, ...style }),
    [height, style],
  );

  const computeItemKey = useCallback(
    (index: number) => (getItemKey ? getItemKey(items[index], index) : index),
    [getItemKey, items],
  );

  const itemContent = useCallback(
    (index: number) => renderItem(items[index], index),
    [items, renderItem],
  );

  useImperativeHandle(
    ref,
    (): UIVirtualGridHandle => ({
      scrollToIndex: (index, behavior = 'auto') => {
        handleRef.current?.scrollToIndex({ index, behavior });
      },
    }),
    [],
  );

  // Спейсеры вместо padding: они часть скроллируемого контента, поэтому переживают
  // инлайн-стили Virtuoso. Ссылки стабильны — иначе библиотека ремаунтит шапку/подвал.
  const Spacer = useMemo(
    () =>
      verticalPadding > 0
        ? () => <div style={{ height: `${String(verticalPadding)}px` }} aria-hidden />
        : undefined,
    [verticalPadding],
  );

  const Footer = useMemo(() => {
    if (!hasMore) return Spacer;
    return () => (
      <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
        {loader ?? (
          <>
            <UIIcons.Spinner className="size-4 animate-spin" />
            <span>Загрузка…</span>
          </>
        )}
      </div>
    );
  }, [hasMore, loader, Spacer]);

  if (items.length === 0 && !hasMore) {
    return (
      <div
        data-name={testId ? `UIVirtualGrid-${testId}` : 'UIVirtualGrid'}
        style={resolvedStyle}
        className={cn(
          'flex items-center justify-center rounded-xl border border-border bg-card text-sm text-muted-foreground',
          className,
        )}
      >
        {empty ?? 'Нет данных'}
      </div>
    );
  }

  return (
    <div
      data-name={testId ? `UIVirtualGrid-${testId}` : 'UIVirtualGrid'}
      className={cn('overflow-hidden rounded-xl border border-border bg-card', className)}
      style={resolvedStyle}
    >
      <VirtuosoGrid
        ref={handleRef}
        totalCount={items.length}
        computeItemKey={computeItemKey}
        itemContent={itemContent}
        endReached={onEndReached ? () => { void onEndReached(); } : undefined}
        increaseViewportBy={endReachedThreshold}
        style={{ height: '100%' }}
        listClassName={cn('grid', gridClassName)}
        components={{ Header: Spacer, Footer }}
      />
    </div>
  );
}

const UIVirtualGridForwarded = forwardRef(UIVirtualGridInner) as <T>(
  props: IUIVirtualGridProps<T> & { ref?: React.Ref<UIVirtualGridHandle> },
) => ReactNode;

export const UIVirtualGrid = memo(UIVirtualGridForwarded) as typeof UIVirtualGridForwarded;
