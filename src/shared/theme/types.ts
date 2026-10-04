/** Доступные темы оформления. */
export type Theme = 'light' | 'dark';

/** Значение контекста темы. */
export interface IThemeContextValue {
  /** Текущая тема. */
  readonly theme: Theme;
  /** Установить конкретную тему. */
  readonly setTheme: (theme: Theme) => void;
  /** Переключить light ↔ dark. */
  readonly toggleTheme: () => void;
}

/** Ключ хранения выбранной темы в localStorage. */
export const THEME_STORAGE_KEY = 'theme';
