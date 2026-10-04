'use client';

import { createContext, useContext } from 'react';

export interface TabsContextValue {
  activeTab: string;
  onTabChange: (value: string) => void;
  /** Базовый id группы — из него строятся id таба и панели для aria-связки. */
  baseId: string;
}

/** id пары tab/panel. Пробелы в value недопустимы в HTML id — схлопываем в дефис. */
export const tabIds = (baseId: string, value: string): { tabId: string; panelId: string } => {
  const slug = value.replace(/\s+/g, '-');
  return { tabId: `${baseId}tab-${slug}`, panelId: `${baseId}panel-${slug}` };
};

const TabsContext = createContext<TabsContextValue | null>(null);

export function useTabsContext(): TabsContextValue {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('UITabs sub-components must be used inside <UITabs>');
  return ctx;
}

export default TabsContext;
