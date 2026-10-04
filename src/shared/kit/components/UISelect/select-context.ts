'use client';

import { createContext, useContext, type RefObject } from 'react';

export interface SelectContextValue {
  value: string;
  open: boolean;
  onSelect: (value: string) => void;
  setOpen: (open: boolean) => void;
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  optionsRef: RefObject<(HTMLElement | null)[]>;
}

const SelectContext = createContext<SelectContextValue | null>(null);

export function useSelectContext(): SelectContextValue {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error('UISelect sub-components must be used inside <UISelect>');
  return ctx;
}

export default SelectContext;
