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
import { useMouseGlow } from "@/hooks/use-mouse-glow";

function StatCard({
  highlight,
}: {
  highlight: (typeof ZAYLON_SHOWCASE.highlights)[number];
}) {
  const { ref, glowStyle, handlers } = useMouseGlow();

  return (
    <StaggerItemScale>
      <div
        ref={ref}
        {...handlers}
        className="glass-card relative rounded-lg p-4 text-center overflow-hidden hover:border-accent/30 transition-colors"
      >
        {glowStyle && (
          <div className="absolute inset-0 -z-10 pointer-events-none" style={glowStyle} />
        )}
        <p className="text-2xl font-bold text-accent">
          <CountUp value={highlight.value as number} />
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          {highlight.label}
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

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 mt-10">
          <div className="md:col-span-3 space-y-6">
            <FadeUp delay={0.2}>
              <p className="text-muted-foreground leading-relaxed">
                {ZAYLON_SHOWCASE.description}
              </p>
            </FadeUp>

            {/* Feature highlights */}
            <FadeUp delay={0.3}>
              <ul className="space-y-2">
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

            <FadeUp delay={0.4}>
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

            <FadeUp delay={0.5}>
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
              <StatCard key={highlight.label} highlight={highlight} />
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
