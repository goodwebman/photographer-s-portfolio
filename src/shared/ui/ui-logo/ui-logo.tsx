import type { FC, MouseEventHandler } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';

/**
 * Размер логотипа:
 * - `header` — компактный, в строку шапки
 * - `footer` — крупнее, якорь подвала
 */
export type UILogoVariant = 'header' | 'footer';

const SIZE_CLASSES: Record<UILogoVariant, string> = {
  header: 'text-[1.375rem]',
  footer: 'text-h2',
};

/**
 * # Интерфейс пропсов для компонента UILogo
 * @interface IUILogoProps
 * @property {string} name - бренд; точка в имени (`studio.frame`) выделяется акцентом
 * @property {string} [label] - доступное имя ссылки, если сам бренд его не объясняет
 * @property {UILogoVariant} [variant] - размер
 * @property {string} [href] - куда ведёт логотип (по умолчанию — к началу страницы)
 * @property {MouseEventHandler<HTMLAnchorElement>} [onClick] - обработчик клика
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUILogoProps {
  readonly name: string;
  readonly label?: string;
  readonly variant?: UILogoVariant;
  readonly href?: string;
  readonly onClick?: MouseEventHandler<HTMLAnchorElement>;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Словесный знак: serif-курсив; точка в имени бренда — акцентом
 * (`studio` **.** `frame`). Ссылка ведёт к началу страницы. Server-safe.
 *
 * @component
 */
export const UILogo: FC<IUILogoProps> = ({
  name,
  label,
  variant = 'header',
  href = '#top',
  onClick,
  className,
  dataName,
}) => {
  const dot = name.indexOf('.');
  const [head, tail] = dot === -1 ? [name, ''] : [name.slice(0, dot), name.slice(dot + 1)];

  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={label}
      data-name={dataName ? `UILogo-${dataName}` : 'UILogo'}
      className={cn(
        'inline-flex items-baseline font-serif italic leading-none tracking-tight text-foreground outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background',
        SIZE_CLASSES[variant],
        className,
      )}
    >
      {head}
      {tail ? (
        <>
          <span className="not-italic text-brand-emphasis">.</span>
          {tail}
        </>
      ) : null}
    </a>
  );
};
