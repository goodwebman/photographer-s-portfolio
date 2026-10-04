import type { MetadataRoute } from 'next';

import { SITE } from '@/shared/config';

/**
 * Web App Manifest. Нужен для установки как PWA и для корректных цветов
 * системного UI на мобильных; Lighthouse проверяет его в разделе PWA/SEO.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.nameLatin} — photographer, Omsk`,
    short_name: SITE.brand,
    description: 'Photographer in Omsk: portraits, love stories, kids and group shoots.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0b',
    theme_color: '#0a0a0b',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
