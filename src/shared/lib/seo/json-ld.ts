import { COPY, SITE } from '@/shared/config';

import { absoluteUrl, SITE_URL } from './site-url';

/** Узел разметки schema.org. Сериализуется в `<script type="application/ld+json">`. */
export type JsonLdNode = Record<string, unknown>;

/** Тариф для разметки `Offer`. */
export interface IJsonLdOffer {
  readonly name: string;
  /** Цена первого часа, ₽. */
  readonly price: number;
}

/** Кадр для разметки `ImageObject`. */
export interface IJsonLdImage {
  /** Путь или абсолютный URL файла. */
  readonly url: string;
  readonly caption: string;
  readonly width?: number;
  readonly height?: number;
}

/** Стабильные `@id` узлов — по ним узлы ссылаются друг на друга внутри графа. */
export const JSON_LD_ID = {
  person: `${SITE_URL}#person`,
  service: `${SITE_URL}#service`,
  website: `${SITE_URL}#website`,
  webpage: `${SITE_URL}#webpage`,
  gallery: `${SITE_URL}#portfolio`,
} as const;

const OMSK = {
  '@type': 'PostalAddress',
  addressLocality: SITE.city,
  addressCountry: 'RU',
} as const;

const PERSON_REF = { '@id': JSON_LD_ID.person } as const;

/**
 * # Разметка ImageObject
 * Автор, подпись и копирайт кадра — Google Картинки и Яндекс.Картинки
 * показывают их в карточке изображения.
 */
const imageObject = ({ url, caption, width, height }: IJsonLdImage): JsonLdNode => ({
  '@type': 'ImageObject',
  contentUrl: absoluteUrl(url),
  caption,
  ...(width && height ? { width, height } : {}),
  creator: PERSON_REF,
  creditText: SITE.name,
  copyrightNotice: `© ${SITE.name}`,
});

/**
 * # Разметка Person
 * Связывает сайт с человеком: имя, профессия, город, портрет, профили в
 * других сервисах (`sameAs`) — основа для панели знаний.
 *
 * @param image - портрет (путь или URL)
 */
export const buildPersonJsonLd = (image?: string): JsonLdNode => ({
  '@type': 'Person',
  '@id': JSON_LD_ID.person,
  name: SITE.name,
  alternateName: [SITE.shortName, SITE.nameLatin, SITE.brand],
  url: absoluteUrl('/'),
  ...(image ? { image: absoluteUrl(image) } : {}),
  jobTitle: SITE.role,
  description: COPY.meta.description,
  address: OMSK,
  sameAs: [SITE.telegram, SITE.instagram],
});

/**
 * # Разметка ProfessionalService
 * Локальная услуга: где работает, диапазон цен и тарифы с ценой за час —
 * поисковик может показать их в сниппете.
 *
 * @param offers - тарифы из `entities/service`
 * @param priceRange - «3000–3500 RUB»
 * @param images - кадры-примеры (пути или URL); по умолчанию OG-картинка
 */
export const buildServiceJsonLd = (
  offers: readonly IJsonLdOffer[],
  priceRange: string,
  images: readonly string[] = ['/opengraph-image'],
): JsonLdNode => ({
  '@type': 'ProfessionalService',
  '@id': JSON_LD_ID.service,
  name: SITE.brand,
  description: COPY.meta.description,
  url: absoluteUrl('/'),
  image: images.map(absoluteUrl),
  address: OMSK,
  areaServed: { '@type': 'City', name: SITE.city },
  priceRange,
  founder: PERSON_REF,
  sameAs: [SITE.telegram, SITE.instagram],
  makesOffer: offers.map((offer) => ({
    '@type': 'Offer',
    name: offer.name,
    priceCurrency: 'RUB',
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: offer.price,
      priceCurrency: 'RUB',
      unitCode: 'HUR',
      referenceQuantity: { '@type': 'QuantitativeValue', value: 1, unitCode: 'HUR' },
    },
  })),
});

/**
 * # Разметка WebSite
 * Описывает сам сайт и его автора.
 */
export const buildWebSiteJsonLd = (): JsonLdNode => ({
  '@type': 'WebSite',
  '@id': JSON_LD_ID.website,
  url: absoluteUrl('/'),
  name: SITE.brand,
  description: COPY.meta.description,
  inLanguage: 'ru',
  author: PERSON_REF,
});

/**
 * # Разметка WebPage
 * Единственная страница: о ком она и главный кадр (hero).
 *
 * @param primaryImage - главный кадр страницы
 */
export const buildWebPageJsonLd = (primaryImage: IJsonLdImage): JsonLdNode => ({
  '@type': 'ProfilePage',
  '@id': JSON_LD_ID.webpage,
  url: absoluteUrl('/'),
  name: COPY.meta.title,
  description: COPY.meta.description,
  inLanguage: 'ru',
  isPartOf: { '@id': JSON_LD_ID.website },
  about: PERSON_REF,
  mainEntity: PERSON_REF,
  primaryImageOfPage: imageObject(primaryImage),
});

/**
 * # Разметка ImageGallery
 * Портфолио: каждая работа — `ImageObject` с автором и копирайтом.
 *
 * @param images - работы в порядке сетки
 */
export const buildImageGalleryJsonLd = (images: readonly IJsonLdImage[]): JsonLdNode => ({
  '@type': 'ImageGallery',
  '@id': JSON_LD_ID.gallery,
  url: absoluteUrl('/#portfolio'),
  name: COPY.portfolio.title,
  isPartOf: { '@id': JSON_LD_ID.webpage },
  author: PERSON_REF,
  image: images.map(imageObject),
});

/**
 * # Граф JSON-LD
 * Все узлы страницы одним `@graph` с общим `@context`: узлы ссылаются друг на
 * друга по `@id`, а не дублируют данные.
 *
 * @param nodes - узлы без `@context`
 */
export const buildJsonLdGraph = (nodes: readonly JsonLdNode[]): JsonLdNode => ({
  '@context': 'https://schema.org',
  '@graph': nodes,
});
