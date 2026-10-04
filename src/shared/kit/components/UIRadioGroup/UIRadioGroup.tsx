'use client';

import {
  createContext,
  useCallback,
  useMemo,
  forwardRef,
  type FieldsetHTMLAttributes,
  type KeyboardEvent,
} from 'react';
import { cn } from '../../lib/cn';

export interface RadioContextValue {
  readonly name: string;
  readonly selected: string;
  readonly onSelect: (value: string) => void;
}

export const RadioContext = createContext<RadioContextValue | null>(null);

export interface IUIRadioGroupProps
  extends Omit<FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  readonly name: string;
  readonly value: string;
  readonly onValueChange: (value: string) => void;
  /** A11y: видимый заголовок группы */
  readonly legend?: string;
}

const NAV_KEYS = new Set(['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft']);

/**
 * Навигация по группе стрелками (WAI-ARIA Radio Group): фокус переходит по кругу
 * и сразу выбирает вариант. Кнопки ищем в DOM — реестр в контексте не нужен.
 */
const handleKeyDown = (e: KeyboardEvent<HTMLFieldSetElement>): void => {
  if (!NAV_KEYS.has(e.key)) return;

  const radios = Array.from(
    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="radio"]:not(:disabled)'),
  );
  if (radios.length === 0) return;

  const current = radios.indexOf(document.activeElement as HTMLButtonElement);
  if (current < 0) return;
  e.preventDefault();

  const forward = e.key === 'ArrowDown' || e.key === 'ArrowRight';
  const next = (current + (forward ? 1 : -1) + radios.length) % radios.length;
  radios[next].focus();
  radios[next].click();
};

/**
 * Группа радио-кнопок. Управляет выбором через `value` / `onValueChange`.
 * Оборачивает дочерние `UIRadio` в `RadioContext.Provider`.
 */
export const UIRadioGroup = forwardRef<HTMLFieldSetElement, IUIRadioGroupProps>(
  ({ name, value, onValueChange, legend, children, className, onKeyDown, ...props }, ref) => {
    const onSelect = useCallback(
      (next: string) => {
        onValueChange(next);
      },
      [onValueChange],
    );

    const ctx = useMemo<RadioContextValue>(
      () => ({ name, selected: value, onSelect }),
      [name, value, onSelect],
    );

    return (
      <fieldset
        ref={ref}
        role="radiogroup"
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (!e.defaultPrevented) handleKeyDown(e);
        }}
        className={cn('flex flex-col gap-2', className)}
        {...props}
      >
        {legend != null && (
          <legend className="text-sm font-medium">{legend}</legend>
        )}
        <RadioContext.Provider value={ctx}>{children}</RadioContext.Provider>
      </fieldset>
    );
  },
);
UIRadioGroup.displayName = 'UIRadioGroup';
