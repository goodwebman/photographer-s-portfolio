import type { routing } from '@/shared/i18n';

// Только Locale-типизация. Строгую типизацию ключей (Messages) не включаем:
// контент проектов читается динамическими ключами (`${slug}.summary`).
declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
  }
}
