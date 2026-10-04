'use client';

import {
  forwardRef,
  memo,
  useCallback,
  useRef,
  type ButtonHTMLAttributes,
} from 'react';
import { cn } from '../../lib/cn';
import { UIIcons } from '../../icons';

export type CheckState = boolean | 'indeterminate';

export interface IUIChceckboxProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  readonly testId?: string;
  /** Текущее состояние: true / false / 'indeterminate' */
  checked?: CheckState;
  /** Обработчик изменения состояния */
  onCheckedChange?: (checked: CheckState) => void;
}

const classes = {
  root:
    'peer flex size-4 shrink-0 items-center justify-center rounded-sm border border-border bg-background ' +
    'cursor-pointer ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ' +
    'disabled:cursor-not-allowed disabled:opacity-50 ' +
    'data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground ' +
    'data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground',
};

/**
 * Checkbox с поддержкой indeterminate-состояния.
 * Использует `<button role="checkbox" aria-checked>`, поэтому для форм нужна
 * обёртка или библиотека (react-hook-form). Нативное form-участие не поддерживается.
 *
 * @component
 */
const UICheckboxBase = forwardRef<HTMLButtonElement, IUIChceckboxProps>(
  (
    {
      className,
      testId,
      checked = false,
      onCheckedChange,
      disabled,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLButtonElement | null>(null);
    const handleRef = (node: HTMLButtonElement | null) => {
      internalRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const state: CheckState = checked;

    const handleClick = useCallback(() => {
      if (disabled) {
        return;
      }
      const next: CheckState =
        checked === 'indeterminate' ? true : !checked;
      onCheckedChange?.(next);
    }, [checked, disabled, onCheckedChange]);

    return (
      <button
        ref={handleRef}
        type={type}
        role="checkbox"
        data-name={testId ? `UICheckbox-${testId}` : 'UICheckbox'}
        aria-checked={checked === 'indeterminate' ? 'mixed' : checked}
        data-state={state === 'indeterminate' ? 'indeterminate' : state ? 'checked' : 'unchecked'}
        disabled={disabled}
        onClick={handleClick}
        className={cn(classes.root, className)}
        {...props}
      >
        {checked === true && <UIIcons.Check className="size-3.5" strokeWidth={3} />}
        {checked === 'indeterminate' && <UIIcons.Minus className="size-3.5" strokeWidth={3} />}
      </button>
    );
  },
);
UICheckboxBase.displayName = 'UICheckbox';
export const UICheckbox = memo(UICheckboxBase);
