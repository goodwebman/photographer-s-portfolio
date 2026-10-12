import type { ReactNode } from 'react';

import { InstagramIcon, TelegramIcon } from '@/shared/ui/icons';

import { SITE } from './site';

/** Канал связи. */
export interface Social {
  readonly id: 'telegram' | 'instagram';
  readonly label: string;
  readonly href: string;
  /** Ник для отображения (`@qaulina`). */
  readonly handle: string;
  readonly icon: ReactNode;
  /**
   * Нужна ли сноска про Meta. Instagram принадлежит компании, признанной
   * в РФ экстремистской, — каждое упоминание сопровождается дисклеймером.
   */
  readonly metaDisclaimer: boolean;
}

/**
 * Контакты и соц-сети. Иконки — server-safe SVG из `@/shared/ui/icons`,
 * поэтому `SOCIALS` можно рендерить и в серверных компонентах.
 */
export const SOCIALS: readonly Social[] = [
  {
    id: 'telegram',
    label: 'Telegram',
    href: SITE.telegram,
    handle: SITE.telegramHandle,
    icon: <TelegramIcon />,
    metaDisclaimer: false,
  },
  {
    id: 'instagram',
    label: 'Instagram*',
    href: SITE.instagram,
    handle: SITE.instagramHandle,
    icon: <InstagramIcon />,
    metaDisclaimer: true,
  },
];
