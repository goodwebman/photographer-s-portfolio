import type { FC, ReactNode } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';

/**
 * # Интерфейс пропсов для компонента UINumberedList
 * @interface IUINumberedListProps
 * @property {readonly ReactNode[]} items - пункты по порядку
 * @property {string} [ariaLabel] - имя списка, если рядом нет заголовка
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUINumberedListProps {
  readonly items: readonly ReactNode[];
  readonly ariaLabel?: string;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/** «01», «02», … — номер пункта в две цифры. */
const pad = (value: number): string => String(value).padStart(2, '0');

/**
 * Нумерованный список строками с волосяными разделителями (реф. 2, «этапы
 * работы»): serif-номер акцентом слева, текст справа. Семантически `<ol>` —
 * порядок пунктов скринридер получает из разметки, поэтому визуальные номера
 * `aria-hidden` и не читаются дважды. Server-safe.
 *
 * @component
 */
export const UINumberedList: FC<IUINumberedListProps> = ({
  items,
  ariaLabel,
  className,
  dataName,
}) => (
  <ol
    aria-label={ariaLabel}
    data-name={dataName ? `UINumberedList-${dataName}` : 'UINumberedList'}
    className={cn('border-t border-border', className)}
  >
    {items.map((item, index) => (
      <li
        // пункты — статичный контент из конфига, порядок не меняется
        key={index}
        className="grid grid-cols-[2.75rem_1fr] items-baseline gap-4 border-b border-border py-5 sm:grid-cols-[4.5rem_1fr] sm:py-6"
      >
        <span aria-hidden="true" className="font-serif text-h3 leading-none text-brand-emphasis lining-nums">
          {pad(index + 1)}
        </span>
        <span className="text-body text-foreground sm:text-[1.0625rem]">{item}</span>
      </li>
    ))}
  </ol>
);
