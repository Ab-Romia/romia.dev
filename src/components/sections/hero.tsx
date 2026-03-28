"use client";

import { buttonVariants } from "@/components/ui/button";
import { FadeUp } from "@/components/motion-wrapper";
import { PERSONAL } from "@/data/resume";
import { Download, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section id="hero" className="relative py-32 md:py-48 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse at 20% 50%, rgba(0, 212, 255, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(187, 154, 247, 0.06) 0%, transparent 50%)
          `,
        }}
      />
      <div
        className="absolute inset-0 -z-10 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <FadeUp>
          <p className="text-accent font-mono text-sm">{PERSONAL.title}</p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mt-4">
            {PERSONAL.name}
          </h1>
          <p className="text-lg text-muted-foreground mt-1 font-mono">
            aka {PERSONAL.displayName}
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-xl text-muted-foreground mt-6 max-w-xl leading-relaxed">
            {PERSONAL.tagline}
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="/resume.pdf"
              download
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "gap-2"
              )}
            >
              <Download className="size-4" />
              Download Resume
            </a>
            <a
              href="#projects"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "gap-2"
              )}
            >
              View Projects
              <ArrowRight className="size-4" />
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
