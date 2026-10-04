'use client';

import { forwardRef, memo, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { useAvatarContext } from './avatar-context';

export interface IUIAvatarFallbackProps extends HTMLAttributes<HTMLDivElement> {
  readonly testId?: string;
}

const UIAvatarFallback = forwardRef<HTMLDivElement, IUIAvatarFallbackProps>(
  ({ className, testId, ...props }, ref) => {
    const { showFallback } = useAvatarContext();

    if (!showFallback) {
      return null;
    }

    return (
      <div
        ref={ref}
        data-name={testId ? 'UIAvatarFallback' : 'UIAvatarFallback'}
        className={cn(
          'flex size-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground',
          className,
        )}
        {...props}
      />
    );
  },
);
UIAvatarFallback.displayName = 'UIAvatarFallback';
const MemoUIAvatarFallback = memo(UIAvatarFallback);
export { MemoUIAvatarFallback as UIAvatarFallback };
