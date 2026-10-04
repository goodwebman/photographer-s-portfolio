'use client';

import { createContext, useContext, type RefObject } from 'react';

export interface DropdownContextValue {
  close: () => void;
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  itemsRef: RefObject<(HTMLElement | null)[]>;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

export function useDropdownContext(): DropdownContextValue {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('UIDropdownMenu sub-components must be used inside <UIDropdownMenu>');
  return ctx;
}

export default DropdownContext;
