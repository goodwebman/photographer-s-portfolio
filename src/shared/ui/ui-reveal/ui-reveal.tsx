import type { CSSProperties, FC, ReactNode } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';

/**
 * # Интерфейс пропсов для компонента UIReveal
 * @interface IUIRevealProps
 * @property {ReactNode} children - содержимое
 * @property {number} [delay] - задержка появления, сек
 * @property {number} [y] - стартовое смещение по Y, px
 * @property {number} [scale] - стартовый масштаб (1 = без масштабирования)
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIRevealProps {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly y?: number;
  readonly scale?: number;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Обёртка scroll-reveal: fade + slide (опционально + scale-up) при въезде во
 * вьюпорт, один раз. Server component, без JS-рантайма: элемент помечается
 * `data-reveal="fade"`, анимация — CSS-transition (`globals.css`, REVEAL),
 * момент старта ставит inline-скрипт `revealBoot` (`@/shared/lib/reveal`).
 *
 * Без JS и при `prefers-reduced-motion` содержимое видно сразу. Параметры —
 * CSS-переменные; значения по умолчанию в разметку не пишутся.
 *
 * `suppressHydrationWarning`: `data-revealed` скрипт может поставить раньше
 * гидратации — это ожидаемое расхождение с серверной разметкой.
 *
 * @component
 */
export const UIReveal: FC<IUIRevealProps> = ({
  children,
  delay = 0,
  y = 24,
  scale = 1,
  className,
  dataName,
}) => {
  const style: Record<string, string> = {};
  if (delay !== 0) style['--reveal-delay'] = `${String(delay)}s`;
  if (y !== 24) style['--reveal-y'] = `${String(y)}px`;
  if (scale !== 1) style['--reveal-scale'] = String(scale);

  return (
    <div
      data-reveal="fade"
      data-name={dataName ? `UIReveal-${dataName}` : 'UIReveal'}
      className={cn(className) || undefined}
      style={Object.keys(style).length > 0 ? (style as CSSProperties) : undefined}
      suppressHydrationWarning
    >
      {children}
    </div>
  );
};
