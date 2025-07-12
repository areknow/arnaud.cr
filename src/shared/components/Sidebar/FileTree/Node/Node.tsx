import React from 'react';

import classNames from 'classnames';

import styles from './node.module.scss';

export interface NodeShape {
  name: string;
  children?: NodeShape[];
  isExpanded?: boolean;
}

interface NodeProps {
  node: NodeShape;
  level?: number;
  expandedItems: Set<string>;
  onToggleExpanded: (itemName: string) => void;
}

export const Node: React.FC<NodeProps> = ({
  node,
  level = 0,
  expandedItems,
  onToggleExpanded,
}) => {
  const isExpanded = expandedItems.has(node.name);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={styles.node}>
      <div
        className={classNames(styles.header, {
          [styles.clickable]: hasChildren,
        })}
        onClick={() => hasChildren && onToggleExpanded(node.name)}
        style={{ '--_nest-level': level } as React.CSSProperties}
      >
        {hasChildren && (
          <span
            className={classNames(styles.icon, {
              [styles.expanded]: isExpanded,
            })}
          >
            ▶
          </span>
        )}
        <span className={styles.label}>{node.name}</span>
      </div>

      {hasChildren && (
        <div
          className={classNames(styles.children, {
            [styles.expanded]: isExpanded,
          })}
        >
          {node.children!.map(child => (
            <Node
              key={child.name}
              node={child}
              level={level + 1}
              expandedItems={expandedItems}
              onToggleExpanded={onToggleExpanded}
            />
          ))}
        </div>
      )}
    </div>
  );
};
