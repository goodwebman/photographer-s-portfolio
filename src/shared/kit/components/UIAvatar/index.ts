import { UIAvatarRoot } from './UIAvatarRoot';
import { UIAvatarImage } from './UIAvatarImage';
import { UIAvatarFallback } from './UIAvatarFallback';

export const UIAvatar = Object.assign(UIAvatarRoot, {
  Image: UIAvatarImage,
  Fallback: UIAvatarFallback,
});

export type { IUIAvatarProps } from './UIAvatarRoot';
export type { IUIAvatarImageProps } from './UIAvatarImage';
export type { IUIAvatarFallbackProps } from './UIAvatarFallback';
