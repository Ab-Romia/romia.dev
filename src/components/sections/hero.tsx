"use client";

import { buttonVariants } from "@/components/ui/button";
import { TextReveal, BlurIn, FadeUp, m, MotionProvider } from "@/components/motion-wrapper";
import { PERSONAL } from "@/data/resume";
import { Download, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScroll, useTransform } from "motion/react";

export function Hero() {
  const { scrollY } = useScroll();
  const dotY = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section id="hero" className="relative py-32 md:py-48 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(0, 212, 255, 0.14) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(187, 154, 247, 0.12) 0%, transparent 50%)
          `,
        }}
      />
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
          {/* Accent glow line */}
          <div
            className="h-0.5 w-30 mt-3 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--accent), transparent)",
            }}
          />
        </FadeUp>

        <BlurIn delay={0.3}>
          <p className="text-xl font-light text-muted-foreground mt-6 max-w-xl leading-relaxed">
            {PERSONAL.tagline}
          </p>
        </BlurIn>

        <FadeUp delay={0.4}>
          <div className="flex flex-wrap gap-4 mt-8">
            <MotionProvider>
              <m.a
                href="/resume.pdf"
                download
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "gap-2"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Download className="size-4" />
                Download Resume
              </m.a>
            </MotionProvider>
            <MotionProvider>
              <m.a
                href="#projects"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "gap-2"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                View Projects
                <ArrowRight className="size-4" />
              </m.a>
            </MotionProvider>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
