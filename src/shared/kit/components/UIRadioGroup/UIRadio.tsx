'use client';

import {
  forwardRef,
  useContext,
  useId,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import { RadioContext } from './UIRadioGroup';

export interface IUIRadioProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'onChange'> {
  /** Значение радио-кнопки (возвращается в onValueChange группы) */
  readonly value: string;
  readonly testId?: string;
  readonly children?: ReactNode;
}

const radioTrack =
  'inline-flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-muted-foreground ' +
  'transition-colors duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ' +
  'disabled:cursor-not-allowed disabled:opacity-50 ' +
  'data-[state=checked]:border-primary data-[state=unchecked]:border-muted-foreground';

const radioIndicator =
  'size-2 rounded-full bg-primary transition-transform duration-150 ' +
  'data-[state=checked]:scale-100 data-[state=unchecked]:scale-0';

/**
 * Отдельная радио-кнопка. Использует `role="radio"` + `aria-checked`.
 * Должна быть обёрнута в `UIRadioGroup` (читает контекст).
 */
export const UIRadio = forwardRef<HTMLButtonElement, IUIRadioProps>(
  ({ value, testId, children, className, disabled, ...props }, ref) => {
    const ctx = useContext(RadioContext);
    const checked = ctx?.selected === value;
    const labelId = useId();

    const handleClick = () => {
      if (disabled || ctx == null || checked) {
        return;
      }
      ctx.onSelect(value);
    };

    return (
      <label className="group inline-flex cursor-pointer items-center gap-2">
        <button
          ref={ref}
          type="button"
          role="radio"
          aria-checked={checked}
          // <label> не даёт имя кнопке (AccName для button берётся из содержимого),
          // поэтому подпись связываем явно — иначе скринридер читает «переключатель» без текста
          aria-labelledby={children != null ? labelId : undefined}
          // roving tabindex: в таб-порядке только выбранная кнопка, внутри группы — стрелки.
          // Пока в группе ничего не выбрано, доступны все — иначе группа выпадет из Tab.
          tabIndex={checked || ctx == null || ctx.selected === '' ? 0 : -1}
          data-state={checked ? 'checked' : 'unchecked'}
          data-name={testId ? `UIRadio-${testId}` : 'UIRadio'}
          name={ctx?.name}
          disabled={disabled}
          onClick={handleClick}
          className={cn(radioTrack, className)}
          {...props}
        >
          <span
            data-name="UIRadio-indicator"
            data-state={checked ? 'checked' : 'unchecked'}
            className={radioIndicator}
          />
        </button>
        {children != null && (
          <span id={labelId} className="cursor-pointer text-sm font-medium">
            {children}
          </span>
        )}
      </label>
    );
  },
);
UIRadio.displayName = 'UIRadio';
