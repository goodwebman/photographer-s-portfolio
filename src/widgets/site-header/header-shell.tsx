'use client';

import type { FC, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

import { useActiveSection } from '@/shared/lib/hooks/use-active-section';
import { useScrolledPast } from '@/shared/lib/hooks/use-scroll-flag';

import { ActiveSectionContext } from './active-section-context';

/** После какого сдвига (px) шапка получает фон и волосяную линию. */
const SCROLL_OFFSET = 16;

export interface IHeaderShellProps {
  /** id секций для scroll-spy — в порядке на странице. */
  readonly sectionIds: readonly string[];
  readonly children: ReactNode;
}

/**
 * Клиентская оболочка шапки: всё содержимое — серверная разметка (children),
 * здесь только поведение.
 *
 * - `data-scrolled` после скролла → фон с блюром и линия снизу (классы
 *   `data-scrolled:` — без перерисовки содержимого);
 * - scroll-spy: `aria-current="location"` на якоре текущей секции. Ссылки
 *   серверные, поэтому атрибут ставится в DOM напрямую; стиль активного пункта
 *   в `UINavLink` завязан на этот атрибут. Мобильному меню текущая секция
 *   приходит через контекст.
 */
export const HeaderShell: FC<IHeaderShellProps> = ({ sectionIds, children }) => {
  const ref = useRef<HTMLElement>(null);
  const scrolled = useScrolledPast(SCROLL_OFFSET);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const links = ref.current?.querySelectorAll<HTMLAnchorElement>('nav a[href^="#"]') ?? [];
    links.forEach((link) => {
      if (link.getAttribute('href') === `#${active ?? ''}`) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }, [active]);

  return (
    <ActiveSectionContext value={active}>
      <header
        ref={ref}
        data-scrolled={scrolled || undefined}
        className="fixed inset-x-0 top-0 z-40 border-b border-transparent bg-transparent transition-[background-color,border-color] duration-300 data-scrolled:border-border/70 data-scrolled:bg-background/80 data-scrolled:backdrop-blur-md"
      >
        {children}
      </header>
    </ActiveSectionContext>
  );
};
