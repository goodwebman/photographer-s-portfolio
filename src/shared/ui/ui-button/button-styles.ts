import { cn } from '@/shared/lib/cn';

/** Визуальный вариант кнопки. */
export type UIButtonVariant = 'accent' | 'primary' | 'outline';
/** Размер кнопки. `undefined` — адаптивный (S на мобиле, M на sm+). */
export type UIButtonSize = 'S' | 'M';

export interface IButtonStyleOptions {
  readonly variant?: UIButtonVariant;
  readonly size?: UIButtonSize;
  readonly disabled?: boolean;
  readonly loading?: boolean;
  readonly fullWidth?: boolean;
}

/**
 * Классы кнопки без учёта пользовательского `className`. Живёт в модуле без
 * `'use client'`, чтобы навигационные CTA на `<Link>` в **server**-компонентах
 * могли переиспользовать стиль 1:1:
 * `<Link className={uiButtonClassNames({ variant: 'accent' })}>`.
 */
export const uiButtonClassNames = ({
  variant = 'accent',
  size,
  disabled = false,
  loading = false,
  fullWidth = false,
}: IButtonStyleOptions = {}): string =>
  cn(
    'group/UIButton relative inline-flex select-none items-center justify-center gap-2 font-medium outline-none',
    'transition-[color,background-color,border-color,opacity,transform,box-shadow,filter] duration-300',
    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    size === 'S' && 'h-11 rounded-xl px-4 text-small',
    size === 'M' && 'h-13 rounded-2xl px-6 text-body',
    size === undefined &&
      'h-11 rounded-xl px-4 text-small sm:h-13 sm:rounded-2xl sm:px-6 sm:text-body',
    fullWidth && 'w-full',
    variant === 'accent' &&
      (disabled
        ? 'bg-accent-muted text-muted-foreground'
        : 'bg-accent text-accent-foreground hover:brightness-110 active:brightness-95'),
    variant === 'primary' &&
      (disabled
        ? 'bg-muted text-muted-foreground'
        : 'bg-foreground text-background hover:opacity-90'),
    variant === 'outline' &&
      (disabled
        ? 'border border-border bg-muted/30 text-muted-foreground'
        : 'border border-border bg-muted/40 text-foreground hover:bg-muted'),
    disabled && 'cursor-not-allowed',
    loading && !disabled && 'cursor-default',
  );
