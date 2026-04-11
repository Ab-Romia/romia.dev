"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const PARTICLE_COUNT = 100;
const CONNECTION_DIST = 180;
const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;
const REPULSION_RADIUS = 180;
const REPULSION_RADIUS_SQ = REPULSION_RADIUS * REPULSION_RADIUS;
const REPULSION_STRENGTH = 4;
const NODE_RADIUS = 2;

// Theme colors: [dark, light]
const CYAN_DARK = { r: 0, g: 212, b: 255 };
const CYAN_LIGHT = { r: 14, g: 116, b: 144 }; // teal-700, visible on white
const EMERALD = { r: 45, g: 106, b: 94 };

export function ParticleNetworkBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const isTouch = !window.matchMedia("(hover: hover)").matches;
    if (isTouch) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: -9999, y: -9999 };
    let raf = 0;

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const isDark = () => document.documentElement.classList.contains("dark");

    const getZaylonBlend = (): number => {
      const zaylon = document.getElementById("zaylon");
      if (!zaylon) return 0;
      const rect = zaylon.getBoundingClientRect();
      if (rect.top > h || rect.bottom < 0) return 0;
      const sectionCenter = rect.top + rect.height / 2;
      const viewCenter = h / 2;
      const dist = Math.abs(sectionCenter - viewCenter);
      const maxDist = rect.height / 2 + viewCenter;
      return Math.max(0, 1 - dist / maxDist);
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const dark = isDark();
      const baseColor = dark ? CYAN_DARK : CYAN_LIGHT;
      const blend = getZaylonBlend();
      const cr = Math.round(baseColor.r + (EMERALD.r - baseColor.r) * blend);
      const cg = Math.round(baseColor.g + (EMERALD.g - baseColor.g) * blend);
      const cb = Math.round(baseColor.b + (EMERALD.b - baseColor.b) * blend);

      // Opacities: darker values for light mode so they're visible
      const nodeOpacity = dark ? 0.65 : 0.45;
      const lineOpacityMax = dark ? 0.25 : 0.18;
      const lineWidth = dark ? 0.8 : 1;

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < REPULSION_RADIUS_SQ && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = REPULSION_STRENGTH * (1 - dist / REPULSION_RADIUS);
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30;
        if (p.y > h + 30) p.y = -30;
      }

      // Connections
      ctx.lineWidth = lineWidth;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < CONNECTION_DIST_SQ) {
            const opacity = lineOpacityMax * (1 - distSq / CONNECTION_DIST_SQ);
            ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, NODE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, ${nodeOpacity})`;
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
