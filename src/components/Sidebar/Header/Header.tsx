import classNames from 'classnames';

import type { Section } from '../Sidebar';

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
        <div
          className={classNames(styles.action, {
            [styles.active]: activeSection === section.id,
          })}
          key={section.id}
        >
          <div
            className={styles.iconContainer}
            onClick={() => onActionClick(section.id)}
          >
            <section.icon className={styles.icon} size={14} />
          </div>
        </div>
      ))}
    </div>
  );
};
