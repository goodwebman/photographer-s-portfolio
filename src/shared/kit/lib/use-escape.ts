'use client';

import { useEffect } from 'react';

/**
 * Вызывает `callback` при нажатии Escape (capture, чтобы сработать раньше
 * вложенных обработчиков). Безопасен для оверлеев: только верхний должен закрыться.
 *
 * Стабилизируйте `callback` (useCallback / useStableCallback) — он участвует в deps.
 *
 * @param callback действие на Escape
 * @param_enabled слушать ли Escape (по умолчанию true)
 */
export function useEscape(callback: () => void, enabled = true): void {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        callback();
      }
    };

    document.addEventListener('keydown', handler, true);
    return () => { document.removeEventListener('keydown', handler, true); };
  }, [callback, enabled]);
}
