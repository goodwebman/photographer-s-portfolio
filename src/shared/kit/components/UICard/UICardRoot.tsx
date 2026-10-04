import { forwardRef, memo, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface IUICardProps extends HTMLAttributes<HTMLDivElement> {
  readonly testId?: string;
  readonly children?: ReactNode;
}

const UICardRoot = forwardRef<HTMLDivElement, IUICardProps>(
  ({ className, testId, ...props }, ref) => (
    <div
      ref={ref}
      data-name={testId ? `UICard-${testId}` : 'UICard'}
      className={cn(
        'rounded-xl border border-border bg-card text-card-foreground shadow-sm',
        className,
      )}
      {...props}
    />
  ),
);
UICardRoot.displayName = 'UICard';
const MemoUICardRoot = memo(UICardRoot);
export { MemoUICardRoot as UICardRoot };
