'use client';

import type { ReactNode } from 'react';

import { motion, useReducedMotion } from 'motion/react';

/**
 * Page-transition: Next перемонтирует template на каждую навигацию, поэтому
 * enter-анимация проигрывается при переходе между роутами.
 */
export default function Template({ children }: { children: ReactNode }) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
