'use client';

import { useContext } from 'react';

import { ThemeContext } from './theme-context';
import type { IThemeContextValue } from './types';

/** Доступ к контексту темы. Кидает при использовании вне `<ThemeProvider>`. */
export const useTheme = (): IThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (ctx === null) {
    throw new Error('useTheme должен вызываться внутри <ThemeProvider>');
  }

  return ctx;
};
