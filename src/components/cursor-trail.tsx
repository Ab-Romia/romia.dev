"use client";

import { useEffect, useRef } from "react";

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const isTouch = !window.matchMedia("(hover: hover)").matches;
    if (isTouch) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: -100, y: -100 };
    let raf = 0;
    let lastSpawn = 0;

    interface Dot {
      x: number;
      y: number;
      alpha: number;
      scale: number;
      color: string;
    }

    const dots: Dot[] = [];

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const isOverZaylon = () => {
      const el = document.elementFromPoint(mouse.x, mouse.y);
      return el?.closest(".zaylon-section") !== null;
    };

    const handleMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const spawn = (time: number) => {
      if (time - lastSpawn > 25) {
        const emerald = isOverZaylon();
        dots.push({
          x: mouse.x,
          y: mouse.y,
          alpha: 0.45,
          scale: 1,
          color: emerald ? "45, 106, 94" : "0, 212, 255",
        });
        if (dots.length > 20) dots.shift();
        lastSpawn = time;
      }
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      spawn(time);

      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        d.alpha -= 0.012;
        d.scale -= 0.015;

        if (d.alpha <= 0) {
          dots.splice(i, 1);
          continue;
        }

        const r = Math.max(d.scale * 3, 0.5);
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${d.color}, ${d.alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("resize", handleResize);
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      aria-hidden
    />
  );
}
