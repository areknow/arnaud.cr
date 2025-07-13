import { useLayoutEffect, useRef, useState } from 'react';

import classNames from 'classnames';

import styles from './layout.module.scss';

const DEFAULT_SIDEBAR_WIDTH = 260;
const MIN_SIDEBAR_WIDTH = 124;

export const Layout = ({
  sidebar,
  content,
}: {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}) => {
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_SIDEBAR_WIDTH);
  const [isDragging, setIsDragging] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDoubleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setSidebarWidth(DEFAULT_SIDEBAR_WIDTH); // Reset to default width
    setIsCollapsed(false);
  };

  useLayoutEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      const newWidth = event.clientX;
      const minWidth = MIN_SIDEBAR_WIDTH;
      const collapsedWidth = 4; // Width when collapsed (just enough for resizer)
      const maxWidth = window.innerWidth * 0.8;
      const edgeThreshold = 10; // How close to the edge to trigger collapse

      // Only snap to collapsed state when cursor is very close to the left edge
      if (newWidth <= edgeThreshold) {
        setSidebarWidth(collapsedWidth);
        setIsCollapsed(true);
      } else if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth);
        setIsCollapsed(false);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const customStyles = {
    '--_sidebar-width': `${sidebarWidth}px`,
  } as React.CSSProperties;

  return (
    <div className={styles.layout}>
      <div
        className={classNames(styles.sidebar, {
          [styles.isCollapsed]: isCollapsed,
          [styles.isDragging]: isDragging,
        })}
        ref={sidebarRef}
        style={customStyles}
      >
        {sidebar}
        <div
          className={styles.resizer}
          onMouseDown={handleMouseDown}
          onDoubleClick={handleDoubleClick}
        />
      </div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};
