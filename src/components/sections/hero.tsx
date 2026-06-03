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
          <p className="text-accent font-mono text-sm tracking-wide">
            {PERSONAL.title}
          </p>
        </BlurIn>

        <h1 className="text-5xl md:text-7xl font-bold tracking-[-0.02em] leading-[1.05] mt-4">
          <TextReveal text={PERSONAL.name} />
        </h1>

        <FadeUp delay={0.12} y={10} duration={0.45}>
          <p className="text-base text-muted-foreground mt-2 font-mono">
            aka {PERSONAL.displayName}
          </p>
        </FadeUp>

        <FadeUp delay={0.2} y={18} duration={0.5}>
          <p className="text-lg md:text-xl text-foreground/85 mt-6 max-w-2xl leading-relaxed">
            {PERSONAL.tagline}
          </p>
        </FadeUp>

        <FadeUp delay={0.28} y={12} duration={0.45}>
          <div className="flex flex-wrap gap-2 mt-6">
            {HERO_SIGNALS.map((signal) => (
              <span
                key={signal.label}
                className="inline-flex items-center gap-2 text-xs font-mono bg-card border border-border px-3 py-1.5 rounded-full"
              >
                <span className="size-1.5 rounded-full bg-accent shrink-0" />
                <span className="text-foreground font-medium">{signal.label}</span>
                <span className="text-muted-foreground">{signal.detail}</span>
              </span>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.36} y={12} duration={0.45}>
          <div className="flex flex-wrap gap-3 mt-8">
            <Magnetic>
              <a
                href="#zaylon"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "gap-2 transition-transform active:scale-[0.97]"
                )}
              >
                Explore Zaylon
                <ArrowRight className="size-4" />
              </a>
            </Magnetic>
            <a
              href="/resume.pdf"
              download
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "gap-2 transition-transform active:scale-[0.97]"
              )}
            >
              <Download className="size-4" />
              Resume
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
