import React, { useState } from 'react';

import type { ReactNode } from 'react';

import type { Tab } from '../types/tabs';

import { TabsContext } from './TabsContext';

interface TabsProviderProps {
  children: ReactNode;
}

export const TabsProvider: React.FC<TabsProviderProps> = ({ children }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTabState] = useState<string | null>(null);

  /**
   * Adds a new tab to the tabs list.
   * @param tab - The tab to add.
   */
  const addTab = (tab: Tab) => {
    setTabs(prevTabs => {
      const existingTab = prevTabs.find(t => t.id === tab.id);
      if (existingTab) {
        return prevTabs;
      }
      return [...prevTabs, tab];
    });
    setActiveTabState(tab.id);
  };

  /**
   * Removes a tab from the tabs list.
   * @param tabId - The id of the tab to remove.
   */
  const removeTab = (tabId: string) => {
    setTabs(prevTabs => {
      const newTabs = prevTabs.filter(tab => tab.id !== tabId);

      // If the active tab is being removed, switch to the next tab
      if (activeTab === tabId) {
        const remainingTabs = newTabs.filter(tab => tab.id !== tabId);
        if (remainingTabs.length > 0) {
          setActiveTabState(remainingTabs[0].id);
        } else {
          setActiveTabState(null);
        }
      }

      return newTabs;
    });
  };

  /**
   * Sets the active tab.
   * @param tabId - The id of the tab to set as active.
   */
  const setActiveTab = (tabId: string) => {
    setActiveTabState(tabId);
  };

  /**
   * Checks if a tab is open.
   * @param tabId - The id of the tab to check.
   * @returns True if the tab is open, false otherwise.
   */
  const isTabOpen = (tabId: string) => {
    return tabs.some(tab => tab.id === tabId);
  };

  /**
   * Reorders the tabs.
   * @param draggedTabId - The id of the tab to drag.
   * @param targetTabId - The id of the tab to drop on.
   * @param position - The position to drop the tab.
   */
  const reorderTabs = (
    draggedTabId: string,
    targetTabId: string,
    position: 'left' | 'right'
  ) => {
    setTabs(prevTabs => {
      const draggedIndex = prevTabs.findIndex(tab => tab.id === draggedTabId);
      const targetIndex = prevTabs.findIndex(tab => tab.id === targetTabId);

      if (draggedIndex === -1 || targetIndex === -1) {
        return prevTabs;
      }

      // Determine the insertion index based on drop zone
      let insertionIndex: number;
      if (position === 'left') {
        insertionIndex = targetIndex;
      } else {
        insertionIndex = targetIndex + 1;
      }

      // Adjust insertion index if the dragged item was before the insertion point
      if (draggedIndex < insertionIndex) {
        insertionIndex -= 1;
      }

      const newTabs = [...prevTabs];
      const [draggedItem] = newTabs.splice(draggedIndex, 1);
      newTabs.splice(insertionIndex, 0, draggedItem);

      return newTabs;
    });
  };

  /**
   * Moves a tab to the end of the tabs list.
   * @param tabId - The id of the tab to move to the end.
   */
  const moveTabToEnd = (tabId: string) => {
    setTabs(prevTabs => {
      const draggedIndex = prevTabs.findIndex(tab => tab.id === tabId);
      if (draggedIndex === -1) {
        return prevTabs;
      }

      const newTabs = [...prevTabs];
      const [draggedItem] = newTabs.splice(draggedIndex, 1);
      newTabs.push(draggedItem);

      return newTabs;
    });
  };

  const value = {
    tabs,
    activeTab,
    addTab,
    removeTab,
    setActiveTab,
    isTabOpen,
    reorderTabs,
    moveTabToEnd,
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};
