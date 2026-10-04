'use client';

import {
  forwardRef,
  memo,
  useCallback,
  type InputHTMLAttributes,
} from 'react';
import { cn } from '../../lib/cn';

export interface IUISliderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange' | 'value'> {
  readonly testId?: string;
  readonly value?: number;
  readonly onValueChange?: (value: number) => void;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  /** A11y-подпись: range без label остаётся безымянным для скринридера. Default: `'Ползунок'`. */
  readonly ariaLabel?: string;
}

/**
 * Ползунок (range slider). Использует нативный `<input type="range">`.
 * Поддерживает `value` / `onValueChange` для контролируемого режима.
 */
const UISliderBase = forwardRef<HTMLInputElement, IUISliderProps>(
  (
    {
      className,
      testId,
      value,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled,
      ariaLabel = 'Ползунок',
      ...props
    },
    ref,
  ) => {
    const pct =
      max > min ? ((value ?? 0) - min) / (max - min) : 0;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onValueChange?.(Number(e.target.value));
      },
      [onValueChange],
    );

    return (
      <input
        ref={ref}
        type="range"
        data-name={testId ? `UISlider-${testId}` : 'UISlider'}
        value={value}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onChange={handleChange}
        // имя перебивается через aria-label/aria-labelledby в props
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value ?? 0}
        className={cn(
          // base
          'h-2 w-full cursor-pointer appearance-none rounded-full bg-muted outline-none',
          // filled track via background-size
          'bg-[linear-gradient(to_right,var(--color-primary)_0%,var(--color-primary)_100%)]',
          'bg-no-repeat',
          // thumb: webkit
          '[&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none',
          '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-foreground',
          '[&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:transition-transform',
          '[&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-110',
          '[&::-webkit-slider-thumb]:focus-visible:ring-2 [&::-webkit-slider-thumb]:focus-visible:ring-ring',
          '[&::-webkit-slider-thumb]:focus-visible:ring-offset-2',
          // thumb: moz
          '[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:appearance-none',
          '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-foreground',
          '[&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:border-0',
          '[&::-moz-range-thumb]:hover:scale-110',
          // track: moz
          '[&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-transparent',
          // disabled
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        style={{
          backgroundSize: `${String(Math.round(pct * 100))}% 100%`,
        }}
        {...props}
      />
    );
  },
);
UISliderBase.displayName = 'UISlider';
export const UISlider = memo(UISliderBase);
