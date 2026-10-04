'use client';

import { useEffect } from 'react';

// Реентерабельный счётчик: несколько оверлеев могут блокировать скролл одновременно.
let lockCount = 0;
let savedOverflow = '';
let savedPaddingRight = '';

/**
 * Блокирует прокрутку `document.body`, пока `active === true`.
 * Реентерабелен (счётчик блокировок), компенсирует ширину скроллбара,
 * чтобы убрать скачок layout при появлении оверлея. Восстанавливает стили при размонтировании.
 *
 * @param active блокировать, когда true
 */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) {
      return;
    }

    if (lockCount === 0) {
      savedOverflow = document.body.style.overflow;
      savedPaddingRight = document.body.style.paddingRight;

      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${String(scrollbarWidth)}px`;
      }
    }

    lockCount += 1;

    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = savedOverflow;
        document.body.style.paddingRight = savedPaddingRight;
      }
    };
  }, [active]);
}
