'use client';

import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';

export interface IUISpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  readonly testId?: string;
  /** Цвет пятна (любой CSS-цвет). Default: мягкий белый `rgba(255,255,255,0.12)`. */
  readonly spotlightColor?: string;
  /** Диаметр пятна в px. Default: `320`. */
  readonly size?: number;
  readonly children?: ReactNode;
}

/**
 * Карточка с радиальной подсветкой, следующей за курсором.
 *
 * Позиция пятна пишется прямо в inline-стиль overlay-слоя через ref в `requestAnimationFrame` —
 * без React-состояния и ре-рендеров. Overlay — `pointer-events-none`, поэтому клики/hover
 * контента не перехватываются. Появление пятна — CSS-transition по opacity (сам гаснет при
 * `prefers-reduced-motion` через глобальные стили). `className` стилизует поверхность.
 *
 * @example
 * <UISpotlightCard className="w-72 rounded-xl border border-border bg-card p-6">…</UISpotlightCard>
 */
const UISpotlightCardBase = forwardRef<HTMLDivElement, IUISpotlightCardProps>(
  (
    {
      testId,
      spotlightColor = 'rgba(255,255,255,0.12)',
      size = 320,
      className,
      children,
      onPointerMove,
      onPointerEnter,
      onPointerLeave,
      ...props
    },
    ref,
  ) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const pointRef = useRef<{ x: number; y: number } | null>(null);

    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    const cancelRaf = useCallback(() => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    }, []);

    const apply = useCallback(() => {
      rafRef.current = null;
      const root = rootRef.current;
      const glow = glowRef.current;
      const point = pointRef.current;
      if (!root || !glow || !point) return;
      const rect = root.getBoundingClientRect();
      const x = point.x - rect.left;
      const y = point.y - rect.top;
      glow.style.background = `radial-gradient(${String(size)}px circle at ${String(x)}px ${String(
        y,
      )}px, ${spotlightColor}, transparent 70%)`;
    }, [size, spotlightColor]);

    const schedule = useCallback(() => {
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(apply);
    }, [apply]);

    const handlePointerMove = useCallback(
      (e: ReactPointerEvent<HTMLDivElement>) => {
        onPointerMove?.(e);
        pointRef.current = { x: e.clientX, y: e.clientY };
        schedule();
      },
      [onPointerMove, schedule],
    );

    const handlePointerEnter = useCallback(
      (e: ReactPointerEvent<HTMLDivElement>) => {
        onPointerEnter?.(e);
        if (glowRef.current) glowRef.current.style.opacity = '1';
      },
      [onPointerEnter],
    );

    const handlePointerLeave = useCallback(
      (e: ReactPointerEvent<HTMLDivElement>) => {
        onPointerLeave?.(e);
        cancelRaf();
        if (glowRef.current) glowRef.current.style.opacity = '0';
      },
      [cancelRaf, onPointerLeave],
    );

    useEffect(() => cancelRaf, [cancelRaf]);

    return (
      <div
        ref={setRefs}
        data-name={testId ? `UISpotlightCard-${testId}` : 'UISpotlightCard'}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className={cn('relative overflow-hidden', className)}
        {...props}
      >
        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300"
        />
        {/* контент над пятном; z-10, чтобы подсветка была фоном, а не поверх текста */}
        <div className="relative z-10 h-full">{children}</div>
      </div>
    );
  },
);
UISpotlightCardBase.displayName = 'UISpotlightCard';
export const UISpotlightCard = memo(UISpotlightCardBase);
