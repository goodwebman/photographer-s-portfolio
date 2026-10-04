'use client';

import { forwardRef, useId, useMemo, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import TabsContext from './tabs-context';

export interface IUITabsProps extends HTMLAttributes<HTMLDivElement> {
  readonly testId?: string;
  readonly children?: ReactNode;
  readonly value: string;
  readonly onValueChange: (value: string) => void;
}

const UITabsRoot = forwardRef<HTMLDivElement, IUITabsProps>(
  ({ className, testId, value, onValueChange, children, ...props }, ref) => {
    const baseId = useId();
    const ctx = useMemo(
      () => ({ activeTab: value, onTabChange: onValueChange, baseId }),
      [value, onValueChange, baseId],
    );

    return (
      <TabsContext.Provider value={ctx}>
        <div
          ref={ref}
          data-name={testId ? `UITabs-${testId}` : 'UITabs'}
          className={cn('flex flex-col gap-2', className)}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
UITabsRoot.displayName = 'UITabs';
export { UITabsRoot };
