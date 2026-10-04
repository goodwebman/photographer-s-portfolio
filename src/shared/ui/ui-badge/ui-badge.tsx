import type { FC, HTMLAttributes, ReactNode } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';
import { Show } from '@/shared/ui/show';

/**
 * # Интерфейс пропсов для компонента UIBadge
 * @interface IUIBadgeProps
 * @extends {Omit<HTMLAttributes<HTMLParagraphElement>, 'className' | 'children'>}
 * @property {ReactNode} children - подпись
 * @property {boolean} [dot] - акцентная точка-маркер слева
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIBadgeProps
  extends Omit<HTMLAttributes<HTMLParagraphElement>, 'className' | 'children'> {
  readonly children: ReactNode;
  readonly dot?: boolean;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Пилюля-статус: «роль · локация» в hero, роль в шапке страницы «Обо мне».
 * Server-safe. Остаточные пропсы прокидываются на корень — так на бейдж
 * навешивается `data-gsap` для ревила, не протаскивая анимацию в shared.
 *
 * @component
 */
export const UIBadge: FC<IUIBadgeProps> = ({
  children,
  dot = true,
  className,
  dataName,
  ...props
}) => (
  <p
    data-name={dataName ? `UIBadge-${dataName}` : 'UIBadge'}
    className={cn(
      'inline-flex items-center gap-2 rounded-pill border border-border bg-card px-3 py-1 text-caption font-medium text-muted-foreground',
      className,
    )}
    {...props}
  >
    <Show when={dot}>
      <span className="size-2 rounded-full bg-accent" />
    </Show>
    {children}
  </p>
);
