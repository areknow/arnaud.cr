import { useState } from 'react';

import {
  Ellipsis,
  Files,
  GitPullRequest,
  type LucideIcon,
  Search,
} from 'lucide-react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import { SCROLLBAR_OPTIONS } from '../../shared/constants/scroll-bar-options';

import { FileTree } from './FileTree';
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
    label: 'ARNAUD CROWTHER',
    content: <FileTree />,
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
      <div className={styles.title}>
        <span className={styles.label}>{activeSection?.label}</span>
        <Ellipsis className={styles.icon} />
      </div>
      <OverlayScrollbarsComponent
        className={styles.content}
        options={SCROLLBAR_OPTIONS}
        element="div"
        defer
      >
        {activeSection?.content}
      </OverlayScrollbarsComponent>
    </div>
  );
};
