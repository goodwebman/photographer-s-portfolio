import type { Theme } from './types';
import { DEFAULT_THEME, THEME_STORAGE_KEY } from './types';

/**
 * Хранилище темы — атрибут `data-theme` на `<html>`. Его до первой отрисовки
 * ставит inline-скрипт из cookie (`THEME_SCRIPT`), поэтому страница может
 * быть статической: серверу не нужно читать cookie, а React подписывается на
 * атрибут через `useSyncExternalStore` вместо контекста-провайдера.
 *
 * Смена темы идёт только через `applyTheme`, он же синхронно оповещает
 * подписчиков — `MutationObserver` не нужен.
 */

const listeners = new Set<() => void>();

/** Текущая тема по атрибуту `<html>`. */
export const readTheme = (): Theme =>
  document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

/** Применить тему: атрибут `<html>` + cookie на год + оповестить подписчиков. */
export const applyTheme = (theme: Theme): void => {
  document.documentElement.setAttribute('data-theme', theme);
  document.cookie = `${THEME_STORAGE_KEY}=${theme};path=/;max-age=31536000;samesite=lax`;
  listeners.forEach((listener) => {
    listener();
  });
};

/** Подписка на смену темы (контракт `useSyncExternalStore`). */
export const subscribeTheme = (onChange: () => void): (() => void) => {
  listeners.add(onChange);

  return () => {
    listeners.delete(onChange);
  };
};

/** Снимок для SSR и первого прохода гидратации — тема по умолчанию. */
export const getServerTheme = (): Theme => DEFAULT_THEME;
