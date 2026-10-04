'use client';

import { forwardRef, memo, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { useIsomorphicLayoutEffect } from '../../lib/use-isomorphic-layout-effect';
import { useDialogContext } from './dialog-context';

export type IUIDialogDescriptionProps = HTMLAttributes<HTMLParagraphElement>;

const UIDialogDescription = forwardRef<HTMLParagraphElement, IUIDialogDescriptionProps>(
  ({ className, id, ...props }, ref) => {
    const { descriptionId, registerDescription } = useDialogContext();
    const resolvedId = id ?? descriptionId;

    useIsomorphicLayoutEffect(() => {
      registerDescription(resolvedId);
      return () => { registerDescription(null); };
    }, [registerDescription, resolvedId]);

    return (
      <p
        ref={ref}
        id={resolvedId}
        data-name="UIDialogDescription"
        className={cn('mt-2 text-sm text-muted-foreground', className)}
        {...props}
      />
    );
  },
);
UIDialogDescription.displayName = 'UIDialogDescription';
const MemoUIDialogDescription = memo(UIDialogDescription);
export { MemoUIDialogDescription as UIDialogDescription };
