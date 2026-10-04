'use client';

import type { FC, MouseEventHandler, ReactNode } from 'react';

import { motion } from 'motion/react';

import { Link } from '@/shared/i18n';
import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';
import { Show } from '@/shared/ui/show';

/**
 * Вариант навигационной ссылки:
 * - `pill` — горизонтальное меню-остров, активный пункт подсвечен «таблеткой»
 * - `drawer` — вертикальное мобильное меню
 * - `footer` — компактный список разделов в подвале
 */
export type UINavLinkVariant = 'pill' | 'drawer' | 'footer';

const EASE = [0.16, 1, 0.3, 1] as const;

const BASE_CLASSES: Record<UINavLinkVariant, string> = {
  pill: 'relative rounded-full px-3.5 py-1.5 text-small font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring',
  drawer:
    'rounded-2xl px-4 py-3 text-body font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring',
  footer:
    'text-small text-muted-foreground transition-all duration-300 ease-out-expo hover:bg-linear-to-r hover:from-accent hover:via-amber-500 hover:to-orange-400 hover:bg-size-[200%_auto] hover:bg-clip-text hover:text-transparent hover:animate-rainbow-text',
};

const ACTIVE_CLASSES: Record<UINavLinkVariant, string> = {
  pill: 'text-accent',
  drawer: 'bg-accent/15 text-accent ring-1 ring-inset ring-accent/25',
  footer: '',
};

const IDLE_CLASSES: Record<UINavLinkVariant, string> = {
  pill: 'text-muted-foreground hover:text-foreground',
  drawer: 'text-muted-foreground hover:bg-muted hover:text-foreground',
  footer: '',
};

/**
 * # Интерфейс пропсов для компонента UINavLink
 * @interface IUINavLinkProps
 * @property {string} href - маршрут приложения
 * @property {ReactNode} children - подпись пункта
 * @property {UINavLinkVariant} [variant] - вариант оформления
 * @property {boolean} [active] - текущий раздел (проставляет `aria-current="page"`)
 * @property {string} [layoutId] - общий `layoutId` подсветки для `pill`: активная
 *   «таблетка» переезжает между пунктами вместо мгновенного перескока
 * @property {MouseEventHandler<HTMLAnchorElement>} [onClick] - обработчик клика
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUINavLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: UINavLinkVariant;
  readonly active?: boolean;
  readonly layoutId?: string;
  readonly onClick?: MouseEventHandler<HTMLAnchorElement>;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Пункт навигации: locale-aware ссылка с состоянием «текущий раздел».
 * `aria-current="page"` проставляется автоматически — активность считывается
 * не только по цвету.
 *
 * @component
 */
export const UINavLink: FC<IUINavLinkProps> = ({
  href,
  children,
  variant = 'pill',
  active = false,
  layoutId,
  onClick,
  className,
  dataName,
}) => (
  <Link
    href={href}
    aria-current={active ? 'page' : undefined}
    onClick={onClick}
    data-name={dataName ? `UINavLink-${dataName}` : 'UINavLink'}
    className={cn(
      BASE_CLASSES[variant],
      active ? ACTIVE_CLASSES[variant] : IDLE_CLASSES[variant],
      className,
    )}
  >
    <Show when={variant === 'pill' && active && layoutId !== undefined}>
      <motion.span
        layoutId={layoutId}
        className="absolute inset-0 -z-10 rounded-full bg-accent/15 ring-1 ring-inset ring-accent/25"
        transition={{ duration: 0.35, ease: EASE }}
      />
    </Show>
    {children}
  </Link>
);
