import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, memo, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export const alertVariants = cva(
  'relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground',
  {
    variants: {
      variant: {
        default: 'bg-muted/50 text-foreground border-border',
        info: 'bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800',
        success:
          'bg-green-50 dark:bg-green-950/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800',
        warning:
          'bg-yellow-50 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800',
        destructive:
          'bg-destructive/10 text-destructive-emphasis border-destructive/20',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface IUIAlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  readonly testId?: string;
}

/**
 * Alert-блок для уведомлений. Использует `role="alert"`.
 */
const UIAlertBase = forwardRef<HTMLDivElement, IUIAlertProps>(
  ({ className, variant, testId, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      data-name={testId ? `UIAlert-${testId}` : 'UIAlert'}
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  ),
);
UIAlertBase.displayName = 'UIAlert';
export const UIAlert = memo(UIAlertBase);
