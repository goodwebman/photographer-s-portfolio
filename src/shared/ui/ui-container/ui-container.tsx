import type { FC, ReactNode } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';

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
 * Server component: в клиентский бандл не попадает.
 *
 * @component
 * @example
 * ```tsx
 * <UIContainer><Section/></UIContainer>
 * ```
 */
export const UIContainer: FC<IUIContainerProps> = ({ children, className, dataName }) => (
  <div
    data-name={dataName ? `UIContainer-${dataName}` : 'UIContainer'}
    className={cn('mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-12', className)}
  >
    {children}
  </div>
);
