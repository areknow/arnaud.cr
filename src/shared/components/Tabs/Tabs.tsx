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

    // Create a custom drag image positioned at cursor
    const dragElement = e.currentTarget as HTMLElement;

    // Set the drag image offset to position it at cursor (top-left)
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

    const draggedIndex = tabList.findIndex(tab => tab.id === draggedTab);
    let targetIndex = tabList.findIndex(tab => tab.id === targetTabId);

    const newTabList = [...tabList];
    const [draggedItem] = newTabList.splice(draggedIndex, 1);

    // Adjust target index if the dragged item was before the target
    if (draggedIndex < targetIndex) {
      targetIndex -= 1;
    }

    newTabList.splice(targetIndex, 0, draggedItem);

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
          <div key={tab.id} style={{ position: 'relative' }}>
            <div
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
          </div>
        ))}
      </div>
      <div className="tabs-content" contentEditable>
        {tabList.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
