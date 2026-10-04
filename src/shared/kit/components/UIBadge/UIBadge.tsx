import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, memo, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        secondary: 'bg-secondary text-secondary-foreground',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'border border-border text-foreground',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

export interface IUIBadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  readonly testId?: string;
}

/**
 * Бейдж/метка. Использует `<span>` с variant-стилями.
 */
const UIBadgeBase = forwardRef<HTMLSpanElement, IUIBadgeProps>(
  ({ className, variant, testId, ...props }, ref) => (
    <span
      ref={ref}
      data-name={testId ? `UIBadge-${testId}` : 'UIBadge'}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  ),
);
UIBadgeBase.displayName = 'UIBadge';
export const UIBadge = memo(UIBadgeBase);
