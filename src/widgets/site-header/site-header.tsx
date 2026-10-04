'use client';

import type { FC } from 'react';
import { useState } from 'react';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { LuMenu, LuX } from 'react-icons/lu';

import { NAV, SITE } from '@/shared/config';
import { usePathname } from '@/shared/i18n';
import { cn } from '@/shared/lib/cn';
import { useMediaQuery, useScrolledPast } from '@/shared/lib/hooks';
import { UIIconButton, UILogo, UINavLink, UIThemeToggle } from '@/shared/ui';

import { LanguageSwitcher } from './language-switcher';

/** Раздел считается активным для вложенных маршрутов, кроме главной. */
const isActiveHref = (pathname: string, href: string): boolean =>
  href === '/' ? pathname === '/' : pathname.startsWith(href);

const EASE = [0.16, 1, 0.3, 1] as const;

/** После какого сдвига (px) капсула шапки уплотняется. */
const SCROLL_OFFSET = 8;

/**
 * Плавающий остров-навигация: стеклянная капсула, оторванная от краёв, поверх
 * шейдерного фона. Активный пункт — «переезжающая» таблетка (layoutId), при
 * скролле капсула уплотняется, мобильное меню выпадает отдельной плашкой.
 */
export const SiteHeader: FC = () => {
  const t = useTranslations('Header');
  const tNav = useTranslations('Nav');
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const shouldReduce = useReducedMotion();
  const scrolled = useScrolledPast(SCROLL_OFFSET);
  const [open, setOpen] = useState(false);
  // Дровер существует только на мобиле: на десктопе он схлопнут независимо от `open`.
  const drawerOpen = open && !isDesktop;

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className="pointer-events-none sticky top-0 z-999999999 px-4 pt-3 sm:px-6 sm:pt-4 lg:px-8">
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={shouldReduce ? false : { y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className={cn(
            'pointer-events-auto flex items-center justify-between gap-2 rounded-full border px-2.5 py-2 ring-1 ring-inset ring-white/4 backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300',
            scrolled
              ? 'border-border bg-card/85 shadow-[0_14px_44px_-14px_rgba(0,0,0,0.6)]'
              : 'border-border/60 bg-card/55 shadow-[0_8px_30px_-14px_rgba(0,0,0,0.45)]',
          )}
        >
          <UILogo
            name={SITE.brand}
            variant="header"
            onClick={closeMenu}
            dataName="header"
          />

          <nav
            className="hidden flex-1 items-center justify-center gap-0.5 md:flex"
            aria-label={t('mainNav')}
          >
            {NAV.map((item) => (
              <UINavLink
                key={item.href}
                href={item.href}
                variant="pill"
                active={isActiveHref(pathname, item.href)}
                layoutId="nav-active"
                dataName={item.key}
              >
                {tNav(item.key)}
              </UINavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <LanguageSwitcher className="max-md:bg-transparent max-md:border-transparent" />
            <UIThemeToggle
              labelToDark={t('themeToDark')}
              labelToLight={t('themeToLight')}
              className="max-md:bg-transparent max-md:border-transparent"
            />
            <UIIconButton
              label={open ? t('closeMenu') : t('openMenu')}
              variant="ghost"
              className="md:hidden"
              aria-expanded={open}
              dataName="menu"
              onClick={() => {
                setOpen((v) => !v);
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'menu'}
                  initial={shouldReduce ? false : { opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={shouldReduce ? undefined : { opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                  className="inline-flex"
                >
                  {open ? <LuX className="size-5" /> : <LuMenu className="size-5" />}
                </motion.span>
              </AnimatePresence>
            </UIIconButton>
          </div>
        </motion.div>

        <AnimatePresence>
          {drawerOpen ? (
            <motion.div
              className="pointer-events-auto absolute inset-x-0 top-full mt-2 origin-top overflow-hidden rounded-3xl border border-border bg-card/90 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.7)] ring-1 ring-inset ring-white/4 backdrop-blur-xl md:hidden"
              initial={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: EASE }}
            >
              <nav className="flex flex-col gap-1 p-3" aria-label={t('mobileNav')}>
                {NAV.map((item) => (
                  <UINavLink
                    key={item.href}
                    href={item.href}
                    variant="drawer"
                    active={isActiveHref(pathname, item.href)}
                    onClick={closeMenu}
                    dataName={item.key}
                  >
                    {tNav(item.key)}
                  </UINavLink>
                ))}
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
};
