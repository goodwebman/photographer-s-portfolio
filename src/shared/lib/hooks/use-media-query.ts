'use client';

import { useCallback, useSyncExternalStore } from 'react';

/**
 * SSR-безопасная подписка на media query через `useSyncExternalStore`
 * (без `useEffect` + `setState`, без tearing). На сервере возвращает `false`.
 *
 * @param query - CSS media query, напр. `(min-width: 768px)`
 * @returns совпадает ли запрос сейчас
 */
export const useMediaQuery = (query: string): boolean => {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);

      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );

  const getSnapshot = (): boolean => window.matchMedia(query).matches;
  const getServerSnapshot = (): boolean => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
