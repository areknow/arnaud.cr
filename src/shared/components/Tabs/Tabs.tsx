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
];

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs">
      <div className="tabs-group">
        {tabs.map(tab => (
          <div
            key={tab.id}
            className={classNames('tabs-header-item', {
              'tabs-header-item--active': activeTab === tab.id,
            })}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="tabs-content" contentEditable>
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};
