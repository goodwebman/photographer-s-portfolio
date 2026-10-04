'use client';

import type { FC, ReactNode } from 'react';

import { MotionConfig } from 'motion/react';

export interface IMotionProviderProps {
  readonly children: ReactNode;
}

/**
 * Глобальная конфигурация Motion. `reducedMotion="user"` — уважать системную
 * настройку prefers-reduced-motion во всех motion-компонентах.
 */
export const MotionProvider: FC<IMotionProviderProps> = ({ children }) => (
  <MotionConfig reducedMotion="user">{children}</MotionConfig>
);
