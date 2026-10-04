'use client';

import { forwardRef, memo, type ImgHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { useAvatarContext } from './avatar-context';

export interface IUIAvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  readonly testId?: string;
}

const UIAvatarImage = forwardRef<HTMLImageElement, IUIAvatarImageProps>(
  ({ className, testId, onError, onLoad, alt, ...props }, ref) => {
    const { onImageReady, onImageError } = useAvatarContext();

    return (
      <img
        ref={ref}
        alt={alt}
        data-name={testId ? 'UIAvatarImage' : 'UIAvatarImage'}
        className={cn(
          'absolute inset-0 aspect-square size-full object-cover',
          className,
        )}
        onLoad={(e) => {
          onImageReady();
          onLoad?.(e);
        }}
        onError={(e) => {
          onImageError();
          onError?.(e);
        }}
        {...props}
      />
    );
  },
);
UIAvatarImage.displayName = 'UIAvatarImage';
const MemoUIAvatarImage = memo(UIAvatarImage);
export { MemoUIAvatarImage as UIAvatarImage };
