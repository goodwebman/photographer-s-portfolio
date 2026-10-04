'use client';

import { forwardRef, memo, useCallback } from 'react';
import { cn } from '../../lib/cn';
import { UIIcons } from '../../icons';
import { useAccordionContext, useAccordionItemContext } from './accordion-context';
import type { IUIAccordionTriggerProps } from './accordion-context';

const UIAccordionTriggerBase = forwardRef<HTMLButtonElement, IUIAccordionTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const ctx = useAccordionContext();
    const { value, triggerId, contentId } = useAccordionItemContext();
    const isOpen = ctx.expanded.includes(value);

    const handleClick = useCallback(() => {
      ctx.toggle(value);
    }, [ctx, value]);

    return (
      <button
        ref={ref}
        type="button"
        id={triggerId}
        aria-controls={contentId}
        data-state={isOpen ? 'open' : 'closed'}
        data-name="UIAccordionTrigger"
        onClick={handleClick}
        className={cn(
          'flex w-full cursor-pointer items-center justify-between rounded-sm py-4 text-left text-sm font-medium text-foreground transition-colors',
          'hover:text-primary focus-visible:text-primary',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          className,
        )}
        aria-expanded={isOpen}
        {...props}
      >
        {children}
        <UIIcons.ChevronDown
          data-state={isOpen ? 'open' : 'closed'}
          className="size-4 text-muted-foreground transition-transform duration-300 ease-out data-[state=open]:rotate-180"
        />
      </button>
    );
  },
);
UIAccordionTriggerBase.displayName = 'UIAccordionTrigger';

export const UIAccordionTrigger = memo(UIAccordionTriggerBase);
