import type { FC, ReactNode } from 'react';

import Link from 'next/link';

import { buttonVariants } from '@/shared/kit';
import { getHrefKind } from '@/shared/lib/href';
import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';

/** Визуальный вариант иконочной ссылки — подмножество вариантов `UIButton` кита. */
export type UIIconLinkVariant = 'outline' | 'ghost' | 'secondary';

/**
 * # Интерфейс пропсов для компонента UIIconLink
 * @interface IUIIconLinkProps
 * @property {string} href - адрес (якорь, маршрут, http(s) или mailto/tel)
 * @property {ReactNode} children - иконка
 * @property {string} label - доступное имя (`aria-label`), обязательно
 * @property {UIIconLinkVariant} [variant] - визуальный вариант
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIIconLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly label: string;
  readonly variant?: UIIconLinkVariant;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Иконочная ссылка — визуально как `UIButton size="icon"` кита, семантически
 * `<a>`. Server-safe: без хуков, используется прямо в RSC.
 *
 * @component
 */
export const UIIconLink: FC<IUIIconLinkProps> = ({
  href,
  children,
  label,
  variant = 'outline',
  className,
  dataName,
}) => {
  const classNames = cn(buttonVariants({ variant, size: 'icon' }), className);
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
