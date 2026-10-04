'use client';

import { forwardRef, memo, useCallback, useMemo } from 'react';
import { cn } from '../../lib/cn';
import {
  AccordionContext,
  useAccordionContext,
  type AccordionContextValue,
  type IUIAccordionProps,
} from './accordion-context';

// re-export чтобы потребитель мог достать тип root-пропсов из модуля компонента
export { useAccordionContext };
export type { AccordionContextValue };

const UIAccordionRootBase = forwardRef<HTMLDivElement, IUIAccordionProps>(
  (
    { className, testId, value, onValueChange, strategy = 'single', children, ...props },
    ref,
  ) => {
    const values = useMemo<readonly string[]>(
      () => (typeof value === 'string' ? [value] : value),
      [value],
    );

    const toggle = useCallback(
      (next: string) => {
        if (strategy === 'single') {
          onValueChange(values.includes(next) ? '' : next);
        } else {
          onValueChange(
            values.includes(next) ? values.filter((x) => x !== next) : [...values, next],
          );
        }
      },
      [strategy, values, onValueChange],
    );

    // без useMemo новый объект контекста на каждый рендер сбрасывал бы memo у всех item'ов
    const ctx = useMemo<AccordionContextValue>(
      () => ({ expanded: values, strategy, toggle }),
      [values, strategy, toggle],
    );

    return (
      <AccordionContext.Provider value={ctx}>
        <div
          ref={ref}
          data-name={testId ? `UIAccordion-${testId}` : 'UIAccordion'}
          className={cn(
            'divide-y divide-border overflow-hidden rounded-lg border border-border bg-card',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);
UIAccordionRootBase.displayName = 'UIAccordion';

export const UIAccordionRoot = memo(UIAccordionRootBase);
