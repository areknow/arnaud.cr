import { createContext } from 'react';

import type { Tab } from '../types/tabs';

interface TabsContextType {
  tabs: Tab[];
  activeTab: string | null;
  addTab: (tab: Tab) => void;
  addPreviewTab: (tab: Tab) => void;
  removeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  openTab: (tabId: string) => void;
  isTabOpen: (tabId: string) => boolean;
  isPreviewTab: (tabId: string) => boolean;
  reorderTabs: (
    draggedTabId: string,
    targetTabId: string,
    position: 'left' | 'right'
  ) => void;
  moveTabToEnd: (tabId: string) => void;
}

export const TabsContext = createContext<TabsContextType | undefined>(
  undefined
);
