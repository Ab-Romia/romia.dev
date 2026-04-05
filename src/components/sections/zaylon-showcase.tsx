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
  index,
}: {
  highlight: (typeof ZAYLON_SHOWCASE.highlights)[number];
  index: number;
}) {
  const { ref, style, handlers } = useTilt(3);

  return (
    <StaggerItemScale>
      <div
        ref={ref}
        {...handlers}
        style={{
          ...style,
          animation: `z-float 3s ease-in-out ${index * 0.5}s infinite`,
        }}
        className="z-card p-5"
      >
        <p className="text-3xl font-bold z-gradient-text">
          <CountUp value={highlight.value as number} />
        </p>
        <p className="text-sm font-medium mt-1" style={{ color: "var(--z-text)" }}>
          {highlight.label}
        </p>
        <p className="text-xs mt-0.5 leading-snug" style={{ color: "var(--z-text-muted)" }}>
          {highlight.detail}
        </p>
      </div>
    </StaggerItemScale>
  );
}

export function ZaylonShowcase() {
  return (
    <section className="zaylon-section relative py-20 md:py-28 overflow-hidden">
      {/* Gradient transition: portfolio bg -> emerald bg */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

      {/* Emerald blur orbs for depth */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(45, 106, 94, 0.08)" }} />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(27, 58, 53, 0.1)" }} />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(45, 106, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(45, 106, 94, 0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 z-20">
        <BlurIn>
          <span className="inline-flex items-center gap-2 z-glass rounded-full px-4 py-2 text-sm font-mono uppercase tracking-wider" style={{ color: "var(--z-tertiary)" }}>
            <span className="size-2 rounded-full animate-pulse" style={{ background: "var(--z-secondary)" }} />
            {ZAYLON_SHOWCASE.role}
          </span>
        </BlurIn>

        <FadeUp delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mt-4" style={{ color: "var(--z-text)" }}>
            Building{" "}
            <span className="z-gradient-text">Zaylon AI</span>
          </h2>
          <p className="text-lg md:text-xl mt-2" style={{ color: "var(--z-text-muted)" }}>
            {ZAYLON_SHOWCASE.subtitle}
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="leading-relaxed mt-8 max-w-3xl" style={{ color: "var(--z-text-muted)" }}>
            {ZAYLON_SHOWCASE.description}
          </p>
        </FadeUp>

        {/* Code Stats Banner */}
        <FadeUp delay={0.25}>
          <div className="z-glass rounded-xl px-6 py-4 mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-center">
            <div>
              <p className="text-2xl font-bold z-gradient-text">{ZAYLON_SHOWCASE.codeStats.pythonLines}</p>
              <p className="text-xs font-mono" style={{ color: "var(--z-text-muted)" }}>Lines of Python</p>
            </div>
            <div className="w-px h-8 hidden sm:block" style={{ background: "rgba(45, 106, 94, 0.3)" }} />
            <div>
              <p className="text-2xl font-bold z-gradient-text">{ZAYLON_SHOWCASE.codeStats.typescriptLines}</p>
              <p className="text-xs font-mono" style={{ color: "var(--z-text-muted)" }}>Lines of TypeScript</p>
            </div>
            <div className="w-px h-8 hidden sm:block" style={{ background: "rgba(45, 106, 94, 0.3)" }} />
            <div>
              <p className="text-2xl font-bold z-gradient-text">6</p>
              <p className="text-xs font-mono" style={{ color: "var(--z-text-muted)" }}>E-Commerce Platforms</p>
            </div>
          </div>
        </FadeUp>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {ZAYLON_SHOWCASE.highlights.map((h, i) => (
            <StatCard key={h.label} highlight={h} index={i} />
          ))}
        </StaggerContainer>

        <FadeUp delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-10">
            {ZAYLON_SHOWCASE.features.map((feature) => (
              <div key={feature} className="z-card p-4 flex gap-3">
                <span className="shrink-0 mt-0.5" style={{ color: "var(--z-tertiary)" }}>&#9656;</span>
                <span className="text-sm" style={{ color: "var(--z-text-muted)" }}>{feature}</span>
              </div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.35}>
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-6" style={{ color: "var(--z-text)" }}>System Architecture</h3>
            <ZaylonArchitecture />
          </div>
        </FadeUp>

        <FadeUp delay={0.5}>
          <div className="flex flex-wrap gap-2 mt-8">
            {ZAYLON_SHOWCASE.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(27, 58, 53, 0.3)",
                  color: "var(--z-tertiary)",
                  border: "1px solid rgba(45, 106, 94, 0.3)",
                }}
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
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg text-white transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #1B3A35, #2D6A5E, #3A8A7A)",
                boxShadow: "0 4px 20px rgba(27, 58, 53, 0.4)",
              }}
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
