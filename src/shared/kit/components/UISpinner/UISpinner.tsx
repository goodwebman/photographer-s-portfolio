import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, memo, type SVGAttributes } from 'react';
import { cn } from '../../lib/cn';
import { UIIcons } from '../../icons';

export const spinnerVariants = cva(
  'animate-spin text-muted-foreground',
  {
    variants: {
      size: {
        sm: 'size-4',
        md: 'size-6',
        lg: 'size-8',
        xl: 'size-12',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export interface IUISpinnerProps
  extends SVGAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  readonly testId?: string;
}

/**
 * Spinner-индикатор загрузки: иконка `UIIcons.Spinner` + `animate-spin`.
 * Aria: `aria-label="Loading…"`, `role="status"`.
 */
const UISpinnerBase = forwardRef<SVGSVGElement, IUISpinnerProps>(
  ({ className, size, testId, children: _children, ...props }, ref) => (
    <UIIcons.Spinner
      ref={ref}
      role="status"
      aria-label="Loading…"
      data-name={testId ? `UISpinner-${testId}` : 'UISpinner'}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  ),
);
UISpinnerBase.displayName = 'UISpinner';
export const UISpinner = memo(UISpinnerBase);
