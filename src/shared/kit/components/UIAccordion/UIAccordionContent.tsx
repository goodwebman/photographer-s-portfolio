'use client';

import { forwardRef, memo } from 'react';
import { cn } from '../../lib/cn';
import { useAccordionContext, useAccordionItemContext } from './accordion-context';
import type { IUIAccordionContentProps } from './accordion-context';

const UIAccordionContentBase = forwardRef<HTMLDivElement, IUIAccordionContentProps>(
  ({ className, children, ...props }, ref) => {
    const { expanded } = useAccordionContext();
    const { value, triggerId, contentId } = useAccordionItemContext();
    const isOpen = expanded.includes(value);

    // Контент всегда в DOM; высота анимируется через grid-template-rows 0fr → 1fr.
    // Это убирает «дёрганье» и плавно схлопывает контент любой высоты.
    return (
      <div
        ref={ref}
        data-state={isOpen ? 'open' : 'closed'}
        data-name="UIAccordionContent"
        className={cn(
          'grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out',
          'data-[state=open]:grid-rows-[1fr]',
        )}
      >
        {/* inert на закрытом: контент остаётся в DOM ради анимации схлопывания, но
            выпадает из таб-порядка и из дерева доступности — иначе Tab уводит фокус
            в невидимые ссылки, а скринридер зачитывает скрытый текст. */}
        <div className="overflow-hidden" inert={!isOpen}>
          <div
            id={contentId}
            role="region"
            aria-labelledby={triggerId}
            className={cn('pb-4 text-sm text-muted-foreground', className)}
            {...props}
          >
            {children}
          </div>
        </div>
      </div>
    );
  },
);
UIAccordionContentBase.displayName = 'UIAccordionContent';

export const UIAccordionContent = memo(UIAccordionContentBase);
