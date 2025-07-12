import { useState } from 'react';

import { Node } from './Node';
import type { NodeShape } from './Node/Node';

import styles from './file-tree.module.scss';

const FILES: NodeShape[] = [
  {
    name: 'Arnaud Crowther',
    isExpanded: true,
    children: [
      {
        name: 'About',
      },
      {
        name: 'Porfolio',
        children: [
          {
            name: 'Project 1',
          },
          {
            name: 'Project 2',
            children: [
              {
                name: 'Sub Project A',
              },
              {
                name: 'Sub Project B',
              },
            ],
          },
        ],
      },
      {
        name: 'Contact',
      },
    ],
  },
  {
    name: 'Arnaud Crowther2',
    children: [
      {
        name: 'Aboutx',
      },
      {
        name: 'Porfoliox',
      },
      {
        name: 'Contactx',
      },
    ],
  },
];

export const FileTree = () => {
  // Expand isExpanded items
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
      {FILES.map(file => (
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
