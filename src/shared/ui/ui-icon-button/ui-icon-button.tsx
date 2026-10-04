'use client';

import type { ButtonHTMLAttributes, FC, ReactNode, Ref } from 'react';
import { memo } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { useCn } from '@/shared/lib/cn';

import {
  uiIconButtonClassNames,
  type UIIconButtonSize,
  type UIIconButtonVariant,
} from './icon-button-styles';

/**
 * # Интерфейс пропсов для компонента UIIconButton
 * @interface IUIIconButtonProps
 * @extends {Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>}
 * @property {ReactNode} children - иконка
 * @property {string} label - доступное имя (`aria-label`), обязательно
 * @property {UIIconButtonVariant} [variant] - визуальный вариант
 * @property {UIIconButtonSize} [size] - размер
 * @property {cnParams | string} [className] - доп. классы (позиционирование и т.п.)
 * @property {string} [dataName] - суффикс для `data-name`
 * @property {Ref<HTMLButtonElement>} [ref] - ссылка на DOM-узел (React 19: ref — обычный проп)
 */
export interface IUIIconButtonProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    'className' | 'children' | 'aria-label'
  > {
  readonly children: ReactNode;
  readonly label: string;
  readonly variant?: UIIconButtonVariant;
  readonly size?: UIIconButtonSize;
  readonly className?: cnParams | string;
  readonly dataName?: string;
  readonly ref?: Ref<HTMLButtonElement>;
}

/**
 * Квадратная кнопка-иконка. `label` обязателен — у иконочной кнопки нет
 * текстового содержимого, без `aria-label` она не имеет доступного имени.
 *
 * @component
 * @example
 * ```tsx
 * <UIIconButton label="Закрыть" variant="plain" size="S" onClick={close}>
 *   <LuX className="size-5" />
 * </UIIconButton>
 * ```
 */
export const UIIconButton: FC<IUIIconButtonProps> = memo(
  ({
    children,
    label,
    variant = 'surface',
    size = 'M',
    className,
    dataName,
    type = 'button',
    ...props
  }) => {
    const classNames = useCn(uiIconButtonClassNames({ variant, size }), className);

    return (
      <button
        type={type}
        aria-label={label}
        data-name={dataName ? `UIIconButton-${dataName}` : 'UIIconButton'}
        className={classNames}
        {...props}
      >
        {children}
      </button>
    );
  },
);
UIIconButton.displayName = 'UIIconButton';
