import { UITabsRoot } from './UITabsRoot';
import { UITabsList } from './UITabsList';
import { UITabsTab } from './UITabsTab';
import { UITabsPanel } from './UITabsPanel';

export const UITabs = Object.assign(UITabsRoot, {
  List: UITabsList,
  Tab: UITabsTab,
  Panel: UITabsPanel,
});

export type { IUITabsProps } from './UITabsRoot';
export type { IUITabsListProps } from './UITabsList';
export type { IUITabProps } from './UITabsTab';
export type { IUITabPanelProps } from './UITabsPanel';
