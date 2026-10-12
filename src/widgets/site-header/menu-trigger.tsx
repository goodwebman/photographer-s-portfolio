'use client';

import type { FC } from 'react';
import { lazy, Suspense, use, useState } from 'react';

import { MenuIcon } from '@/shared/ui/icons/stroke-icons';

import { ActiveSectionContext } from './active-section-context';

/** Код меню (диалог кита, focus trap, scroll lock) грузится по первому открытию. */
const loadMenu = () => import('./mobile-menu');
const MobileMenu = lazy(() => loadMenu().then((module) => ({ default: module.MobileMenu })));

/** Прогреть чанк меню заранее — на hover/focus бургера, до клика. */
const preloadMenu = (): void => {
  void loadMenu();
};

export interface IMenuTriggerProps {
  /** Классы кнопки — `buttonVariants` кита, посчитанные на сервере. */
  readonly className: string;
  /** Доступное имя бургера. Приходит с сервера: `COPY` целиком в бандл не тянем. */
  readonly label: string;
}

/**
 * Бургер шапки (до `lg`). Само меню — отдельный чанк, монтируется после
 * первого открытия и дальше остаётся смонтированным (закрытый диалог ничего
 * не рендерит). Классы кнопки приходят готовой строкой: `buttonVariants`/`cn`
 * остаются на сервере и не попадают в клиентский бандл.
 */
export const MenuTrigger: FC<IMenuTriggerProps> = ({ className, label }) => {
  const active = use(ActiveSectionContext);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  return (
    <>
      <button
        type="button"
        data-name="UIButton-menu"
        className={className}
        aria-label={label}
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={preloadMenu}
        onFocus={preloadMenu}
        onClick={() => {
          setMounted(true);
          setOpen(true);
        }}
      >
        <MenuIcon className="size-5" />
      </button>

      {mounted ? (
        <Suspense fallback={null}>
          <MobileMenu
            open={open}
            active={active}
            onClose={() => {
              setOpen(false);
            }}
          />
        </Suspense>
      ) : null}
    </>
  );
};
