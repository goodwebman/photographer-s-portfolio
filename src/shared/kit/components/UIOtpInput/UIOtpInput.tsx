'use client';

import { forwardRef, memo, useCallback, useId, useMemo, useRef, type ClipboardEvent, type KeyboardEvent } from 'react';
import { cn } from '../../lib/cn';

export interface IUIOtpInputProps {
  readonly testId?: string;
  /** Количество ячеек */
  readonly length?: number;
  /** Текущее значение (плотная строка введённых символов) */
  readonly value?: string;
  /** Вызывается при изменении */
  readonly onChange?: (value: string) => void;
  /** Вызывается, когда заполнены все ячейки */
  readonly onComplete?: (value: string) => void;
  /** Скрыть символы (точки) — для PIN */
  readonly mask?: boolean;
  /** Допустимые символы */
  readonly type?: 'numeric' | 'alphanumeric';
  readonly disabled?: boolean;
  /** Если передан — aria-invalid, красная рамка + текст-подсказка */
  readonly error?: boolean | string;
  readonly autoFocus?: boolean;
  readonly className?: string;
  readonly 'aria-label'?: string;
}

const isValidChar = (c: string, mode: 'numeric' | 'alphanumeric'): boolean => {
  if (mode === 'numeric') return c >= '0' && c <= '9';
  return /[0-9a-zA-Z]/.test(c);
};

const filterChars = (raw: string, mode: 'numeric' | 'alphanumeric'): string[] =>
  raw
    .split('')
    .filter((c) => isValidChar(c, mode))
    .map((c) => (mode === 'alphanumeric' ? c.toUpperCase() : c));

/**
 * OTP / PIN-инпут: N ячеек под код подтверждения (СМС, e-mail).
 * Ввод, paste (с распределением), авто-переход, Backspace, стрелки, mask-режим.
 * Значение всегда плотное (без «дыр») — упрощает валидацию.
 */
const UIOtpInputBase = forwardRef<HTMLDivElement, IUIOtpInputProps>(
  (
    {
      testId,
      length = 6,
      value = '',
      onChange,
      onComplete,
      mask = false,
      type = 'numeric',
      disabled = false,
      error,
      autoFocus = false,
      className,
      'aria-label': ariaLabel,
    },
    ref,
  ) => {
    const cells = useMemo(() => {
      const chars = value.split('');
      return Array.from({ length }, (_, i) => chars[i] ?? '');
    }, [value, length]);

    const isInvalid = error != null && error !== false;
    const hasErrorText = typeof error === 'string' && error.length > 0;
    // см. UIInput: без testId нужен уникальный id, иначе сообщения об ошибке пересекаются
    const generatedId = useId();
    const errorId = testId != null ? `err-${testId}` : `${generatedId}error`;
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const emit = useCallback(
      (next: string) => {
        onChange?.(next);
        if (next.length === length) onComplete?.(next);
      },
      [onChange, onComplete, length],
    );

    const focusCell = useCallback((index: number) => {
      const i = Math.max(0, Math.min(length - 1, index));
      const el = inputRefs.current[i];
      el?.focus();
      el?.select();
    }, [length]);

    const handleChange = useCallback(
      (index: number, raw: string) => {
        const filtered = filterChars(raw, type);
        const ch = filtered[filtered.length - 1];
        if (!ch) return;
        const arr = cells.slice();
        if (index <= arr.length) {
          arr[index] = ch; // replace или append вплотную
        } else {
          arr.push(ch);
        }
        emit(arr.join(''));
        focusCell(index + 1);
      },
      [cells, type, emit, focusCell],
    );

    const handleKeyDown = useCallback(
      (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
          e.preventDefault();
          const arr = cells.slice();
          if (arr[index]) {
            arr.splice(index, 1);
          } else if (index > 0) {
            arr.splice(index - 1, 1);
            focusCell(index - 1);
          }
          emit(arr.join(''));
          return;
        }
        if (e.key === 'Delete') {
          e.preventDefault();
          const arr = cells.slice();
          if (arr[index]) {
            arr.splice(index, 1);
            emit(arr.join(''));
          }
          return;
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          focusCell(index - 1);
          return;
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          focusCell(index + 1);
          return;
        }
      },
      [cells, emit, focusCell],
    );

    const handlePaste = useCallback(
      (index: number, e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const filtered = filterChars(e.clipboardData.getData('text'), type).slice(0, length - index);
        if (filtered.length === 0) return;
        const arr = cells.slice(0, index);
        for (const ch of filtered) arr.push(ch);
        emit(arr.slice(0, length).join(''));
        focusCell(Math.min(length - 1, arr.length));
      },
      [cells, type, length, emit, focusCell],
    );

    return (
      <div className="w-full">
        <div
          ref={ref}
          role="group"
          aria-label={ariaLabel ?? 'Код подтверждения'}
          data-name={testId ? `UIOtpInput-${testId}` : 'UIOtpInput'}
          className={cn('flex items-center gap-2', className)}
        >
          {cells.map((c, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type={mask ? 'password' : 'text'}
              inputMode={type === 'numeric' ? 'numeric' : 'text'}
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              maxLength={1}
              value={c}
              disabled={disabled}
              /* eslint-disable-next-line jsx-a11y/no-autofocus */
              autoFocus={autoFocus && i === 0}
              aria-invalid={isInvalid || undefined}
              aria-errormessage={hasErrorText ? errorId : undefined}
              aria-label={`Символ ${String(i + 1)} из ${String(length)}`}
              onChange={(e) => { handleChange(i, e.target.value); }}
              onKeyDown={(e) => { handleKeyDown(i, e); }}
              onPaste={(e) => { handlePaste(i, e); }}
              onFocus={(e) => { e.target.select(); }}
              className={cn(
                'size-12 rounded-lg border bg-card text-center text-lg font-semibold text-foreground shadow-sm transition-[border-color,box-shadow]',
                'border-input',
                'hover:border-ring/50',
                'focus:border-ring focus:ring-ring/40 focus:ring-[3px] focus:outline-none',
                isInvalid && 'border-destructive ring-destructive/30',
                disabled && 'cursor-not-allowed opacity-50',
              )}
            />
          ))}
        </div>
        {hasErrorText && (
          <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  },
);
UIOtpInputBase.displayName = 'UIOtpInput';

export const UIOtpInput = memo(UIOtpInputBase);
