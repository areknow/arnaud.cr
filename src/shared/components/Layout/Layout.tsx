import { useLayoutEffect, useRef, useState } from 'react';
import './layout.scss';

export const Layout = ({
  sidebar,
  content,
}: {
  sidebar: React.ReactNode;
  content: React.ReactNode;
}) => {
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [isDragging, setIsDragging] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useLayoutEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newWidth = e.clientX;
      const minWidth = 100;
      const maxWidth = window.innerWidth * 0.8;

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setSidebarWidth(newWidth);
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
    '--sidebar-width': `${sidebarWidth}px`,
  } as React.CSSProperties;

  return (
    <div className="layout">
      <div className="sidebar" ref={sidebarRef} style={customStyles}>
        {sidebar}
        <div className="sidebar-resizer" onMouseDown={handleMouseDown} />
      </div>
      <div className="main-content">{content}</div>
    </div>
  );
};
