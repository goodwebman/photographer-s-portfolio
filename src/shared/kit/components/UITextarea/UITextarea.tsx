'use client';

import { forwardRef, memo, useId, useState, type ChangeEvent, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface IUITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  readonly testId?: string;
  /** Если передан (boolean или строка с сообщением), устанавливает aria-invalid, красную рамку и текст-подсказку снизу */
  readonly error?: boolean | string;
}

const textareaBase = [
  'flex min-h-[80px] w-full rounded-lg border bg-card px-3 py-2 text-sm shadow-sm',
  'resize-y transition-[border-color,box-shadow]',
  'border-input text-foreground placeholder:text-muted-foreground',
  'hover:border-ring/50',
  'focus-visible:border-ring focus-visible:ring-ring/40 focus-visible:ring-[3px] focus-visible:outline-none',
  'aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/30',
  'disabled:cursor-not-allowed disabled:opacity-50',
].join(' ');

/**
 * Многострочное текстовое поле. Аналогичен UIInput по пропсам.
 * Если задан `maxLength` — показывает счётчик символов справа внизу.
 */
const UITextareaBase = forwardRef<HTMLTextAreaElement, IUITextareaProps>(
  ({ className, testId, error, onChange, disabled, id, maxLength, value, defaultValue, ...props }, ref) => {
    const isInvalid = error != null && error !== false;
    const hasErrorText = typeof error === 'string' && error.length > 0;
    const generatedId = useId();
    const inputId = id ?? generatedId;
    // см. UIInput: без testId нужен уникальный id, иначе сообщения об ошибке пересекаются
    const errorId = testId != null ? `err-${testId}` : `${generatedId}error`;

    // Длина для счётчика: controlled — из value, иначе — внутренний state, обновляемый в handler (без эффекта)
    const [internalLen, setInternalLen] = useState(() => {
      const initial = value ?? defaultValue;
      return typeof initial === 'string' ? initial.length : 0;
    });
    const len = typeof value === 'string' ? value.length : internalLen;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (typeof value !== 'string') setInternalLen(e.target.value.length);
      if (!disabled) onChange?.(e);
    };

    return (
      <div className="w-full">
        <textarea
          ref={ref}
          id={inputId}
          data-name={testId ? `UITextarea-${testId}` : 'UITextarea'}
          aria-invalid={isInvalid || undefined}
          aria-errormessage={hasErrorText ? errorId : undefined}
          disabled={disabled}
          onChange={disabled ? undefined : handleChange}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          className={cn(
            textareaBase,
            isInvalid && 'border-destructive ring-destructive/30',
            className,
          )}
          {...props}
        />
        {(hasErrorText || maxLength != null) && (
          <div className="mt-1.5 flex items-center justify-between gap-2">
            {hasErrorText ? (
              <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
                {error}
              </p>
            ) : (
              <span />
            )}
            {maxLength != null && (
              <span
                className={cn(
                  'text-xs tabular-nums',
                  len >= maxLength ? 'font-medium text-destructive' : 'text-muted-foreground',
                )}
              >
                {len}/{maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);
UITextareaBase.displayName = 'UITextarea';
export const UITextarea = memo(UITextareaBase);
