'use client';

import { createContext, useContext } from 'react';

export interface AvatarContextValue {
  showFallback: boolean;
  onImageReady: () => void;
  onImageError: () => void;
}

const AvatarContext = createContext<AvatarContextValue>({
  showFallback: true,
  onImageReady: () => undefined,
  onImageError: () => undefined,
});

export function useAvatarContext(): AvatarContextValue {
  return useContext(AvatarContext);
}

export default AvatarContext;
