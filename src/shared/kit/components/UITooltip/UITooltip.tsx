'use client';

import {
  cloneElement,
  forwardRef,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import { Portal } from '../../lib/portal';
import { useEscape } from '../../lib/use-escape';
import { useFloatingPosition } from '../../lib/use-floating-position';
import type { Placement } from '../../lib/position';

// ─── Tooltip ──────────────────────────────────────────────────────────────────

export interface IUITooltipProps {
  readonly testId?: string;
  readonly children?: ReactNode;
  readonly className?: string;
  /** Текст подсказки. */
  readonly content?: ReactNode;
  /** Позиционирование (по умолчанию 'top'). */
  readonly placement?: Placement;
  /** Отступ в px (по умолчанию 6). */
  readonly gutter?: number;
  /** Задержка показа в ms (по умолчанию 300). */
  readonly delay?: number;
  /** Открыт принудительно (controlled mode). */
  readonly open?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
}

const UITooltipRoot = forwardRef<HTMLSpanElement, IUITooltipProps>(
  (
    { testId, children, content, placement = 'top', gutter = 6, delay = 300, open: controlledOpen, onOpenChange, className },
    _ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const anchorRef = useRef<HTMLSpanElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const tooltipId = useId();

    const open = controlledOpen ?? internalOpen;
    const visible = open && content != null && content !== false;

    const setOpen = useCallback(
      (next: boolean) => {
        if (controlledOpen === undefined) {
          setInternalOpen(next);
        }
        onOpenChange?.(next);
      },
      [controlledOpen, onOpenChange],
    );

    const show = useCallback(() => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => { setOpen(true); }, delay);
    }, [delay, setOpen]);

    const hide = useCallback(() => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setOpen(false);
    }, [setOpen]);

    useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, []);

    // Escape закрывает подсказку — требование WAI-ARIA Tooltip Pattern
    useEscape(hide, visible);

    // Описание вешаем на сам триггер: aria-describedby на не-интерактивной обёртке
    // скринридер при фокусе кнопки не озвучит. Ссылаемся на id только пока тултип в DOM.
    const anchoredChildren =
      visible && isValidElement(children)
        ? cloneElement(children as ReactElement<{ 'aria-describedby'?: string }>, {
            'aria-describedby': tooltipId,
          })
        : children;

    return (
      <span
        ref={anchorRef}
        data-name={testId ? `UITooltip-${testId}` : 'UITooltip'}
        className={cn('relative inline-flex', className)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {anchoredChildren}
        {visible && (
          <TooltipPortal
            id={tooltipId}
            content={content}
            anchorRef={anchorRef}
            placement={placement}
            gutter={gutter}
          />
        )}
      </span>
    );
  },
);
UITooltipRoot.displayName = 'UITooltip';

// ─── TooltipPortal (internal) ────────────────────────────────────────────────

interface TooltipPortalProps {
  content: ReactNode;
  anchorRef: React.RefObject<HTMLElement | null>;
  placement: Placement;
  gutter: number;
  /** id, на который ссылается aria-describedby триггера. */
  id?: string;
}

function TooltipPortal({ content, anchorRef, placement, gutter, id }: TooltipPortalProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const style = useFloatingPosition({ anchorRef, floatingRef: contentRef, open: true, placement, gutter });

  return (
    <Portal>
      <div
        ref={contentRef}
        id={id}
        role="tooltip"
        data-name="UITooltipContent"
        className={cn(
          'z-50 max-w-xs rounded-md border border-border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md',
          'animate-in fade-in-0 zoom-in-95',
        )}
        style={style}
      >
        {content}
      </div>
    </Portal>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export const UITooltip = Object.assign(UITooltipRoot, {
  Content: TooltipPortal,
});
