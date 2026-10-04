'use client';

import type { FC, MouseEvent } from 'react';

import { useTranslations } from 'next-intl';

import { NAV } from '@/shared/config';
import { usePathname } from '@/shared/i18n';
import { UINavLink } from '@/shared/ui';

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Навигация подвала. Client-компонент: клик по уже активному разделу не
 * запускает навигацию (маршрут не меняется, scroll-to-top из провайдеров не
 * сработает), поэтому прокручиваем наверх вручную — плавно.
 */
export const FooterNav: FC = () => {
  const tNav = useTranslations('Nav');
  const pathname = usePathname();

  const scrollToTopIfCurrent =
    (isCurrent: boolean) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (!isCurrent) return;
      event.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
    };

  return (
    <ul className="mt-4 space-y-2">
      {NAV.map((item) => {
        const isCurrent = pathname === item.href;

        return (
          <li key={item.href}>
            <UINavLink
              href={item.href}
              variant="footer"
              active={isCurrent}
              onClick={scrollToTopIfCurrent(isCurrent)}
              dataName={item.key}
            >
              {tNav(item.key)}
            </UINavLink>
          </li>
        );
      })}
    </ul>
  );
};
