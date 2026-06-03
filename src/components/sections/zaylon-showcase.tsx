"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FadeUp,
  BlurIn,
  CountUp,
} from "@/components/motion-wrapper";
import {
  ZAYLON_SHOWCASE,
  ZAYLON_LIVE_METRIC,
  ZAYLON_DASHBOARD_IMAGE,
} from "@/data/resume";
import { ArrowUpRight, ArrowRight, Check } from "lucide-react";
import { ZaylonBrainOrbLazy } from "@/components/zaylon-brain-orb-wrapper";
import {
  SiWhatsapp,
  SiInstagram,
  SiMessenger,
  SiShopify,
  SiWoocommerce,
  SiOdoo,
  SiSalla,
  SiZoho,
  SiStripe,
} from "react-icons/si";
import {
  HiShoppingBag,
  HiCreditCard,
  HiBanknotes,
  HiTruck,
  HiChatBubbleOvalLeftEllipsis,
} from "react-icons/hi2";

function StatInline({
  highlight,
}: {
  highlight: (typeof ZAYLON_SHOWCASE.highlights)[number];
}) {
  return (
    <div className="flex flex-col">
      <p className="text-2xl sm:text-3xl font-bold leading-none" style={{ color: "var(--z-text)" }}>
        <CountUp value={highlight.value as number} />
      </p>
      <p className="text-xs font-mono uppercase tracking-wider mt-2" style={{ color: "var(--z-text-muted)" }}>
        {highlight.label}
      </p>
    </div>
  );
}

const INTEGRATION_GROUPS = [
  {
    label: "Messaging",
    items: [
      { name: "WhatsApp", Icon: SiWhatsapp, color: "text-[#25D366]" },
      { name: "Instagram", Icon: SiInstagram, color: "text-[#E1306C]" },
      { name: "Messenger", Icon: SiMessenger, color: "text-[#0084FF]" },
      { name: "Web Chat", Icon: HiChatBubbleOvalLeftEllipsis, color: "text-emerald-400" },
    ],
  },
  {
    label: "E-Commerce",
    items: [
      { name: "Shopify", Icon: SiShopify, color: "text-[#95BF47]" },
      { name: "WooCommerce", Icon: SiWoocommerce, color: "text-[#7F54B3]" },
      { name: "Odoo", Icon: SiOdoo, color: "text-[#714B67]" },
      { name: "Salla", Icon: SiSalla, color: "text-[#BAF3DB]" },
      { name: "Zoho", Icon: SiZoho, color: "text-[#E42527]" },
      { name: "YouCan", Icon: HiShoppingBag, color: "text-[#2BB673]" },
    ],
  },
  {
    label: "Payments",
    items: [
      { name: "Paymob", Icon: HiCreditCard, color: "text-[#F15A22]" },
      { name: "Fawry", Icon: HiBanknotes, color: "text-[#FFC107]" },
      { name: "Stripe", Icon: SiStripe, color: "text-[#635BFF]" },
    ],
  },
  {
    label: "Shipping",
    items: [
      { name: "Bosta", Icon: HiTruck, color: "text-[#F97316]" },
      { name: "Aramex", Icon: HiTruck, color: "text-[#E2231A]" },
    ],
  },
] as const;

function IntegrationGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {INTEGRATION_GROUPS.map((group) => (
        <div key={group.label} className="z-card rounded-2xl p-5">
          <p
            className="text-xs font-semibold uppercase tracking-[0.15em] mb-4"
            style={{ color: "var(--z-tertiary)" }}
          >
            {group.label}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <span
                key={item.name}
                className="z-chip inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
              >
                <item.Icon className={`w-3.5 h-3.5 ${item.color}`} />
                {item.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ZaylonShowcase() {
  return (
    <section
      id="zaylon"
      className="zaylon-section relative py-24 md:py-32 overflow-hidden"
    >
      {/* Soft edges blending the section into the page above and below */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-background via-background/60 to-transparent z-[2] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background via-background/60 to-transparent z-[2] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 z-20">
        {/* Split hero: copy on the left, orb on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center">
          <div>
            <BlurIn>
              <span
                className="inline-flex items-center gap-2 z-glass rounded-full px-4 py-2 text-sm font-mono uppercase tracking-wider"
                style={{ color: "var(--z-tertiary)" }}
              >
                <span className="size-2 rounded-full" style={{ background: "var(--z-secondary)" }} />
                {ZAYLON_SHOWCASE.role}
              </span>
            </BlurIn>

            <FadeUp delay={0.1}>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-4" style={{ color: "var(--z-text)" }}>
                <span className="z-gradient-text">Zaylon AI</span>
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
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6"
                style={{ borderTop: "1px solid var(--z-chip-border)" }}
              >
                {ZAYLON_SHOWCASE.highlights.map((h) => (
                  <StatInline key={h.label} highlight={h} />
                ))}
              </div>
              {ZAYLON_LIVE_METRIC && (
                <div
                  className="z-chip inline-flex items-baseline gap-2 rounded-xl px-4 py-2.5 mt-5"
                >
                  <span className="text-xl font-bold leading-none" style={{ color: "var(--z-text)" }}>
                    {ZAYLON_LIVE_METRIC.value}
                  </span>
                  <span
                    className="text-xs font-mono uppercase tracking-wider"
                    style={{ color: "var(--z-text-muted)" }}
                  >
                    {ZAYLON_LIVE_METRIC.label}
                  </span>
                </div>
              )}
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <a
                  href={ZAYLON_SHOWCASE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3 text-sm font-semibold rounded-xl text-white transition-transform active:scale-[0.97]"
                  style={{
                    background: "linear-gradient(135deg, #1B3A35, #2D6A5E)",
                  }}
                >
                  Visit zaylon.ai
                  <ArrowUpRight className="size-4" />
                </a>
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

        {/* What it does: the capability list that proves real depth */}
        <FadeUp delay={0.15}>
          <div className="mt-16">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-5"
              style={{ color: "var(--z-tertiary)" }}
            >
              What it does
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {ZAYLON_SHOWCASE.features.map((feature) => (
                <div key={feature} className="flex gap-3">
                  <Check
                    className="size-4 mt-0.5 shrink-0"
                    style={{ color: "var(--z-tertiary)" }}
                    aria-hidden="true"
                  />
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--z-text-muted)" }}
                  >
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Real merchant-dashboard screenshot, when provided */}
        {ZAYLON_DASHBOARD_IMAGE && (
          <FadeUp delay={0.15}>
            <figure className="mt-14">
              <div className="z-card rounded-2xl overflow-hidden p-2">
                <Image
                  src={ZAYLON_DASHBOARD_IMAGE}
                  alt="Zaylon merchant dashboard"
                  width={2400}
                  height={1400}
                  className="w-full h-auto rounded-xl"
                />
              </div>
              <figcaption
                className="text-xs font-mono mt-3 text-center"
                style={{ color: "var(--z-text-muted)" }}
              >
                The merchant dashboard: live inbox, analytics, and segmentation.
              </figcaption>
            </figure>
          </FadeUp>
        )}

        {/* Integration grid */}
        <FadeUp delay={0.2}>
          <div className="mt-16 text-center">
            <p
              className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
              style={{ color: "var(--z-tertiary)" }}
            >
              Integrations built
            </p>
            <h3
              className="text-2xl md:text-3xl font-bold tracking-tight"
              style={{ color: "var(--z-text)" }}
            >
              Connected to the platforms{" "}
              <span style={{ color: "var(--z-tertiary)" }}>MENA merchants already use</span>
            </h3>
          </div>
        </FadeUp>

        <FadeUp delay={0.25}>
          <div className="mt-8">
            <IntegrationGrid />
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
                  className="z-chip-tech text-xs font-mono px-3 py-1.5 rounded-full"
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
