'use client';

import type { ButtonHTMLAttributes, FC, MouseEvent } from 'react';
import { memo, useCallback } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cn, useCn } from '@/shared/lib/cn';
import { Show } from '@/shared/ui/show';

import {
  type UIButtonSize,
  type UIButtonVariant,
  uiButtonClassNames,
} from './button-styles';

/**
 * # Интерфейс пропсов для компонента UIButton
 * @interface IUIButtonProps
 * @extends {Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'disabled' | 'name'>}
 *
 * Отличие от эталона: визуальный вид задаётся `variant` (а не `type`),
 * поэтому нативный `type` (`button` | `submit` | `reset`) остаётся рабочим.
 */
export interface IUIButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'disabled' | 'name'
  > {
  /** Классы для стилизации. */
  readonly className?: cnParams | string;
  /** Заблокирована ли кнопка. */
  readonly disabled?: boolean;
  /** Идёт ли загрузка (показывает спиннер, глушит клик). */
  readonly loading?: boolean;
  /** Имя компонента для `data-name` (отладка). */
  readonly name?: string;
  /** Размер: S / M / адаптив по умолчанию. */
  readonly size?: UIButtonSize;
  /** Визуальный вариант. */
  readonly variant?: UIButtonVariant;
  /** Растянуть на всю ширину. */
  readonly fullWidth?: boolean;
}

const Spinner: FC<{ readonly className?: string }> = ({ className }) => (
  <svg
    className={cn('animate-spin', className)}
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="3"
      className="opacity-25"
    />
    <path
      d="M21 12a9 9 0 0 0-9-9"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

/**
 * Основная кнопка/CTA. Для основных действий и переходов.
 *
 * @component
 * @example
 * ```tsx
 * <UIButton variant="accent" size="M" onClick={onSend}>Отправить</UIButton>
 * ```
 */
export const UIButton: FC<IUIButtonProps> = memo(
  ({
    children,
    className,
    disabled = false,
    loading = false,
    name,
    onClick,
    size,
    variant = 'accent',
    fullWidth = false,
    type = 'button',
    ...props
  }) => {
    const classNames = useCn(
      uiButtonClassNames({ variant, size, disabled, loading, fullWidth }),
      className,
    );

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        if (disabled || loading) return;
        onClick?.(event);
      },
      [disabled, loading, onClick],
    );

    return (
      <button
        data-name={name !== undefined && name !== '' ? `UIButton-${name}` : 'UIButton'}
        className={classNames}
        disabled={disabled}
        type={type}
        onClick={handleClick}
        {...props}
      >
        <Show when={loading}>
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner className={size === 'M' ? 'size-6' : 'size-5'} />
          </span>
        </Show>
        <span
          className={cn(
            'inline-flex items-center justify-center gap-2 leading-none',
            loading && 'opacity-0',
          )}
        >
          {children}
        </span>
      </button>
    );
  },
);
UIButton.displayName = 'UIButton';
