'use client';

import { forwardRef, memo, useCallback, useRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { Portal } from '../../lib/portal';
import { useEscape } from '../../lib/use-escape';
import { useFocusTrap } from '../../lib/use-focus-trap';
import { useScrollLock } from '../../lib/use-scroll-lock';
import { useDialogContext } from './dialog-context';

export interface IUIDialogContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Не закрывать при клике вне (по умолчанию false). */
  readonly persistent?: boolean;
}

const UIDialogContent = forwardRef<HTMLDivElement, IUIDialogContentProps>(
  ({ className, persistent = false, children, ...props }, _ref) => {
    const { onClose, labelledBy, describedBy } = useDialogContext();
    const panelRef = useRef<HTMLDivElement>(null);

    useEscape(onClose);
    useScrollLock(true);
    useFocusTrap(panelRef, true);

    const handleOutsideClick = useCallback(
      (e: React.MouseEvent) => {
        if (persistent) return;
        if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
          onClose();
        }
      },
      [persistent, onClose],
    );

    return (
      <Portal>
        <div
          data-name="UIDialogContent"
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="presentation"
          onClick={handleOutsideClick}
          onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            // Имя диалога — из UIDialog.Title; если его нет, потребитель обязан
            // передать aria-label сам (props идут ниже и перебивают эти значения).
            aria-labelledby={labelledBy ?? undefined}
            aria-describedby={describedBy ?? undefined}
            data-name="UIDialogPanel"
            className={cn(
              'relative w-full max-w-lg rounded-lg border border-border bg-background p-6 shadow-lg',
              className,
            )}
            {...props}
          >
            {children}
          </div>
        </div>
      </Portal>
    );
  },
);
UIDialogContent.displayName = 'UIDialogContent';
const MemoUIDialogContent = memo(UIDialogContent);
export { MemoUIDialogContent as UIDialogContent };
