'use client';

import type { FC } from 'react';

import { useTranslations } from 'next-intl';

import { SOCIALS } from '@/shared/config';
import { UIIconLink } from '@/shared/ui';

/**
 * Компактные соц-иконки для подвала. Client-компонент (иконки react-icons),
 * co-located в site-footer — сервер-футер рендерит его как client-лист.
 */
export const FooterSocials: FC = () => {
  const t = useTranslations('Socials');

  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {SOCIALS.map((social) => (
        <li key={social.id}>
          <UIIconLink
            href={social.href}
            label={t(social.id)}
            variant="outline"
            dataName={social.id}
          >
            <span className="text-[1.1rem]">{social.icon}</span>
          </UIIconLink>
        </li>
      ))}
    </ul>
  );
};
