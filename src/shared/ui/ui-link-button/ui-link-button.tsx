import type { FC, ReactNode } from 'react';

import { Link } from '@/shared/i18n';
import { getHrefKind } from '@/shared/lib/href';
import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';
import {
  uiButtonClassNames,
  type UIButtonSize,
  type UIButtonVariant,
} from '@/shared/ui/ui-button';

/**
 * # Интерфейс пропсов для компонента UILinkButton
 * @interface IUILinkButtonProps
 * @property {string} href - адрес: маршрут приложения, http(s) или mailto/tel
 * @property {ReactNode} children - содержимое
 * @property {UIButtonVariant} [variant] - визуальный вариант (как у `UIButton`)
 * @property {UIButtonSize} [size] - размер; `undefined` — адаптивный
 * @property {boolean} [fullWidth] - растянуть на всю ширину
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUILinkButtonProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: UIButtonVariant;
  readonly size?: UIButtonSize;
  readonly fullWidth?: boolean;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Навигационный CTA: выглядит как `UIButton`, семантически — ссылка.
 *
 * Элемент выбирается по `href` ({@link getHrefKind}): маршрут приложения —
 * locale-aware `<Link>`, http(s) — `<a target="_blank" rel="noopener noreferrer">`,
 * `mailto:`/`tel:` — обычный `<a>`. Server-safe: без хуков и `'use client'`,
 * поэтому используется прямо в RSC.
 *
 * @component
 * @example
 * ```tsx
 * <UILinkButton href="/projects" variant="accent" size="M">Смотреть проекты</UILinkButton>
 * ```
 */
export const UILinkButton: FC<IUILinkButtonProps> = ({
  href,
  children,
  variant = 'accent',
  size,
  fullWidth = false,
  className,
  dataName,
}) => {
  const classNames = cn(
    uiButtonClassNames({ variant, size, fullWidth }),
    className,
  );
  const name = dataName ? `UILinkButton-${dataName}` : 'UILinkButton';
  const kind = getHrefKind(href);

  if (kind === 'internal') {
    return (
      <Link href={href} data-name={name} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      data-name={name}
      className={classNames}
      target={kind === 'external' ? '_blank' : undefined}
      rel={kind === 'external' ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
};
