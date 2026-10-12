'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';

import { applyTheme, getServerTheme, readTheme, subscribeTheme } from './theme-store';
import type { IThemeContextValue, Theme } from './types';

/**
 * Тема сайта. Без провайдера: состояние живёт в `data-theme` на `<html>`.
 * В SSR и при гидратации — тема по умолчанию, сразу после — реальная (React
 * сам перерисует расходящиеся места, без hydration mismatch).
 */
export const useTheme = (): IThemeContextValue => {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, getServerTheme);

  const setTheme = useCallback((next: Theme) => {
    applyTheme(next);
  }, []);

  const toggleTheme = useCallback(() => {
    applyTheme(readTheme() === 'dark' ? 'light' : 'dark');
  }, []);

  return useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);
};
