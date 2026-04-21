"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import {
  FadeUp,
  BlurIn,
  CountUp,
} from "@/components/motion-wrapper";
import { ZAYLON_SHOWCASE } from "@/data/resume";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/magnetic";
import { ZaylonBrainOrbLazy } from "@/components/zaylon-brain-orb-wrapper";

function StatInline({
  highlight,
}: {
  highlight: (typeof ZAYLON_SHOWCASE.highlights)[number];
}) {
  return (
    <div className="flex flex-col">
      <p className="text-2xl sm:text-3xl font-bold z-gradient-text leading-none">
        <CountUp value={highlight.value as number} />
      </p>
      <p className="text-xs font-mono uppercase tracking-wider mt-2" style={{ color: "var(--z-text-muted)" }}>
        {highlight.label}
      </p>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="z-card relative rounded-2xl overflow-hidden">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid var(--z-primary)" }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
        </div>
        <a
          href="https://dashboard.zaylon.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] font-mono ml-2 hover:underline"
          style={{ color: "var(--z-text-muted)" }}
        >
          dashboard.zaylon.ai
        </a>
      </div>

      {/* Dashboard content */}
      <div className="p-4 sm:p-6 grid grid-cols-3 gap-3">
        {[
          { label: "AI Agents", value: "3", trend: "Supervised" },
          { label: "AI Tools", value: "10", trend: "Scoped" },
          { label: "Platforms", value: "6", trend: "Connected" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-3"
            style={{
              background: "var(--z-primary)",
              border: "1px solid rgba(45,106,94,0.2)",
            }}
          >
            <p className="text-lg sm:text-xl font-bold z-gradient-text">{stat.value}</p>
            <p className="text-[10px] mt-1" style={{ color: "var(--z-text-muted)" }}>{stat.label}</p>
            <p className="text-[9px] mt-0.5 font-mono" style={{ color: "var(--z-tertiary)" }}>{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Connected platforms row */}
      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
        <p className="text-[10px] font-mono uppercase tracking-wider mb-2" style={{ color: "var(--z-text-muted)" }}>
          Connected Platforms
        </p>
        <div className="flex flex-wrap gap-2">
          {["Shopify", "Salla", "WooCommerce", "Odoo", "YouCan", "Zoho"].map((platform) => (
            <span
              key={platform}
              className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full"
              style={{
                background: "var(--z-primary)",
                border: "1px solid rgba(45,106,94,0.2)",
                color: "var(--z-text-muted)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
              {platform}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ZaylonShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current || !glowRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(45, 106, 94, 0.07), transparent 60%)`;
  }, []);

  return (
    <section
      id="zaylon"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="zaylon-section relative py-24 md:py-32 overflow-hidden"
    >
      {/* Emerald mouse-following glow */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none z-[1] transition-none" />

      {/* Smooth gradient transitions into/out of emerald */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-background via-background/60 to-transparent z-[2] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/60 to-transparent z-[2] pointer-events-none" />

      {/* Emerald blur orbs for depth, kept sparse since the orb scene adds its own halo */}
      <div className="absolute top-1/4 -left-32 w-[450px] h-[450px] rounded-full blur-2xl pointer-events-none" style={{ background: "rgba(45, 106, 94, 0.05)" }} />
      <div className="absolute bottom-1/4 -right-32 w-[380px] h-[380px] rounded-full blur-2xl pointer-events-none" style={{ background: "rgba(27, 58, 53, 0.06)" }} />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(45, 106, 94, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(45, 106, 94, 0.08) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 z-20">
        {/* Split hero: copy on the left, orb on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
          <div>
            <BlurIn>
              <span
                className="inline-flex items-center gap-2 z-glass rounded-full px-4 py-2 text-sm font-mono uppercase tracking-wider"
                style={{ color: "var(--z-tertiary)" }}
              >
                <span className="size-2 rounded-full animate-pulse" style={{ background: "var(--z-secondary)" }} />
                {ZAYLON_SHOWCASE.role}
              </span>
            </BlurIn>

            <FadeUp delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-4" style={{ color: "var(--z-text)" }}>
                Building <span className="z-gradient-text">Zaylon AI</span>
              </h2>
              <p className="text-lg md:text-xl mt-3" style={{ color: "var(--z-text-muted)" }}>
                {ZAYLON_SHOWCASE.subtitle}
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="leading-relaxed mt-6 text-base" style={{ color: "var(--z-text-muted)" }}>
                {ZAYLON_SHOWCASE.description}
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div
                className="grid grid-cols-4 gap-4 mt-8 pt-6"
                style={{ borderTop: "1px solid rgba(45, 106, 94, 0.25)" }}
              >
                {ZAYLON_SHOWCASE.highlights.map((h) => (
                  <StatInline key={h.label} highlight={h} />
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <Magnetic>
                  <a
                    href={ZAYLON_SHOWCASE.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-xl text-white transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, #1B3A35, #2D6A5E, #3A8A7A)",
                      boxShadow: "0 4px 20px rgba(27, 58, 53, 0.5), 0 8px 30px rgba(45, 106, 94, 0.2)",
                    }}
                  >
                    Visit zaylon.ai
                    <ArrowUpRight className="size-4" />
                  </a>
                </Magnetic>
                <Link
                  href="/projects/zaylon-ai"
                  className="inline-flex items-center gap-1.5 text-sm font-mono group"
                  style={{ color: "var(--z-tertiary)" }}
                >
                  Read the case study
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* Orb column */}
          <FadeUp delay={0.15}>
            <div className="relative aspect-square w-full max-w-[520px] mx-auto">
              {/* Ambient emerald halo behind the orb */}
              <div
                className="absolute inset-[-10%] rounded-full pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(52, 211, 153, 0.18) 0%, rgba(45, 106, 94, 0.08) 35%, transparent 70%)",
                  filter: "blur(24px)",
                }}
                aria-hidden="true"
              />
              <ZaylonBrainOrbLazy />
            </div>
          </FadeUp>
        </div>

        {/* One compact proof-of-product visual */}
        <FadeUp delay={0.2}>
          <div className="mt-16">
            <DashboardMockup />
          </div>
        </FadeUp>

        {/* Tech stack */}
        <FadeUp delay={0.3}>
          <div className="mt-10">
            <p className="text-xs font-mono uppercase tracking-wider mb-3" style={{ color: "var(--z-text-muted)" }}>
              Built with
            </p>
            <div className="flex flex-wrap gap-2">
              {ZAYLON_SHOWCASE.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono px-3 py-1.5 rounded-full transition-colors duration-300 hover:border-[rgba(58,138,122,0.5)]"
                  style={{
                    background: "rgba(27, 58, 53, 0.3)",
                    color: "var(--z-tertiary)",
                    border: "1px solid rgba(45, 106, 94, 0.25)",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
