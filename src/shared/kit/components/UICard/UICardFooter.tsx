import { forwardRef, memo, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type IUICardFooterProps = HTMLAttributes<HTMLDivElement>;

const UICardFooter = forwardRef<HTMLDivElement, IUICardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-name="UICardFooter"
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  ),
);
UICardFooter.displayName = 'UICardFooter';
const MemoUICardFooter = memo(UICardFooter);
export { MemoUICardFooter as UICardFooter };
