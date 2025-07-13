import { useState } from 'react';

import { SITE_DATA } from '../../../shared/constants/site-data';

import { Node } from './Node';
import { sortByType } from './sort-by-type';
import type { NodeShape } from './types';

import styles from './file-tree.module.scss';

const FILES = SITE_DATA.files;

export const FileTree = () => {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(() => {
    const initialExpanded = new Set<string>();

    const collectExpandedItems = (nodes: NodeShape[]) => {
      nodes.forEach(node => {
        if (node.isExpanded && node.children) {
          initialExpanded.add(node.name);
        }
        if (node.children) {
          collectExpandedItems(node.children);
        }
      });
    };

    collectExpandedItems(FILES);
    return initialExpanded;
  });

  const toggleExpanded = (itemName: string) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(itemName)) {
      newExpandedItems.delete(itemName);
    } else {
      newExpandedItems.add(itemName);
    }
    setExpandedItems(newExpandedItems);
  };

  return (
    <div className={styles.fileTree}>
      {FILES.sort(sortByType).map(file => (
        <Node
          key={file.name}
          node={file}
          expandedItems={expandedItems}
          onToggleExpanded={toggleExpanded}
        />
      ))}
    </div>
  );
};
