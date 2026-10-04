'use client';

import type { FC, MouseEventHandler } from 'react';

import { Link } from '@/shared/i18n';
import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';

/**
 * Вариант логотипа:
 * - `header` — круглый знак со свечением, подпись скрыта до `sm`
 * - `footer` — скруглённый квадрат, подпись видна всегда
 */
export type UILogoVariant = 'header' | 'footer';

const ROOT_CLASSES: Record<UILogoVariant, string> = {
  header:
    'group flex items-center gap-2 rounded-full pl-1 pr-2 font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring',
  footer: 'flex items-center gap-2 font-semibold',
};

const MARK_CLASSES: Record<UILogoVariant, string> = {
  header:
    'grid size-9 place-items-center rounded-full bg-accent font-mono text-accent-foreground shadow-[0_0_20px_-4px_var(--accent)] transition-transform duration-300 group-hover:scale-105',
  footer:
    'grid size-8 place-items-center rounded-lg bg-accent font-mono text-accent-foreground',
};

const NAME_CLASSES: Record<UILogoVariant, string | undefined> = {
  header: 'hidden pr-1 sm:inline',
  footer: undefined,
};

/**
 * # Интерфейс пропсов для компонента UILogo
 * @interface IUILogoProps
 * @property {string} name - имя/бренд рядом со знаком
 * @property {UILogoVariant} [variant] - вариант оформления
 * @property {string} [href] - куда ведёт логотип
 * @property {MouseEventHandler<HTMLAnchorElement>} [onClick] - обработчик клика
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUILogoProps {
  readonly name: string;
  readonly variant?: UILogoVariant;
  readonly href?: string;
  readonly onClick?: MouseEventHandler<HTMLAnchorElement>;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Логотип-ссылка: знак `</>` акцентом и имя рядом. Единая точка правды для
 * шапки и подвала — знак не расползается по вёрстке виджетов.
 *
 * @component
 */
export const UILogo: FC<IUILogoProps> = ({
  name,
  variant = 'header',
  href = '/',
  onClick,
  className,
  dataName,
}) => (
  <Link
    href={href}
    onClick={onClick}
    data-name={dataName ? `UILogo-${dataName}` : 'UILogo'}
    className={cn(ROOT_CLASSES[variant], className)}
  >
    <span aria-hidden="true" className={MARK_CLASSES[variant]}>
      &lt;/&gt;
    </span>
    <span className={NAME_CLASSES[variant]}>{name}</span>
  </Link>
);
