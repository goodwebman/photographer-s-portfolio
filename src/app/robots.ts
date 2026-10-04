import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/shared/lib/seo';

/**
 * robots.txt. Индексируется всё, кроме служебных путей Next.js; в конце —
 * ссылка на карту сайта, чтобы краулер нашёл её без ручной регистрации.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  };
}
