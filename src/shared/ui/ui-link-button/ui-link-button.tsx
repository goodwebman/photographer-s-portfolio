import type { FC, ReactNode } from 'react';

import Link from 'next/link';

import type { VariantProps } from 'class-variance-authority';

import { buttonVariants } from '@/shared/kit';
import { getHrefKind } from '@/shared/lib/href';
import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

/** Визуальный вариант — тот же набор, что у `UIButton` кита. */
export type UILinkButtonVariant = NonNullable<ButtonVariantProps['variant']>;
/** Размер — тот же набор, что у `UIButton` кита. */
export type UILinkButtonSize = NonNullable<ButtonVariantProps['size']>;

/**
 * # Интерфейс пропсов для компонента UILinkButton
 * @interface IUILinkButtonProps
 * @property {string} href - адрес: якорь, маршрут приложения, http(s) или mailto/tel
 * @property {ReactNode} children - содержимое
 * @property {UILinkButtonVariant} [variant] - визуальный вариант (как у `UIButton`)
 * @property {UILinkButtonSize} [size] - размер (как у `UIButton`)
 * @property {boolean} [fullWidth] - растянуть на всю ширину
 * @property {string} [ariaLabel] - доступное имя, если текста ссылки недостаточно
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUILinkButtonProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: UILinkButtonVariant;
  readonly size?: UILinkButtonSize;
  readonly fullWidth?: boolean;
  readonly ariaLabel?: string;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Навигационный CTA: выглядит как `UIButton` кита, семантически — ссылка.
 *
 * Классы берутся из `buttonVariants` кита (модуль без `'use client'`), поэтому
 * компонент server-safe и используется прямо в RSC. Элемент выбирается по
 * `href` ({@link getHrefKind}): маршрут приложения — `next/link`, http(s) —
 * `<a target="_blank" rel="noopener noreferrer">`, якорь секции и
 * `mailto:`/`tel:` — обычный `<a>`.
 *
 * @component
 * @example
 * ```tsx
 * <UILinkButton href="#portfolio" variant="primary" size="lg">Смотреть работы</UILinkButton>
 * ```
 */
export const UILinkButton: FC<IUILinkButtonProps> = ({
  href,
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ariaLabel,
  className,
  dataName,
}) => {
  const classNames = cn(buttonVariants({ variant, size }), fullWidth && 'w-full', className);
  const name = dataName ? `UILinkButton-${dataName}` : 'UILinkButton';
  const kind = getHrefKind(href);

  if (kind === 'internal') {
    return (
      <Link href={href} aria-label={ariaLabel} data-name={name} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      data-name={name}
      className={classNames}
      target={kind === 'external' ? '_blank' : undefined}
      rel={kind === 'external' ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
};
