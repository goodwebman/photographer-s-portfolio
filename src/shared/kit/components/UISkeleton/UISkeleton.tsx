import { forwardRef, memo, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface IUISkeletonProps extends HTMLAttributes<HTMLDivElement> {
  readonly testId?: string;
}

/**
 * Скелетон-заглушка для содержимого, которое ещё грузится.
 * Базовый прямоугольник с shimmer-анимацией (gradient-sweep поверх `bg-muted`).
 * Комбинируй с Tailwind-утилитами для формы: `rounded-full` (круг), `h-4 w-3/4` (текст) и т.д.
 */
const UISkeletonBase = forwardRef<HTMLDivElement, IUISkeletonProps>(
  ({ className, testId, ...props }, ref) => (
    <div
      ref={ref}
      data-name={testId ? `UISkeleton-${testId}` : 'UISkeleton'}
      aria-hidden="true"
      className={cn(
        'relative overflow-hidden rounded-md bg-foreground/15',
        "before:absolute before:inset-0 before:animate-shimmer before:bg-size-[200%_100%] before:bg-[linear-gradient(90deg,transparent,color-mix(in_oklch,var(--color-foreground)_30%,transparent),transparent)] before:content-['']",
        className,
      )}
      {...props}
    />
  ),
);
UISkeletonBase.displayName = 'UISkeleton';
export const UISkeleton = memo(UISkeletonBase);
