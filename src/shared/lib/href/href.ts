/**
 * Тип ссылки, определяющий, каким элементом её рендерить.
 * - `internal` — маршрут приложения → locale-aware `<Link>`
 * - `external` — http(s) на другой сайт → `<a target="_blank" rel="noopener noreferrer">`
 * - `protocol` — `mailto:` / `tel:` → обычный `<a>` без `target`
 */
export type HrefKind = 'internal' | 'external' | 'protocol';

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
  if (HTTP_RE.test(href)) return 'external';
  if (PROTOCOL_RE.test(href)) return 'protocol';

  return 'internal';
};
