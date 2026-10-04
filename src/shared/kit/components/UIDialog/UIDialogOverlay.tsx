import { forwardRef, memo, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type IUIDialogOverlayProps = HTMLAttributes<HTMLDivElement>;

const UIDialogOverlay = forwardRef<HTMLDivElement, IUIDialogOverlayProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-name="UIDialogOverlay"
      className={cn(
        'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out',
        className,
      )}
      {...props}
    />
  ),
);
UIDialogOverlay.displayName = 'UIDialogOverlay';
const MemoUIDialogOverlay = memo(UIDialogOverlay);
export { MemoUIDialogOverlay as UIDialogOverlay };
