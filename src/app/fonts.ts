import localFont from 'next/font/local';

/**
 * Гарнитуры сайта. Одна точка правды для layout'а и Storybook: переменные
 * `--font-playfair` / `--font-inter-tight` проставляются классами на корень и
 * читаются токенами `--font-serif` / `--font-sans` в `globals.css`.
 *
 * Файлы — свои сабсеты (`scripts/subset-fonts.py`), а не next/font/google:
 * у Google кириллица, латиница и ₽ лежат в разных файлах, и пробелы, цифры,
 * «·», «—» и латинский логотип первого экрана тянули ещё 2–3 файла уже после
 * разбора CSS (текст перерисовывался). Здесь на начертание один файл со всем
 * нужным — 3 файла ~90 КБ, все прелоадятся. Начертания — только те, что есть
 * в вёрстке: Playfair 400 прямой и курсив, Inter Tight 400–500.
 */
export const fontSerif = localFont({
  variable: '--font-playfair',
  src: [
    { path: '../shared/assets/fonts/playfair-display-400.woff2', weight: '400', style: 'normal' },
    {
      path: '../shared/assets/fonts/playfair-display-400-italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  display: 'swap',
  // метрики fallback'а подгоняются под Playfair — swap не сдвигает строки
  adjustFontFallback: 'Times New Roman',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
});

export const fontSans = localFont({
  variable: '--font-inter-tight',
  src: '../shared/assets/fonts/inter-tight-400-500.woff2',
  weight: '400 500',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
});

/** Классы с CSS-переменными обеих гарнитур — для корня документа. */
export const fontVariables = `${fontSerif.variable} ${fontSans.variable}`;
