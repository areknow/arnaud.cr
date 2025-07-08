import { useEffect, useRef } from "react";

const DEFAULT_OPTIONS = {
  easingFactor: 0.1,
  updateInterval: 15,
  size: 14,
  color: "#fff",
  borderRadius: "100%",
  zIndex: 9999,
  hideCursor: true,
};

export const useMouseFollower = (options = DEFAULT_OPTIONS) => {
  const {
    easingFactor,
    updateInterval,
    size,
    color,
    borderRadius,
    zIndex,
    hideCursor,
  } = options;

  const mousePos = useRef({ x: -1, y: -1 });
  const elementPos = useRef({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    // Hide the cursor if enabled
    if (hideCursor) {
      document.documentElement.style.cursor = "none";
    }

    // Create the cursor element
    const cursorElement = document.createElement("div");
    cursorElement.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: ${borderRadius};
        pointer-events: none;
        z-index: ${zIndex};
        transition: none;
        left: 0px;
        top: 0px;
        transform: translate(-50%, -50%);
      `;

    document.body.appendChild(cursorElement);
    elementRef.current = cursorElement;

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Position update function
    const positionUpdate = () => {
      if (
        elementRef.current &&
        mousePos.current.x !== -1 &&
        mousePos.current.y !== -1
      ) {
        const rect = elementRef.current.getBoundingClientRect();

        // Initialize position on first run
        if (!initializedRef.current) {
          elementPos.current = { x: mousePos.current.x, y: mousePos.current.y };
          elementRef.current.style.left = mousePos.current.x + "px";
          elementRef.current.style.top = mousePos.current.y + "px";
          initializedRef.current = true;
          return;
        }

        // Use center of element for calculations
        const x_box = rect.left + rect.width / 2;
        const y_box = rect.top + rect.height / 2;

        const newLeft = x_box + easingFactor * (mousePos.current.x - x_box);
        const newTop = y_box + easingFactor * (mousePos.current.y - y_box);

        elementPos.current = { x: newLeft, y: newTop };

        // Update DOM directly
        elementRef.current.style.left = newLeft + "px";
        elementRef.current.style.top = newTop + "px";
      }
    };

    // Start tracking
    document.addEventListener("mousemove", handleMouseMove);
    intervalRef.current = setInterval(positionUpdate, updateInterval);

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (elementRef.current) {
        document.body.removeChild(elementRef.current);
      }
    };
  }, [
    easingFactor,
    updateInterval,
    size,
    color,
    borderRadius,
    zIndex,
    hideCursor,
  ]);

  return null;
};
