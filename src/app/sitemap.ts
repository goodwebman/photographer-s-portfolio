import type { MetadataRoute } from 'next';

import { PHOTOS } from '@/entities/photo';
import { absoluteUrl } from '@/shared/lib/seo';
import { PORTRAIT } from '@/widgets/about-section';

/**
 * Одностраничник: в карте сайта одна страница. Плюс image sitemap — все
 * работы и портрет: так кадры быстрее попадают в Google и Яндекс.Картинки.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl('/'),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      images: [...PHOTOS.map((photo) => photo.src.src), PORTRAIT.src].map(absoluteUrl),
    },
  ];
}
