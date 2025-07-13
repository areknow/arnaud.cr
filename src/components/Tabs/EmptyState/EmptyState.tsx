import styles from './empty-state.module.scss';

export const EmptyState = () => {
  return (
    <div className={styles.emptyState}>
      <h2>Welcome to Arnaud's Portfolio</h2>
      <p>Click on any file in the sidebar to open it in a tab.</p>
    </div>
  );
};
