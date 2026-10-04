import type { FC, ReactNode } from 'react';

import { Link } from '@/shared/i18n';
import { getHrefKind } from '@/shared/lib/href';
import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';

/** Тон текстовой ссылки. */
export type UITextLinkTone = 'accent' | 'muted';

/**
 * Полные наборы классов на тон — строковыми литералами, чтобы сканер Tailwind
 * видел каждый класс (динамическая склейка утилит из JIT выпадает).
 */
const TONE_CLASSES: Record<UITextLinkTone, string> = {
  accent: 'text-small font-medium text-accent transition-opacity hover:opacity-80',
  muted:
    'inline-flex items-center gap-1.5 text-small text-muted-foreground transition-colors hover:text-foreground',
};

/**
 * # Интерфейс пропсов для компонента UITextLink
 * @interface IUITextLinkProps
 * @property {string} href - адрес (маршрут, http(s) или mailto/tel)
 * @property {ReactNode} children - содержимое
 * @property {UITextLinkTone} [tone] - визуальный тон
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUITextLinkProps {
  readonly href: string;
  readonly children: ReactNode;
  readonly tone?: UITextLinkTone;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Инлайновая текстовая ссылка (навигационные «все проекты →», «назад к списку»).
 * Элемент выбирается по `href`, как в {@link UILinkButton}. Server-safe.
 *
 * @component
 */
export const UITextLink: FC<IUITextLinkProps> = ({
  href,
  children,
  tone = 'accent',
  className,
  dataName,
}) => {
  const classNames = cn(TONE_CLASSES[tone], className);
  const name = dataName ? `UITextLink-${dataName}` : 'UITextLink';
  const kind = getHrefKind(href);

  if (kind === 'internal') {
    return (
      <Link href={href} data-name={name} className={classNames}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      data-name={name}
      className={classNames}
      target={kind === 'external' ? '_blank' : undefined}
      rel={kind === 'external' ? 'noopener noreferrer' : undefined}
    >
      {children}
    </a>
  );
};
