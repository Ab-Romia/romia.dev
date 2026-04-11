"use client";

import { useRef, useCallback, useState } from "react";
import {
  FadeUp,
  BlurIn,
  CountUp,
  StaggerContainer,
  StaggerItemScale,
  m,
  MotionProvider,
} from "@/components/motion-wrapper";
import { ZaylonArchitecture } from "@/components/sections/zaylon-architecture";
import { ZAYLON_SHOWCASE } from "@/data/resume";
import {
  ArrowUpRight,
  Bot,
  Globe,
  Languages,
  ShoppingCart,
  Eye,
  MessageSquare,
  CreditCard,
  LayoutDashboard,
  Shield,
} from "lucide-react";
import { useTilt } from "@/hooks/use-tilt";
import { Magnetic } from "@/components/magnetic";

const featureIcons = [
  Bot,
  Languages,
  Eye,
  ShoppingCart,
  MessageSquare,
  CreditCard,
  LayoutDashboard,
  Shield,
];

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
      <MotionProvider>
        <m.div
          ref={ref}
          {...handlers}
          style={style}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 3 + index * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3,
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
        </m.div>
      </MotionProvider>
    </StaggerItemScale>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: string;
  index: number;
}) {
  const Icon = featureIcons[index] || Bot;

  return (
    <div className="group relative z-card p-5 sm:p-6 overflow-hidden">
      {/* Gradient hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, rgba(27,58,53,0.05), rgba(45,106,94,0.08), rgba(58,138,122,0.05))",
        }}
      />

      {/* Corner glow on hover */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(135deg, rgba(45,106,94,0.15), transparent)" }}
      />

      <div className="relative flex gap-4">
        {/* Icon container */}
        <div className="relative shrink-0">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
            style={{ background: "linear-gradient(135deg, rgba(27,58,53,0.3), rgba(45,106,94,0.3))" }}
          >
            <Icon className="w-6 h-6" style={{ color: "var(--z-secondary)" }} />
          </div>
          {/* Icon glow on hover */}
          <div
            className="absolute inset-0 w-12 h-12 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "rgba(45,106,94,0.25)" }}
          />
        </div>

        {/* Content */}
        <p
          className="text-sm leading-relaxed group-hover:text-[#3A8A7A] transition-colors duration-300"
          style={{ color: "var(--z-text-muted)" }}
        >
          {feature}
        </p>
      </div>
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="relative mt-10">
      {/* Glow halo behind dashboard */}
      <div
        className="absolute -inset-4 rounded-3xl blur-xl"
        style={{ background: "linear-gradient(135deg, rgba(27,58,53,0.2), rgba(45,106,94,0.3), rgba(58,138,122,0.2))" }}
      />

      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(20,26,26,0.8)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(45,106,94,0.3)",
        }}
      >
        {/* Window chrome */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ borderBottom: "1px solid rgba(45,106,94,0.15)" }}
        >
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
                background: "rgba(27,58,53,0.2)",
                border: "1px solid rgba(45,106,94,0.15)",
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
                  background: "rgba(27,58,53,0.3)",
                  border: "1px solid rgba(45,106,94,0.2)",
                  color: "var(--z-text-muted)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {platform}
              </span>
            ))}
          </div>
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

      {/* Emerald blur orbs for depth */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(45, 106, 94, 0.06)" }} />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(27, 58, 53, 0.08)" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-3xl pointer-events-none" style={{ background: "rgba(45, 106, 94, 0.04)" }} />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(45, 106, 94, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(45, 106, 94, 0.08) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 z-20">
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
            Building{" "}
            <span className="z-gradient-text">Zaylon AI</span>
          </h2>
          <p className="text-lg md:text-xl mt-3" style={{ color: "var(--z-text-muted)" }}>
            {ZAYLON_SHOWCASE.subtitle}
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="leading-relaxed mt-6 max-w-3xl text-base" style={{ color: "var(--z-text-muted)" }}>
            {ZAYLON_SHOWCASE.description}
          </p>
        </FadeUp>

        {/* Architecture Highlights Banner */}
        <FadeUp delay={0.25}>
          <div className="z-glass rounded-2xl px-6 py-5 mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: "&#9670;", label: "Multi-Agent Supervisor", detail: "LangGraph state machine" },
              { icon: "&#9670;", label: "Tri-Lingual NLP", detail: "DialectBridge pipeline" },
              { icon: "&#9670;", label: "Real-Time Payments", detail: "3 providers, webhooks" },
              { icon: "&#9670;", label: "Multi-Tenant Isolation", detail: "Row-level encryption" },
            ].map((item) => (
              <div key={item.label} className="text-center sm:text-left">
                <p className="text-sm font-semibold z-gradient-text">{item.label}</p>
                <p className="text-xs font-mono mt-0.5" style={{ color: "var(--z-text-muted)" }}>{item.detail}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Stat cards */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {ZAYLON_SHOWCASE.highlights.map((h, i) => (
            <StatCard key={h.label} highlight={h} index={i} />
          ))}
        </StaggerContainer>

        {/* Dashboard Mockup */}
        <FadeUp delay={0.3}>
          <DashboardMockup />
        </FadeUp>

        {/* Features grid */}
        <FadeUp delay={0.35}>
          <h3 className="text-xl font-semibold mt-14 mb-6" style={{ color: "var(--z-text)" }}>
            Core Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {ZAYLON_SHOWCASE.features.map((feature, i) => (
              <FeatureCard key={i} feature={feature} index={i} />
            ))}
          </div>
        </FadeUp>

        {/* Architecture */}
        <FadeUp delay={0.4}>
          <div className="mt-14">
            <h3 className="text-xl font-semibold mb-6" style={{ color: "var(--z-text)" }}>System Architecture</h3>
            <ZaylonArchitecture />
          </div>
        </FadeUp>

        {/* Tech stack */}
        <FadeUp delay={0.5}>
          <div className="flex flex-wrap gap-2 mt-10">
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
        </FadeUp>

        {/* CTA */}
        <FadeUp delay={0.6}>
          <Magnetic className="inline-block mt-8">
            <a
              href={ZAYLON_SHOWCASE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold rounded-xl text-white transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #1B3A35, #2D6A5E, #3A8A7A)",
                boxShadow: "0 4px 20px rgba(27, 58, 53, 0.5), 0 8px 30px rgba(45, 106, 94, 0.2)",
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
