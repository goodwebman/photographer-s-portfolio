import type { FC } from 'react';

import { COPY, NAV, SITE, sectionHref } from '@/shared/config';
import { cn } from '@/shared/lib/cn';
import {
  buttonVariants,
  UIContainer,
  UILinkButton,
  UILogo,
  UINavLink,
  UIThemeToggle,
} from '@/shared/ui';

import { HeaderShell } from './header-shell';
import { MenuTrigger } from './menu-trigger';

const SECTION_IDS = NAV.map((item) => item.id);

/** Классы бургера = `UIButton variant="ghost" size="icon"` кита, считаются на сервере. */
const MENU_BUTTON_CLASSES = cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'lg:hidden');

/**
 * Шапка одностраничника. Фиксирована: в начале страницы прозрачная (фон hero
 * совпадает с фоном страницы), после скролла — полупрозрачный фон с блюром и
 * волосяная линия снизу.
 *
 * Слева словесный знак (ведёт наверх), в центре якоря секций с подсветкой
 * текущей (scroll-spy), справа переключатель темы и «Записаться» → Telegram.
 * До `lg` якоря уезжают в полноэкранное меню.
 *
 * Server component: разметка не гидратируется целиком. Клиентские острова —
 * `HeaderShell` (скролл и scroll-spy), `UIThemeToggle`, `MenuTrigger` (бургер +
 * меню отдельным чанком).
 */
export const SiteHeader: FC = () => (
  <HeaderShell sectionIds={SECTION_IDS}>
    <UIContainer className="flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
      <UILogo name={SITE.brand} label={COPY.header.home} dataName="header" />

      <nav aria-label={COPY.header.nav} className="hidden lg:block">
        <ul className="flex items-center gap-9">
          {NAV.map((item) => (
            <li key={item.id}>
              <UINavLink href={sectionHref(item.id)} dataName={item.id}>
                {item.label}
              </UINavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-1 sm:gap-3">
        <UIThemeToggle
          labelToDark={COPY.header.themeToDark}
          labelToLight={COPY.header.themeToLight}
          dataName="header"
        />
        <UILinkButton
          href={SITE.telegram}
          size="sm"
          className="hidden px-4 text-eyebrow uppercase sm:inline-flex"
          dataName="header-cta"
        >
          {COPY.header.cta}
        </UILinkButton>
        <MenuTrigger className={MENU_BUTTON_CLASSES} label={COPY.header.openMenu} />
      </div>
    </UIContainer>
  </HeaderShell>
);
