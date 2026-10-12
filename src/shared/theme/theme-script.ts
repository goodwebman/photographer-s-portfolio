import { THEME_STORAGE_KEY } from './types';

/**
 * # Тема до первой отрисовки
 * Читает cookie и ставит `data-theme` на `<html>`. Выполняется inline-скриптом
 * в `<head>` раньше разбора `<body>` — светлая тема не мигает тёмной, а
 * сервер отдаёт один статический HTML на всех (без `cookies()` в layout'е).
 *
 * Функция сериализуется через `toString()`: без замыканий и импортов, всё
 * нужное — через аргументы.
 *
 * @param key - имя cookie
 */
export function themeBoot(key: string): void {
  try {
    const match = new RegExp(`(?:^|;\\s*)${key}=(light|dark)`).exec(document.cookie);
    if (match) document.documentElement.setAttribute('data-theme', match[1]);
  } catch {
    // cookie недоступны (sandbox-iframe) — остаётся тема по умолчанию
  }
}

/** Готовый inline-скрипт темы. */
export const THEME_SCRIPT = `(${themeBoot.toString()})(${JSON.stringify(THEME_STORAGE_KEY)});`;
