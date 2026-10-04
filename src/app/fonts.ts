import { Inter_Tight, Playfair_Display } from 'next/font/google';

/**
 * Гарнитуры сайта. Одна точка правды для layout'а и Storybook: переменные
 * `--font-playfair` / `--font-inter-tight` проставляются классами на корень и
 * читаются токенами `--font-serif` / `--font-sans` в `globals.css`.
 *
 * Подмножество `cyrillic` обязательно (в отличие от портфолио): дизайн держится
 * на крупных кириллических serif-заголовках, системный фолбэк его убьёт.
 */
export const fontSerif = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin', 'cyrillic'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const fontSans = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

/** Классы с CSS-переменными обеих гарнитур — для корня документа. */
export const fontVariables = `${fontSerif.variable} ${fontSans.variable}`;
