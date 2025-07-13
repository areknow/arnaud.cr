import { useState } from 'react';

import { Node } from './Node';
import { sortByType } from './sort-by-type';
import type { NodeShape } from './types';

import styles from './file-tree.module.scss';

const FILES: NodeShape[] = [
  {
    name: 'README.md',
  },
  {
    name: 'projects',
    isExpanded: true,
    children: [
      {
        name: 'arnaud.cr',
      },
      {
        name: 'sway',
        children: [
          {
            name: 'sway-ios.md',
          },
          {
            name: 'sway-marketing-web.md',
          },
        ],
      },
    ],
  },
  {
    name: 'contact.ts',
  },
  {
    name: 'blog.css',
  },
  {
    name: 'package.json',
  },
];

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
