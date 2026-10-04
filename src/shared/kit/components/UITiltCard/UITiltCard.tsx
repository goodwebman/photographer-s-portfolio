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
import { useReducedMotion } from '../../lib/use-reduced-motion';

export interface IUITiltCardProps extends HTMLAttributes<HTMLDivElement> {
  readonly testId?: string;
  /** Максимальный угол наклона по каждой оси, в градусах. Default: `12`. */
  readonly maxTilt?: number;
  /** Масштаб при наведении. Default: `1.04`. */
  readonly scale?: number;
  /** Глубина перспективы (px). Меньше — резче 3D. Default: `900`. */
  readonly perspective?: number;
  /** Блик-подсветка, следующая за курсором. Default: `true`. */
  readonly glare?: boolean;
  readonly children?: ReactNode;
}

const clamp01 = (v: number): number => Math.max(0, Math.min(1, v));

/**
 * Карточка-поверхность с 3D-наклоном к курсору и бликом.
 *
 * Наклон и блик пишутся напрямую в inline-стиль через ref внутри `requestAnimationFrame` —
 * без React-состояния, поэтому `pointermove` не вызывает ре-рендеров. `perspective()` входит в
 * сам `transform`, так что обёртка не нужна. Работает только для мыши/пера (на тач-устройствах
 * бесполезен и мешает скроллу) и полностью отключается при `prefers-reduced-motion`.
 * `className` стилизует поверхность (радиус/фон/тень) — блик наследует её радиус.
 *
 * @example
 * <UITiltCard className="w-72 rounded-xl bg-card p-6 shadow-lg">…</UITiltCard>
 */
const UITiltCardBase = forwardRef<HTMLDivElement, IUITiltCardProps>(
  (
    {
      testId,
      maxTilt = 12,
      scale = 1.04,
      perspective = 900,
      glare = true,
      className,
      children,
      onPointerMove,
      onPointerEnter,
      onPointerLeave,
      ...props
    },
    ref,
  ) => {
    const reduced = useReducedMotion();
    const surfaceRef = useRef<HTMLDivElement>(null);
    const glareRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    // последняя позиция курсора (клиентские координаты) — читаем в rAF, не в самом событии
    const pointRef = useRef<{ x: number; y: number } | null>(null);

    // и наружу (forwardRef), и внутрь (surfaceRef) — один и тот же узел
    const setRefs = useCallback(
      (node: HTMLDivElement | null) => {
        surfaceRef.current = node;
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
      const surface = surfaceRef.current;
      const point = pointRef.current;
      if (!surface || !point) return;

      const rect = surface.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const px = clamp01((point.x - rect.left) / rect.width);
      const py = clamp01((point.y - rect.top) / rect.height);

      const rotateY = (px - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - py) * maxTilt * 2;
      surface.style.transform = `perspective(${String(perspective)}px) rotateX(${String(
        rotateX,
      )}deg) rotateY(${String(rotateY)}deg) scale(${String(scale)})`;

      if (glare && glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${String(px * 100)}% ${String(
          py * 100,
        )}%, rgba(255,255,255,0.4), transparent 55%)`;
      }
    }, [glare, maxTilt, perspective, scale]);

    const schedule = useCallback(() => {
      if (rafRef.current === null) rafRef.current = requestAnimationFrame(apply);
    }, [apply]);

    const reset = useCallback(() => {
      cancelRaf();
      pointRef.current = null;
      if (surfaceRef.current) surfaceRef.current.style.transform = '';
      if (glareRef.current) glareRef.current.style.opacity = '0';
    }, [cancelRaf]);

    const handlePointerMove = useCallback(
      (e: ReactPointerEvent<HTMLDivElement>) => {
        onPointerMove?.(e);
        if (reduced || e.pointerType === 'touch') return;
        pointRef.current = { x: e.clientX, y: e.clientY };
        schedule();
      },
      [onPointerMove, reduced, schedule],
    );

    const handlePointerEnter = useCallback(
      (e: ReactPointerEvent<HTMLDivElement>) => {
        onPointerEnter?.(e);
        if (reduced || e.pointerType === 'touch') return;
        if (glareRef.current) glareRef.current.style.opacity = '1';
      },
      [onPointerEnter, reduced],
    );

    const handlePointerLeave = useCallback(
      (e: ReactPointerEvent<HTMLDivElement>) => {
        onPointerLeave?.(e);
        reset();
      },
      [onPointerLeave, reset],
    );

    // страховка от утечки rAF, если размонтировали во время наведения
    useEffect(() => cancelRaf, [cancelRaf]);

    return (
      <div
        ref={setRefs}
        data-name={testId ? `UITiltCard-${testId}` : 'UITiltCard'}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className={cn(
          'relative transition-transform duration-200 ease-out will-change-transform',
          className,
        )}
        {...props}
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 [mix-blend-mode:soft-light]"
          />
        )}
      </div>
    );
  },
);
UITiltCardBase.displayName = 'UITiltCard';
export const UITiltCard = memo(UITiltCardBase);
