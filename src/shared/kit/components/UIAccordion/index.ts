import { UIAccordionRoot } from './UIAccordionRoot';
import { UIAccordionItem } from './UIAccordionItem';
import { UIAccordionTrigger } from './UIAccordionTrigger';
import { UIAccordionContent } from './UIAccordionContent';

/**
 * Compound-аккордеон. Sub-компоненты вынесены в отдельные файлы:
 * Root / Item / Trigger / Content + общий контекст в `accordion-context.ts`.
 */
export const UIAccordion = Object.assign(UIAccordionRoot, {
  Item: UIAccordionItem,
  Trigger: UIAccordionTrigger,
  Content: UIAccordionContent,
});

export type {
  IUIAccordionProps,
  IUIAccordionItemProps,
  IUIAccordionTriggerProps,
  IUIAccordionContentProps,
  ExpandStrategy,
} from './accordion-context';
