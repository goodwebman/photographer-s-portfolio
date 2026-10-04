import { forwardRef, memo, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type IUICardHeaderProps = HTMLAttributes<HTMLDivElement>;

const UICardHeader = forwardRef<HTMLDivElement, IUICardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-name="UICardHeader"
      className={cn('flex flex-col gap-1.5 p-6 pb-0', className)}
      {...props}
    />
  ),
);
UICardHeader.displayName = 'UICardHeader';
const MemoUICardHeader = memo(UICardHeader);
export { MemoUICardHeader as UICardHeader };
