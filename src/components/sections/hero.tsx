"use client";

import { useRef, useState, useCallback } from "react";
import { buttonVariants } from "@/components/ui/button";
import { TextReveal, BlurIn, FadeUp, m, MotionProvider } from "@/components/motion-wrapper";
import { PERSONAL, HERO_SIGNALS } from "@/data/resume";
import { Download, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScroll, useTransform } from "motion/react";
import { Magnetic } from "@/components/magnetic";

const particles = [
  { size: 3, x: "15%", y: "20%", delay: "0s", duration: "6s" },
  { size: 2, x: "75%", y: "15%", delay: "1s", duration: "8s" },
  { size: 4, x: "85%", y: "60%", delay: "2s", duration: "7s" },
  { size: 2, x: "25%", y: "70%", delay: "0.5s", duration: "9s" },
  { size: 3, x: "60%", y: "80%", delay: "3s", duration: "6.5s" },
  { size: 2, x: "45%", y: "30%", delay: "1.5s", duration: "7.5s" },
];

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
      className="relative py-32 md:py-48 overflow-hidden"
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

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-accent/30 -z-10"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            animation: `float ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Parallax dot grid */}
      <MotionProvider>
        <m.div
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            y: dotY,
          }}
        />
      </MotionProvider>

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
