import { forwardRef, memo, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type IUICardTitleProps = HTMLAttributes<HTMLHeadingElement>;

const UICardTitle = forwardRef<HTMLHeadingElement, IUICardTitleProps>(
  ({ className, ...props }, ref) => (
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h3
      ref={ref}
      data-name="UICardTitle"
      className={cn('text-lg font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  ),
);
UICardTitle.displayName = 'UICardTitle';
const MemoUICardTitle = memo(UICardTitle);
export { MemoUICardTitle as UICardTitle };
