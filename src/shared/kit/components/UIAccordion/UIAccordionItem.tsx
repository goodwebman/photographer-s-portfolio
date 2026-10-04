'use client';

import { forwardRef, memo, useId, useMemo } from 'react';
import { cn } from '../../lib/cn';
import {
  AccordionItemContext,
  useAccordionContext,
  type AccordionItemContextValue,
  type IUIAccordionItemProps,
} from './accordion-context';

const UIAccordionItemBase = forwardRef<HTMLDivElement, IUIAccordionItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { expanded } = useAccordionContext();
    const isOpen = expanded.includes(value);
    const id = useId();

    const ctx = useMemo<AccordionItemContextValue>(
      () => ({ value, triggerId: `${id}trigger`, contentId: `${id}content` }),
      [value, id],
    );

    return (
      <AccordionItemContext.Provider value={ctx}>
        <div
          ref={ref}
          data-state={isOpen ? 'open' : 'closed'}
          data-name="UIAccordionItem"
          className={cn('px-4', className)}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  },
);
UIAccordionItemBase.displayName = 'UIAccordionItem';

export const UIAccordionItem = memo(UIAccordionItemBase);
