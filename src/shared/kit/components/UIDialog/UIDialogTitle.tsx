'use client';

import { forwardRef, memo, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { useIsomorphicLayoutEffect } from '../../lib/use-isomorphic-layout-effect';
import { useDialogContext } from './dialog-context';

export type IUIDialogTitleProps = HTMLAttributes<HTMLHeadingElement>;

const UIDialogTitle = forwardRef<HTMLHeadingElement, IUIDialogTitleProps>(
  ({ className, children, id, ...props }, ref) => {
    const { titleId, registerTitle } = useDialogContext();
    const resolvedId = id ?? titleId;

    // Регистрация в панели — она вешает aria-labelledby на этот id.
    useIsomorphicLayoutEffect(() => {
      registerTitle(resolvedId);
      return () => { registerTitle(null); };
    }, [registerTitle, resolvedId]);

    return (
      <h2
        ref={ref}
        id={resolvedId}
        data-name="UIDialogTitle"
        className={cn('text-lg font-semibold leading-none tracking-tight', className)}
        {...props}
      >
        {children}
      </h2>
    );
  },
);
UIDialogTitle.displayName = 'UIDialogTitle';
const MemoUIDialogTitle = memo(UIDialogTitle);
export { MemoUIDialogTitle as UIDialogTitle };
