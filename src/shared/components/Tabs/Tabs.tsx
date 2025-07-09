import { useMemo, useState } from 'react';

import classNames from 'classnames';

import './tabs.scss';

const FAKE_TABS: Tab[] = [
  { id: 0, label: 'Tab 1', content: <div>Content 1</div> },
  { id: 1, label: 'Tab 2', content: <div>Content 2</div> },
  { id: 2, label: 'Tab 3', content: <div>Content 3</div> },
  { id: 3, label: 'Tab 4', content: <div>Content 4</div> },
];

interface Tab {
  id: number;
  label: string;
  content: React.ReactNode;
}

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabList, setTabList] = useState(FAKE_TABS);
  const [draggedTab, setDraggedTab] = useState<number | null>(null);
  const [dropIndicator, setDropIndicator] = useState<{
    tabId: number;
    position: 'left' | 'right';
  } | null>(null);

  /**
   * Handles the start of a drag operation.
   * @param event - The drag event
   * @param tabId - The id of the tab being dragged
   */
  const handleDragStart = (event: React.DragEvent, tabId: number) => {
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
  const handleDragOver = (event: React.DragEvent, targetTabId: number) => {
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
   * Handles the drop event.
   * @param event - The drag event
   * @param targetTabId - The id of the tab being dropped on
   */
  const handleDrop = (event: React.DragEvent, targetTabId: number) => {
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

    const draggedIndex = tabList.findIndex(tab => tab.id === draggedTab);
    const targetIndex = tabList.findIndex(tab => tab.id === targetTabId);

    // Determine the insertion index based on drop zone
    let insertionIndex: number;
    if (dropZone === 'left') {
      insertionIndex = targetIndex;
    } else {
      insertionIndex = targetIndex + 1;
    }

    // Adjust insertion index if the dragged item was before the insertion point
    if (draggedIndex < insertionIndex) {
      insertionIndex -= 1;
    }

    const newTabList = [...tabList];
    const [draggedItem] = newTabList.splice(draggedIndex, 1);
    newTabList.splice(insertionIndex, 0, draggedItem);

    setTabList(newTabList);
    setDraggedTab(null);
    setDropIndicator(null);
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

  // Calculates the position of the drop indicator.
  const indicatorPosition = useMemo(() => {
    if (!dropIndicator) return null;

    const targetIndex = tabList.findIndex(
      tab => tab.id === dropIndicator.tabId
    );
    if (targetIndex === -1) return null;

    // Get the actual tab elements to measure their positions
    const tabElements = document.querySelectorAll('.tab');
    if (targetIndex >= tabElements.length) return null;

    const targetElement = tabElements[targetIndex] as HTMLElement;
    const targetRect = targetElement.getBoundingClientRect();
    const railRect = document.querySelector('.rail')?.getBoundingClientRect();
    if (!railRect) return null;

    let leftPosition: number;
    if (dropIndicator.position === 'left') {
      leftPosition = targetRect.left - railRect.left;
    } else {
      leftPosition = targetRect.right - railRect.left;
    }

    return leftPosition;
  }, [dropIndicator, tabList]);

  const indicatorStyle = {
    '--_drop-indicator-left': `${indicatorPosition}px`,
  } as React.CSSProperties;

  return (
    <div className="tabs">
      <div className="rail" style={{ position: 'relative' }}>
        {dropIndicator && (
          <div className="drop-indicator" style={indicatorStyle} />
        )}

        {tabList.map(tab => (
          <div
            key={tab.id}
            className={classNames('tab', {
              'tab--is-active': activeTab === tab.id,
            })}
            onClick={() => setActiveTab(tab.id)}
            onDragStart={e => handleDragStart(e, tab.id)}
            onDragOver={e => handleDragOver(e, tab.id)}
            onDrop={e => handleDrop(e, tab.id)}
            onDragLeave={handleDragLeave}
            onDragEnd={handleDragEnd}
            draggable
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div
        className="content"
        contentEditable
        suppressContentEditableWarning={true}
      >
        {tabList.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
