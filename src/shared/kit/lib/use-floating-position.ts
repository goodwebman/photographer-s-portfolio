'use client';

import { useCallback, useState, type CSSProperties } from 'react';
import { computePosition, type Placement } from './position';
import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

/**
 * Ковариантная ссылка на элемент: `readonly current`, чтобы принять ref
 * конкретного тега (`RefObject<HTMLButtonElement>` и т.п.) без каста.
 */
export interface FloatingElementRef {
  readonly current: HTMLElement | null;
}

export interface UseFloatingPositionArgs {
  /** Элемент-якорь, относительно которого позиционируем. */
  readonly anchorRef: FloatingElementRef;
  /** Всплывающий элемент, который позиционируем. */
  readonly floatingRef: FloatingElementRef;
  /** Открыт ли floating-элемент (при `false` не считаем, прячем через opacity). */
  readonly open: boolean;
  /** Желаемое размещение (по умолчанию `bottom-start`). */
  readonly placement?: Placement;
  /** Отступ от якоря, px (по умолчанию 8). */
  readonly gutter?: number;
  /**
   * Растянуть floating по ширине якоря через `--anchor-width` (для Select-подобных
   * списков, ширина которых должна совпадать с триггером).
   */
  readonly matchWidth?: boolean;
}

const HIDDEN: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  opacity: 0,
  pointerEvents: 'none',
};

/**
 * Считает `position: fixed`-стиль для floating-элемента относительно якоря с
 * учётом viewport (flip + shift, см. {@link computePosition}). Возвращает готовый
 * `CSSProperties`, который навешивается на floating-элемент.
 *
 * Замер происходит в layout-эффекте (до paint) — контент не мигает в
 * невыставленной позиции. Пересчёт — на `scroll` (capture, ловит любой скролл-контейнер)
 * и `resize`. Пока `open === false`, элемент спрятан (`opacity: 0`), но его можно
 * держать в DOM для анимаций закрытия.
 */
export function useFloatingPosition({
  anchorRef,
  floatingRef,
  open,
  placement = 'bottom-start',
  gutter = 8,
  matchWidth = false,
}: UseFloatingPositionArgs): CSSProperties {
  const [style, setStyle] = useState<CSSProperties>(HIDDEN);

  const update = useCallback(() => {
    const anchor = anchorRef.current;
    const floating = floatingRef.current;
    if (!anchor || !floating) return;

    const rect = anchor.getBoundingClientRect();
    const result = computePosition(
      rect,
      { width: floating.offsetWidth, height: floating.offsetHeight },
      placement,
      { gutter },
    );

    setStyle({
      position: 'fixed',
      top: result.top,
      left: result.left,
      opacity: 1,
      ...(matchWidth ? { ['--anchor-width' as string]: `${String(rect.width)}px` } : null),
    });
  }, [anchorRef, floatingRef, placement, gutter, matchWidth]);

  useIsomorphicLayoutEffect(() => {
    if (!open) {
      setStyle((prev) => (prev.opacity === 0 ? prev : HIDDEN));
      return;
    }

    update();

    // capture: ловим скролл в любом родительском контейнере, не только на window
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [open, update]);

  return style;
}
