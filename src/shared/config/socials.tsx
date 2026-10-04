import type { ReactNode } from 'react';

import { SiInstagram, SiTelegram } from 'react-icons/si';

import { SITE } from './site';

/** Соц-ссылка/контакт. Подпись резолвится через `t('Socials.<id>')`. */
export interface Social {
  readonly id: 'telegram' | 'instagram';
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
 * Контакты и соц-сети. Импортируются только в клиентских компонентах: иконки
 * `react-icons` ломаются при передаче через RSC-границу (см. README).
 */
export const SOCIALS: readonly Social[] = [
  {
    id: 'telegram',
    href: SITE.telegram,
    handle: SITE.telegramHandle,
    icon: <SiTelegram />,
    metaDisclaimer: false,
  },
  {
    id: 'instagram',
    href: SITE.instagram,
    handle: SITE.instagramHandle,
    icon: <SiInstagram />,
    metaDisclaimer: true,
  },
];
