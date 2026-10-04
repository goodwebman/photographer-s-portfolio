'use client';

import { forwardRef, memo, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { useDropdownContext } from './dropdown-menu-context';

export interface IUIDropdownMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  readonly disabled?: boolean;
}

const UIDropdownMenuItem = forwardRef<HTMLDivElement, IUIDropdownMenuItemProps>(
  ({ className, disabled, onClick, ...props }, ref) => {
    const ctx = useDropdownContext();

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={-1}
        data-name="UIDropdownMenuItem"
        aria-disabled={disabled || undefined}
        // атрибут нужен самому классу data-disabled:* — без него правило не срабатывало
        data-disabled={disabled || undefined}
        className={cn(
          'relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors',
          'focus-visible:bg-accent focus-visible:text-accent-foreground',
          'data-disabled:pointer-events-none data-disabled:opacity-50',
          !disabled && 'cursor-pointer hover:bg-accent hover:text-accent-foreground',
          className,
        )}
        onClick={(e) => {
          if (disabled) return;
          onClick?.(e);
          ctx.close();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (disabled) return;
            onClick?.(e as unknown as React.MouseEvent<HTMLDivElement>);
            ctx.close();
          }
        }}
        {...props}
      />
    );
  },
);
UIDropdownMenuItem.displayName = 'UIDropdownMenuItem';
const MemoUIDropdownMenuItem = memo(UIDropdownMenuItem);
export { MemoUIDropdownMenuItem as UIDropdownMenuItem };
