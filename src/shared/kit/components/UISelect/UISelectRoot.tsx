'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';
import { Portal } from '../../lib/portal';
import { useEscape } from '../../lib/use-escape';
import { useOutsideClick } from '../../lib/use-outside-click';
import { useFloatingPosition } from '../../lib/use-floating-position';
import type { Placement } from '../../lib/position';
import { UIIcons } from '../../icons';
import SelectContext from './select-context';

export interface IUISelectProps {
  readonly testId?: string;
  readonly className?: string;
  readonly children?: ReactNode;
  readonly value: string;
  readonly onValueChange: (value: string) => void;
  readonly placeholder?: string;
  readonly placement?: Placement;
  readonly gutter?: number;
  readonly disabled?: boolean;
  /**
   * A11y-подпись триггера. `role="combobox"` берёт имя только от автора (не из
   * содержимого), поэтому без неё скринридер объявит контрол безымянным.
   * Default: значение `placeholder`.
   */
  readonly ariaLabel?: string;
}

const UISelectRoot = forwardRef<HTMLDivElement, IUISelectProps>(
  (
    {
      testId,
      className,
      children,
      value,
      onValueChange,
      placeholder = 'Select...',
      placement = 'bottom-start',
      gutter = 4,
      disabled,
      ariaLabel,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<(HTMLElement | null)[]>([]);
    const listboxId = useId();

    const close = useCallback(() => {
      setOpen(false);
      setActiveIndex(-1);
    }, []);

    const toggle = useCallback(() => {
      if (disabled) return;
      setOpen((prev) => !prev);
    }, [disabled]);

    useEscape(close, open);

    const ignoreRefs = useMemo(() => [anchorRef], []);
    useOutsideClick(contentRef, close, { enabled: open, ignoreRefs });

    const style = useFloatingPosition({
      anchorRef,
      floatingRef: contentRef,
      open,
      placement,
      gutter,
      matchWidth: true,
    });

    const ctx = useMemo(
      () => ({ value, open, onSelect: onValueChange, setOpen, activeIndex, setActiveIndex, optionsRef }),
      [value, open, onValueChange, activeIndex],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (!open) return;
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev < optionsRef.current.length - 1 ? prev + 1 : 0;
            optionsRef.current[next]?.focus();
            return next;
          });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex((prev) => {
            const next = prev > 0 ? prev - 1 : optionsRef.current.length - 1;
            optionsRef.current[next]?.focus();
            return next;
          });
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (activeIndex >= 0) {
            optionsRef.current[activeIndex]?.click();
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

    return (
      <SelectContext.Provider value={ctx}>
        <div ref={ref} data-name={testId ? `UISelect-${testId}` : 'UISelect'} className={cn('relative flex w-full flex-col', className)}>
          <button
            ref={anchorRef}
            type="button"
            role="combobox"
            aria-label={ariaLabel ?? placeholder}
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={open ? listboxId : undefined}
            disabled={disabled}
            data-name="UISelectTrigger"
            onClick={toggle}
            className={cn(
              'inline-flex h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
              'placeholder:text-muted-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'hover:bg-accent hover:text-accent-foreground',
            )}
          >
            <span className={cn(!value && 'text-muted-foreground')}>
              {value || placeholder}
            </span>
            <UIIcons.ChevronDown
              data-state={open ? 'open' : 'closed'}
              className="size-4 shrink-0 opacity-50 transition-transform data-[state=open]:rotate-180"
            />
          </button>

          {open && (
            <Portal>
              <div
                ref={contentRef}
                data-name="UISelectContent"
                data-state="open"
                className={cn(
                  'z-50 min-w-(--anchor-width) rounded-lg border border-border bg-popover text-popover-foreground shadow-lg outline-none',
                )}
                style={style}
              >
                <div role="listbox" id={listboxId} data-name="UISelectList" className="p-1">
                  {children}
                </div>
              </div>
            </Portal>
          )}
        </div>
      </SelectContext.Provider>
    );
  },
);
UISelectRoot.displayName = 'UISelect';
export { UISelectRoot };
