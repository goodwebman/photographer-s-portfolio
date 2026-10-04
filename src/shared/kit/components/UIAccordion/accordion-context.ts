'use client';

import { createContext, useContext, type HTMLAttributes } from 'react';

// ─── Shared types ─────────────────────────────────────────────────────────────

export type ExpandStrategy = 'single' | 'multiple';

export interface IUIAccordionProps extends HTMLAttributes<HTMLDivElement> {
  readonly testId?: string;
  readonly value: string | readonly string[];
  readonly onValueChange: (value: string | readonly string[]) => void;
  readonly strategy?: ExpandStrategy;
}

export interface IUIAccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  readonly value: string;
}

export type IUIAccordionTriggerProps = HTMLAttributes<HTMLButtonElement>;
export type IUIAccordionContentProps = HTMLAttributes<HTMLDivElement>;

// ─── Contexts (без JSX — Provider используется напрямую из компонентов) ─────────

export interface AccordionContextValue {
  expanded: readonly string[];
  strategy: ExpandStrategy;
  toggle: (value: string) => void;
}

export const AccordionContext = createContext<AccordionContextValue | null>(null);

export function useAccordionContext(): AccordionContextValue {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('UIAccordion sub-components must be used inside <UIAccordion>');
  return ctx;
}

export interface AccordionItemContextValue {
  /** Значение item'а — по нему считается открытость. */
  value: string;
  /** id триггера: контент ссылается на него через aria-labelledby. */
  triggerId: string;
  /** id контента: триггер ссылается на него через aria-controls. */
  contentId: string;
}

export const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

export function useAccordionItemContext(): AccordionItemContextValue {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) throw new Error('UIAccordion.Trigger/Content must be inside <UIAccordion.Item>');
  return ctx;
}
