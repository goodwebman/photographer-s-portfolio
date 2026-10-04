'use client';

import { useEffect, useState } from 'react';

/**
 * Общая механика: подписка на `scroll` с троттлингом через rAF и пересчёт
 * булева флага. Один слушатель на хук, `passive: true` — скролл не блокируется.
 *
 * @param compute - как посчитать флаг по текущему положению скролла
 * @returns текущее значение флага
 */
const useScrollFlag = (compute: () => boolean): boolean => {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      setFlag(compute());
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Начальное состояние: страница могла открыться уже прокрученной
    // (возврат по истории, переход по якорю).
    const initial = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(initial);
      window.removeEventListener('scroll', onScroll);
    };
    // `compute` пересоздаётся на каждый рендер вызывающей стороны, но замыкает
    // только примитивный порог — держим deps на нём через вызывающие хуки.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return flag;
};

/**
 * Прокручена ли страница дальше `offsetPx` от верха.
 *
 * @param offsetPx - порог в пикселях
 */
export const useScrolledPast = (offsetPx: number): boolean =>
  useScrollFlag(() => window.scrollY > offsetPx);

/**
 * Прокручена ли страница дальше `ratio` от её полной прокручиваемой высоты.
 * Если контент короче вьюпорта, всегда `false` (делить не на что).
 *
 * @param ratio - доля 0..1
 */
export const useScrolledRatio = (ratio: number): boolean =>
  useScrollFlag(() => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return false;

    return window.scrollY / scrollable > ratio;
  });
