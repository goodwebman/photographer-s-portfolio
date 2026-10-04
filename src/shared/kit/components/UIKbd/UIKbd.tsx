import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, memo, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export const kbdVariants = cva(
  // inset-shadow снизу даёт «объём клавиши»; моноширинный шрифт и tabular-nums — ровные символы
  'inline-flex select-none items-center justify-center gap-1 rounded-md border border-border bg-muted ' +
    'font-mono font-medium text-muted-foreground shadow-[inset_0_-1px_0_rgb(0_0_0/0.08)] ' +
    'dark:shadow-[inset_0_-1px_0_rgb(0_0_0/0.4)]',
  {
    variants: {
      size: {
        sm: 'h-4 min-w-4 px-1 text-[10px]',
        md: 'h-5 min-w-5 px-1.5 text-[11px]',
        lg: 'h-6 min-w-6 px-2 text-xs',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export interface IUIKbdProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof kbdVariants> {
  readonly testId?: string;
}

/**
 * Хинт клавиши/сочетания. Рендерит семантический `<kbd>`.
 * Комбинации собираются композицией — по одному `<UIKbd>` на клавишу.
 *
 * @example
 * <span className="inline-flex gap-1">
 *   <UIKbd>⌘</UIKbd>
 *   <UIKbd>K</UIKbd>
 * </span>
 */
const UIKbdBase = forwardRef<HTMLElement, IUIKbdProps>(
  ({ className, size, testId, ...props }, ref) => (
    <kbd
      ref={ref}
      data-name={testId ? `UIKbd-${testId}` : 'UIKbd'}
      className={cn(kbdVariants({ size }), className)}
      {...props}
    />
  ),
);
UIKbdBase.displayName = 'UIKbd';
export const UIKbd = memo(UIKbdBase);
