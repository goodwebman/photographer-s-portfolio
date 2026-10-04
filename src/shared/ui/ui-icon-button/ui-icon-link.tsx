import type { FC, ReactNode } from 'react';

import { Link } from '@/shared/i18n';
import { getHrefKind } from '@/shared/lib/href';
import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';

import {
  uiIconButtonClassNames,
  type UIIconButtonSize,
  type UIIconButtonVariant,
} from './icon-button-styles';

/**
 * # Интерфейс пропсов для компонента UIIconLink
 * @interface IUIIconLinkProps
 * @property {string} href - адрес (маршрут, http(s) или mailto/tel)
 * @property {ReactNode} children - иконка
 * @property {string} label - доступное имя (`aria-label`), обязательно
 * @property {UIIconButtonVariant} [variant] - визуальный вариант
 * @property {UIIconButtonSize} [size] - размер
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIIconLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly label: string;
  readonly variant?: UIIconButtonVariant;
  readonly size?: UIIconButtonSize;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Иконочная ссылка — визуально идентична {@link UIIconButton}, семантически `<a>`.
 * Server-safe: без хуков, используется прямо в RSC (соц-иконки подвала).
 *
 * @component
 */
export const UIIconLink: FC<IUIIconLinkProps> = ({
  href,
  children,
  label,
  variant = 'outline',
  size = 'M',
  className,
  dataName,
}) => {
  const classNames = cn(uiIconButtonClassNames({ variant, size }), className);
  const name = dataName ? `UIIconLink-${dataName}` : 'UIIconLink';
  const kind = getHrefKind(href);

  if (kind === 'internal') {
    return (
      <Link href={href} aria-label={label} data-name={name} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      aria-label={label}
      data-name={name}
      className={classNames}
      target={kind === 'external' ? '_blank' : undefined}
      rel={kind === 'external' ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
};
