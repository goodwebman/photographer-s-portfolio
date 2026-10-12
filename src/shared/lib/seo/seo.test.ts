import { describe, expect, it } from 'vitest';

import { SITE } from '@/shared/config';

import { buildPersonJsonLd, buildServiceJsonLd, buildWebSiteJsonLd } from './json-ld';
import { absoluteUrl, SITE_URL } from './site-url';

describe('absoluteUrl', () => {
  it('склеивает базовый адрес с путём', () => {
    expect(absoluteUrl('/sitemap.xml')).toBe(`${SITE_URL}/sitemap.xml`);
  });

  it('добавляет ведущий слэш, если его забыли', () => {
    expect(absoluteUrl('robots.txt')).toBe(`${SITE_URL}/robots.txt`);
  });
});

describe('json-ld', () => {
  it('Person: стабильный @id, город и профили в sameAs', () => {
    const node = buildPersonJsonLd();

    expect(node['@type']).toBe('Person');
    expect(node['@id']).toBe(`${SITE_URL}#person`);
    expect(node.address).toMatchObject({ addressLocality: SITE.city });
    expect(node.sameAs).toEqual([SITE.telegram, SITE.instagram]);
  });

  it('ProfessionalService: тарифы с ценой за час в рублях', () => {
    const node = buildServiceJsonLd(
      [
        { name: 'Индивидуальная съёмка', price: 3000 },
        { name: 'Парная съёмка', price: 3500 },
      ],
      '3000–3500 RUB',
    );
    const offers = node.makesOffer as {
      name: string;
      priceSpecification: { price: number; priceCurrency: string; unitCode: string };
    }[];

    expect(node.priceRange).toBe('3000–3500 RUB');
    expect(offers).toHaveLength(2);
    expect(offers[1].priceSpecification).toMatchObject({
      price: 3500,
      priceCurrency: 'RUB',
      unitCode: 'HUR',
    });
  });

  it('WebSite: русский язык и ссылка на автора', () => {
    const node = buildWebSiteJsonLd();

    expect(node.inLanguage).toBe('ru');
    expect(node.author).toEqual({ '@id': `${SITE_URL}#person` });
  });
});
