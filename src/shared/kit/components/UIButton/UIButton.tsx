import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, memo, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { UIIcons } from '../../icons';

/**
 * Карта вариантов кнопки. Экспортируем — потребитель может переиспользовать
 * классы (например, для <a>, стилизованной под кнопку).
 */
export const buttonVariants = cva(
  // base
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md',
    // cursor-pointer явно: в Tailwind v4 preflight у <button> курсор default, а не pointer
    'cursor-pointer font-medium transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-border bg-background text-foreground hover:bg-muted',
        ghost: 'text-foreground hover:bg-muted',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'size-10 p-0',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
);

/**
 * # Интерфейс пропсов для компонента UIButton
 * @interface IUIButtonProps
 * @extends {ButtonHTMLAttributes<HTMLButtonElement>} — нативный name для форм сохранён
 */
export interface IUIButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** # Суффикс для data-name (UI<Name>-<testId>), упрощает поиск в тестах и отладке HTML */
  readonly testId?: string;
  /** # Состояние загрузки: блокирует клики, добавляет спиннер и aria-busy */
  readonly loading?: boolean;
}

/**
 * Универсальная кнопка для основных действий в интерфейсе.
 *
 * @component
 * @param {IUIButtonProps} props
 * @returns {JSX.Element}
 *
 * @example
 * ```tsx
 * <UIButton variant="primary" size="md" onClick={save}>Сохранить</UIButton>
 * <UIButton loading>Отправка…</UIButton>
 * ```
 */
const UIButtonBase = forwardRef<HTMLButtonElement, IUIButtonProps>(
  (
    { className, variant, size, testId, loading = false, disabled, type = 'button', children, ...props },
    ref,
  ) => {
    const dataName = testId ? `UIButton-${testId}` : 'UIButton';

    return (
      <button
        ref={ref}
        type={type}
        data-name={dataName}
        aria-busy={loading || undefined}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {loading && <UIIcons.Spinner data-name="UIButton-spinner" className="size-4 animate-spin" />}
        {children}
      </button>
    );
  },
);
export const UIButton = memo(UIButtonBase);
UIButtonBase.displayName = 'UIButton';
