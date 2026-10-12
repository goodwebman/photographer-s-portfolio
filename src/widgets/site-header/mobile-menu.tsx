'use client';

import type { FC, MouseEvent } from 'react';

import { COPY, NAV, SITE, sectionHref, type SectionId } from '@/shared/config';
import { UIButton, UIDialog } from '@/shared/kit';
import { CloseIcon, TelegramIcon } from '@/shared/ui/icons';
import { UILinkButton } from '@/shared/ui/ui-link-button';
import { UILogo } from '@/shared/ui/ui-logo';
import { UINavLink } from '@/shared/ui/ui-nav-link';

export interface IMobileMenuProps {
  readonly open: boolean;
  /** Секция в центре экрана — подсвечивается в меню. */
  readonly active: string | null;
  readonly onClose: () => void;
}

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Полноэкранное меню для экранов уже `lg` на `UIDialog` кита: focus trap,
 * Esc и блокировка скролла — оттуда, после закрытия фокус возвращается на
 * бургер. Отдельный чанк: грузится `MenuTrigger`'ом по первому открытию.
 *
 * Переход по якорю делаем вручную: пока диалог открыт, скролл документа
 * заблокирован. Поэтому сначала закрываем меню, а скроллим к секции в
 * следующем кадре — когда блокировка уже снята.
 */
export const MobileMenu: FC<IMobileMenuProps> = ({ open, active, onClose }) => {
  const goTo = (id: SectionId) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    onClose();
    requestAnimationFrame(() => {
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
      window.history.replaceState(null, '', sectionHref(id));
    });
  };

  return (
    <UIDialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <UIDialog.Content
        aria-label={COPY.header.menu}
        className="flex h-dvh max-w-none flex-col rounded-none border-0 bg-background p-0 shadow-none"
      >
        <div className="flex h-16 items-center justify-between px-5 sm:px-8">
          <UILogo
            name={SITE.brand}
            label={COPY.header.home}
            onClick={goTo('top')}
            dataName="menu"
          />
          <UIButton
            variant="ghost"
            size="icon"
            aria-label={COPY.header.closeMenu}
            onClick={onClose}
            testId="menu-close"
          >
            <CloseIcon className="size-5" />
          </UIButton>
        </div>

        <nav aria-label={COPY.header.nav} className="flex-1 overflow-y-auto px-5 pt-8 sm:px-8">
          <ul className="border-t border-border">
            {NAV.map((item, index) => (
              <li key={item.id} className="border-b border-border">
                <UINavLink
                  href={sectionHref(item.id)}
                  variant="menu"
                  index={String(index + 1).padStart(2, '0')}
                  active={active === item.id}
                  onClick={goTo(item.id)}
                  dataName={`menu-${item.id}`}
                  className="py-5"
                >
                  {item.label}
                </UINavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-5 pb-8 pt-6 sm:px-8">
          <UILinkButton
            href={SITE.telegram}
            size="lg"
            fullWidth
            className="text-eyebrow uppercase"
            dataName="menu-telegram"
          >
            <TelegramIcon className="size-4" />
            {COPY.header.cta}
            <span className="text-primary-foreground/70">{SITE.telegramHandle}</span>
          </UILinkButton>
        </div>
      </UIDialog.Content>
    </UIDialog>
  );
};
