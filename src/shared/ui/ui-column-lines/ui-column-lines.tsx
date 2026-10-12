import type { FC } from 'react';

import type { cnParams } from '@/shared/lib/cn';
import { cn } from '@/shared/lib/cn';

/**
 * # Интерфейс пропсов для компонента UIColumnLines
 * @interface IUIColumnLinesProps
 * @property {number} [columns] - сколько колонок делят линии (линий на одну больше)
 * @property {boolean} [animated] - прорисовать линии сверху вниз при загрузке
 * @property {number} [delay] - задержка прорисовки, сек
 * @property {cnParams | string} [className] - доп. классы корня
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIColumnLinesProps {
  readonly columns?: number;
  readonly animated?: boolean;
  readonly delay?: number;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/** Шаг каскада между соседними линиями, сек. */
const STEP = 0.08;

/**
 * Волосяные вертикальные линии по сетке контейнера (приём из реф. 2) — декор
 * поверх секции. Поля совпадают с `UIContainer`, поэтому линии стоят ровно по
 * краям контента и делят его на равные колонки.
 *
 * Прорисовка — CSS-анимация `animate-line-draw` (`motion-safe:`), стартует с
 * первой отрисовкой, без JS. Server component.
 *
 * Чисто декоративный слой: `aria-hidden`, `pointer-events-none`. Родитель
 * обязан быть `relative`. При `prefers-reduced-motion` линии видны сразу.
 *
 * @component
 */
export const UIColumnLines: FC<IUIColumnLinesProps> = ({
  columns = 4,
  animated = true,
  delay = 0.2,
  className,
  dataName,
}) => {
  const lines = Array.from({ length: columns + 1 }, (_, index) => index);

  return (
    <div
      aria-hidden="true"
      data-name={dataName ? `UIColumnLines-${dataName}` : 'UIColumnLines'}
      className={cn('pointer-events-none absolute inset-0', className)}
    >
      <div className="mx-auto flex h-full w-full max-w-[88rem] justify-between px-5 sm:px-8 lg:px-12">
        {lines.map((line) => (
          <span
            key={line}
            className={cn(
              'h-full w-px origin-top bg-border/70',
              animated && 'motion-safe:animate-line-draw',
            )}
            style={
              animated
                ? { animationDelay: `${(delay + line * STEP).toFixed(2)}s` }
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
};
