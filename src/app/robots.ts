import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/shared/lib/seo';

/**
 * robots.txt. Индексируется всё, в конце — ссылка на карту сайта, чтобы
 * краулер нашёл её без ручной регистрации.
 *
 * `/_next/` НЕ закрываем: оттуда отдаются JS/CSS (без них поисковик не
 * отрендерит страницу) и все фото через `/_next/image` и `/_next/static/media`
 * — запрет выкидывал бы работы из Google/Яндекс.Картинок.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
