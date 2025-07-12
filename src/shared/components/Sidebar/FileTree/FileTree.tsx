import styles from './file-tree.module.scss';

const FILES = [
  {
    name: 'Arnaud Crowther',
    children: [
      {
        name: 'About',
      },
      {
        name: 'Porfolio',
      },
      {
        name: 'Contact',
      },
    ],
  },
];

export const FileTree = () => {
  return (
    <div className={styles.fileTree}>
      {FILES.map(file => (
        <div key={file.name} className={styles.file}>
          <div className={styles.fileIcon}>{file.name}</div>
          {file.children && (
            <div className={styles.children}>
              {file.children.map(child => (
                <div key={child.name} className={styles.child}>
                  {child.name}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
