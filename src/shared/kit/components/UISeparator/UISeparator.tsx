import { forwardRef, memo, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface IUISeparatorProps extends HTMLAttributes<HTMLDivElement> {
  readonly testId?: string;
  /** Горизонтальный (по умолчанию) или вертикальный */
  readonly orientation?: 'horizontal' | 'vertical';
  /** Декоративный только (не семантический раздел) */
  readonly decorative?: boolean;
}

/**
 * Визуальный разделитель. Использует `role="separator"` или `role="none"` (декоративный).
 */
const UISeparatorBase = forwardRef<HTMLDivElement, IUISeparatorProps>(
  (
    { className, testId, orientation = 'horizontal', decorative = true, ...props },
    ref,
  ) => (
    <div
      ref={ref}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      data-name={testId ? `UISeparator-${testId}` : 'UISeparator'}
      className={cn(
        'shrink-0 bg-border',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className,
      )}
      {...props}
    />
  ),
);
UISeparatorBase.displayName = 'UISeparator';
export const UISeparator = memo(UISeparatorBase);
