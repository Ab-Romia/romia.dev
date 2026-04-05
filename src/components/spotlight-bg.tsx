"use client";

import { useEffect, useRef, useCallback } from "react";

export function SpotlightBg() {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef<number>(0);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const update = useCallback(() => {
    // Smooth lerp toward target position
    pos.current.x += (target.current.x - pos.current.x) * 0.15;
    pos.current.y += (target.current.y - pos.current.y) * 0.15;

    if (ref.current) {
      ref.current.style.background = `radial-gradient(800px circle at ${pos.current.x}px ${pos.current.y}px, rgba(0,212,255,0.06), transparent 60%)`;
    }
    raf.current = requestAnimationFrame(update);
  }, []);

  useEffect(() => {
    const isTouch = !window.matchMedia("(hover: hover)").matches;
    if (isTouch) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMove);
    raf.current = requestAnimationFrame(update);

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
