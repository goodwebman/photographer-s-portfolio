'use client';

import { forwardRef, memo, useMemo, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { UIIcons } from '../../icons';
import { generatePageRange } from './pagination-utils';
import { UIPaginationButton } from './UIPaginationButton';

export interface IUIPaginationProps extends HTMLAttributes<HTMLElement> {
  readonly testId?: string;
  readonly current: number;
  readonly total: number;
  readonly onPageChange: (page: number) => void;
  /** Показывать кнопки prev/next (по умолчанию true). */
  readonly showControls?: boolean;
  /** Текст или элемент для кнопки prev. */
  readonly prevLabel?: ReactNode;
  /** Текст или элемент для кнопки next. */
  readonly nextLabel?: ReactNode;
}

const UIPaginationRoot = forwardRef<HTMLElement, IUIPaginationProps>(
  (
    {
      className,
      testId,
      current,
      total,
      onPageChange,
      showControls = true,
      prevLabel = <UIIcons.ChevronLeft className="size-4" />,
      nextLabel = <UIIcons.ChevronRight className="size-4" />,
      ...props
    },
    ref,
  ) => {
    const pages = useMemo(() => generatePageRange(current, total), [current, total]);

    if (total <= 1) return null;

    return (
      <nav
        ref={ref}
        data-name={testId ? `UIPagination-${testId}` : 'UIPagination'}
        className={cn('flex items-center gap-1', className)}
        role="navigation"
        aria-label="Pagination"
        {...props}
      >
        {showControls && (
          <UIPaginationButton
            onClick={() => { onPageChange(current - 1); }}
            disabled={current <= 1}
            aria-label="Go to previous page"
          >
            {prevLabel}
          </UIPaginationButton>
        )}

        {pages.map((page, idx) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${String(idx)}`}
              className="flex size-9 items-center justify-center text-sm text-muted-foreground"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <UIPaginationButton
              key={page}
              onClick={() => { onPageChange(page); }}
              disabled={page === current}
              active={page === current}
              aria-label={`Page ${String(page)}`}
            >
              {page}
            </UIPaginationButton>
          ),
        )}

        {showControls && (
          <UIPaginationButton
            onClick={() => { onPageChange(current + 1); }}
            disabled={current >= total}
            aria-label="Go to next page"
          >
            {nextLabel}
          </UIPaginationButton>
        )}
      </nav>
    );
  },
);
UIPaginationRoot.displayName = 'UIPagination';
const MemoUIPaginationRoot = memo(UIPaginationRoot);
export { MemoUIPaginationRoot as UIPaginationRoot };
