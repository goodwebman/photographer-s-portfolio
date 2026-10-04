import type { Metadata } from 'next';

import type { Locale } from '@/shared/i18n';

import { buildAlternates } from './alternates';

export interface IPageMetadataParams {
  readonly locale: Locale;
  /** Внутренний маршрут без префикса локали (`/portfolio`). */
  readonly href: string;
  readonly title: string;
  readonly description: string;
  /** Дополнения к блоку Open Graph (тип, картинки и т.п.). */
  readonly openGraph?: Metadata['openGraph'];
  /** Дополнения к блоку Twitter. */
  readonly twitter?: Metadata['twitter'];
}

/**
 * # Метаданные страницы одним вызовом
 *
 * Собирает title/description, канонический URL с hreflang и Open Graph, у
 * которого `og:url` совпадает с каноническим. Без общей сборки `og:url`
 * наследуется от layout'а и на всех страницах указывает на главную — соцсети
 * и поисковик считают такие страницы одной.
 */
export const buildPageMetadata = ({
  locale,
  href,
  title,
  description,
  openGraph,
  twitter,
}: IPageMetadataParams): Metadata => {
  const alternates = buildAlternates(locale, href);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      ...openGraph,
    },
    ...(twitter ? { twitter } : {}),
  };
};
