import { defineRouting } from 'next-intl/routing';

/** Конфиг локалей и роутинга. Дефолт — русский, префикс в URL (`/ru`, `/en`). */
export const routing = defineRouting({
  locales: ['ru', 'en'],
  defaultLocale: 'ru',
});

export type Locale = (typeof routing.locales)[number];
