"use client";

import { useCallback, useState, type MouseEvent } from "react";

export function useMouseGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const onMouseEnter = useCallback(() => setIsHovering(true), []);
  const onMouseLeave = useCallback(() => setIsHovering(false), []);

  const glowStyle = isHovering
    ? {
        background: `radial-gradient(250px circle at ${position.x}px ${position.y}px, rgba(0, 212, 255, 0.07), transparent 70%)`,
      }
    : undefined;

  return {
    glowStyle,
    handlers: { onMouseMove, onMouseEnter, onMouseLeave },
  };
}
