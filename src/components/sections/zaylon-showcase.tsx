"use client";

import {
  FadeUp,
  BlurIn,
  CountUp,
  StaggerContainer,
  StaggerItemScale,
} from "@/components/motion-wrapper";
import { ZAYLON_SHOWCASE } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";

export function ZaylonShowcase() {
  return (
    <section className="relative py-20 md:py-28 border-t border-b border-accent/10 overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0, 212, 255, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <BlurIn>
          <span className="inline-flex items-center gap-2 text-accent font-mono text-sm uppercase tracking-wider">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            {ZAYLON_SHOWCASE.role}
          </span>
        </BlurIn>

        <FadeUp delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4">
            {ZAYLON_SHOWCASE.heading}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-2">
            {ZAYLON_SHOWCASE.subtitle}
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-muted-foreground leading-relaxed mt-8 max-w-3xl">
            {ZAYLON_SHOWCASE.description}
          </p>
        </FadeUp>

        {/* Stats row — full width, horizontal */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {ZAYLON_SHOWCASE.highlights.map((h) => (
            <StaggerItemScale key={h.label}>
              <div className="glass-card rounded-lg p-5 hover:border-accent/30 transition-colors">
                <p className="text-3xl font-bold text-accent">
                  <CountUp value={h.value as number} />
                </p>
                <p className="text-sm font-medium text-foreground mt-1">
                  {h.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                  {h.detail}
                </p>
              </div>
            </StaggerItemScale>
          ))}
        </StaggerContainer>

        {/* Features */}
        <FadeUp delay={0.3}>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-10">
            {ZAYLON_SHOWCASE.features.map((feature) => (
              <li
                key={feature}
                className="text-sm text-muted-foreground flex gap-2"
              >
                <span className="text-accent mt-0.5 shrink-0">&#9656;</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </FadeUp>

        {/* Tech + CTA */}
        <FadeUp delay={0.4}>
          <div className="flex flex-wrap gap-2 mt-8">
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

        <FadeUp delay={0.5}>
          <a
            href={ZAYLON_SHOWCASE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 mt-6 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
          >
            Visit zaylon.ai
            <ArrowUpRight className="size-4" />
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
