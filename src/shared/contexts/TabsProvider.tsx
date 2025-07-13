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
      return [...prevTabs, { ...tab, isPreview: false }];
    });
    setActiveTabState(tab.id);
  };

  /**
   * Adds a preview tab. If there's already a preview tab, it replaces it.
   * @param tab - The tab to add as preview.
   */
  const addPreviewTab = (tab: Tab) => {
    setTabs(prevTabs => {
      // Remove any existing preview tab
      const tabsWithoutPreview = prevTabs.filter(t => !t.isPreview);

      // Check if this tab already exists as a non-preview tab
      const existingTab = tabsWithoutPreview.find(t => t.id === tab.id);
      if (existingTab) {
        // If it exists, just make it active
        setActiveTabState(tab.id);
        return prevTabs;
      }

      // Add the new preview tab
      return [...tabsWithoutPreview, { ...tab, isPreview: true }];
    });
    setActiveTabState(tab.id);
  };

  /**
   * Opens a tab (removes preview status).
   * @param tabId - The id of the tab to open.
   */
  const openTab = (tabId: string) => {
    setTabs(prevTabs => {
      return prevTabs.map(tab =>
        tab.id === tabId ? { ...tab, isPreview: false } : tab
      );
    });
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
   * Checks if a tab is in preview mode.
   * @param tabId - The id of the tab to check.
   * @returns True if the tab is in preview mode, false otherwise.
   */
  const isPreviewTab = (tabId: string) => {
    const tab = tabs.find(t => t.id === tabId);
    return tab?.isPreview || false;
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
    addPreviewTab,
    removeTab,
    setActiveTab,
    openTab,
    isTabOpen,
    isPreviewTab,
    reorderTabs,
    moveTabToEnd,
  };

  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};
