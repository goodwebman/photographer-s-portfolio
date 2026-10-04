import { cn } from '@/shared/lib/cn';

/** Визуальный вариант иконочной кнопки. */
export type UIIconButtonVariant =
  /** Без фона и рамки — для плотных панелей (закрытие модалки). */
  | 'plain'
  /** Прозрачная кнопка на стеклянной поверхности (бургер в шапке). */
  | 'ghost'
  /** Обводка без заливки (соц-иконки подвала). */
  | 'outline'
  /** Плотная карточная заливка (управление лайтбоксом). */
  | 'surface'
  /** Полупрозрачное стекло с блюром (стрелки модалки поверх контента). */
  | 'glass';

/** Размер иконочной кнопки: S — 36px, M — 40px, L — 44px (a11y-минимум). */
export type UIIconButtonSize = 'S' | 'M' | 'L';

export interface IIconButtonStyleOptions {
  readonly variant?: UIIconButtonVariant;
  readonly size?: UIIconButtonSize;
}

const SIZE_CLASSES: Record<UIIconButtonSize, string> = {
  S: 'size-9',
  M: 'size-10',
  L: 'size-11',
};

const VARIANT_CLASSES: Record<UIIconButtonVariant, string> = {
  plain: 'text-muted-foreground hover:bg-muted hover:text-foreground',
  ghost: 'bg-transparent text-foreground hover:bg-muted',
  outline:
    'border border-border text-muted-foreground hover:border-accent/40 hover:bg-muted hover:text-foreground',
  surface: 'border border-border bg-card text-foreground hover:bg-muted',
  glass:
    'border border-border bg-card/90 text-foreground shadow-lg backdrop-blur hover:bg-muted',
};

/**
 * Классы иконочной кнопки без пользовательского `className`. Живёт в модуле без
 * `'use client'`, чтобы стиль переиспользовался и на `<a>` в server-компонентах.
 */
export const uiIconButtonClassNames = ({
  variant = 'surface',
  size = 'M',
}: IIconButtonStyleOptions = {}): string =>
  cn(
    'grid place-items-center rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring',
    SIZE_CLASSES[size],
    VARIANT_CLASSES[variant],
  );
