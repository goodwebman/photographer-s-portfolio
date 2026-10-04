import { SITE } from '@/shared/config';
import { getPathname, type Locale } from '@/shared/i18n';

import { absoluteUrl, SITE_URL } from './site-url';

/** Узел разметки schema.org. Сериализуется в `<script type="application/ld+json">`. */
export type JsonLdNode = Record<string, unknown>;

/**
 * # Разметка Person
 * Даёт поисковику связать сайт с человеком: имя, должность, профили в других
 * сервисах (`sameAs`) — основа для панели знаний.
 *
 * @param params.locale - текущая локаль (уходит в `url`)
 * @param params.jobTitle - должность на языке страницы
 * @param params.description - краткое описание на языке страницы
 */
export const buildPersonJsonLd = ({
  locale,
  jobTitle,
  description,
}: {
  readonly locale: Locale;
  readonly jobTitle: string;
  readonly description: string;
}): JsonLdNode => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}#person`,
  name: SITE.name,
  alternateName: SITE.nameLatin,
  url: absoluteUrl(getPathname({ href: '/', locale })),
  jobTitle,
  description,
  sameAs: [SITE.telegram, SITE.instagram],
});

/**
 * # Разметка WebSite
 * Описывает сам сайт и его автора; `inLanguage` помогает связать языковые версии.
 */
export const buildWebSiteJsonLd = ({
  locale,
  description,
}: {
  readonly locale: Locale;
  readonly description: string;
}): JsonLdNode => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}#website`,
  url: absoluteUrl(getPathname({ href: '/', locale })),
  name: SITE.brand,
  description,
  inLanguage: locale,
  author: { '@id': `${SITE_URL}#person` },
});

/**
 * # Хлебные крошки
 * Google рисует их вместо голого URL в выдаче — выше кликабельность сниппета.
 *
 * @param locale - текущая локаль
 * @param items - цепочка от корня к текущей странице
 */
export const buildBreadcrumbJsonLd = (
  locale: Locale,
  items: readonly { readonly name: string; readonly href: string }[],
): JsonLdNode => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(getPathname({ href: item.href, locale })),
  })),
});
