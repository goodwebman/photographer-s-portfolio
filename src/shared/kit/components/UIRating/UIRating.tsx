'use client';

import {
  forwardRef,
  memo,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';

const clamp = (v: number, min: number, max: number): number => Math.max(min, Math.min(max, v));

const SIZE_CLASS: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-7',
};

const StarShape = ({ className }: { className: string }): React.ReactNode => (
  <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
    <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
  </svg>
);

export interface IUIRatingProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  readonly testId?: string;
  /** Управляемое значение. */
  readonly value?: number;
  /** Начальное значение для неуправляемого режима. Default: `0`. */
  readonly defaultValue?: number;
  readonly onChange?: (value: number) => void;
  /** Кол-во звёзд. Default: `5`. */
  readonly max?: number;
  /** Разрешить половинки (шаг `0.5`). Default: `false`. */
  readonly allowHalf?: boolean;
  /** Только чтение — показывает оценку, но не даёт менять. */
  readonly readOnly?: boolean;
  readonly disabled?: boolean;
  readonly size?: 'sm' | 'md' | 'lg';
  /** A11y-подпись. Default: `'Оценка'`. */
  readonly ariaLabel?: string;
}

/**
 * Рейтинг звёздами. Интерактивный (клик/hover + клавиатура) или `readOnly` для показа.
 * A11y: `role="slider"` c `aria-valuenow/min/max` — стрелки меняют оценку, Home/End — край.
 * Половинки (`allowHalf`) работают и на показ, и на ввод (левая половина звезды → `.5`).
 *
 * @example
 * <UIRating defaultValue={3} onChange={setRating} />
 * <UIRating value={4.5} allowHalf readOnly size="sm" />
 */
const UIRatingBase = forwardRef<HTMLDivElement, IUIRatingProps>(
  (
    {
      className,
      testId,
      value,
      defaultValue = 0,
      onChange,
      max = 5,
      allowHalf = false,
      readOnly = false,
      disabled = false,
      size = 'md',
      ariaLabel = 'Оценка',
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState(defaultValue);
    const [hover, setHover] = useState<number | null>(null);

    const current = isControlled ? value : internal;
    const interactive = !readOnly && !disabled;
    const step = allowHalf ? 0.5 : 1;
    const display = hover ?? current;
    const sizeClass = SIZE_CLASS[size];
    const dataName = testId ? `UIRating-${testId}` : 'UIRating';

    const commit = (next: number): void => {
      const v = clamp(next, 0, max);
      if (!isControlled) setInternal(v);
      onChange?.(v);
    };

    const valueFromPointer = (el: HTMLElement, clientX: number): number => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0) return current;
      const x = clamp(clientX - rect.left, 0, rect.width);
      const raw = (x / rect.width) * max;
      // ceil к шагу: любой пиксель звезды заполняет её минимум на step
      return clamp(Math.ceil((raw - 1e-6) / step) * step, step, max);
    };

    const onPointerMove = (e: PointerEvent<HTMLDivElement>): void => {
      setHover(valueFromPointer(e.currentTarget, e.clientX));
    };
    const onClick = (e: PointerEvent<HTMLDivElement>): void => {
      commit(valueFromPointer(e.currentTarget, e.clientX));
    };
    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault();
          commit(current + step);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault();
          commit(current - step);
          break;
        case 'Home':
          e.preventDefault();
          commit(0);
          break;
        case 'End':
          e.preventDefault();
          commit(max);
          break;
        default:
          break;
      }
    };

    const stars: ReactNode = Array.from({ length: max }, (_, i) => {
      const fraction = clamp(display - i, 0, 1);
      return (
        <span key={i} className={cn('relative inline-block', sizeClass)}>
          <StarShape className={cn(sizeClass, 'text-muted-foreground/30')} />
          {fraction > 0 && (
            <span
              className="absolute left-0 top-0 h-full overflow-hidden"
              style={{ width: `${String(fraction * 100)}%` }}
            >
              <StarShape className={cn(sizeClass, 'max-w-none text-amber-400')} />
            </span>
          )}
        </span>
      );
    });

    // Read-only / disabled — просто показ, без роли slider и обработчиков.
    if (!interactive) {
      return (
        <div
          ref={ref}
          data-name={dataName}
          role="img"
          aria-label={`${ariaLabel}: ${String(current)} из ${String(max)}`}
          className={cn('inline-flex w-fit items-center gap-0.5', disabled && 'opacity-50', className)}
          {...props}
        >
          {stars}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-name={dataName}
        role="slider"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={current}
        aria-valuetext={`${String(current)} из ${String(max)}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerMove={onPointerMove}
        onPointerLeave={() => { setHover(null); }}
        onClick={onClick}
        className={cn(
          'inline-flex w-fit cursor-pointer items-center gap-0.5 rounded-md outline-none',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className,
        )}
        {...props}
      >
        {stars}
      </div>
    );
  },
);
UIRatingBase.displayName = 'UIRating';
export const UIRating = memo(UIRatingBase);
