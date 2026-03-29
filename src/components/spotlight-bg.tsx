"use client";

import { useEffect, useRef, useCallback } from "react";

export function SpotlightBg() {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const pos = useRef({ x: 0, y: 0 });

  const update = useCallback(() => {
    if (ref.current) {
      ref.current.style.background = `radial-gradient(600px circle at ${pos.current.x}px ${pos.current.y}px, rgba(0,212,255,0.04), transparent 70%)`;
    }
  }, []);

  useEffect(() => {
    const isTouch = !window.matchMedia("(hover: hover)").matches;
    if (isTouch) return;

    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(update);
    };
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(raf.current);
    };
  }, [update]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-0 transition-none"
      aria-hidden
    />
  );
}
