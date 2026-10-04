import type { FC, ReactNode } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';
import { Show } from '@/shared/ui/show';
import { UIReveal } from '@/shared/ui/ui-reveal';

/**
 * # Интерфейс пропсов для компонента UISectionHeading
 * @interface IUISectionHeadingProps
 */
export interface IUISectionHeadingProps {
  readonly eyebrow?: string;
  readonly title: string;
  readonly description?: string;
  readonly align?: 'left' | 'center';
  /** Доп. действие справа (напр. ссылка «все»). */
  readonly action?: ReactNode;
  readonly className?: cnParams | string;
}

/**
 * Заголовок секции: eyebrow + title + описание (+ опц. действие). Server-safe
 * (без хуков/react-icons), ревил через client-лист UIReveal.
 */
export const UISectionHeading: FC<IUISectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  action,
  className,
}) => (
  <UIReveal
    className={cn('flex flex-col gap-3', align === 'center' && 'items-center', className)}
  >
    <div
      className={cn(
        'flex w-full flex-wrap items-end justify-between gap-4',
        align === 'center' && 'justify-center',
      )}
    >
      <div className={align === 'center' ? 'text-center' : undefined}>
        <Show when={Boolean(eyebrow)}>
          <p className="text-caption font-semibold uppercase tracking-wider text-accent">
            {eyebrow}
          </p>
        </Show>
        <h2 className="mt-2 text-balance text-h2 font-bold text-foreground">
          {title}
        </h2>
      </div>
      {action}
    </div>
    <Show when={Boolean(description)}>
      <p
        className={cn(
          'max-w-2xl text-body text-muted-foreground',
          align === 'center' && 'text-center',
        )}
      >
        {description}
      </p>
    </Show>
  </UIReveal>
);
