import { forwardRef, Fragment, memo, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { UIIcons } from '../../icons';

export interface IUIBreadcrumbItem {
  readonly label: ReactNode;
  /** Ссылка. Если задана — крошка рендерится как `<a>`. */
  readonly href?: string;
  /** Обработчик клика (если нет `href`) — крошка рендерится как `<button>`. */
  readonly onClick?: () => void;
  /** Иконка перед подписью. */
  readonly icon?: ReactNode;
}

export interface IUIBreadcrumbProps extends HTMLAttributes<HTMLElement> {
  readonly testId?: string;
  readonly items: readonly IUIBreadcrumbItem[];
  /** Разделитель между крошками. Default: `<ChevronRight />`. */
  readonly separator?: ReactNode;
  /**
   * Максимум крошек до сворачивания середины в «…». Считается по видимым крошкам:
   * первая + `…` + последние `maxItems - 1`. `undefined` — не сворачивать.
   */
  readonly maxItems?: number;
  /** A11y-подпись навигации. Default: `'Хлебные крошки'`. */
  readonly ariaLabel?: string;
}

type Node =
  | { readonly kind: 'crumb'; readonly item: IUIBreadcrumbItem; readonly index: number }
  | { readonly kind: 'ellipsis' };

const buildNodes = (items: readonly IUIBreadcrumbItem[], maxItems?: number): Node[] => {
  if (maxItems == null || items.length <= maxItems) {
    return items.map((item, index) => ({ kind: 'crumb', item, index }));
  }
  const tailCount = Math.max(1, maxItems - 1);
  const offset = items.length - tailCount;
  return [
    { kind: 'crumb', item: items[0], index: 0 },
    { kind: 'ellipsis' },
    ...items.slice(offset).map((item, i) => ({ kind: 'crumb', item, index: offset + i }) as const),
  ];
};

const linkCls =
  'rounded-sm transition-colors hover:text-foreground focus-visible:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1';

const CrumbInner = ({ item }: { item: IUIBreadcrumbItem }): React.ReactNode =>
  item.icon != null ? (
    <span className="inline-flex items-center gap-1.5 [&>svg]:size-4">
      {item.icon}
      {item.label}
    </span>
  ) : (
    <>{item.label}</>
  );

/**
 * Хлебные крошки. Data-driven: массив `items`, последняя — текущая страница
 * (`aria-current="page"`). Длинный путь сворачивается в «…» через `maxItems`.
 *
 * @example
 * <UIBreadcrumb
 *   items={[{ label: 'Главная', href: '/' }, { label: 'Фильмы', href: '/movies' }, { label: 'Дюна' }]}
 * />
 */
const UIBreadcrumbBase = forwardRef<HTMLElement, IUIBreadcrumbProps>(
  (
    {
      className,
      testId,
      items,
      separator = <UIIcons.ChevronRight className="size-3.5" />,
      maxItems,
      ariaLabel = 'Хлебные крошки',
      ...props
    },
    ref,
  ) => {
    const nodes = buildNodes(items, maxItems);
    const lastIndex = items.length - 1;

    return (
      <nav
        ref={ref}
        aria-label={ariaLabel}
        data-name={testId ? `UIBreadcrumb-${testId}` : 'UIBreadcrumb'}
        className={className}
        {...props}
      >
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          {nodes.map((node, i) => (
            <Fragment key={node.kind === 'ellipsis' ? 'ellipsis' : `crumb-${String(node.index)}`}>
              {i > 0 && (
                <li aria-hidden className="flex items-center text-muted-foreground/50">
                  {separator}
                </li>
              )}
              <li className="inline-flex items-center">
                {node.kind === 'ellipsis' ? (
                  <span className="px-1 text-muted-foreground/70">…</span>
                ) : node.index === lastIndex ? (
                  <span aria-current="page" className="font-medium text-foreground">
                    <CrumbInner item={node.item} />
                  </span>
                ) : node.item.href != null ? (
                  <a href={node.item.href} className={linkCls}>
                    <CrumbInner item={node.item} />
                  </a>
                ) : node.item.onClick != null ? (
                  <button type="button" onClick={node.item.onClick} className={cn(linkCls, 'cursor-pointer')}>
                    <CrumbInner item={node.item} />
                  </button>
                ) : (
                  <span>
                    <CrumbInner item={node.item} />
                  </span>
                )}
              </li>
            </Fragment>
          ))}
        </ol>
      </nav>
    );
  },
);
UIBreadcrumbBase.displayName = 'UIBreadcrumb';
export const UIBreadcrumb = memo(UIBreadcrumbBase);
