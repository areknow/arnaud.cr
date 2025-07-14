import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import classNames from 'classnames';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { SCROLLBAR_OPTIONS } from '../../shared/constants/scroll-bar-options';
import { useTabs } from '../../shared/hooks/useTabs';

import { EmptyState } from './EmptyState';

import styles from './tabs.module.scss';

export const Tabs = () => {
  const {
    tabs,
    activeTab,
    setActiveTab,
    removeTab,
    reorderTabs,
    moveTabToEnd,
    openTab,
    isPreviewTab,
  } = useTabs();
  const [draggedTab, setDraggedTab] = useState<string | null>(null);
  const [dropIndicator, setDropIndicator] = useState<{
    tabId: string;
    position: 'left' | 'right';
  } | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  /**
   * Scrolls the rail to make the specified tab visible.
   * @param tabId - The id of the tab to scroll to
   */
  const scrollToTab = useCallback(
    (tabId: string) => {
      if (!railRef.current) return;

      const tabIndex = tabs.findIndex(tab => tab.id === tabId);
      if (tabIndex === -1) return;

      const tabElements = railRef.current.querySelectorAll(`.${styles.tab}`);
      const tabElement = tabElements[tabIndex] as HTMLElement;
      if (!tabElement) return;

      const railRect = railRef.current.getBoundingClientRect();
      const tabRect = tabElement.getBoundingClientRect();

      if (tabRect.left < railRect.left) {
        railRef.current.scrollTo({
          left: railRef.current.scrollLeft - (railRect.left - tabRect.left),
          behavior: 'smooth',
        });
      } else if (tabRect.right > railRect.right) {
        railRef.current.scrollTo({
          left: railRef.current.scrollLeft + (tabRect.right - railRect.right),
          behavior: 'smooth',
        });
      }
    },
    [tabs]
  );

  // Auto-scroll to active tab when it changes
  useEffect(() => {
    if (activeTab) {
      const timeoutId = setTimeout(() => {
        scrollToTab(activeTab);
      }, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [activeTab, scrollToTab]);

  // Auto-scroll to the last tab when new tabs are added
  useEffect(() => {
    if (tabs.length > 0) {
      const lastTab = tabs[tabs.length - 1];
      if (lastTab && lastTab.id === activeTab) {
        const timeoutId = setTimeout(() => {
          scrollToTab(lastTab.id);
        }, 50);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [tabs.length, activeTab, tabs, scrollToTab]);

  /**
   * Handles the start of a drag operation.
   * @param event - The drag event
   * @param tabId - The id of the tab being dragged
   */
  const handleDragStart = (event: React.DragEvent, tabId: string) => {
    // Activate the tab being dragged
    setActiveTab(tabId);

    setDraggedTab(tabId);
    event.dataTransfer.effectAllowed = 'move';
    // Set the drag image offset to position cursor at top-left corner
    const dragElement = event.currentTarget as HTMLElement;
    event.dataTransfer.setDragImage(dragElement, 0, 0);
  };

  /**
   * Handles the drag over event.
   * @param event - The drag event
   * @param targetTabId - The id of the tab being dragged over
   */
  const handleDragOver = (event: React.DragEvent, targetTabId: string) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

    if (draggedTab === null) {
      setDropIndicator(null);
      return;
    }

    // Get the bounding rect of the target tab
    const targetElement = event.currentTarget as HTMLElement;
    const rect = targetElement.getBoundingClientRect();
    const mouseX = event.clientX;

    // Determine if drop is on left or right half
    const dropZone = mouseX < rect.left + rect.width / 2 ? 'left' : 'right';

    setDropIndicator({ tabId: targetTabId, position: dropZone });
  };

  /**
   * Handles the drag over event for the rail (to detect end zone).
   * @param event - The drag event
   */
  const handleRailDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';

    if (draggedTab === null) {
      setDropIndicator(null);
      return;
    }

    // Get the rail element and its bounding rect
    const railElement = event.currentTarget as HTMLElement;
    const mouseX = event.clientX;

    // Check if mouse is in the area to the right of all tabs
    const tabElements = railElement.querySelectorAll(`.${styles.tab}`);
    if (tabElements.length === 0) return;

    const lastTabElement = tabElements[tabElements.length - 1] as HTMLElement;
    const lastTabRect = lastTabElement.getBoundingClientRect();

    // If mouse is to the right of the last tab, show drop indicator on the right side of the last tab
    if (mouseX > lastTabRect.right) {
      const lastTab = tabs[tabs.length - 1];
      if (lastTab) {
        setDropIndicator({ tabId: lastTab.id, position: 'right' });
      }
    }
  };

  /**
   * Handles the drop event.
   * @param event - The drag event
   * @param targetTabId - The id of the tab being dropped on
   */
  const handleDrop = (event: React.DragEvent, targetTabId: string) => {
    event.preventDefault();

    if (draggedTab === null || draggedTab === targetTabId) {
      setDropIndicator(null);
      return;
    }

    // Get the bounding rect of the target tab
    const targetElement = event.currentTarget as HTMLElement;
    const rect = targetElement.getBoundingClientRect();
    const mouseX = event.clientX;

    // Determine if drop is on left or right half
    const dropZone = mouseX < rect.left + rect.width / 2 ? 'left' : 'right';

    // Reorder the tabs
    reorderTabs(draggedTab, targetTabId, dropZone);

    setDraggedTab(null);
    setDropIndicator(null);
  };

  /**
   * Handles the drop event for the rail (to handle end zone drops).
   * @param event - The drag event
   */
  const handleRailDrop = (event: React.DragEvent) => {
    event.preventDefault();

    if (draggedTab === null) {
      setDropIndicator(null);
      return;
    }

    // Get the rail element and check if drop is in the end zone
    const railElement = event.currentTarget as HTMLElement;
    const mouseX = event.clientX;

    // Check if mouse is in the area to the right of all tabs
    const tabElements = railElement.querySelectorAll(`.${styles.tab}`);
    if (tabElements.length === 0) return;

    const lastTabElement = tabElements[tabElements.length - 1] as HTMLElement;
    const lastTabRect = lastTabElement.getBoundingClientRect();

    // If mouse is to the right of the last tab, move to end of list
    if (mouseX > lastTabRect.right) {
      moveTabToEnd(draggedTab);
      setDraggedTab(null);
      setDropIndicator(null);
    }
  };

  /**
   * Handles the end of a drag operation.
   */
  const handleDragEnd = () => {
    setDraggedTab(null);
    setDropIndicator(null);
  };

  /**
   * Handles the leave event.
   */
  const handleDragLeave = () => {
    setDropIndicator(null);
  };

  /**
   * Handles closing a tab.
   * @param event - The click event
   * @param tabId - The id of the tab to close
   */
  const handleCloseTab = (event: React.MouseEvent, tabId: string) => {
    event.stopPropagation();
    removeTab(tabId);
  };

  /**
   * Handles double-click on a tab to fully open it.
   * @param event - The double-click event
   * @param tabId - The id of the tab to open
   */
  const handleTabDoubleClick = (event: React.MouseEvent, tabId: string) => {
    event.stopPropagation();
    openTab(tabId);
  };

  // Calculates the position of the drop indicator.
  const indicatorPosition = useMemo(() => {
    if (!dropIndicator) return null;

    const targetIndex = tabs.findIndex(tab => tab.id === dropIndicator.tabId);
    if (targetIndex === -1) return null;

    // Get the actual tab elements to measure their positions
    const tabElements = document.querySelectorAll(`.${styles.tab}`);
    if (targetIndex >= tabElements.length) return null;

    const targetElement = tabElements[targetIndex] as HTMLElement;
    const targetRect = targetElement.getBoundingClientRect();
    const railElement = document.querySelector(`.${styles.rail}`);
    const railRect = railElement?.getBoundingClientRect();
    if (!railRect) return null;

    let leftPosition: number;
    if (dropIndicator.position === 'left') {
      leftPosition = targetRect.left - railRect.left;
    } else {
      leftPosition = targetRect.right - railRect.left;
    }

    return leftPosition;
  }, [dropIndicator, tabs]);

  const indicatorStyle = {
    '--_drop-indicator-left': `${indicatorPosition}px`,
  } as React.CSSProperties;

  if (tabs.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={styles.tabs}>
      <div
        className={styles.rail}
        onDragOver={handleRailDragOver}
        onDrop={handleRailDrop}
        ref={railRef}
      >
        {dropIndicator && (
          <div className={styles.dropIndicator} style={indicatorStyle} />
        )}

        {tabs.map(tab => (
          <div
            key={tab.id}
            className={classNames(styles.tab, {
              [styles.isActive]: activeTab === tab.id,
              [styles.isPreview]: isPreviewTab(tab.id),
            })}
            onDragStart={e => handleDragStart(e, tab.id)}
            onDragOver={e => handleDragOver(e, tab.id)}
            onClick={() => setActiveTab(tab.id)}
            onDoubleClick={e => handleTabDoubleClick(e, tab.id)}
            onDrop={e => handleDrop(e, tab.id)}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragEnd}
            draggable
          >
            {tab.icon && <tab.icon className={styles.tabIcon} size={14} />}
            <span className={styles.tabLabel}>{tab.label}</span>
            <button
              className={styles.close}
              onClick={e => handleCloseTab(e, tab.id)}
            />
          </div>
        ))}
      </div>

      <OverlayScrollbarsComponent
        options={SCROLLBAR_OPTIONS}
        element="div"
        defer
      >
        <div className={styles.content}>
          {activeTab && (
            <pre className={styles.fileContent}>
              {tabs.find(tab => tab.id === activeTab)?.content}
            </pre>
          )}
        </div>
      </OverlayScrollbarsComponent>
    </div>
  );
};
