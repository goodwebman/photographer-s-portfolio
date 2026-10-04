'use client';

import {
  forwardRef,
  memo,
  useCallback,
  type ButtonHTMLAttributes,
} from 'react';
import { cn } from '../../lib/cn';

export interface IUISwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  readonly testId?: string;
  readonly checked?: boolean;
  readonly onCheckedChange?: (checked: boolean) => void;
}

const track =
  'inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent ' +
  'transition-colors duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ' +
  'disabled:cursor-not-allowed disabled:opacity-50 ' +
  'data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted';

const thumb =
  'pointer-events-none block size-4 rounded-full bg-foreground shadow-lg ring-0 ' +
  'transition-transform duration-200 ' +
  'data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0';

/**
 * Переключатель (toggle switch). Использует `<button role="switch" aria-checked>`.
 */
const UISwitchBase = forwardRef<HTMLButtonElement, IUISwitchProps>(
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
    const handleClick = useCallback(() => {
      if (disabled) {
        return;
      }
      onCheckedChange?.(!checked);
    }, [checked, disabled, onCheckedChange]);

    return (
      <button
        ref={ref}
        type={type}
        role="switch"
        data-name={testId ? `UISwitch-${testId}` : 'UISwitch'}
        aria-checked={checked}
        data-state={checked ? 'checked' : 'unchecked'}
        disabled={disabled}
        onClick={handleClick}
        className={cn(track, className)}
        {...props}
      >
        <span
          data-name="UISwitch-thumb"
          data-state={checked ? 'checked' : 'unchecked'}
          className={thumb}
        />
      </button>
    );
  },
);
UISwitchBase.displayName = 'UISwitch';
export const UISwitch = memo(UISwitchBase);
