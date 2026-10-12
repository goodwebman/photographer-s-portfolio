import type { FC, MouseEventHandler, ReactNode } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';

/**
 * Вариант пункта навигации:
 * - `header` — строка шапки: мелкий капс с разрядкой, активный — акцентная риска снизу
 * - `menu` — полноэкранное мобильное меню: крупный serif с номером
 * - `footer` — компактный список в подвале
 */
export type UINavLinkVariant = 'header' | 'menu' | 'footer';

/**
 * Полные наборы классов строковыми литералами — чтобы сканер Tailwind видел
 * каждый класс (склейка утилит из частей из JIT выпадает).
 *
 * Активное состояние — от `aria-current="location"`, а не от пропа: в шапке
 * ссылки серверные, и атрибут им проставляет клиентский scroll-spy
 * (`HeaderShell`) — стиль подхватывается без перерисовки React.
 */
const VARIANT_CLASSES: Record<UINavLinkVariant, string> = {
  header:
    'relative py-2 text-eyebrow uppercase text-muted-foreground outline-none transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-brand-emphasis after:transition-transform after:duration-300 hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background aria-[current=location]:text-foreground aria-[current=location]:after:scale-x-100',
  menu: 'group flex items-baseline gap-4 py-3 font-serif text-[2.5rem] leading-none text-foreground outline-none transition-colors hover:text-brand-emphasis focus-visible:ring-2 focus-visible:ring-ring aria-[current=location]:text-brand-emphasis sm:text-[3.25rem]',
  footer:
    'text-small text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:ring-2 focus-visible:ring-ring',
};

/**
 * # Интерфейс пропсов для компонента UINavLink
 * @interface IUINavLinkProps
 * @property {string} href - якорь секции (`#about`)
 * @property {ReactNode} children - подпись пункта
 * @property {UINavLinkVariant} [variant] - вариант оформления
 * @property {boolean} [active] - секция сейчас на экране (`aria-current="location"`)
 * @property {string} [index] - номер пункта для варианта `menu` («01»)
 * @property {MouseEventHandler<HTMLAnchorElement>} [onClick] - обработчик клика
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUINavLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly variant?: UINavLinkVariant;
  readonly active?: boolean;
  readonly index?: string;
  readonly onClick?: MouseEventHandler<HTMLAnchorElement>;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Пункт навигации одностраничника — якорь на секцию. Активность (секция в
 * центре экрана) передаётся не только цветом: `aria-current="location"`.
 * Server-safe: обычный `<a>`, плавность скролла — CSS.
 *
 * @component
 */
export const UINavLink: FC<IUINavLinkProps> = ({
  href,
  children,
  variant = 'header',
  active = false,
  index,
  onClick,
  className,
  dataName,
}) => (
  <a
    href={href}
    aria-current={active ? 'location' : undefined}
    onClick={onClick}
    data-name={dataName ? `UINavLink-${dataName}` : 'UINavLink'}
    className={cn(VARIANT_CLASSES[variant], className)}
  >
    {variant === 'menu' && index ? (
      <span className="font-sans text-eyebrow text-muted-foreground lining-nums">{index}</span>
    ) : null}
    {children}
  </a>
);
