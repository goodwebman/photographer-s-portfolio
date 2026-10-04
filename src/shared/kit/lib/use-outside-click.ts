'use client';

import { useEffect, type RefObject } from 'react';

export interface UseOutsideClickOptions {
  /** Слушать ли клики (по умолчанию true) */
  readonly enabled?: boolean;
  /** Клик по этим элементам не считается «внешним» (например, кнопка-триггер) */
  readonly ignoreRefs?: readonly RefObject<HTMLElement | null>[];
}

/**
 * Вызывает `callback` при `pointerdown` вне элемента `ref` (и вне `ignoreRefs`).
 * Стабилизируйте `callback` и массив `ignoreRefs`.
 *
 * @param ref защищаемый элемент
 * @param callback действие при клике вне
 * @param options настройка enabled и ignoreRefs
 */
export function useOutsideClick(
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  options: UseOutsideClickOptions = {},
): void {
  const { enabled = true, ignoreRefs = [] } = options;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handler = (event: PointerEvent | MouseEvent) => {
      const target = event.target as Node | null;
      const node = ref.current;
      if (!target || !node) {
        return;
      }
      if (node.contains(target)) {
        return;
      }
      for (const ignoreRef of ignoreRefs) {
        if (ignoreRef.current?.contains(target)) {
          return;
        }
      }
      callback();
    };

    document.addEventListener('pointerdown', handler);
    return () => { document.removeEventListener('pointerdown', handler); };
  }, [ref, callback, enabled, ignoreRefs]);
}
