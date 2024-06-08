"use client";

import React, { useState, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import "./style.scss";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById("tooltip-root"));
  }, []);

  const handleMouseEnter = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  const tooltipContent = (
    <div className="tooltip" style={{ left: position.x, top: position.y }}>
      {content}
    </div>
  );

  return (
    <div
      className="tooltip-wrapper"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {visible &&
        position &&
        portalElement &&
        createPortal(tooltipContent, portalElement)}
    </div>
  );
};

export default Tooltip;
