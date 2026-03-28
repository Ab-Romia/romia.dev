"use client";

import { useCallback, useRef, useState, type MouseEvent } from "react";

export function useMouseGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
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
    ref,
    glowStyle,
    handlers: { onMouseMove, onMouseEnter, onMouseLeave },
  };
}
