'use client';

import type { FC } from 'react';
import { memo } from 'react';

import { motion, useReducedMotion } from 'motion/react';

import type { cnParams } from '@/shared/lib/cn';
import { useCn } from '@/shared/lib/cn';

/**
 * # Интерфейс пропсов для компонента UIProgress
 * @interface IUIProgressProps
 * @property {string} label - подпись слева
 * @property {number} value - значение 0..100
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIProgressProps {
  readonly label: string;
  readonly value: number;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

const clampPercent = (value: number): number =>
  Math.min(100, Math.max(0, Math.round(value)));

/**
 * Полоса прогресса с подписью и процентом. Заполнение анимируется от нуля
 * (при `prefers-reduced-motion` — мгновенно). Роль `progressbar` с
 * `aria-valuenow` — значение читается скринридером, а не только видно глазами.
 *
 * @component
 */
export const UIProgress: FC<IUIProgressProps> = memo(
  ({ label, value, className, dataName }) => {
    const shouldReduce = useReducedMotion();
    const classNames = useCn('w-full', className);
    const percent = clampPercent(value);

    return (
      <div
        data-name={dataName ? `UIProgress-${dataName}` : 'UIProgress'}
        className={classNames}
      >
        <div className="flex items-baseline justify-between text-caption text-muted-foreground">
          <span>{label}</span>
          <span className="font-semibold text-foreground">{percent}%</span>
        </div>
        <div
          role="progressbar"
          aria-label={label}
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-1.5 h-2 w-full overflow-hidden rounded-pill bg-muted"
        >
          <motion.div
            className="h-full rounded-pill bg-accent"
            initial={{ width: 0 }}
            animate={{ width: `${String(percent)}%` }}
            transition={
              shouldReduce
                ? { duration: 0 }
                : { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }
            }
          />
        </div>
      </div>
    );
  },
);
UIProgress.displayName = 'UIProgress';
