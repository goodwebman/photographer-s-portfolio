import { forwardRef, memo, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface PaginationButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

const UIPaginationButton = forwardRef<HTMLButtonElement, PaginationButtonProps>(
  ({ className, active, disabled, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      data-active={active || undefined}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'inline-flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-sm font-medium tabular-nums transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:pointer-events-none',
        active
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-foreground hover:bg-accent hover:text-accent-foreground disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);
UIPaginationButton.displayName = 'UIPaginationButton';
const MemoUIPaginationButton = memo(UIPaginationButton);
export { MemoUIPaginationButton as UIPaginationButton };
