/** Доступные темы оформления. */
export type Theme = 'light' | 'dark';

/** Значение хука темы. */
export interface IThemeContextValue {
  /** Текущая тема. */
  readonly theme: Theme;
  /** Установить конкретную тему. */
  readonly setTheme: (theme: Theme) => void;
  /** Переключить light ↔ dark. */
  readonly toggleTheme: () => void;
}

/** Имя cookie с выбранной темой (читает inline-скрипт в `<head>`). */
export const THEME_STORAGE_KEY = 'theme';

/** Тема по умолчанию — «Ночь»: большая часть кадров Полины ночные. */
export const DEFAULT_THEME: Theme = 'dark';
