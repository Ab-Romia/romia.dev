"use client";

import { useRef, useState, useCallback } from "react";
import { buttonVariants } from "@/components/ui/button";
import { TextReveal, BlurIn, FadeUp, m } from "@/components/motion-wrapper";
import { PERSONAL, HERO_SIGNALS } from "@/data/resume";
import { Download, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScroll, useTransform } from "motion/react";
import { Magnetic } from "@/components/magnetic";

export function Hero() {
  const { scrollY } = useScroll();
  const dotY = useTransform(scrollY, [0, 500], [0, 150]);
  const sectionRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative py-28 md:py-40 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Mouse-reactive gradient */}
      <div
        className="absolute inset-0 -z-10 transition-none"
        style={{
          background: `
            radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, rgba(0, 212, 255, 0.14) 0%, transparent 50%),
            radial-gradient(ellipse at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(187, 154, 247, 0.12) 0%, transparent 50%)
          `,
        }}
      />

      {/* Parallax dot grid, theme-aware */}
      <m.div
        className="absolute inset-0 -z-10 opacity-40 dot-grid-bg"
        style={{ y: dotY }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <BlurIn>
          <p className="text-accent font-mono text-sm">{PERSONAL.title}</p>
        </BlurIn>

        <FadeUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.02em] leading-tight mt-4">
            <TextReveal text={PERSONAL.name} />
          </h1>
          <p className="text-lg text-muted-foreground mt-1 font-mono">
            aka {PERSONAL.displayName}
          </p>
          <div
            className="h-0.5 w-30 mt-3 rounded-full"
            style={{
              background: "linear-gradient(90deg, var(--accent), transparent)",
            }}
          />
        </FadeUp>

        <FadeUp delay={0.3}>
          <p className="text-xl font-light text-muted-foreground mt-6 max-w-xl leading-relaxed">
            {PERSONAL.tagline}
          </p>
        </FadeUp>

        <FadeUp delay={0.45}>
          <div className="flex flex-wrap gap-2 mt-5">
            {HERO_SIGNALS.map((signal) => (
              <span
                key={signal.label}
                className="inline-flex items-center gap-1.5 text-xs font-mono bg-muted/60 text-muted-foreground border border-border px-3 py-1.5 rounded-full"
              >
                <span className="text-foreground font-medium">{signal.label}</span>
                <span className="text-muted-foreground/70">|</span>
                {signal.detail}
              </span>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.6}>
          <div className="flex flex-wrap gap-4 mt-8">
            <Magnetic>
              <a
                href="#projects"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "gap-2"
                )}
              >
                View My Work
                <ArrowRight className="size-4" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="/resume.pdf"
                download
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "gap-2"
                )}
              >
                <Download className="size-4" />
                Resume
              </a>
            </Magnetic>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
