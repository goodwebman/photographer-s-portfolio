import { forwardRef, memo, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type IUICardDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

const UICardDescription = forwardRef<HTMLParagraphElement, IUICardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      data-name="UICardDescription"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  ),
);
UICardDescription.displayName = 'UICardDescription';
const MemoUICardDescription = memo(UICardDescription);
export { MemoUICardDescription as UICardDescription };
