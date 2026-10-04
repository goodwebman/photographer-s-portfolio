import { useEffect, useLayoutEffect } from 'react';

/**
 * `useLayoutEffect`, но без React-warning при SSR (там deps'ов DOM нет,
 * поэтому падаем на `useEffect`). Нужен для измерения/позиционирования
 * floating-элементов до paint — иначе всплывающий контент мигает.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
