'use client';

import { forwardRef, memo, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import AvatarContext from './avatar-context';

export interface IUIAvatarProps extends HTMLAttributes<HTMLDivElement> {
  readonly testId?: string;
  readonly children?: ReactNode;
}

const UIAvatarRoot = forwardRef<HTMLDivElement, IUIAvatarProps>(
  ({ className, testId, children, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);
    const showFallback = !hasLoaded || hasError;

    return (
      <AvatarContext.Provider
        value={{
          showFallback,
          onImageReady: () => { setHasLoaded(true); },
          onImageError: () => { setHasError(true); },
        }}
      >
        <div
          ref={ref}
          data-name={testId ? `UIAvatar-${testId}` : 'UIAvatar'}
          className={cn(
            'relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </AvatarContext.Provider>
    );
  },
);
UIAvatarRoot.displayName = 'UIAvatar';
const MemoUIAvatarRoot = memo(UIAvatarRoot);
export { MemoUIAvatarRoot as UIAvatarRoot };
