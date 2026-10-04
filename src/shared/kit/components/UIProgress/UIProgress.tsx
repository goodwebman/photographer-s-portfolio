import { forwardRef, memo, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface IUIProgressProps extends HTMLAttributes<HTMLDivElement> {
  readonly testId?: string;
  /** Текущее значение (0 — max). `undefined`/`null` → indeterminate-режим. */
  readonly value?: number | null;
  /** Максимальное значение (по умолч. 100) */
  readonly max?: number;
  /** A11y-подпись: `role="progressbar"` без имени скринридер объявляет пустым. Default: `'Прогресс'`. */
  readonly ariaLabel?: string;
}

/**
 * Progress bar. `role="progressbar"` + `aria-valuenow/min/max`.
 * Determinate — индикатор заполняется до `value/max`.
 * Indeterminate (`value == null`) — бегущая полоса + `aria-busy`.
 */
const UIProgressBase = forwardRef<HTMLDivElement, IUIProgressProps>(
  ({ className, testId, value, max = 100, ariaLabel = 'Прогресс', ...props }, ref) => {
    const isIndeterminate = value == null;
    const pct = Math.min(100, Math.max(0, ((value ?? 0) / max) * 100));
    const offset = 100 - pct;

    return (
      <div
        ref={ref}
        role="progressbar"
        // имя перебивается через aria-label/aria-labelledby в props
        aria-label={ariaLabel}
        aria-valuenow={isIndeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-busy={isIndeterminate || undefined}
        data-name={testId ? `UIProgress-${testId}` : 'UIProgress'}
        className={cn(
          'relative h-2.5 w-full overflow-hidden rounded-full bg-foreground/15',
          className,
        )}
        {...props}
      >
        {isIndeterminate ? (
          <div className="absolute inset-y-0 left-0 w-1/3 animate-progress rounded-full bg-primary shadow-[0_0_10px_var(--color-primary)]" />
        ) : (
          <div
            className="h-full w-full rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)] transition-transform duration-500 ease-out"
            style={{
              transform: offset > 0 ? `translateX(-${String(offset)}%)` : 'translateX(0%)',
            }}
          />
        )}
      </div>
    );
  },
);
UIProgressBase.displayName = 'UIProgress';
export const UIProgress = memo(UIProgressBase);
