'use client';

import { forwardRef, type ButtonHTMLAttributes, type KeyboardEvent } from 'react';
import { cn } from '../../lib/cn';
import { tabIds, useTabsContext } from './tabs-context';

export interface IUITabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly value: string;
  readonly testId?: string;
}

const NAV_KEYS = new Set(['ArrowRight', 'ArrowLeft', 'Home', 'End']);

/**
 * Клавиатурная навигация (WAI-ARIA Tabs, manual activation): стрелки двигают фокус
 * по кругу, Home/End — на края, активация — Enter/Space (нативно у `<button>`).
 * Соседей ищем в родительском tablist — реестр в контексте не нужен.
 */
const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
  if (!NAV_KEYS.has(e.key)) return;

  const list = e.currentTarget.closest('[role="tablist"]');
  const tabs = Array.from(
    list?.querySelectorAll<HTMLButtonElement>('[role="tab"]:not(:disabled)') ?? [],
  );
  if (tabs.length === 0) return;

  const current = tabs.indexOf(e.currentTarget);
  e.preventDefault();

  let next: number;
  switch (e.key) {
    case 'ArrowRight':
      next = (current + 1) % tabs.length;
      break;
    case 'ArrowLeft':
      next = (current - 1 + tabs.length) % tabs.length;
      break;
    case 'Home':
      next = 0;
      break;
    default:
      next = tabs.length - 1;
  }

  tabs[next].focus();
};

const UITabsTab = forwardRef<HTMLButtonElement, IUITabProps>(
  ({ className, value, testId, disabled, onKeyDown, ...props }, ref) => {
    const { activeTab, onTabChange, baseId } = useTabsContext();
    const isActive = activeTab === value;
    const { tabId, panelId } = tabIds(baseId, value);

    return (
      <button
        ref={ref}
        role="tab"
        id={tabId}
        type="button"
        aria-selected={isActive}
        aria-controls={panelId}
        // roving tabindex: в таб-порядке только активная вкладка, между вкладками — стрелками
        tabIndex={isActive ? 0 : -1}
        data-state={isActive ? 'active' : 'inactive'}
        data-name={testId ? `UITab-${testId}` : 'UITab'}
        disabled={disabled}
        onClick={() => { onTabChange(value); }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (!e.defaultPrevented) handleKeyDown(e);
        }}
        className={cn(
          'inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all duration-150 ' +
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ' +
          'disabled:cursor-not-allowed disabled:opacity-50 ' +
          'data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
          className,
        )}
        {...props}
      />
    );
  },
);
UITabsTab.displayName = 'UITab';
export { UITabsTab };
