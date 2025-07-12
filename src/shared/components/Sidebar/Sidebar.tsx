import { useState } from 'react';

import { Files, GitPullRequest, type LucideIcon, Search } from 'lucide-react';

import { Header } from './Header';

import styles from './sidebar.module.scss';

export type Section = {
  icon: LucideIcon;
  id: string;
  label: string;
  content: React.ReactNode;
};

const SECTIONS: Section[] = [
  {
    icon: Files,
    id: 'explorer',
    label: 'Explorer',
    content: <div>file tree</div>,
  },
  {
    icon: Search,
    id: 'search',
    label: 'Search',
    content: <div>assistant?</div>,
  },
  {
    icon: GitPullRequest,
    id: 'source-control',
    label: 'Source Control',
    content: <div>fake git</div>,
  },
];

export const Sidebar = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>('explorer');

  const activeSection = SECTIONS.find(
    section => section.id === activeSectionId
  );

  return (
    <div className={styles.sidebar}>
      <Header
        sections={SECTIONS}
        activeSection={activeSectionId}
        onActionClick={setActiveSectionId}
      />
      <div className={styles.content}>
        <div className={styles.title}>{activeSection?.label}</div>
        {activeSection?.content}
      </div>
    </div>
  );
};
