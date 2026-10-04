'use client';

import type { FC, ReactNode } from 'react';
import { memo } from 'react';

import { motion, useReducedMotion } from 'motion/react';

import type { cnParams } from '@/shared/lib/cn';
import { useCn } from '@/shared/lib/cn';

/**
 * # Интерфейс пропсов для компонента UIReveal
 * @interface IUIRevealProps
 * @property {ReactNode} children - содержимое
 * @property {number} [delay] - задержка появления, сек
 * @property {number} [y] - стартовое смещение по Y, px
 * @property {number} [scale] - стартовый масштаб (1 = без масштабирования)
 * @property {boolean} [once] - анимировать только один раз
 * @property {cnParams | string} [className] - доп. классы
 * @property {string} [dataName] - суффикс для `data-name`
 */
export interface IUIRevealProps {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly y?: number;
  readonly scale?: number;
  readonly once?: boolean;
  readonly className?: cnParams | string;
  readonly dataName?: string;
}

/**
 * Обёртка scroll-reveal: плавное появление при въезде в вьюпорт (fade + slide,
 * опционально + scale-up). При `prefers-reduced-motion` рендерит статичный
 * `<div>` без анимации.
 *
 * @component
 */
export const UIReveal: FC<IUIRevealProps> = memo(
  ({ children, delay = 0, y = 24, scale = 1, once = true, className, dataName }) => {
    const shouldReduce = useReducedMotion();
    const classNames = useCn(className);
    const name = dataName ? `UIReveal-${dataName}` : 'UIReveal';

    if (shouldReduce) {
      return (
        <div data-name={name} className={classNames}>
          {children}
        </div>
      );
    }

    const transition =
      scale === 1
        ? { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const }
        : { type: 'spring' as const, stiffness: 220, damping: 24, mass: 0.7, delay };

    return (
      <motion.div
        data-name={name}
        className={classNames}
        initial={{ opacity: 0, y, scale }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once, margin: '0px 0px -10% 0px' }}
        transition={transition}
      >
        {children}
      </motion.div>
    );
  },
);
UIReveal.displayName = 'UIReveal';
