'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { tabIds, useTabsContext } from './tabs-context';

export interface IUITabPanelProps extends HTMLAttributes<HTMLDivElement> {
  readonly value: string;
}

const UITabsPanel = forwardRef<HTMLDivElement, IUITabPanelProps>(
  ({ className, value, ...props }, ref) => {
    const { activeTab, baseId } = useTabsContext();
    if (activeTab !== value) {
      return null;
    }
    const { tabId, panelId } = tabIds(baseId, value);

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId}
        // панель фокусируема: после выбора вкладки Tab уводит фокус в её содержимое
        tabIndex={0}
        data-name="UITabPanel"
        className={cn(
          'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className,
        )}
        {...props}
      />
    );
  },
);
UITabsPanel.displayName = 'UITabPanel';
export { UITabsPanel };
