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
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso';
import { cn } from '../../lib/cn';
import { UIIcons } from '../../icons';

export interface IUIVirtualListProps<T> {
  readonly testId?: string;
  /** Массив данных. Может быть частичным при infinite scroll — Virtuoso сам подтянет остальное через `onEndReached`. */
  readonly items: readonly T[];
  /** Рендер строки. */
  readonly renderItem: (item: T, index: number) => ReactNode;
  /** Стабильный ключ. Обязателен для длинных списков — иначе Virtuoso пересчитает высоты при перерендере. */
  readonly getItemKey?: (item: T, index: number) => string | number;
  /** Высота контейнера. Число → `${px}`, строка → CSS. Default: `400px`. */
  readonly height?: number | string;
  /** Пустая заглушка. */
  readonly empty?: ReactNode;
  /**
   * Подгрузка при скролле к концу. Возвращать промис, чтобы Virtuoso не звал слишком часто.
   * Спиннер показывается, пока промис не резолвится.
   */
  readonly onEndReached?: () => void | Promise<void>;
  /** Показывать ли строку-лоадер снизу (когда идёт подгрузка / есть ещё данные). */
  readonly hasMore?: boolean;
  /** Кастомный лоадер вместо дефолтного спиннера. */
  readonly loader?: ReactNode;
  /** Разделитель между элементами (например `<UISeparator />`). */
  readonly separator?: ReactNode;
  /** Внешний класс на скролл-контейнер. */
  readonly className?: string;
  /** Стиль на скролл-контейнер. */
  readonly style?: CSSProperties;
  /** За сколько пикселей до конца звать `onEndReached`. Default: `200`. */
  readonly endReachedThreshold?: number;
}

export interface UIVirtualListHandle {
  scrollToIndex: (index: number, behavior?: 'auto' | 'smooth') => void;
  scrollTo: (offset: number, behavior?: 'auto' | 'smooth') => void;
}

/**
 * Виртуализированный список на react-virtuoso.
 * Разворачивает 100k+ элементов без просадок: рендерит только видимую область.
 * Поддерживает infinite scroll через `onEndReached` + `hasMore`.
 *
 * @example
 * <UIVirtualList items={users} renderItem={u => <UserRow user={u} />} hasMore onEndReached={loadMore} />
 */
function UIVirtualListInner<T>(
  {
    testId,
    items,
    renderItem,
    getItemKey,
    height = 400,
    empty,
    onEndReached,
    hasMore = false,
    loader,
    separator,
    className,
    style,
    endReachedThreshold = 200,
  }: IUIVirtualListProps<T>,
  ref: React.Ref<UIVirtualListHandle>,
): ReactNode {
  const handleRef = useRef<VirtuosoHandle>(null);

  const resolvedStyle = useMemo<CSSProperties>(
    () => ({ height: typeof height === 'number' ? `${String(height)}px` : height, ...style }),
    [height, style],
  );

  const computeItemKey = useCallback(
    (index: number, item: T) => (getItemKey ? getItemKey(item, index) : index),
    [getItemKey],
  );

  const itemContent = useCallback(
    (index: number, item: T) => {
      const showSeparator = separator != null && index < items.length - 1;
      return (
        <div className="min-w-0">
          {renderItem(item, index)}
          {showSeparator && separator}
        </div>
      );
    },
    [items.length, renderItem, separator],
  );

  useImperativeHandle(
    ref,
    (): UIVirtualListHandle => ({
      scrollToIndex: (index, behavior = 'auto') => {
        handleRef.current?.scrollToIndex({ index, behavior });
      },
      scrollTo: (offset, behavior = 'auto') => {
        handleRef.current?.scrollTo({ top: offset, behavior });
      },
    }),
    [],
  );

  if (items.length === 0 && !hasMore) {
    return (
      <div
        data-name={testId ? `UIVirtualList-${testId}` : 'UIVirtualList'}
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
      data-name={testId ? `UIVirtualList-${testId}` : 'UIVirtualList'}
      className={cn('overflow-hidden rounded-xl border border-border bg-card', className)}
      style={resolvedStyle}
    >
      <Virtuoso
        ref={handleRef}
        data={items}
        computeItemKey={computeItemKey}
        itemContent={itemContent}
        endReached={onEndReached ? () => { void onEndReached(); } : undefined}
        increaseViewportBy={endReachedThreshold}
        components={{
          Footer: hasMore
            ? () => (
                <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
                  {loader ?? (
                    <>
                      <UIIcons.Spinner className="size-4 animate-spin" />
                      <span>Загрузка…</span>
                    </>
                  )}
                </div>
              )
            : undefined,
        }}
      />
    </div>
  );
}

const UIVirtualListForwarded = forwardRef(UIVirtualListInner) as <T>(
  props: IUIVirtualListProps<T> & { ref?: React.Ref<UIVirtualListHandle> },
) => ReactNode;

export const UIVirtualList = memo(UIVirtualListForwarded) as typeof UIVirtualListForwarded;
