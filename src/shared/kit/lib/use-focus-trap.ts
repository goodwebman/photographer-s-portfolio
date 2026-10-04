'use client';

import { useEffect, type RefObject } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]:not([disabled])',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(',');

function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.offsetParent !== null || el === document.activeElement,
  );
}

/**
 * Trap'ит фокус клавиатуры (Tab/Shift+Tab) внутри контейнера `ref`.
 * При активации переводит фокус на первый focusable-элемент (или на сам контейнер,
 * если фокусируемых нет). При деактивации возвращает фокус на элемент, который
 * был активен до включения ловушки.
 *
 * @param ref контейнер
 * @param active активировать/деактивировать ловушку
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
): void {
  useEffect(() => {
    if (!active || !ref.current) {
      return;
    }

    const node = ref.current;
    const previouslyFocused =
      document.activeElement as HTMLElement | null;

    // первый фокус: на focusable или на контейнер
    const items = getFocusable(node);
    if (items.length > 0) {
      items[0].focus();
    } else {
      node.focus();
    }

    const handler = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') {
        return;
      }

      const all = getFocusable(node);
      if (all.length === 0) {
        event.preventDefault();
        node.focus();
        return;
      }

      const first = all[0];
      const last = all[all.length - 1];
      const current = document.activeElement;

      if (event.shiftKey) {
        if (current === first || !node.contains(current)) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (current === last || !node.contains(current)) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    node.addEventListener('keydown', handler);

    return () => {
      node.removeEventListener('keydown', handler);
      // возврат фокуса на предыдущий элемент при деактивации
      requestAnimationFrame(() => {
        previouslyFocused?.focus();
      });
    };
  }, [ref, active]);
}
