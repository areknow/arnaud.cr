import type { Section } from '../Sidebar';

import { TooltipAction } from './TooltipAction';

import styles from './header.module.scss';

interface HeaderProps {
  sections: Section[];
  activeSection: string;
  onActionClick: (section: string) => void;
}

export const Header = ({
  sections,
  activeSection,
  onActionClick,
}: HeaderProps) => {
  return (
    <div className={styles.header}>
      {sections.map(section => (
        <div className={styles.action} key={section.id}>
          <TooltipAction
            label={section.tooltip}
            icon={section.icon}
            onClick={() => onActionClick(section.id)}
            isActive={activeSection === section.id}
          />
        </div>
      ))}
    </div>
  );
};
