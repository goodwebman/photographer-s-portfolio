'use client';

import {
  cloneElement,
  forwardRef,
  isValidElement,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import { Portal } from '../../lib/portal';
import { useEscape } from '../../lib/use-escape';
import { computePosition, type Placement } from '../../lib/position';
import DropdownContext from './dropdown-menu-context';

export interface IUIDropdownMenuProps {
  readonly testId?: string;
  readonly trigger: ReactElement;
  readonly children?: ReactNode;
  readonly open?: boolean;
  readonly onOpenChange?: (open: boolean) => void;
  readonly placement?: Placement;
  readonly gutter?: number;
}

function DropdownPortal({
  open,
  contentRef,
  children,
}: {
  open: boolean;
  contentRef: React.RefObject<HTMLDivElement | null>;
  children: ReactNode;
}) {
  if (!open) return null;

  return (
    <Portal>
      <div
        ref={contentRef}
        role="menu"
        data-name="UIDropdownContent"
        className={cn(
          'z-50 min-w-44 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg outline-none',
          'data-[state=open]:animate-in data-[state=closed]:animate-out',
        )}
        style={{ position: 'fixed', opacity: 0 }}
      >
        {children}
      </div>
    </Portal>
  );
}

const UIDropdownMenuRoot = forwardRef<HTMLDivElement, IUIDropdownMenuProps>(
  ({ testId, trigger, children, open: controlledOpen, onOpenChange, placement = 'bottom-start', gutter = 4 }, ref) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const anchorRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLElement | null)[]>([]);

    const open = controlledOpen ?? internalOpen;

    const setOpen = useCallback(
      (next: boolean) => {
        if (controlledOpen === undefined) setInternalOpen(next);
        if (!next) setActiveIndex(-1);
        onOpenChange?.(next);
      },
      [controlledOpen, onOpenChange],
    );

    const close = useCallback(() => { setOpen(false); }, [setOpen]);
    const toggle = useCallback(() => { setOpen(!open); }, [setOpen, open]);
    useEscape(close, open);

    const ctx = useMemo(() => ({ close, activeIndex, setActiveIndex, itemsRef }), [close, activeIndex]);

    useEffect(() => {
      if (!open) return;
      const anchor = anchorRef.current;
      const content = contentRef.current;
      if (!anchor || !content) return;

      let raf = 0;
      let shown = false;
      const position = () => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const result = computePosition(
            anchor.getBoundingClientRect(),
            { width: content.offsetWidth, height: content.offsetHeight },
            placement,
            { gutter },
          );
          content.style.left = `${String(result.left)}px`;
          content.style.top = `${String(result.top)}px`;
          // показываем только после первой простановки координат — иначе виден
          // кадр с меню в (0,0) до позиционирования.
          if (!shown) {
            content.style.opacity = '1';
            shown = true;
          }
        });
      };

      position();

      // Держим меню строго под триггером при скролле и ресайзе. Scroll слушаем на
      // capture-фазе: событие не всплывает, capture ловит скролл в любом предке
      // (включая вложенные scroll-контейнеры), а не только в window.
      window.addEventListener('resize', position);
      window.addEventListener('scroll', position, true);

      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', position);
        window.removeEventListener('scroll', position, true);
      };
    }, [open, placement, gutter]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (!open) return;
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev < itemsRef.current.length - 1 ? prev + 1 : 0;
            itemsRef.current[next]?.focus();
            return next;
          });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev > 0 ? prev - 1 : itemsRef.current.length - 1;
            itemsRef.current[next]?.focus();
            return next;
          });
        } else if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (activeIndex >= 0) {
            itemsRef.current[activeIndex]?.click();
            close();
          }
        }
      },
      [open, activeIndex, close],
    );

    useEffect(() => {
      document.addEventListener('keydown', handleKeyDown);
      return () => { document.removeEventListener('keydown', handleKeyDown); };
    }, [handleKeyDown]);

    const triggerEl = isValidElement(trigger)
      ? cloneElement(trigger, {
          ref: (node: HTMLElement | null) => { anchorRef.current = node; },
          onClick: (e: MouseEvent) => {
            (trigger.props as { onClick?: (e: MouseEvent) => void }).onClick?.(e);
            toggle();
          },
          'aria-expanded': open,
          'aria-haspopup': 'menu' as const,
        } as Record<string, unknown>)
      : trigger;

    return (
      <DropdownContext.Provider value={ctx}>
        <div ref={ref} data-name={testId ? `UIDropdownMenu-${testId}` : 'UIDropdownMenu'} className="inline-flex">
          {triggerEl}
          <DropdownPortal open={open} contentRef={contentRef}>
            {children}
          </DropdownPortal>
        </div>
      </DropdownContext.Provider>
    );
  },
);
UIDropdownMenuRoot.displayName = 'UIDropdownMenu';
const MemoUIDropdownMenuRoot = memo(UIDropdownMenuRoot);
export { MemoUIDropdownMenuRoot as UIDropdownMenuRoot };
