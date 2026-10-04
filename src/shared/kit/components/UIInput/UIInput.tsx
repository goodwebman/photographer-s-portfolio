'use client';

import { forwardRef, memo, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface IUIInputProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly testId?: string;
  /** Если передан (boolean или строка с сообщением), устанавливает aria-invalid, красную рамку и текст-подсказку снизу */
  readonly error?: boolean | string;
  /** Контент слева (например, иконка) — input получит отступ pl-9 */
  readonly leftSlot?: ReactNode;
  /** Контент справа (кнопка очистки, спиннер) — интерактивный, input получит отступ pr-9 */
  readonly rightSlot?: ReactNode;
}

const inputBase = [
  'flex h-10 w-full rounded-lg border bg-card px-3 py-2 text-sm shadow-sm transition-[border-color,box-shadow]',
  'border-input text-foreground placeholder:text-muted-foreground',
  'hover:border-ring/50',
  'focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px] focus-visible:outline-none',
  'aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/30 aria-[invalid=true]:focus-visible:ring-destructive/40',
  'disabled:cursor-not-allowed disabled:opacity-50',
  'file:border-0 file:bg-transparent file:text-sm file:font-medium',
].join(' ');

/**
 * Универсальное текстовое поле ввода.
 * Поддерживает нативные атрибуты форм, error-состояние (aria-invalid + текст-подсказка),
 * слоты для иконок слева/справа.
 */
const UIInputBase = forwardRef<HTMLInputElement, IUIInputProps>(
  (
    { className, testId, error, leftSlot, rightSlot, onChange, disabled, type = 'text', id, ...props },
    ref,
  ) => {
    const isInvalid = error != null && error !== false;
    const hasErrorText = typeof error === 'string' && error.length > 0;
    // useId всегда на верхнем уровне — правило hooks
    const generatedId = useId();
    const inputId = id ?? generatedId;
    // без testId берём уникальный id: иначе два инпута с ошибкой на странице
    // делят один id и aria-errormessage указывает на чужое сообщение
    const errorId = testId != null ? `err-${testId}` : `${generatedId}error`;

    return (
      <div className="w-full">
        <div className="relative">
          {leftSlot && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
              {leftSlot}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            data-name={testId ? `UIInput-${testId}` : 'UIInput'}
            aria-invalid={isInvalid || undefined}
            aria-errormessage={hasErrorText ? errorId : undefined}
            disabled={disabled}
            onChange={disabled ? undefined : onChange}
            className={cn(
              inputBase,
              leftSlot && 'pl-9',
              rightSlot && 'pr-9',
              isInvalid && 'border-destructive ring-destructive/30',
              className,
            )}
            {...props}
          />
          {rightSlot && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">{rightSlot}</div>
          )}
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
UIInputBase.displayName = 'UIInput';
export const UIInput = memo(UIInputBase);
