"use client";

import {
  FadeUp,
  BlurIn,
  CountUp,
  StaggerContainer,
  StaggerItemScale,
} from "@/components/motion-wrapper";
import { ZaylonArchitecture } from "@/components/sections/zaylon-architecture";
import { ZAYLON_SHOWCASE } from "@/data/resume";
import { ArrowUpRight } from "lucide-react";
import { useTilt } from "@/hooks/use-tilt";
import { Magnetic } from "@/components/magnetic";

function StatCard({
  highlight,
}: {
  highlight: (typeof ZAYLON_SHOWCASE.highlights)[number];
}) {
  const { ref, style, handlers } = useTilt(3);

  return (
    <StaggerItemScale>
      <div
        ref={ref}
        {...handlers}
        style={style}
        className="bg-card border border-border rounded-lg p-5 hover:border-accent/30 transition-colors hover-glow"
      >
        <p className="text-3xl font-bold text-accent">
          <CountUp value={highlight.value as number} />
        </p>
        <p className="text-sm font-medium text-foreground mt-1">
          {highlight.label}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
          {highlight.detail}
        </p>
      </div>
    </StaggerItemScale>
  );
}

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

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {ZAYLON_SHOWCASE.highlights.map((h) => (
            <StatCard key={h.label} highlight={h} />
          ))}
        </StaggerContainer>

        <FadeUp delay={0.3}>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 mt-10">
            {ZAYLON_SHOWCASE.features.map((feature) => (
              <li key={feature} className="text-sm text-muted-foreground flex gap-2">
                <span className="text-accent mt-0.5 shrink-0">&#9656;</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </FadeUp>

        <FadeUp delay={0.35}>
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-6">System Architecture</h3>
            <ZaylonArchitecture />
          </div>
        </FadeUp>

        <FadeUp delay={0.5}>
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

        <FadeUp delay={0.6}>
          <Magnetic className="inline-block mt-6">
            <a
              href={ZAYLON_SHOWCASE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              Visit zaylon.ai
              <ArrowUpRight className="size-4" />
            </a>
          </Magnetic>
        </FadeUp>
      </div>
    </section>
  );
}
