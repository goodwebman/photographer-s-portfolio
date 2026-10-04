import { describe, expect, it } from 'vitest';

import { buildAlternates } from './alternates';
import {
  buildBreadcrumbJsonLd,
  buildPersonJsonLd,
} from './json-ld';
import { buildPageMetadata } from './page-metadata';
import { absoluteUrl, SITE_URL } from './site-url';

describe('absoluteUrl', () => {
  it('склеивает базовый адрес с путём', () => {
    expect(absoluteUrl('/sitemap.xml')).toBe(`${SITE_URL}/sitemap.xml`);
  });

  it('добавляет ведущий слэш, если его забыли', () => {
    expect(absoluteUrl('robots.txt')).toBe(`${SITE_URL}/robots.txt`);
  });
});

describe('buildAlternates', () => {
  it('канонический URL указывает на текущую локаль', () => {
    expect(buildAlternates('en', '/portfolio').canonical).toBe(
      `${SITE_URL}/en/portfolio`,
    );
  });

  it('перечисляет все локали и x-default на дефолтную', () => {
    const { languages } = buildAlternates('en', '/about');

    expect(languages.ru).toBe(`${SITE_URL}/ru/about`);
    expect(languages.en).toBe(`${SITE_URL}/en/about`);
    expect(languages['x-default']).toBe(`${SITE_URL}/ru/about`);
  });
});

describe('buildPageMetadata', () => {
  it('og:url совпадает с каноническим — страницы не склеиваются в одну', () => {
    const meta = buildPageMetadata({
      locale: 'ru',
      href: '/contact',
      title: 'Контакты',
      description: 'Описание',
    });

    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/ru/contact`);
    expect(meta.openGraph?.url).toBe(`${SITE_URL}/ru/contact`);
    expect(meta.openGraph?.title).toBe('Контакты');
  });

  it('дополнения Open Graph не затирают базовые поля', () => {
    const meta = buildPageMetadata({
      locale: 'ru',
      href: '/portfolio/x',
      title: 'X',
      description: 'D',
      openGraph: { type: 'article' },
    });

    expect(meta.openGraph?.title).toBe('X');
    expect(meta.openGraph?.url).toBe(`${SITE_URL}/ru/portfolio/x`);
  });
});

describe('json-ld', () => {
  it('Person содержит профили в sameAs и стабильный @id', () => {
    const node = buildPersonJsonLd({
      locale: 'ru',
      jobTitle: 'Фотограф',
      description: 'D',
    });

    expect(node['@type']).toBe('Person');
    expect(node['@id']).toBe(`${SITE_URL}#person`);
    expect(Array.isArray(node.sameAs)).toBe(true);
  });

  it('хлебные крошки нумеруются с единицы и ведут на локализованные URL', () => {
    const node = buildBreadcrumbJsonLd('en', [
      { name: 'Home', href: '/' },
      { name: 'Portfolio', href: '/portfolio' },
    ]);
    const items = node.itemListElement as { position: number; item: string }[];

    expect(items[0].position).toBe(1);
    expect(items[1].item).toBe(`${SITE_URL}/en/portfolio`);
  });
});
