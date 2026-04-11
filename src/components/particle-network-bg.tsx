"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const PARTICLE_COUNT = 80;
const CONNECTION_DIST = 160;
const CONNECTION_DIST_SQ = CONNECTION_DIST * CONNECTION_DIST;
const REPULSION_RADIUS = 180;
const REPULSION_RADIUS_SQ = REPULSION_RADIUS * REPULSION_RADIUS;
const REPULSION_STRENGTH = 4;
const NODE_RADIUS = 2;
const GLOW_RADIUS = 800;

// Colors
const CYAN = { r: 0, g: 212, b: 255 };
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
    let scrollY = 0;
    let raf = 0;

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
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

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    // Detect if we're over the Zaylon section and blend colors
    const getZaylonBlend = (): number => {
      const zaylon = document.getElementById("zaylon");
      if (!zaylon) return 0;
      const rect = zaylon.getBoundingClientRect();
      const viewH = h;

      // Fade in: section top entering bottom of viewport
      if (rect.top > viewH) return 0;
      // Fade out: section bottom leaving top of viewport
      if (rect.bottom < 0) return 0;

      // Calculate blend: 0 = fully cyan, 1 = fully emerald
      const sectionCenter = rect.top + rect.height / 2;
      const viewCenter = viewH / 2;
      const dist = Math.abs(sectionCenter - viewCenter);
      const maxDist = rect.height / 2 + viewH / 2;
      return Math.max(0, 1 - dist / maxDist);
    };

    const lerpColor = (
      a: { r: number; g: number; b: number },
      b: { r: number; g: number; b: number },
      t: number
    ) => ({
      r: a.r + (b.r - a.r) * t,
      g: a.g + (b.g - a.g) * t,
      b: a.b + (b.b - a.b) * t,
    });

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const blend = getZaylonBlend();
      const color = lerpColor(CYAN, EMERALD, blend);
      const cr = Math.round(color.r);
      const cg = Math.round(color.g);
      const cb = Math.round(color.b);

      // Mouse glow
      if (mouse.x > -1000) {
        const grd = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, GLOW_RADIUS
        );
        grd.addColorStop(0, `rgba(${cr}, ${cg}, ${cb}, 0.06)`);
        grd.addColorStop(0.5, `rgba(${cr}, ${cg}, ${cb}, 0.02)`);
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, w, h);
      }

      // Update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < REPULSION_RADIUS_SQ && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = REPULSION_STRENGTH * (1 - dist / REPULSION_RADIUS);
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }

        // Wrap edges
        if (p.x < -30) p.x = w + 30;
        if (p.x > w + 30) p.x = -30;
        if (p.y < -30) p.y = h + 30;
        if (p.y > h + 30) p.y = -30;
      }

      // Draw connections
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;

          if (distSq < CONNECTION_DIST_SQ) {
            const opacity = 0.25 * (1 - distSq / CONNECTION_DIST_SQ);
            ctx.strokeStyle = `rgba(${cr}, ${cg}, ${cb}, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes with glow
      ctx.shadowColor = `rgba(${cr}, ${cg}, ${cb}, 0.6)`;
      ctx.shadowBlur = 8;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, NODE_RADIUS, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr}, ${cg}, ${cb}, 0.7)`;
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
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
