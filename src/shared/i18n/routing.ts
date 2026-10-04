import { defineRouting } from 'next-intl/routing';

/** Конфиг локалей и роутинга. Дефолт — русский, префикс в URL (`/ru`, `/en`). */
export const routing = defineRouting({
  locales: ['ru', 'en'],
  defaultLocale: 'ru',
});

export type Locale = (typeof routing.locales)[number];

/**
 * Самоназвания языков для переключателя. Не переводятся: язык в списке всегда
 * подписан на самом себе, чтобы его нашёл тот, кто другой не читает.
 */
export const LOCALE_NATIVE_NAMES: Record<Locale, string> = {
  ru: 'Русский',
  en: 'English',
};
