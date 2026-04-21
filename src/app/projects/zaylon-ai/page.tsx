import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
  Check,
  X,
  Link2,
  Settings,
  Rocket,
  BarChart3,
  Bot,
  Languages,
  Eye,
  ShoppingCart,
  MessageSquare,
  CreditCard,
  LayoutDashboard,
  Sparkles,
  Globe,
  Clock,
  DollarSign,
  Headphones,
  Package,
  type LucideIcon,
} from "lucide-react";
import { FadeUp, BlurIn } from "@/components/motion-wrapper";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { ZaylonBrainOrbLazy } from "@/components/zaylon-brain-orb-wrapper";
import { getAdjacentProjects } from "@/data/resume";

export const metadata: Metadata = {
  title: "Zaylon AI — Conversational commerce for MENA merchants",
  description:
    "Case study of Zaylon AI, a conversational commerce platform I co-founded that turns WhatsApp, Instagram, and Messenger into full sales channels for MENA merchants.",
  openGraph: {
    title: "Zaylon AI | Case Study by Abdelrahman Abouroumia",
    description:
      "Conversational commerce platform for MENA merchants. Co-founded and shipped across 6 e-commerce platforms, 5 messaging channels, and 3 dialects.",
  },
  alternates: { canonical: "/projects/zaylon-ai" },
};

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs font-semibold uppercase tracking-[0.18em] mb-3"
      style={{ color: "var(--z-tertiary)" }}
    >
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1]"
      style={{ color: "var(--z-text)" }}
    >
      {children}
    </h2>
  );
}

function SectionLead({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-base md:text-lg leading-relaxed mt-4 max-w-3xl"
      style={{ color: "var(--z-text-muted)" }}
    >
      {children}
    </p>
  );
}

function Stat({
  value,
  label,
  sublabel,
}: {
  value: string;
  label: string;
  sublabel?: string;
}) {
  return (
    <div className="flex flex-col">
      <p className="text-3xl md:text-4xl font-bold z-gradient-text leading-none">{value}</p>
      <p
        className="text-xs font-mono uppercase tracking-wider mt-3"
        style={{ color: "var(--z-text-muted)" }}
      >
        {label}
      </p>
      {sublabel && (
        <p className="text-xs mt-1" style={{ color: "var(--z-text-muted)" }}>
          {sublabel}
        </p>
      )}
    </div>
  );
}

function FeatureCard({
  Icon,
  title,
  body,
}: {
  Icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <div className="group relative z-card p-5 sm:p-6 rounded-2xl overflow-hidden h-full">
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(27,58,53,0.04), rgba(45,106,94,0.08), rgba(58,138,122,0.04))",
        }}
        aria-hidden="true"
      />
      <div className="relative">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(27,58,53,0.28), rgba(45,106,94,0.28))",
          }}
        >
          <Icon className="w-5 h-5" style={{ color: "var(--z-tertiary)" }} />
        </div>
        <h3 className="text-base font-semibold mb-1.5" style={{ color: "var(--z-text)" }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--z-text-muted)" }}>
          {body}
        </p>
      </div>
    </div>
  );
}

function StepCard({
  step,
  Icon,
  title,
  body,
}: {
  step: string;
  Icon: LucideIcon;
  title: string;
  body: string;
}) {
  return (
    <div className="relative group">
      <div className="flex justify-center mb-5">
        <div
          className="relative w-14 h-14 rounded-full flex items-center justify-center z-10 transition-colors"
          style={{
            background: "var(--z-card)",
            border: "2px solid rgba(58, 138, 122, 0.4)",
          }}
        >
          <div
            className="absolute inset-1.5 rounded-full animate-pulse"
            style={{ background: "rgba(45, 106, 94, 0.35)" }}
            aria-hidden="true"
          />
          <Icon className="relative z-10 w-5 h-5" style={{ color: "var(--z-tertiary)" }} />
        </div>
      </div>
      <div
        className="z-card rounded-xl p-4 group-hover:-translate-y-0.5 transition-transform duration-300"
      >
        <span
          className="text-[10px] font-mono font-bold tracking-widest"
          style={{ color: "var(--z-tertiary)" }}
        >
          STEP {step}
        </span>
        <h3 className="text-lg font-semibold mt-1 mb-1.5" style={{ color: "var(--z-text)" }}>
          {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--z-text-muted)" }}>
          {body}
        </p>
      </div>
    </div>
  );
}

function IntegrationChip({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
      style={{
        background: "rgba(27, 58, 53, 0.35)",
        border: "1px solid rgba(45, 106, 94, 0.25)",
        color: "var(--z-text)",
      }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--z-tertiary)" }}
        aria-hidden="true"
      />
      {label}
    </span>
  );
}

function DashboardMockup() {
  return (
    <div className="z-card relative rounded-2xl overflow-hidden">
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(45, 106, 94, 0.25)" }}
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

      <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-0">
        <div
          className="p-4 hidden sm:block"
          style={{ borderRight: "1px solid rgba(45, 106, 94, 0.22)" }}
        >
          {[
            { label: "Overview", items: ["Dashboard", "Inbox"] },
            { label: "Commerce", items: ["Products", "Orders", "Recovery"] },
            { label: "Engagement", items: ["Customers", "Leads", "Campaigns"] },
            { label: "Intelligence", items: ["Feedback", "A/B Testing", "Insights"] },
          ].map((group) => (
            <div key={group.label} className="mb-3">
              <p
                className="text-[9px] font-mono uppercase tracking-wider mb-1.5"
                style={{ color: "var(--z-text-muted)" }}
              >
                {group.label}
              </p>
              {group.items.map((item, idx) => (
                <div
                  key={item}
                  className="text-[11px] py-1 px-2 rounded"
                  style={{
                    background:
                      idx === 0 && group.label === "Overview" ? "rgba(45,106,94,0.2)" : "transparent",
                    color:
                      idx === 0 && group.label === "Overview"
                        ? "var(--z-tertiary)"
                        : "var(--z-text-muted)",
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
            {[
              { label: "Threads today", value: "1,284", trend: "+12%" },
              { label: "AI resolved", value: "87%", trend: "+3pp" },
              { label: "Avg response", value: "4.2s", trend: "-0.8s" },
              { label: "Revenue via chat", value: "$14.6k", trend: "+24%" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg p-2.5"
                style={{
                  background: "var(--z-primary)",
                  border: "1px solid rgba(45,106,94,0.2)",
                }}
              >
                <p className="text-base sm:text-lg font-bold z-gradient-text leading-none">
                  {stat.value}
                </p>
                <p className="text-[10px] mt-1.5" style={{ color: "var(--z-text-muted)" }}>
                  {stat.label}
                </p>
                <p className="text-[9px] font-mono mt-0.5" style={{ color: "var(--z-tertiary)" }}>
                  {stat.trend}
                </p>
              </div>
            ))}
          </div>

          <div
            className="rounded-lg p-3"
            style={{ background: "var(--z-primary)", border: "1px solid rgba(45,106,94,0.2)" }}
          >
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-xs font-semibold" style={{ color: "var(--z-text)" }}>
                Live inbox
              </p>
              <span
                className="text-[9px] font-mono inline-flex items-center gap-1"
                style={{ color: "var(--z-tertiary)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
                3 active
              </span>
            </div>
            <div className="space-y-1.5">
              {[
                { who: "Hala M.", via: "WhatsApp", msg: "كام سعر المقاس M؟", state: "AI replying" },
                { who: "Omar S.", via: "Instagram", msg: "هل عندكم توصيل للإسكندرية؟", state: "Resolved" },
                { who: "Nour A.", via: "Messenger", msg: "Order #1248 status?", state: "Human assigned" },
              ].map((row) => (
                <div
                  key={row.who}
                  className="flex items-center justify-between gap-2 py-1.5 px-2 rounded"
                  style={{ background: "rgba(45,106,94,0.08)" }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold"
                      style={{
                        background: "rgba(58,138,122,0.35)",
                        color: "var(--z-text)",
                      }}
                    >
                      {row.who
                        .split(" ")
                        .map((p) => p[0])
                        .join("")}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-medium truncate" style={{ color: "var(--z-text)" }}>
                        {row.who}{" "}
                        <span className="font-mono" style={{ color: "var(--z-text-muted)" }}>
                          &middot; {row.via}
                        </span>
                      </p>
                      <p className="text-[10px] truncate" style={{ color: "var(--z-text-muted)" }}>
                        {row.msg}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-[9px] font-mono whitespace-nowrap"
                    style={{ color: "var(--z-tertiary)" }}
                  >
                    {row.state}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ZaylonCaseStudyPage() {
  const { prev, next } = getAdjacentProjects("zaylon-ai");

  return (
    <>
      <Navbar />
      <main id="main-content" className="zaylon-section relative overflow-hidden">
        {/* Emerald atmosphere */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `linear-gradient(rgba(45, 106, 94, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(45, 106, 94, 0.08) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-background via-background/60 to-transparent z-[2] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-[18%] -left-40 w-[560px] h-[560px] rounded-full blur-2xl pointer-events-none"
          aria-hidden="true"
          style={{ background: "rgba(45, 106, 94, 0.06)" }}
        />
        <div
          className="absolute bottom-[20%] -right-40 w-[420px] h-[420px] rounded-full blur-2xl pointer-events-none"
          aria-hidden="true"
          style={{ background: "rgba(27, 58, 53, 0.06)" }}
        />

        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-28 pb-20 z-10">
          {/* Back link */}
          <FadeUp>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:opacity-80"
              style={{ color: "var(--z-text-muted)" }}
            >
              <ArrowLeft className="size-4" />
              Back to projects
            </Link>
          </FadeUp>

          {/* ───── Hero ───── */}
          <section className="mt-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-center">
            <div>
              <BlurIn>
                <span
                  className="inline-flex items-center gap-2 z-glass rounded-full px-4 py-2 text-xs font-mono uppercase tracking-[0.15em]"
                  style={{ color: "var(--z-tertiary)" }}
                >
                  <span
                    className="size-2 rounded-full animate-pulse"
                    style={{ background: "var(--z-secondary)" }}
                  />
                  Production &middot; Co-Founded
                </span>
              </BlurIn>

              <FadeUp delay={0.1}>
                <h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-5"
                  style={{ color: "var(--z-text)" }}
                >
                  <span className="z-gradient-text">Zaylon AI</span>
                </h1>
                <p
                  className="text-xl md:text-2xl mt-3 font-medium"
                  style={{ color: "var(--z-text)" }}
                >
                  Your AI sales team for WhatsApp, Instagram, and Messenger
                </p>
                <p
                  className="text-base md:text-lg leading-relaxed mt-5 max-w-xl"
                  style={{ color: "var(--z-text-muted)" }}
                >
                  A conversational commerce platform I co-founded that replies to MENA customers
                  in Egyptian Arabic, Franco, or English, and closes the order without ever
                  leaving the chat.
                </p>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div className="flex flex-wrap items-center gap-3 mt-7">
                  <a
                    href="https://zaylon.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl text-white transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, #1B3A35, #2D6A5E, #3A8A7A)",
                      boxShadow:
                        "0 4px 20px rgba(27, 58, 53, 0.5), 0 8px 30px rgba(45, 106, 94, 0.2)",
                    }}
                  >
                    Visit zaylon.ai
                    <ArrowUpRight className="size-4" />
                  </a>
                  <a
                    href="https://dashboard.zaylon.ai/demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-xl transition-colors"
                    style={{
                      border: "1px solid rgba(58, 138, 122, 0.4)",
                      color: "var(--z-tertiary)",
                    }}
                  >
                    Try the dashboard demo
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </FadeUp>
            </div>

            {/* Orb */}
            <FadeUp delay={0.15}>
              <div className="relative aspect-square w-full max-w-[500px] mx-auto">
                <div
                  className="absolute inset-[-10%] rounded-full pointer-events-none"
                  aria-hidden="true"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(52, 211, 153, 0.18) 0%, rgba(45, 106, 94, 0.08) 35%, transparent 70%)",
                    filter: "blur(24px)",
                  }}
                />
                <ZaylonBrainOrbLazy />
              </div>
            </FadeUp>
          </section>

          {/* ───── Stat strip ───── */}
          <FadeUp delay={0.2}>
            <div
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
              style={{ borderTop: "1px solid rgba(45, 106, 94, 0.25)" }}
            >
              <Stat value="24/7" label="Always online" sublabel="Never misses a message" />
              <Stat value="<5s" label="Avg response" sublabel="Across every channel" />
              <Stat value="6" label="Platforms" sublabel="Shopify, Salla, Odoo, more" />
              <Stat value="3" label="Dialects" sublabel="English, Arabic, Franco" />
            </div>
          </FadeUp>

          {/* ───── The problem ───── */}
          <section className="mt-24">
            <FadeUp>
              <SectionEyebrow>The problem</SectionEyebrow>
              <SectionTitle>
                MENA customers shop in chat,{" "}
                <span className="z-gradient-text">and chat never sleeps</span>
              </SectionTitle>
              <SectionLead>
                In the Gulf and Egypt, customers open WhatsApp before they open a website. But
                generic chatbots fail at Egyptian Arabic and Franco, can&apos;t take payments, and
                push customers to an external checkout they abandon. The shops that do well pay
                humans to cover the inbox around the clock, and still lose conversations while
                they sleep.
              </SectionLead>
            </FadeUp>
          </section>

          {/* ───── How it works — 4 step flow ───── */}
          <section className="mt-24">
            <FadeUp>
              <SectionEyebrow>How it works</SectionEyebrow>
              <SectionTitle>
                From connected store to first sale in{" "}
                <span className="z-gradient-text">one afternoon</span>
              </SectionTitle>
            </FadeUp>

            <div className="mt-12 relative">
              {/* Horizontal connector on desktop */}
              <div
                className="hidden lg:block absolute top-7 left-0 right-0 h-px"
                aria-hidden="true"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(45, 106, 94, 0.45) 15%, rgba(45, 106, 94, 0.45) 85%, transparent 100%)",
                }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                <FadeUp delay={0.05}>
                  <StepCard
                    step="01"
                    Icon={Link2}
                    title="Connect"
                    body="Link your Shopify, Salla, WooCommerce, Odoo, YouCan, or Zoho store and the messaging channels where your customers already are."
                  />
                </FadeUp>
                <FadeUp delay={0.1}>
                  <StepCard
                    step="02"
                    Icon={Settings}
                    title="Configure"
                    body="Set the tone, the policies, the payment gateways. The AI picks up your catalog automatically and learns your product details."
                  />
                </FadeUp>
                <FadeUp delay={0.15}>
                  <StepCard
                    step="03"
                    Icon={Rocket}
                    title="Launch"
                    body="Go live in minutes. The AI handles customer questions in English, Egyptian Arabic, and Franco, and closes orders inside the chat."
                  />
                </FadeUp>
                <FadeUp delay={0.2}>
                  <StepCard
                    step="04"
                    Icon={BarChart3}
                    title="Grow"
                    body="Watch revenue attributed to chat. The dashboard shows what&apos;s working, what&apos;s converting, and where to nudge."
                  />
                </FadeUp>
              </div>
            </div>
          </section>

          {/* ───── What it does ───── */}
          <section className="mt-24">
            <FadeUp>
              <SectionEyebrow>What it does</SectionEyebrow>
              <SectionTitle>
                A full sales team,{" "}
                <span className="z-gradient-text">packaged into a chat window</span>
              </SectionTitle>
              <SectionLead>
                Zaylon isn&apos;t a chatbot. It&apos;s a product advisor, a support rep, and a
                cashier, coordinating so your customer never has to repeat themselves.
              </SectionLead>
            </FadeUp>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  Icon: Bot,
                  title: "Product advisor",
                  body: "Answers spec questions, shows variants, recommends what pairs with what, and remembers the customer&apos;s preferences between conversations.",
                },
                {
                  Icon: Languages,
                  title: "Dialect-aware replies",
                  body: "Replies in the customer&apos;s own dialect, whether they wrote in English, Egyptian Arabic, or Franco-Arabic. Voice notes too.",
                },
                {
                  Icon: Eye,
                  title: "Visual search",
                  body: "A customer sends a photo of the product they want. Zaylon matches it against your catalog and offers the closest in-stock items.",
                },
                {
                  Icon: ShoppingCart,
                  title: "Cart and checkout",
                  body: "Builds the cart, collects shipping details, charges the card, and drops a tracking number, all inside the same conversation.",
                },
                {
                  Icon: CreditCard,
                  title: "Every MENA payment",
                  body: "Stripe for cards, Paymob and Fawry for MENA, mobile wallets, cash on delivery. The customer picks what they trust.",
                },
                {
                  Icon: Headphones,
                  title: "Human handover",
                  body: "When a conversation needs a human, it escalates cleanly with full context. Your team takes over without the customer noticing.",
                },
              ].map((f) => (
                <FadeUp key={f.title} delay={0.05}>
                  <FeatureCard Icon={f.Icon} title={f.title} body={f.body} />
                </FadeUp>
              ))}
            </div>
          </section>

          {/* ───── Before / After ───── */}
          <section className="mt-24">
            <FadeUp>
              <SectionEyebrow>Before and after</SectionEyebrow>
              <SectionTitle>
                What changes when you turn{" "}
                <span className="z-gradient-text">Zaylon on</span>
              </SectionTitle>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="relative mt-10">
                <div
                  className="absolute -inset-2 rounded-3xl blur-2xl"
                  aria-hidden="true"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(45,106,94,0.05), rgba(58,138,122,0.12), rgba(45,106,94,0.05))",
                  }}
                />
                <div
                  className="relative z-card rounded-2xl overflow-hidden"
                  style={{ borderColor: "rgba(45,106,94,0.28)" }}
                >
                  <div className="grid grid-cols-2">
                    <div
                      className="p-4 md:p-5"
                      style={{ borderBottom: "1px solid rgba(45,106,94,0.25)" }}
                    >
                      <span className="text-sm font-medium" style={{ color: "var(--z-text-muted)" }}>
                        Without Zaylon
                      </span>
                    </div>
                    <div
                      className="p-4 md:p-5"
                      style={{
                        borderBottom: "1px solid rgba(45,106,94,0.25)",
                        background: "rgba(45,106,94,0.08)",
                      }}
                    >
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "var(--z-tertiary)" }}
                      >
                        With Zaylon
                      </span>
                    </div>
                  </div>

                  {[
                    {
                      before: "Customers wait hours for a reply, or don&apos;t get one after midnight",
                      after: "Every message answered in seconds, 24/7, in the customer&apos;s dialect",
                    },
                    {
                      before: "Team juggles WhatsApp, Instagram, Messenger, and web chat in separate apps",
                      after: "One inbox, one conversation history, one customer record across all channels",
                    },
                    {
                      before: "Orders closed by sending a link to a checkout page the customer abandons",
                      after: "Orders closed inside the chat with the payment method the customer prefers",
                    },
                    {
                      before: "No clear picture of what chat is actually contributing to revenue",
                      after: "Revenue attributed by channel, by customer, by campaign, by agent action",
                    },
                  ].map((row, idx, arr) => (
                    <div
                      key={idx}
                      className="grid grid-cols-2"
                      style={{
                        borderBottom:
                          idx < arr.length - 1 ? "1px solid rgba(45,106,94,0.18)" : undefined,
                      }}
                    >
                      <div
                        className="p-4 md:p-5 text-sm leading-relaxed flex items-start gap-2"
                        style={{ color: "var(--z-text-muted)" }}
                      >
                        <X className="size-4 shrink-0 mt-0.5 text-red-500/70" aria-hidden="true" />
                        <span dangerouslySetInnerHTML={{ __html: row.before }} />
                      </div>
                      <div
                        className="p-4 md:p-5 text-sm leading-relaxed flex items-start gap-2"
                        style={{
                          color: "var(--z-text)",
                          background: "rgba(45,106,94,0.05)",
                        }}
                      >
                        <Check
                          className="size-4 shrink-0 mt-0.5 text-emerald-500 dark:text-emerald-400"
                          aria-hidden="true"
                        />
                        <span dangerouslySetInnerHTML={{ __html: row.after }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </section>

          {/* ───── Dialects ───── */}
          <section className="mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-center">
              <FadeUp>
                <SectionEyebrow>Built for MENA</SectionEyebrow>
                <SectionTitle>
                  Three dialects,{" "}
                  <span className="z-gradient-text">one conversation</span>
                </SectionTitle>
                <SectionLead>
                  Egyptian customers rarely write in Modern Standard Arabic. They mix dialect,
                  Franco-Arabic, and English, sometimes all in one sentence. Zaylon picks up the
                  dominant language in every turn and replies in the same register.
                </SectionLead>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="space-y-3">
                  {[
                    { lang: "English", sample: "Hi, is the M size back in stock?" },
                    { lang: "Egyptian Arabic", sample: "السلام عليكم، مقاس الميديوم متوفر؟" },
                    { lang: "Franco-Arabic", sample: "salam, el medium raga3 el stock?" },
                  ].map((row) => (
                    <div
                      key={row.lang}
                      className="z-card rounded-xl p-4"
                    >
                      <p
                        className="text-[10px] font-mono uppercase tracking-wider mb-1.5"
                        style={{ color: "var(--z-tertiary)" }}
                      >
                        {row.lang}
                      </p>
                      <p className="text-base" style={{ color: "var(--z-text)" }}>
                        {row.sample}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </section>

          {/* ───── Works with your stack ───── */}
          <section className="mt-24">
            <FadeUp>
              <div className="text-center">
                <SectionEyebrow>Works with your stack</SectionEyebrow>
                <h2
                  className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.1]"
                  style={{ color: "var(--z-text)" }}
                >
                  Plugs into the tools{" "}
                  <span className="z-gradient-text">MENA merchants already use</span>
                </h2>
                <p
                  className="text-base md:text-lg leading-relaxed mt-4 max-w-2xl mx-auto"
                  style={{ color: "var(--z-text-muted)" }}
                >
                  Every merchant&apos;s stack is different. Zaylon meets yours where it is.
                </p>
              </div>
            </FadeUp>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  Icon: MessageSquare,
                  title: "Messaging",
                  items: ["WhatsApp", "Instagram", "Messenger", "TikTok", "Web chat"],
                },
                {
                  Icon: Package,
                  title: "E-commerce",
                  items: ["Shopify", "Salla", "WooCommerce", "Odoo", "YouCan", "Zoho"],
                },
                {
                  Icon: CreditCard,
                  title: "Payments",
                  items: ["Stripe", "Paymob", "Fawry", "Mobile wallets", "COD"],
                },
                {
                  Icon: Globe,
                  title: "Shipping",
                  items: ["Bosta", "Aramex", "Custom providers"],
                },
              ].map((group) => (
                <FadeUp key={group.title} delay={0.05}>
                  <div className="z-card rounded-2xl p-5 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(27,58,53,0.35), rgba(45,106,94,0.35))",
                        }}
                      >
                        <group.Icon className="w-4 h-4" style={{ color: "var(--z-tertiary)" }} />
                      </div>
                      <h3 className="text-base font-semibold" style={{ color: "var(--z-text)" }}>
                        {group.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <IntegrationChip key={item} label={item} />
                      ))}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </section>

          {/* ───── Dashboard ───── */}
          <section className="mt-24">
            <FadeUp>
              <SectionEyebrow>The control room</SectionEyebrow>
              <SectionTitle>
                A merchant dashboard that{" "}
                <span className="z-gradient-text">speaks Arabic first</span>
              </SectionTitle>
              <SectionLead>
                Live inbox, revenue analytics, customer segments, campaign tools, and a proactive
                action queue. Bilingual from day one, Arabic default with full RTL, English
                one click away.
              </SectionLead>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="mt-10">
                <DashboardMockup />
              </div>
            </FadeUp>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  Icon: MessageSquare,
                  title: "Unified inbox",
                  body: "WhatsApp, Instagram, Messenger, TikTok, and web chat in one view, with human takeover and canned replies.",
                },
                {
                  Icon: BarChart3,
                  title: "Revenue attribution",
                  body: "See exactly what chat contributes to revenue, by channel, campaign, customer segment, and agent action.",
                },
                {
                  Icon: Sparkles,
                  title: "Proactive suggestions",
                  body: "The platform watches for patterns and suggests the right nudge at the right time, queued for your approval.",
                },
              ].map((f) => (
                <FadeUp key={f.title} delay={0.05}>
                  <FeatureCard Icon={f.Icon} title={f.title} body={f.body} />
                </FadeUp>
              ))}
            </div>
          </section>

          {/* ───── Why it matters ───── */}
          <section className="mt-24">
            <FadeUp>
              <SectionEyebrow>Why it matters</SectionEyebrow>
              <SectionTitle>
                Four outcomes,{" "}
                <span className="z-gradient-text">measured on day one</span>
              </SectionTitle>
            </FadeUp>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  Icon: DollarSign,
                  title: "Lower cost per conversation",
                  body: "One platform replaces a shift of human agents on low-intent messages, and assists them on high-intent ones.",
                },
                {
                  Icon: Sparkles,
                  title: "More capacity, no hiring",
                  body: "Handle 10x the inbound volume without 10x the headcount. Scale campaigns without scaling the inbox team.",
                },
                {
                  Icon: Clock,
                  title: "Replies in seconds",
                  body: "First-reply latency under five seconds on every channel, at every hour, in every dialect your customers write in.",
                },
                {
                  Icon: LayoutDashboard,
                  title: "Learn as you go",
                  body: "Every conversation becomes data. See what customers actually ask, what converts, and what to fix in the catalog.",
                },
              ].map((f) => (
                <FadeUp key={f.title} delay={0.05}>
                  <FeatureCard Icon={f.Icon} title={f.title} body={f.body} />
                </FadeUp>
              ))}
            </div>
          </section>

          {/* ───── My role ───── */}
          <section className="mt-24">
            <FadeUp>
              <SectionEyebrow>My role</SectionEyebrow>
              <SectionTitle>
                Co-founder and{" "}
                <span className="z-gradient-text">engineering lead</span>
              </SectionTitle>
              <SectionLead>
                I co-founded Zaylon and built the product end to end. I designed the
                conversational architecture, shipped the multi-agent AI system, wrote the
                backend, and delivered the merchant dashboard. I also own the integrations with
                the six e-commerce platforms, the three payment providers, the messaging
                channels, and the shipping partners.
              </SectionLead>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="mt-10 flex flex-wrap gap-2">
                {[
                  "Python",
                  "FastAPI",
                  "LangGraph",
                  "PostgreSQL",
                  "pgvector",
                  "Redis",
                  "TypeScript",
                  "Next.js",
                  "React",
                  "Tailwind",
                  "Docker",
                  "Supabase",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1.5 rounded-full"
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
          </section>

          {/* ───── CTAs ───── */}
          <section className="mt-24">
            <FadeUp>
              <div
                className="z-card rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(27,58,53,0.55), rgba(45,106,94,0.35), rgba(58,138,122,0.2))",
                }}
              >
                <div>
                  <h2
                    className="text-2xl md:text-3xl font-bold tracking-tight"
                    style={{ color: "var(--z-text)" }}
                  >
                    See it for yourself
                  </h2>
                  <p className="text-sm mt-2" style={{ color: "var(--z-text-muted)" }}>
                    The demo dashboard is open. No signup, no credit card.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href="https://zaylon.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl text-white transition-all hover:scale-[1.02]"
                    style={{
                      background: "linear-gradient(135deg, #1B3A35, #2D6A5E, #3A8A7A)",
                    }}
                  >
                    Visit zaylon.ai
                    <ArrowUpRight className="size-4" />
                  </a>
                  <a
                    href="https://dashboard.zaylon.ai/demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl"
                    style={{
                      border: "1px solid rgba(58, 138, 122, 0.4)",
                      color: "var(--z-tertiary)",
                    }}
                  >
                    Dashboard demo
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </div>
            </FadeUp>

            {/* Prev / next */}
            <div
              className="mt-12 pt-8 flex items-center justify-between"
              style={{ borderTop: "1px solid rgba(45, 106, 94, 0.25)" }}
            >
              {prev ? (
                <Link
                  href={`/projects/${prev.slug}`}
                  className="group flex items-center gap-2 text-sm transition-colors"
                  style={{ color: "var(--z-text-muted)" }}
                >
                  <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                  <span className="hidden sm:inline">{prev.title}</span>
                  <span className="sm:hidden">Previous</span>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  href={`/projects/${next.slug}`}
                  className="group flex items-center gap-2 text-sm transition-colors"
                  style={{ color: "var(--z-text-muted)" }}
                >
                  <span className="hidden sm:inline">{next.title}</span>
                  <span className="sm:hidden">Next</span>
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
