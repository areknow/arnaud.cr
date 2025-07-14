import React from 'react';

import classNames from 'classnames';

import { useTabs } from '../../../../shared/hooks/useTabs';
import { sortByType } from '../sort-by-type';
import type { NodeShape } from '../types';

import styles from './node.module.scss';

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
  const { addTab, addPreviewTab, openTab, isTabOpen, activeTab } = useTabs();
  const isExpanded = expandedItems.has(node.name);
  const hasChildren = node.children && node.children.length > 0;
  const hasContent = node.content !== undefined;

  // Single click to open file as preview tab
  const handleClick = () => {
    if (hasChildren) {
      onToggleExpanded(node.name);
    } else if (hasContent) {
      addPreviewTab({
        id: node.name,
        label: node.name,
        content: node.content!,
        icon: node.icon,
      });
    }
  };

  // Double click to open file in a new tab
  const handleDoubleClick = () => {
    if (hasContent) {
      if (isTabOpen(node.name)) {
        openTab(node.name);
      } else {
        addTab({
          id: node.name,
          label: node.name,
          content: node.content!,
          icon: node.icon,
        });
      }
    }
  };

  const isFileActive = hasContent ? activeTab === node.name : false;

  return (
    <div className={styles.node}>
      <div
        className={classNames(styles.header, {
          [styles.isOpen]: isFileActive,
        })}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        style={{ '--_nest-level': level } as React.CSSProperties}
      >
        {hasChildren ? (
          <span
            className={classNames(styles.icon, {
              [styles.expanded]: isExpanded,
            })}
          />
        ) : (
          <div className={styles.fileIcon}>{node.icon && <node.icon />}</div>
        )}
        <span className={styles.label}>{node.name}</span>
      </div>

      {hasChildren && (
        <div
          className={classNames(styles.children, {
            [styles.expanded]: isExpanded,
          })}
        >
          {node.children!.sort(sortByType).map(child => (
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
