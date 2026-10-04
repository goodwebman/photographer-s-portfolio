'use client';

import type { FC, ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';

import { ThemeContext } from './theme-context';
import type { IThemeContextValue, Theme } from './types';
import { THEME_STORAGE_KEY } from './types';

/** Пишет тему в cookie (читается сервером) и в `data-theme` на `<html>`. */
const persist = (theme: Theme): void => {
  document.documentElement.setAttribute('data-theme', theme);
  document.cookie = `${THEME_STORAGE_KEY}=${theme};path=/;max-age=31536000;samesite=lax`;
};

export interface IThemeProviderProps {
  /** Тема, прочитанная сервером из cookie — стартовое значение (SSR-стабильно). */
  readonly initialTheme?: Theme;
  readonly children: ReactNode;
}

/**
 * Провайдер темы. Стартовая тема приходит с сервера (cookie → `data-theme` на
 * `<html>`), поэтому FOUC и hydration mismatch отсутствуют без клиентского
 * скрипта. Переключение обновляет state, cookie и атрибут.
 */
export const ThemeProvider: FC<IThemeProviderProps> = ({
  initialTheme = 'dark',
  children,
}) => {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    persist(next);
  }, []);

  const toggleTheme = useCallback(
    () => setTheme(theme === 'dark' ? 'light' : 'dark'),
    [theme, setTheme],
  );

  const value = useMemo<IThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
};
