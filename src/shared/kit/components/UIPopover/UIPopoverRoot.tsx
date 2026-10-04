'use client';

import {
  cloneElement,
  forwardRef,
  isValidElement,
  memo,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';
import { cn } from '../../lib/cn';
import { Portal } from '../../lib/portal';
import { useEscape } from '../../lib/use-escape';
import { useOutsideClick } from '../../lib/use-outside-click';
import { useFloatingPosition } from '../../lib/use-floating-position';
import type { Placement } from '../../lib/position';

export interface IUIPopoverProps {
  readonly testId?: string;
  /** Элемент-триггер. Должен принимать `ref` и `onClick` (обычно нативный button). */
  readonly trigger: ReactElement;
  readonly children?: ReactNode;
  /** Controlled-состояние открытия. */
  readonly open?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
  /** Размещение относительно триггера (по умолчанию `bottom-start`). */
  readonly placement?: Placement;
  /** Отступ от триггера, px (по умолчанию 8). */
  readonly gutter?: number;
  /** Класс для контент-панели. */
  readonly className?: string;
  /** A11y-имя панели: `role="dialog"` без имени скринридер объявляет пустым. Default: `'Всплывающее окно'`. */
  readonly ariaLabel?: string;
  /** Альтернатива `ariaLabel`: id заголовка внутри панели. Приоритетнее `ariaLabel`. */
  readonly ariaLabelledBy?: string;
}

interface TriggerProps {
  ref?: Ref<HTMLElement>;
  onClick?: (e: React.MouseEvent) => void;
}

const UIPopoverRoot = forwardRef<HTMLDivElement, IUIPopoverProps>(
  (
    {
      testId,
      trigger,
      children,
      open: controlledOpen,
      onOpenChange,
      placement = 'bottom-start',
      gutter = 8,
      className,
      ariaLabel = 'Всплывающее окно',
      ariaLabelledBy,
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const anchorRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const contentId = useId();

    const open = controlledOpen ?? internalOpen;

    const setOpen = useCallback(
      (next: boolean) => {
        if (controlledOpen === undefined) setInternalOpen(next);
        onOpenChange?.(next);
      },
      [controlledOpen, onOpenChange],
    );

    const toggle = useCallback(() => { setOpen(!open); }, [setOpen, open]);
    const close = useCallback(() => { setOpen(false); }, [setOpen]);

    useEscape(close, open);

    const ignoreRefs = useMemo(() => [anchorRef], []);
    useOutsideClick(contentRef, close, { enabled: open, ignoreRefs });

    const style = useFloatingPosition({ anchorRef, floatingRef: contentRef, open, placement, gutter });

    const triggerProps = isValidElement(trigger) ? (trigger.props as TriggerProps) : {};
    const triggerEl = isValidElement(trigger)
      ? cloneElement(trigger, {
          ref: (node: HTMLElement | null) => {
            anchorRef.current = node;
            const prev = triggerProps.ref;
            if (typeof prev === 'function') prev(node);
            else if (prev) prev.current = node;
          },
          onClick: (e: React.MouseEvent) => {
            triggerProps.onClick?.(e);
            toggle();
          },
          'aria-expanded': open,
          'aria-haspopup': 'dialog',
          'aria-controls': open ? contentId : undefined,
        } as Partial<TriggerProps> & Record<string, unknown>)
      : trigger;

    return (
      <div ref={ref} data-name={testId ? `UIPopover-${testId}` : 'UIPopover'} className="inline-flex">
        {triggerEl}
        {open && (
          <Portal>
            <div
              ref={contentRef}
              id={contentId}
              role="dialog"
              aria-label={ariaLabelledBy == null ? ariaLabel : undefined}
              aria-labelledby={ariaLabelledBy}
              data-name="UIPopoverContent"
              data-state="open"
              className={cn(
                'z-50 min-w-48 rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none',
                className,
              )}
              style={style}
            >
              {children}
            </div>
          </Portal>
        )}
      </div>
    );
  },
);
UIPopoverRoot.displayName = 'UIPopover';
const MemoUIPopoverRoot = memo(UIPopoverRoot);
export { MemoUIPopoverRoot as UIPopoverRoot };
