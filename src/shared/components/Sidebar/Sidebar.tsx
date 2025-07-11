import { Header } from './Header';

import styles from './sidebar.module.scss';

export const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <Header />
    </div>
  );
};
