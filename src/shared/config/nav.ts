/**
 * Якоря секций одностраничника. Значение — `id` секции в DOM: шапка ведёт на
 * `#<id>`, scroll-spy подсвечивает пункт по нему же.
 */
export const SECTION_ID = {
  top: 'top',
  about: 'about',
  portfolio: 'portfolio',
  services: 'services',
  contact: 'contact',
} as const;

export type SectionId = (typeof SECTION_ID)[keyof typeof SECTION_ID];

/** Пункт меню: якорь секции + подпись. */
export interface NavItem {
  readonly id: SectionId;
  readonly label: string;
}

/**
 * Пункты меню в порядке секций на странице. «Главной» нет: наверх ведёт
 * логотип, а отдельный пункт на одностраничнике дублировал бы его.
 */
export const NAV: readonly NavItem[] = [
  { id: SECTION_ID.about, label: 'Обо мне' },
  { id: SECTION_ID.portfolio, label: 'Портфолио' },
  { id: SECTION_ID.services, label: 'Услуги и цены' },
  { id: SECTION_ID.contact, label: 'Контакты' },
];

/** `#id` для ссылки на секцию. */
export const sectionHref = (id: SectionId): `#${SectionId}` => `#${id}`;
