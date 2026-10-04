'use client';

import type { FC, ReactNode } from 'react';
import { memo } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { useCn } from '@/shared/lib/cn';

/**
 * # Интерфейс пропсов для компонента UISection
 * @interface IUISectionProps
 * @property {ReactNode} children - содержимое секции
 * @property {string} [id] - якорь секции (для nav-скролла)
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUISectionProps {
  readonly children: ReactNode;
  readonly id?: string;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Секция с вертикальными отступами. Семантический `<section>`.
 *
 * @component
 */
export const UISection: FC<IUISectionProps> = memo(
  ({ children, id, className, dataName }) => {
    const classNames = useCn('py-16 sm:py-24 lg:py-28', className);

    return (
      <section
        id={id}
        data-name={dataName ? `UISection-${dataName}` : 'UISection'}
        className={classNames}
      >
        {children}
      </section>
    );
  },
);
UISection.displayName = 'UISection';
