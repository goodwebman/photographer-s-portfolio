/**
 * Тип ссылки, определяющий, каким элементом её рендерить.
 * - `anchor` — якорь секции на этой же странице (`#about`) → обычный `<a>`,
 *   плавность даёт CSS `scroll-behavior`, отступ под шапку — `scroll-padding-top`
 * - `internal` — маршрут приложения → `next/link`
 * - `external` — http(s) на другой сайт → `<a target="_blank" rel="noopener noreferrer">`
 * - `protocol` — `mailto:` / `tel:` → обычный `<a>` без `target`
 */
export type HrefKind = 'anchor' | 'internal' | 'external' | 'protocol';

const HTTP_RE = /^https?:\/\//i;
const PROTOCOL_RE = /^[a-z][a-z0-9+.-]*:/i;

/**
 * # Классификация href
 * Единая точка принятия решения «Link или a» — чтобы `target`/`rel` не
 * расставлялись руками в каждом виджете (и не забывались на внешних ссылках).
 *
 * @param href - адрес ссылки
 * @returns тип ссылки
 */
export const getHrefKind = (href: string): HrefKind => {
  if (href.startsWith('#')) return 'anchor';
  if (HTTP_RE.test(href)) return 'external';
  if (PROTOCOL_RE.test(href)) return 'protocol';

  return 'internal';
};
