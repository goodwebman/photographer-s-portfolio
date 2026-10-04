'use client';

import type { FC, ReactNode } from 'react';

import { ScrollToTop } from '@/shared/lib/scroll-to-top';
import { ThemeProvider } from '@/shared/theme';
import type { Theme } from '@/shared/theme';

import { MotionProvider } from './motion-provider';

export interface IProvidersProps {
  readonly initialTheme: Theme;
  readonly children: ReactNode;
}

/** Композиция клиентских провайдеров: тема + motion-конфиг + scroll-to-top. */
export const Providers: FC<IProvidersProps> = ({ initialTheme, children }) => (
  <ThemeProvider initialTheme={initialTheme}>
    <MotionProvider>
      {children}
      <ScrollToTop />
    </MotionProvider>
  </ThemeProvider>
);
