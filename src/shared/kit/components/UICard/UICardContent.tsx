import { forwardRef, memo, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type IUICardContentProps = HTMLAttributes<HTMLDivElement>;

const UICardContent = forwardRef<HTMLDivElement, IUICardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-name="UICardContent"
      className={cn('p-6 pt-0', className)}
      {...props}
    />
  ),
);
UICardContent.displayName = 'UICardContent';
const MemoUICardContent = memo(UICardContent);
export { MemoUICardContent as UICardContent };
