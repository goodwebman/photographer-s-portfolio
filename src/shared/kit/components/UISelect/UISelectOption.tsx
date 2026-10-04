'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type ButtonHTMLAttributes,
} from 'react';
import { cn } from '../../lib/cn';
import { UIIcons } from '../../icons';
import { useSelectContext } from './select-context';

export interface IUISelectOptionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly value: string;
  readonly disabled?: boolean;
}

const UISelectOption = forwardRef<HTMLButtonElement, IUISelectOptionProps>(
  ({ className, value: optValue, disabled, children, ...props }, _ref) => {
    const ctx = useSelectContext();
    const isSelected = ctx.value === optValue;
    const localRef = useRef<HTMLButtonElement>(null);

    const handleClick = useCallback(() => {
      if (disabled) return;
      ctx.onSelect(optValue);
      ctx.setOpen(false);
    }, [ctx, optValue, disabled]);

    useEffect(() => {
      const el = localRef.current;
      ctx.optionsRef.current.push(el);
      return () => {
        ctx.optionsRef.current = ctx.optionsRef.current.filter((r) => r !== el);
      };
    }, [ctx.optionsRef]);

    return (
      <button
        ref={localRef}
        type="button"
        role="option"
        aria-selected={isSelected}
        disabled={disabled}
        data-name="UISelectOption"
        data-selected={isSelected || undefined}
        onClick={handleClick}
        className={cn(
          'relative flex w-full cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
          'focus-visible:bg-accent focus-visible:text-accent-foreground',
          'data-selected:bg-accent data-selected:text-accent-foreground',
          'disabled:pointer-events-none disabled:opacity-50',
          !disabled && 'cursor-pointer hover:bg-accent hover:text-accent-foreground',
          className,
        )}
        {...props}
      >
        {isSelected && <UIIcons.Check className="mr-2 size-4" />}
        <span>{children}</span>
      </button>
    );
  },
);
UISelectOption.displayName = 'UISelectOption';
export { UISelectOption };
