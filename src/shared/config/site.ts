import type { StaticImageData } from 'next/image';

import aboutPortrait from './assets/about-portrait.jpg';

/**
 * Нелокализуемые данные сайта (идентификаторы, ссылки, ник). Тексты (имя,
 * роль, город на языке страницы, миссия) живут в messages/{locale}.json →
 * namespace `Site`.
 *
 * Базовый URL здесь не хранится: он зависит от окружения и живёт в
 * `@/shared/lib/seo` (`SITE_URL`), где читается из переменных окружения.
 */
export const SITE = {
  /** Каноничное имя для разметки Person. В UI имя берётся из `Site.name`. */
  name: 'Аполлинария',
  /** Латиницей — для OG-картинки и `alternateName` в разметке Person. */
  nameLatin: 'Apollinaria',
  /** Бренд и ник в соцсетях. */
  brand: 'apollinaria.frame',
  /** Город для разметки schema.org. В UI город берётся из `Site.city`. */
  city: 'Омск',
  /** Главный канал записи — основной CTA сайта. */
  telegram: 'https://t.me/qaulina',
  telegramHandle: '@qaulina',
  instagram: 'https://www.instagram.com/apollinaria.frame/',
  instagramHandle: '@apollinaria.frame',
} as const;

/**
 * Слот портрета на `/about`.
 *
 * TODO(about-portrait): фото самой Полины в материалах нет. Пока здесь лежит
 * её работа (копия `ginger/03`), поэтому подпись к слоту НЕ утверждает, что на
 * снимке она. Когда появится портрет — заменить файл
 * `assets/about-portrait.jpg` и выставить `isAuthor: true`.
 */
export const ABOUT_PORTRAIT: {
  readonly src: StaticImageData;
  /** `true`, когда в слоте настоящий портрет Полины, а не её работа. */
  readonly isAuthor: boolean;
} = {
  src: aboutPortrait,
  isAuthor: false,
};
