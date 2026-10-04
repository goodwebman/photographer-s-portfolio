'use client';

import { useEffect } from 'react';

import { usePathname } from '@/shared/i18n';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Скрытый компонент: при каждой смене маршрута прокручивает страницу наверх.
 * Вешается в провайдерах один раз. `behavior` зависит от prefers-reduced-motion
 * (CSS `scroll-behavior: smooth` отвечает за плавность в остальных случаях).
 */
export const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  }, [pathname]);

  return null;
};
