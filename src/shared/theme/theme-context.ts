'use client';

import { createContext } from 'react';

import type { IThemeContextValue } from './types';

/** Контекст темы. `null` вне провайдера — `useTheme` кидает на это. */
export const ThemeContext = createContext<IThemeContextValue | null>(null);
