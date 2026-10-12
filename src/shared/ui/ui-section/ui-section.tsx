import type { FC, ReactNode } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';

/**
 * Фон секции:
 * - `default` — фон страницы
 * - `surface` — второй тёплый тон: ритм страницы без цветных плит
 */
export type UISectionTone = 'default' | 'surface';

const TONE_CLASSES: Record<UISectionTone, string> = {
  default: 'bg-background',
  surface: 'bg-surface',
};

/**
 * # Интерфейс пропсов для компонента UISection
 * @interface IUISectionProps
 * @property {ReactNode} children - содержимое секции
 * @property {string} [id] - якорь секции (цель ссылок `#id` в шапке)
 * @property {UISectionTone} [tone] - фон секции
 * @property {string} [ariaLabelledby] - id заголовка — секция становится landmark-регионом
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUISectionProps {
  readonly children: ReactNode;
  readonly id?: string;
  readonly tone?: UISectionTone;
  readonly ariaLabelledby?: string;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Секция одностраничника: вертикальные отступы и фон. Семантический
 * `<section>`; с `ariaLabelledby` скринридер видит её как именованный регион.
 * Server-safe.
 *
 * @component
 */
export const UISection: FC<IUISectionProps> = ({
  children,
  id,
  tone = 'default',
  ariaLabelledby,
  className,
  dataName,
}) => (
  <section
    id={id}
    aria-labelledby={ariaLabelledby}
    data-name={dataName ? `UISection-${dataName}` : 'UISection'}
    className={cn('relative py-20 sm:py-28 lg:py-36', TONE_CLASSES[tone], className)}
  >
    {children}
  </section>
);
