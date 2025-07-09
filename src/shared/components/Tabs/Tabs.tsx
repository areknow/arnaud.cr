import { useState } from 'react';

import classNames from 'classnames';

import './tabs.scss';

interface Tab {
  id: number;
  label: string;
  content: React.ReactNode;
}

const tabs: Tab[] = [
  { id: 0, label: 'Tab 1', content: <div>Content 1</div> },
  { id: 1, label: 'Tab 2', content: <div>Content 2</div> },
  { id: 2, label: 'Tab 3', content: <div>Content 3</div> },
  { id: 3, label: 'Tab 4', content: <div>Content 4</div> },
];

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [tabList, setTabList] = useState(tabs);
  const [draggedTab, setDraggedTab] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, tabId: number) => {
    setDraggedTab(tabId);
    e.dataTransfer.effectAllowed = 'move';

    // Set the drag image offset to position cursor at top-left corner
    const dragElement = e.currentTarget as HTMLElement;
    e.dataTransfer.setDragImage(dragElement, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetTabId: number) => {
    e.preventDefault();

    if (draggedTab === null || draggedTab === targetTabId) {
      return;
    }

    // Get the bounding rect of the target tab
    const targetElement = e.currentTarget as HTMLElement;
    const rect = targetElement.getBoundingClientRect();
    const mouseX = e.clientX;

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
  };

  const handleDragEnd = () => {
    setDraggedTab(null);
  };

  return (
    <div className="tabs">
      <div className="tabs-group">
        {tabList.map(tab => (
          <div
            key={tab.id}
            className={classNames('tabs-header-item', {
              'tabs-header-item--active': activeTab === tab.id,
            })}
            onClick={() => setActiveTab(tab.id)}
            draggable
            onDragStart={e => handleDragStart(e, tab.id)}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, tab.id)}
            onDragEnd={handleDragEnd}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="tabs-content" contentEditable>
        {tabList.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
