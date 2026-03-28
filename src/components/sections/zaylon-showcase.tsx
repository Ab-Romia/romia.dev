"use client";

import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { ZAYLON_SHOWCASE } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";

export function ZaylonShowcase() {
  return (
    <section
      className="relative py-20 md:py-28 border-t border-b border-accent/10 overflow-hidden"
    >
      {/* Accent glow background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0, 212, 255, 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <FadeUp>
          <span className="inline-flex items-center gap-2 text-accent font-mono text-sm uppercase tracking-wider">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            {ZAYLON_SHOWCASE.role}
          </span>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">
            {ZAYLON_SHOWCASE.heading}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-2">
            {ZAYLON_SHOWCASE.subtitle}
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 mt-10">
          <div className="md:col-span-3 space-y-6">
            <FadeUp delay={0.2}>
              <p className="text-muted-foreground leading-relaxed">
                {ZAYLON_SHOWCASE.description}
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="flex flex-wrap gap-2">
                {ZAYLON_SHOWCASE.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono bg-accent/10 text-accent border border-accent/20 px-2.5 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <a
                href={ZAYLON_SHOWCASE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
              >
                Visit zaylon.ai
                <ArrowUpRight className="size-4" />
              </a>
            </FadeUp>
          </div>

          <StaggerContainer className="md:col-span-2 grid grid-cols-2 gap-3">
            {ZAYLON_SHOWCASE.highlights.map((highlight) => (
              <StaggerItem key={highlight.label}>
                <div className="bg-card border border-border rounded-lg p-4 text-center hover:border-accent/30 transition-colors">
                  <p className="text-2xl font-bold text-accent">
                    {highlight.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {highlight.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
