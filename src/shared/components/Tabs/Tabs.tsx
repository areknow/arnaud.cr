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
  const [dropTarget, setDropTarget] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, tabId: number) => {
    setDraggedTab(tabId);
    e.dataTransfer.effectAllowed = 'move';

    // Create a custom drag image positioned at cursor
    const dragElement = e.currentTarget as HTMLElement;

    // Set the drag image offset to position it at cursor (top-left)
    e.dataTransfer.setDragImage(dragElement, 0, 0);
  };

  const handleDragOver = (e: React.DragEvent, tabId: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    if (draggedTab !== null && draggedTab !== tabId) {
      setDropTarget(tabId);
    }
  };

  const handleDrop = (e: React.DragEvent, targetTabId: number) => {
    e.preventDefault();

    if (draggedTab === null || draggedTab === targetTabId) {
      setDropTarget(null);
      return;
    }

    const draggedIndex = tabList.findIndex(tab => tab.id === draggedTab);
    const targetIndex = tabList.findIndex(tab => tab.id === targetTabId);

    const newTabList = [...tabList];
    const [draggedItem] = newTabList.splice(draggedIndex, 1);
    newTabList.splice(targetIndex, 0, draggedItem);

    setTabList(newTabList);
    setDraggedTab(null);
    setDropTarget(null);
  };

  const handleDragEnd = () => {
    setDraggedTab(null);
    setDropTarget(null);
  };

  const handleDragLeave = () => {
    setDropTarget(null);
  };

  return (
    <div className="tabs">
      <div className="tabs-group">
        {tabList.map((tab, index) => (
          <div key={tab.id} style={{ position: 'relative' }}>
            {dropTarget === tab.id && draggedTab !== null && (
              <div
                className="tabs-drop-indicator"
                style={{
                  left: index === 0 ? '-1px' : '0px',
                  right: index === tabList.length - 1 ? '-1px' : 'auto',
                }}
              />
            )}
            <div
              className={classNames('tabs-header-item', {
                'tabs-header-item--active': activeTab === tab.id,
              })}
              onClick={() => setActiveTab(tab.id)}
              draggable
              onDragStart={e => handleDragStart(e, tab.id)}
              onDragOver={e => handleDragOver(e, tab.id)}
              onDrop={e => handleDrop(e, tab.id)}
              onDragEnd={handleDragEnd}
              onDragLeave={handleDragLeave}
            >
              {tab.label}
            </div>
          </div>
        ))}
        {dropTarget === null && draggedTab !== null && (
          <div
            className="tabs-drop-indicator"
            style={{
              position: 'absolute',
              right: '-1px',
              top: 0,
              bottom: 0,
              width: '2px',
              backgroundColor: 'white',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
      <div className="tabs-content" contentEditable>
        {tabList.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
