'use client';

import { useMediaQuery } from './use-media-query';

/**
 * `true`, когда пользователь просит уменьшить движение (`prefers-reduced-motion: reduce`).
 * Компоненты с JS-driven анимациями (tilt, spotlight, авто-скролл) обязаны это уважать —
 * CSS-транзишены гасятся глобально в tokens.css, но inline-трансформы из JS нужно гасить руками.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
