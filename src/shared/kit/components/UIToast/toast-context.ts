'use client';

import { createContext, useContext, type ReactNode } from 'react';

export type ToastVariant = 'default' | 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  readonly id: string;
  readonly message: ReactNode;
  readonly variant: ToastVariant;
  readonly duration: number;
}

export interface ToastContextValue {
  toasts: Toast[];
  addToast: (message: ReactNode, variant?: ToastVariant, duration?: number) => string;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}

export default ToastContext;
