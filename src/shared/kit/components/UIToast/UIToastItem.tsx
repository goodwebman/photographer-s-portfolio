'use client';

import { forwardRef, memo, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { type Toast, type ToastVariant } from './toast-context';

const variantStyles: Record<ToastVariant, string> = {
  default: 'bg-background border-border text-foreground',
  success: 'bg-green-50 border-green-300 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200',
  error: 'bg-red-50 border-red-300 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200',
  info: 'bg-blue-50 border-blue-300 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200',
  warning: 'bg-yellow-50 border-yellow-300 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200',
};

export interface IUIToastItemProps extends HTMLAttributes<HTMLDivElement> {
  readonly toast: Toast;
  readonly onDismiss?: () => void;
}

const UIToastItem = forwardRef<HTMLDivElement, IUIToastItemProps>(
  ({ toast, onDismiss, className, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      data-name={`UIToast-${toast.variant}`}
      data-variant={toast.variant}
      className={cn(
        'flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg text-sm',
        'animate-in slide-in-from-right-full',
        variantStyles[toast.variant],
        className,
      )}
      {...props}
    >
      <div className="flex-1">{toast.message}</div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className={cn(
            'shrink-0 cursor-pointer rounded-sm opacity-60 transition-opacity hover:opacity-100',
            'focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
          )}
          aria-label="Dismiss"
        >
          ✕
        </button>
      )}
    </div>
  ),
);
UIToastItem.displayName = 'UIToastItem';
const MemoUIToastItem = memo(UIToastItem);
export { MemoUIToastItem as UIToastItem };
