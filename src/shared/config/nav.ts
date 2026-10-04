/** Ключ перевода пункта меню (namespace `Nav`). */
export type NavKey = 'home' | 'about' | 'portfolio' | 'services' | 'contact';

/** Пункт навигации. `key` резолвится в подпись через `t('Nav.<key>')`. */
export interface NavItem {
  readonly href: string;
  readonly key: NavKey;
}

/** Пункты главного меню. Подписи — в messages, здесь только маршруты. */
export const NAV: readonly NavItem[] = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/services', key: 'services' },
  { href: '/contact', key: 'contact' },
];
