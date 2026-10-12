/**
 * Данные сайта, которые не являются текстом интерфейса: идентификаторы,
 * ссылки, ник. Тексты секций — в `./copy.ts`.
 *
 * Базовый URL здесь не хранится: он зависит от окружения и живёт в
 * `@/shared/lib/seo` (`SITE_URL`), где читается из переменных окружения.
 */
export const SITE = {
  /** Имя для разметки Person и заголовков. */
  name: 'Аполлинария',
  /** Как Полина представляется клиентам. */
  shortName: 'Полина',
  /** Латиницей — для OG-картинки и `alternateName` в разметке Person. */
  nameLatin: 'Apollinaria',
  /** Бренд: логотип, заголовки, копирайт. Ник в Instagram — отдельно ниже. */
  brand: 'apollinaria',
  role: 'Фотограф',
  city: 'Омск',
  /** Главный канал записи — основной CTA сайта. */
  telegram: 'https://t.me/qaulina',
  telegramHandle: '@qaulina',
  instagram: 'https://www.instagram.com/apollinaria.frame/',
  /** Реальный аккаунт — не совпадает с брендом, менять только вместе с профилем. */
  instagramHandle: '@apollinaria.frame',
} as const;
