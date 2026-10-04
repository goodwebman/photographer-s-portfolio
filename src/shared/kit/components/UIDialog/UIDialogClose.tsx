'use client';

import { forwardRef, memo, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { useDialogContext } from './dialog-context';

export type IUIDialogCloseProps = ButtonHTMLAttributes<HTMLButtonElement>;

const UIDialogClose = forwardRef<HTMLButtonElement, IUIDialogCloseProps>(
  ({ className, children = '✕', ...props }, ref) => {
    const { onClose } = useDialogContext();

    return (
      <button
        ref={ref}
        type="button"
        data-name="UIDialogClose"
        onClick={onClose}
        className={cn(
          'absolute right-4 top-4 inline-flex size-6 cursor-pointer items-center justify-center rounded-sm text-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
        aria-label="Close"
        {...props}
      >
        {children}
      </button>
    );
  },
);
UIDialogClose.displayName = 'UIDialogClose';
const MemoUIDialogClose = memo(UIDialogClose);
export { MemoUIDialogClose as UIDialogClose };
