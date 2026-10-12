import type { MetadataRoute } from 'next';

import { COPY, SITE } from '@/shared/config';

/** Палитра «Ночи» — тема по умолчанию (`--background` в `globals.css`). */
const NIGHT_BACKGROUND = '#100f0d';

/**
 * Web App Manifest. Нужен для установки как PWA и для корректных цветов
 * системного UI на мобильных.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: COPY.meta.title,
    short_name: SITE.brand,
    description: COPY.meta.description,
    lang: 'ru',
    start_url: '/',
    display: 'standalone',
    background_color: NIGHT_BACKGROUND,
    theme_color: NIGHT_BACKGROUND,
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      // PNG для платформ без поддержки SVG-иконок (генерирует apple-icon.tsx)
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
