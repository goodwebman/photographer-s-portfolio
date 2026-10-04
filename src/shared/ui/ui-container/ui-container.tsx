'use client';

import type { FC, ReactNode } from 'react';
import { memo } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { useCn } from '@/shared/lib/cn';

/**
 * # Интерфейс пропсов для компонента UIContainer
 * @interface IUIContainerProps
 * @property {ReactNode} children - содержимое
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name` (отладка)
 */
export interface IUIContainerProps {
  readonly children: ReactNode;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Центрированный контейнер с боковыми отступами и максимальной шириной.
 *
 * @component
 * @example
 * ```tsx
 * <UIContainer><Section/></UIContainer>
 * ```
 */
export const UIContainer: FC<IUIContainerProps> = memo(
  ({ children, className, dataName }) => {
    const classNames = useCn(
      'mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8',
      className,
    );

    return (
      <div
        data-name={dataName ? `UIContainer-${dataName}` : 'UIContainer'}
        className={classNames}
      >
        {children}
      </div>
    );
  },
);
UIContainer.displayName = 'UIContainer';
