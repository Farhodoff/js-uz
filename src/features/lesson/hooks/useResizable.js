import { useState, useRef, useCallback } from 'react';

export function useResizable(initialWidth = 50, minWidth = 20, maxWidth = 80, sidebarOffset = 270) {
  const [leftWidth, setLeftWidth] = useState(initialWidth);
  const isResizing = useRef(false);

  const handleMouseMove = useCallback((e) => {
    if (!isResizing.current) return;
    const offsetLeft = window.innerWidth > 768 ? sidebarOffset : 0;
    const newWidth = ((e.clientX - offsetLeft) / (window.innerWidth - offsetLeft)) * 100;
    if (newWidth > minWidth && newWidth < maxWidth) {
      setLeftWidth(newWidth);
    }
  }, [sidebarOffset, minWidth, maxWidth]);

  const stopResizing = useCallback(() => {
    isResizing.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", stopResizing);
    document.body.style.cursor = "default";
    document.body.style.userSelect = "auto";
  }, [handleMouseMove]);

  const startResizing = useCallback(() => {
    isResizing.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", stopResizing);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, [handleMouseMove, stopResizing]);

  return { leftWidth, startResizing };
}
