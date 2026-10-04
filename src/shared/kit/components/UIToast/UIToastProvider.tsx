'use client';

import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react';
import { Portal } from '../../lib/portal';
import { UIToastItem } from './UIToastItem';
import { type Toast, type ToastVariant } from './toast-context';
import ToastContext, { useToast } from './toast-context';

export interface IToastProviderProps {
  readonly children?: ReactNode;
}

let toastCounter = 0;

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <Portal>
      <div
        data-name="UIToastContainer"
        className="fixed bottom-4 right-4 z-60 flex flex-col gap-2 max-w-sm"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((t) => (
          <UIToastItem key={t.id} toast={t} onDismiss={() => { removeToast(t.id); }} />
        ))}
      </div>
    </Portal>
  );
}

export function UIToastProvider({ children }: IToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const addToast = useCallback(
    (message: ReactNode, variant: ToastVariant = 'default', duration = 4000): string => {
      toastCounter++;
      const id = `toast-${String(toastCounter)}`;
      setToasts((prev) => [...prev, { id, message, variant, duration }]);

      if (duration > 0) {
        const timer = setTimeout(() => { removeToast(id); }, duration);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [removeToast],
  );

  const ctx = useMemo(() => ({ toasts, addToast, removeToast }), [toasts, addToast, removeToast]);

  return (
    <ToastContext.Provider value={ctx}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}
