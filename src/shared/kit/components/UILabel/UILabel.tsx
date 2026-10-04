import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, memo, type LabelHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

export interface IUILabelProps
  extends LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  readonly testId?: string;
}

const UILabelBase = forwardRef<HTMLLabelElement, IUILabelProps>(
  ({ className, testId, htmlFor, ...props }, ref) => (
    <label
      ref={ref}
      htmlFor={htmlFor}
      data-name={testId ? `UILabel-${testId}` : 'UILabel'}
      // курсор только у связанного label — он реально кликабелен (фокусирует контрол)
      className={cn(labelVariants(), htmlFor != null && 'cursor-pointer', className)}
      {...props}
    />
  ),
);
UILabelBase.displayName = 'UILabel';
export const UILabel = memo(UILabelBase);
