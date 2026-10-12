import type { FC, ReactNode } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';
import { UIReveal } from '@/shared/ui/ui-reveal';

/**
 * # Интерфейс пропсов для компонента UISectionHeading
 * @interface IUISectionHeadingProps
 * @property {string} title - заголовок секции (serif)
 * @property {string} [id] - id заголовка — для `aria-labelledby` секции
 * @property {string} [index] - порядковый номер секции («01»), пишется перед eyebrow
 * @property {string} [eyebrow] - надзаголовок капсом
 * @property {ReactNode} [description] - подводка под заголовком
 * @property {ReactNode} [action] - элемент справа от заголовка (фильтр, ссылка)
 * @property {cnParams | string} [className] - доп. классы
 */
export interface IUISectionHeadingProps {
  readonly title: ReactNode;
  readonly id?: string;
  readonly index?: string;
  readonly eyebrow?: string;
  readonly description?: ReactNode;
  readonly action?: ReactNode;
  readonly className?: cnParams | string;
}

/**
 * Заголовок секции в редакционной манере: «01 — ОБО МНЕ» волосяной линией,
 * крупный serif-заголовок, подводка, опц. действие справа. Server component,
 * ревил — `UIReveal` на CSS.
 *
 * @component
 */
export const UISectionHeading: FC<IUISectionHeadingProps> = ({
  title,
  id,
  index,
  eyebrow,
  description,
  action,
  className,
}) => (
  <UIReveal
    className={cn(
      'flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between',
      className,
    )}
  >
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="flex items-center gap-3 text-eyebrow uppercase text-muted-foreground">
          {index ? (
            <span className="font-serif text-small normal-case tracking-normal text-brand-emphasis lining-nums">
              {index}
            </span>
          ) : null}
          <span aria-hidden="true" className="h-px w-8 bg-border" />
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="mt-5 text-balance font-serif text-title font-normal text-foreground"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-xl text-body text-muted-foreground">{description}</p>
      ) : null}
    </div>
    {action}
  </UIReveal>
);
