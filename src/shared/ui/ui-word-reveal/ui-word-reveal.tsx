'use client';

import type { FC } from 'react';

import type { Variants } from 'motion/react';
import { motion, useReducedMotion } from 'motion/react';

/** Тег заголовка, которым рендерится ревил. */
export type UIWordRevealTag = 'h1' | 'h2';

/**
 * # Интерфейс пропсов для компонента UIWordReveal
 * @interface IUIWordRevealProps
 * @property {string} text - текст заголовка (разбивается по пробелам)
 * @property {UIWordRevealTag} [as] - тег заголовка
 * @property {string} [className] - классы заголовка
 * @property {number} [delay] - задержка старта каскада, сек
 */
export interface IUIWordRevealProps {
  readonly text: string;
  readonly as?: UIWordRevealTag;
  readonly className?: string;
  readonly delay?: number;
}

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
  hidden: {},
  visible: (delay: number) => ({
    transition: { staggerChildren: 0.06, delayChildren: delay },
  }),
};

const word: Variants = {
  hidden: { opacity: 0, y: '0.5em', filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

/**
 * Заголовок с покадровым появлением по словам (blur → в фокус, снизу вверх).
 * Отдельная от `UIReveal` анимация — «авторская подпись» страниц.
 * При `prefers-reduced-motion` рендерит статичный текст без анимации.
 *
 * @component
 */
export const UIWordReveal: FC<IUIWordRevealProps> = ({
  text,
  as = 'h1',
  className,
  delay = 0,
}) => {
  const shouldReduce = useReducedMotion();
  const words = text.split(' ');

  if (shouldReduce) {
    const Tag = as;

    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = as === 'h1' ? motion.h1 : motion.h2;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      custom={delay}
      variants={container}
    >
      {words.map((w, index) => (
        <motion.span
          key={`${w}-${String(index)}`}
          variants={word}
          className="mr-[0.25em] inline-block will-change-transform"
        >
          {w}
        </motion.span>
      ))}
    </MotionTag>
  );
};
UIWordReveal.displayName = 'UIWordReveal';
