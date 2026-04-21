import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Bot,
  Languages,
  Eye,
  ShoppingCart,
  MessageSquare,
  CreditCard,
  LayoutDashboard,
  Shield,
  Zap,
  Cpu,
  Database,
  Network,
  Lock,
  Workflow,
  Sparkles,
  Globe,
  BellRing,
  TrendingUp,
  Users,
  Headphones,
  Receipt,
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
    "Case study of Zaylon AI: a multi-tenant conversational commerce platform I co-founded. Multi-agent LangGraph supervisor, tri-lingual NLP, and real-time integrations with 6 e-commerce platforms, 3 payment providers, and 5 messaging channels.",
  openGraph: {
    title: "Zaylon AI | Case Study by Abdelrahman Abouroumia",
    description:
      "Production multi-tenant conversational commerce platform for MENA merchants. Multi-agent AI, tri-lingual NLP, full-stack TypeScript and Python.",
  },
  alternates: { canonical: "/projects/zaylon-ai" },
};

function SectionHeading({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <div>
      {eyebrow && (
        <p
          className="text-xs font-mono uppercase tracking-[0.18em] mb-3"
          style={{ color: "var(--z-tertiary)" }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="text-3xl md:text-4xl font-bold tracking-tight leading-tight"
        style={{ color: "var(--z-text)" }}
      >
        {title}
      </h2>
      {lead && (
        <p
          className="text-base md:text-lg leading-relaxed mt-4 max-w-3xl"
          style={{ color: "var(--z-text-muted)" }}
        >
          {lead}
        </p>
      )}
    </div>
  );
}

function Stat({ value, label, sublabel }: { value: string; label: string; sublabel?: string }) {
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
          className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
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

function ArchBox({
  label,
  sub,
  accent = false,
  pulse = false,
}: {
  label: string;
  sub?: string;
  accent?: boolean;
  pulse?: boolean;
}) {
  return (
    <div
      className={`z-card rounded-lg p-3 text-center ${
        pulse ? "shadow-[0_0_24px_rgba(45,106,94,0.35)]" : ""
      }`}
      style={{
        borderColor: accent ? "rgba(58,138,122,0.45)" : undefined,
      }}
    >
      <p
        className="text-xs font-semibold flex items-center justify-center gap-1.5"
        style={{ color: accent ? "var(--z-tertiary)" : "var(--z-text)" }}
      >
        {pulse && (
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full animate-pulse"
            style={{ background: "var(--z-tertiary)" }}
          />
        )}
        {label}
      </p>
      {sub && (
        <p className="text-[10px] mt-0.5 leading-snug" style={{ color: "var(--z-text-muted)" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function ArchArrow() {
  return (
    <div className="flex justify-center py-1" aria-hidden="true">
      <svg width="6" height="22" className="overflow-visible">
        <line
          x1="3"
          y1="0"
          x2="3"
          y2="22"
          stroke="var(--z-secondary, #2D6A5E)"
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity={0.4}
        />
        <circle r="2" cx="3" fill="var(--z-tertiary, #3A8A7A)" opacity={0.8}>
          <animate
            attributeName="cy"
            values="0;22"
            dur="1.4s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}

function IntegrationChip({ label, hint }: { label: string; hint?: string }) {
  return (
    <div
      className="flex flex-col items-start rounded-lg px-3 py-2.5"
      style={{
        background: "rgba(27, 58, 53, 0.28)",
        border: "1px solid rgba(45, 106, 94, 0.22)",
      }}
    >
      <p className="text-sm font-semibold" style={{ color: "var(--z-text)" }}>
        {label}
      </p>
      {hint && (
        <p className="text-[10px] font-mono mt-0.5" style={{ color: "var(--z-text-muted)" }}>
          {hint}
        </p>
      )}
    </div>
  );
}

function AgentCard({
  role,
  mission,
  scope,
  Icon,
}: {
  role: string;
  mission: string;
  scope: string[];
  Icon: LucideIcon;
}) {
  return (
    <div className="z-card rounded-2xl p-5 sm:p-6">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{
            background: "linear-gradient(135deg, rgba(27,58,53,0.35), rgba(45,106,94,0.35))",
          }}
        >
          <Icon className="w-5 h-5" style={{ color: "var(--z-tertiary)" }} />
        </div>
        <div>
          <p className="text-[10px] font-mono uppercase tracking-wider" style={{ color: "var(--z-tertiary)" }}>
            Specialist
          </p>
          <h3 className="text-lg font-semibold" style={{ color: "var(--z-text)" }}>
            {role}
          </h3>
        </div>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--z-text-muted)" }}>
        {mission}
      </p>
      <ul className="mt-4 space-y-1.5">
        {scope.map((s) => (
          <li key={s} className="text-xs flex items-start gap-2" style={{ color: "var(--z-text-muted)" }}>
            <span className="mt-1 shrink-0" style={{ color: "var(--z-tertiary)" }}>
              ▸
            </span>
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DecisionCard({ title, why }: { title: string; why: string }) {
  return (
    <div className="z-card rounded-xl p-5">
      <h3 className="text-sm font-semibold mb-2" style={{ color: "var(--z-text)" }}>
        {title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--z-text-muted)" }}>
        {why}
      </p>
    </div>
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
        {/* Sidebar */}
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
                      idx === 0 && group.label === "Overview" ? "rgba(45,106,94,0.18)" : "transparent",
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

        {/* Main panel */}
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
                <p className="text-base sm:text-lg font-bold z-gradient-text leading-none">{stat.value}</p>
                <p className="text-[10px] mt-1.5" style={{ color: "var(--z-text-muted)" }}>
                  {stat.label}
                </p>
                <p className="text-[9px] font-mono mt-0.5" style={{ color: "var(--z-tertiary)" }}>
                  {stat.trend}
                </p>
              </div>
            ))}
          </div>

          {/* Inbox preview */}
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
                      <p
                        className="text-[10px] font-medium truncate"
                        style={{ color: "var(--z-text)" }}
                      >
                        {row.who}{" "}
                        <span className="font-mono" style={{ color: "var(--z-text-muted)" }}>
                          &middot; {row.via}
                        </span>
                      </p>
                      <p
                        className="text-[10px] truncate"
                        style={{ color: "var(--z-text-muted)" }}
                      >
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
        {/* Emerald atmosphere (static for case study, no mouse reactive glow) */}
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
                <p className="text-xl md:text-2xl mt-3 font-medium" style={{ color: "var(--z-text)" }}>
                  Conversational commerce for MENA merchants
                </p>
                <p
                  className="text-base md:text-lg leading-relaxed mt-5 max-w-xl"
                  style={{ color: "var(--z-text-muted)" }}
                >
                  A multi-tenant platform I co-founded that turns WhatsApp, Instagram, and Messenger into full
                  sales channels. Customers browse products, ask questions in their own dialect, and complete
                  purchases entirely inside the chat. A supervisor agent routes each conversation to
                  specialized sales, support, and checkout agents.
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
                      boxShadow: "0 4px 20px rgba(27, 58, 53, 0.5), 0 8px 30px rgba(45, 106, 94, 0.2)",
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
              <Stat value="3" label="Specialist agents" sublabel="Sales, Support, Checkout" />
              <Stat value="6" label="E-commerce platforms" sublabel="Shopify &middot; Salla &middot; Odoo &middot; more" />
              <Stat value="5" label="Messaging channels" sublabel="WhatsApp, IG, FB, TikTok, web" />
              <Stat value="3" label="Dialects detected" sublabel="English, Egyptian Arabic, Franco" />
            </div>
          </FadeUp>

          {/* ───── The challenge ───── */}
          <section className="mt-24">
            <FadeUp>
              <SectionHeading
                eyebrow="The challenge"
                title="MENA merchants lose sales in the chat"
                lead="Customers in the Gulf and Egypt shop on WhatsApp and Instagram first, websites second. But off-the-shelf chatbots fail at Egyptian Arabic and Franco-Arabic, have no commerce tooling, and force customers to bounce out to a checkout page that they abandon. The shops that do well pay humans to answer messages around the clock and still lose conversations while they sleep."
              />
            </FadeUp>
          </section>

          {/* ───── The solution ───── */}
          <section className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                Icon: Workflow,
                title: "Supervisor multi-agent",
                body: "A LangGraph state machine routes each conversation to specialized agents with scoped tool access. Agents can't perform actions outside their mandate, so there's no way to hallucinate a refund.",
              },
              {
                Icon: Languages,
                title: "DialectBridge NLP",
                body: "Detects whether a customer writes in English, Egyptian Arabic, or Franco-Arabic and replies in matching dialect automatically. Transcribes voice notes in the same three languages.",
              },
              {
                Icon: TrendingUp,
                title: "Full purchase loop",
                body: "The bot doesn't just answer questions. It searches the catalog, builds carts, collects addresses, charges the card, and hands a tracking number back, all inside the same thread.",
              },
            ].map((f) => (
              <FadeUp key={f.title} delay={0.05}>
                <FeatureCard Icon={f.Icon} title={f.title} body={f.body} />
              </FadeUp>
            ))}
          </section>

          {/* ───── System architecture ───── */}
          <section className="mt-24">
            <FadeUp>
              <SectionHeading
                eyebrow="System architecture"
                title="How a WhatsApp message becomes an order"
                lead="Every inbound message goes through the same pipeline: channel adapter, dialect detection, a batching layer that collects rapid-fire messages into one coherent turn, and finally the supervisor who routes to a specialist. Actions mutate tenant-scoped state and reply through the same channel."
              />
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="mt-10 z-card rounded-2xl p-6 md:p-8">
                {/* Channels */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  <ArchBox label="WhatsApp" sub="Business API" />
                  <ArchBox label="Instagram" sub="Messenger API" />
                  <ArchBox label="Messenger" sub="Graph API" />
                  <ArchBox label="TikTok" sub="Messages API" />
                  <ArchBox label="Web chat" sub="Real-time" />
                </div>
                <ArchArrow />

                {/* Accumulator + DialectBridge */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <ArchBox
                    label="Message Accumulator"
                    sub="Batches rapid-fire messages into coherent turns before invoking the agent"
                  />
                  <ArchBox
                    label="DialectBridge"
                    sub="Tri-lingual NLP with auto language detection + dialect-matched responses"
                    accent
                  />
                </div>
                <ArchArrow />

                {/* Supervisor */}
                <ArchBox
                  label="Supervisor Agent"
                  sub="LangGraph state machine routing to specialists based on intent, phase, and customer context"
                  pulse
                />
                <ArchArrow />

                {/* Specialists */}
                <div className="grid grid-cols-3 gap-2">
                  <ArchBox label="Sales Agent" sub="Discovery, search, recommendations" accent />
                  <ArchBox label="Support Agent" sub="Knowledge base, order tracking, escalation" accent />
                  <ArchBox label="Checkout Agent" sub="Cart, address, payment, fulfillment" accent />
                </div>
                <ArchArrow />

                {/* Data layer */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <ArchBox label="Multi-tenant DB" sub="Postgres + pgvector, RLS isolated" />
                  <ArchBox label="Cache and queues" sub="Session, rate limits, event bus" />
                  <ArchBox label="Payments" sub="Webhook-verified, 3 providers" />
                  <ArchBox label="Shipping" sub="Label printing, live tracking" />
                </div>
              </div>
            </FadeUp>
          </section>

          {/* ───── Agents ───── */}
          <section className="mt-24">
            <FadeUp>
              <SectionHeading
                eyebrow="The agents"
                title="Three specialists, one supervisor"
                lead="Flat multi-agent systems tend to let any agent call any tool, which is great for flexibility and terrible for predictability. Zaylon uses a supervisor pattern: one router agent with minimal tools, three specialists with scoped access to only the tools they need."
              />
            </FadeUp>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              <FadeUp delay={0.05}>
                <AgentCard
                  Icon={ShoppingCart}
                  role="Sales"
                  mission="Owns discovery. Searches the catalog, surfaces products, answers spec questions, and builds carts. Hands over to Checkout once the customer is ready to buy."
                  scope={[
                    "Hybrid product search (keyword + vector + RRF)",
                    "Visual search from customer photos",
                    "Cross-sell and upsell via policy rules",
                    "Cart construction and edits",
                  ]}
                />
              </FadeUp>
              <FadeUp delay={0.1}>
                <AgentCard
                  Icon={Headphones}
                  role="Support"
                  mission="Owns existing customers. Answers from a retrieval-augmented knowledge base, tracks orders, collects feedback, and escalates to a human when it's out of depth."
                  scope={[
                    "KB retrieval with grounded answers",
                    "Order status and shipment tracking",
                    "Feedback capture and sentiment tagging",
                    "Human handoff with full context",
                  ]}
                />
              </FadeUp>
              <FadeUp delay={0.15}>
                <AgentCard
                  Icon={Receipt}
                  role="Checkout"
                  mission="Owns money movement. Collects shipping details, confirms the cart, charges via Stripe, Paymob, or Fawry, and hands back a tracking number. It cannot discover products or open the knowledge base."
                  scope={[
                    "Shipping address collection and validation",
                    "Multi-provider payment processing",
                    "COD and mobile wallet flows",
                    "Order creation + fulfillment trigger",
                  ]}
                />
              </FadeUp>
            </div>
          </section>

          {/* ───── DialectBridge ───── */}
          <section className="mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 items-center">
              <FadeUp>
                <SectionHeading
                  eyebrow="Tri-lingual NLP"
                  title="DialectBridge"
                  lead="Egyptian customers rarely write in Modern Standard Arabic. They mix dialectal Arabic, Franco-Arabic (Arabic written in Latin characters with numerals for sounds Latin doesn't have), and English, sometimes all in one sentence. DialectBridge auto-detects the dominant language in every turn and matches the response to it, including voice notes."
                />
                <div className="mt-6 space-y-3">
                  {[
                    { lang: "English", sample: "Hi, is the M size back in stock?" },
                    { lang: "Egyptian Arabic", sample: "السلام عليكم، مقاس الميديوم متوفر؟" },
                    { lang: "Franco-Arabic", sample: "salam, el medium raga3 el stock?" },
                  ].map((row) => (
                    <div
                      key={row.lang}
                      className="rounded-lg p-3"
                      style={{
                        background: "rgba(27, 58, 53, 0.28)",
                        border: "1px solid rgba(45, 106, 94, 0.22)",
                      }}
                    >
                      <p
                        className="text-[10px] font-mono uppercase tracking-wider mb-1"
                        style={{ color: "var(--z-tertiary)" }}
                      >
                        {row.lang}
                      </p>
                      <p className="text-sm" style={{ color: "var(--z-text)" }}>
                        {row.sample}
                      </p>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.1}>
                <div className="z-card rounded-2xl p-6">
                  <p
                    className="text-xs font-mono uppercase tracking-wider mb-3"
                    style={{ color: "var(--z-tertiary)" }}
                  >
                    Pipeline
                  </p>
                  <ol className="space-y-3">
                    {[
                      { step: "01", label: "Detect", body: "Language + dialect classifier on every inbound turn." },
                      { step: "02", label: "Normalize", body: "Franco-Arabic mapped to Arabic script for intent parsing." },
                      { step: "03", label: "Route", body: "Intent passed to the supervisor with dialect metadata." },
                      { step: "04", label: "Respond", body: "Agent generates reply; post-processor matches the dialect back." },
                      { step: "05", label: "Voice", body: "Voice notes transcribed in the detected language, then rejoin the text pipeline." },
                    ].map((item) => (
                      <li key={item.step} className="flex gap-3">
                        <span
                          className="text-xs font-mono shrink-0 w-7"
                          style={{ color: "var(--z-tertiary)" }}
                        >
                          {item.step}
                        </span>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: "var(--z-text)" }}>
                            {item.label}
                          </p>
                          <p className="text-xs leading-relaxed" style={{ color: "var(--z-text-muted)" }}>
                            {item.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </FadeUp>
            </div>
          </section>

          {/* ───── Proactive engine ───── */}
          <section className="mt-24">
            <FadeUp>
              <SectionHeading
                eyebrow="Proactive engine"
                title="The bot also starts conversations"
                lead="Most of the revenue in chat commerce sits in conversations that never happened. A detection engine watches every thread and every cart for the signals worth acting on, then either auto-sends a nudge or drops a suggested action into the merchant's approval queue."
              />
            </FadeUp>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  Icon: ShoppingCart,
                  title: "Cart abandonment",
                  body: "Cart built, no checkout in N minutes. Proposes a recovery nudge with the exact items.",
                },
                {
                  Icon: Sparkles,
                  title: "Cross-sell opportunity",
                  body: "Order contains an item with known pairing; suggests the pair before dispatch.",
                },
                {
                  Icon: BellRing,
                  title: "Negative sentiment",
                  body: "Sentiment drop detected mid-conversation; escalates to a human before the customer churns.",
                },
                {
                  Icon: Workflow,
                  title: "Phase stuck",
                  body: "Conversation sits in the same phase too long; agent escalates or re-prompts.",
                },
                {
                  Icon: MessageSquare,
                  title: "Repeat questions",
                  body: "Customer asks the same thing twice; shortcut into the KB or a live agent.",
                },
                {
                  Icon: TrendingUp,
                  title: "Window expiring",
                  body: "WhatsApp 24-hour window closing; queues the merchant a template message suggestion.",
                },
              ].map((rule) => (
                <FadeUp key={rule.title} delay={0.05}>
                  <FeatureCard Icon={rule.Icon} title={rule.title} body={rule.body} />
                </FadeUp>
              ))}
            </div>
          </section>

          {/* ───── Capabilities grid ───── */}
          <section className="mt-24">
            <FadeUp>
              <SectionHeading
                eyebrow="Core capabilities"
                title="What the platform does end to end"
              />
            </FadeUp>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  Icon: Bot,
                  title: "Supervisor routing",
                  body: "Scoped tool access per specialist, no action hallucination.",
                },
                {
                  Icon: Languages,
                  title: "Dialect-aware replies",
                  body: "Detects and matches English, Egyptian Arabic, and Franco.",
                },
                {
                  Icon: Eye,
                  title: "Visual product search",
                  body: "Customer sends a photo; bot matches against the catalog.",
                },
                {
                  Icon: ShoppingCart,
                  title: "Real-time catalog sync",
                  body: "Live inventory across 6 commerce platforms with webhook updates.",
                },
                {
                  Icon: MessageSquare,
                  title: "Conversation memory",
                  body: "Per-customer history, preferences, and phase state persist across sessions.",
                },
                {
                  Icon: CreditCard,
                  title: "Multi-provider payments",
                  body: "Stripe + Paymob + Fawry + COD with webhook-verified settlement.",
                },
                {
                  Icon: LayoutDashboard,
                  title: "Merchant dashboard",
                  body: "Inbox, analytics, RFM segments, A/B tests, and human handoff queue.",
                },
                {
                  Icon: Shield,
                  title: "Multi-tenant isolation",
                  body: "Per-merchant encryption, row-level security on every data access.",
                },
              ].map((cap) => (
                <FadeUp key={cap.title} delay={0.03}>
                  <FeatureCard Icon={cap.Icon} title={cap.title} body={cap.body} />
                </FadeUp>
              ))}
            </div>
          </section>

          {/* ───── Integrations matrix ───── */}
          <section className="mt-24">
            <FadeUp>
              <SectionHeading
                eyebrow="Integrations"
                title="The commerce perimeter"
                lead="Every merchant's stack is different. Zaylon adapts to theirs: their store platform, their payment gateway, their shipping provider, their channel mix. Adding a new provider is a new adapter, not a rewrite."
              />
            </FadeUp>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  title: "E-commerce platforms",
                  icon: Database,
                  items: [
                    { label: "Shopify", hint: "Admin + Storefront API" },
                    { label: "Salla", hint: "Merchant API" },
                    { label: "WooCommerce", hint: "REST API + webhooks" },
                    { label: "Odoo", hint: "XML-RPC" },
                    { label: "YouCan", hint: "REST API" },
                    { label: "Zoho Commerce", hint: "REST API" },
                  ],
                },
                {
                  title: "Messaging channels",
                  icon: MessageSquare,
                  items: [
                    { label: "WhatsApp", hint: "Cloud API" },
                    { label: "Instagram", hint: "Messenger API" },
                    { label: "Messenger", hint: "Graph API" },
                    { label: "TikTok", hint: "Messages API" },
                    { label: "Web chat", hint: "Real-time streaming" },
                  ],
                },
                {
                  title: "Payment providers",
                  icon: CreditCard,
                  items: [
                    { label: "Stripe", hint: "Global cards" },
                    { label: "Paymob", hint: "MENA cards + wallets" },
                    { label: "Fawry", hint: "Egypt cash + wallets" },
                    { label: "Mobile wallets", hint: "Vodafone Cash, Orange" },
                    { label: "Cash on delivery", hint: "Built-in flow" },
                  ],
                },
                {
                  title: "Shipping and fulfillment",
                  icon: Network,
                  items: [
                    { label: "Bosta", hint: "MENA courier" },
                    { label: "Aramex", hint: "International" },
                    { label: "Manual fulfillment", hint: "Merchant-owned logistics" },
                  ],
                },
              ].map((group) => (
                <FadeUp key={group.title} delay={0.05}>
                  <div className="z-card rounded-2xl p-5 sm:p-6 h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(27,58,53,0.35), rgba(45,106,94,0.35))",
                        }}
                      >
                        <group.icon className="w-4 h-4" style={{ color: "var(--z-tertiary)" }} />
                      </div>
                      <h3 className="text-base font-semibold" style={{ color: "var(--z-text)" }}>
                        {group.title}
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {group.items.map((it) => (
                        <IntegrationChip key={it.label} label={it.label} hint={it.hint} />
                      ))}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </section>

          {/* ───── Dashboard tour ───── */}
          <section className="mt-24">
            <FadeUp>
              <SectionHeading
                eyebrow="Merchant dashboard"
                title="The control room"
                lead="The dashboard is where merchants onboard their stores, watch live conversations, approve proactive actions, tune prompts, and read analytics. Built with Next.js 16, bilingual from day one (Arabic default, English opt-in), and a full demo mode with scripted conversations for prospects."
              />
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="mt-10">
                <DashboardMockup />
              </div>
            </FadeUp>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  Icon: Users,
                  title: "Inbox and handover",
                  body: "Live multi-channel inbox with take-over, return-to-AI, canned responses, and SLA tracking.",
                },
                {
                  Icon: TrendingUp,
                  title: "Analytics and BI",
                  body: "Revenue attribution, funnel conversion by channel, RFM customer segments, proactive insight reports.",
                },
                {
                  Icon: Globe,
                  title: "Bilingual + RTL",
                  body: "Arabic default with full RTL layout and Cairo font; English with DM Sans; seamless locale switching.",
                },
              ].map((f) => (
                <FadeUp key={f.title} delay={0.05}>
                  <FeatureCard Icon={f.Icon} title={f.title} body={f.body} />
                </FadeUp>
              ))}
            </div>
          </section>

          {/* ───── Security and isolation ───── */}
          <section className="mt-24">
            <FadeUp>
              <SectionHeading
                eyebrow="Security"
                title="Three layers of tenant isolation"
                lead="A multi-tenant SaaS that touches payments and customer PII cannot rely on one line of defense. Zaylon isolates tenants at three layers, each enforceable independently."
              />
            </FadeUp>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5">
              <FadeUp delay={0.05}>
                <FeatureCard
                  Icon={Lock}
                  title="Application layer"
                  body="Every request resolves to an AuthContext with tenant_id and permissions derived from JWT or API key. No handler ever trusts a client-supplied tenant id."
                />
              </FadeUp>
              <FadeUp delay={0.1}>
                <FeatureCard
                  Icon={Database}
                  title="Database layer"
                  body="Row Level Security with FORCE RLS enabled on tenant-scoped tables. Policies read the tenant id from the JWT claim, not from the query."
                />
              </FadeUp>
              <FadeUp delay={0.15}>
                <FeatureCard
                  Icon={Shield}
                  title="Static layer"
                  body="Semgrep rules block direct table access from anywhere outside an allowlisted dependency-injection path. CI fails the PR if someone tries to smuggle a raw client in."
                />
              </FadeUp>
            </div>
          </section>

          {/* ───── Technical decisions ───── */}
          <section className="mt-24">
            <FadeUp>
              <SectionHeading
                eyebrow="Technical decisions"
                title="Choices I would defend in a room"
              />
            </FadeUp>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <FadeUp delay={0.05}>
                <DecisionCard
                  title="Supervisor pattern over flat multi-agent"
                  why="Flat multi-agent means any agent can call any tool, which is great for demo videos and terrible for a system that takes payments. Scoping tools per specialist removes entire classes of hallucinated actions and collapses the attack surface to the supervisor."
                />
              </FadeUp>
              <FadeUp delay={0.1}>
                <DecisionCard
                  title="LangGraph state machine over chain-of-thought"
                  why="Conversation phases (browsing, carting, paying) have deterministic transitions. A state machine makes those transitions explicit and inspectable. Chain-of-thought hides them inside the prompt where nobody can audit them."
                />
              </FadeUp>
              <FadeUp delay={0.15}>
                <DecisionCard
                  title="Message accumulation before invocation"
                  why="Customers send three or four rapid messages instead of one structured prompt. Without batching, each triggers an independent agent invocation that sees a fragment of the intent. Accumulate, debounce, then route once."
                />
              </FadeUp>
              <FadeUp delay={0.2}>
                <DecisionCard
                  title="pgvector over dedicated vector DB"
                  why="Product search, knowledge base retrieval, and conversation memory all need vectors. Running them in the same Postgres that already holds the tenant data removes a consistency boundary and a moving part. pgvector is fast enough for the query shapes we actually run."
                />
              </FadeUp>
              <FadeUp delay={0.25}>
                <DecisionCard
                  title="All dashboard data through the Python backend"
                  why="The dashboard never talks to Supabase directly. Every read goes through FastAPI so the same authorization, rate limiting, and multi-CRM abstraction applies whether the caller is a merchant-side app, a messaging webhook, or the dashboard itself."
                />
              </FadeUp>
              <FadeUp delay={0.3}>
                <DecisionCard
                  title="Build-time guard against shipping demo keys"
                  why="The demo mode uses a known public API key scoped to a demo tenant. If that key ever shipped pointing at the production backend, anyone could read real tenant data. A Next.js build-time guard refuses to produce a bundle that combines the demo key with a production backend URL."
                />
              </FadeUp>
            </div>
          </section>

          {/* ───── Stack ───── */}
          <section className="mt-24">
            <FadeUp>
              <SectionHeading eyebrow="Stack" title="What it's built with" />
            </FadeUp>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  Icon: Cpu,
                  title: "Backend",
                  items: [
                    "Python 3.11, FastAPI",
                    "LangGraph multi-agent supervisor",
                    "Supabase Postgres + pgvector",
                    "Redis (cache, session, rate limits)",
                    "OpenRouter primary, OpenAI fallback",
                    "Gemini (dialect + voice transcription)",
                    "Pytest (886+ tests across unit + integration)",
                    "Railway deployment via Dockerfile",
                  ],
                },
                {
                  Icon: LayoutDashboard,
                  title: "Dashboard",
                  items: [
                    "Next.js 16 App Router, React 19",
                    "TypeScript, pnpm, standalone Docker build",
                    "TanStack Query (server state), Zustand (client state)",
                    "next-intl with Arabic-first + English",
                    "Radix UI primitives, Tailwind v4",
                    "Recharts for analytics, Sonner for toasts",
                    "Supabase Auth (session only, not data)",
                    "Per-route CSP + CSP-whitelisted demo frame",
                  ],
                },
                {
                  Icon: Zap,
                  title: "Marketing site",
                  items: [
                    "Vite + React 19",
                    "Tailwind + Framer Motion",
                    "Trilingual (English, Arabic, Franco) with RTL",
                    "Dark and light themes",
                    "Vercel edge deployment",
                    "Three.js brain orb via react-three-fiber",
                  ],
                },
                {
                  Icon: Workflow,
                  title: "Ops and quality",
                  items: [
                    "Row-Level Security with FORCE RLS on tenant tables",
                    "Semgrep rules blocking direct table access",
                    "Alembic migrations as source of truth",
                    "Postman collection for every endpoint",
                    "GitHub Actions CI on push and PR",
                    "Plan-tier entitlements cached client + server",
                  ],
                },
              ].map((col) => (
                <FadeUp key={col.title} delay={0.05}>
                  <div className="z-card rounded-2xl p-5 sm:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(27,58,53,0.35), rgba(45,106,94,0.35))",
                        }}
                      >
                        <col.Icon className="w-4 h-4" style={{ color: "var(--z-tertiary)" }} />
                      </div>
                      <h3 className="text-base font-semibold" style={{ color: "var(--z-text)" }}>
                        {col.title}
                      </h3>
                    </div>
                    <ul className="space-y-1.5">
                      {col.items.map((item) => (
                        <li
                          key={item}
                          className="text-sm leading-relaxed flex gap-2"
                          style={{ color: "var(--z-text-muted)" }}
                        >
                          <span className="shrink-0 mt-1" style={{ color: "var(--z-tertiary)" }}>
                            ▸
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeUp>
              ))}
            </div>
          </section>

          {/* ───── Results / Impact ───── */}
          <section className="mt-24">
            <FadeUp>
              <SectionHeading
                eyebrow="Impact"
                title="Where the platform is today"
                lead="Shipping, taking payments, and serving real MENA merchants across six e-commerce platforms and five messaging channels. The dashboard is bilingual, the backend is multi-tenant from day one, and the demo is public at dashboard.zaylon.ai/demo."
              />
            </FadeUp>

            <FadeUp delay={0.1}>
              <div
                className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 pt-8"
                style={{ borderTop: "1px solid rgba(45, 106, 94, 0.25)" }}
              >
                <Stat value="40k+" label="Backend lines" sublabel="Python, FastAPI" />
                <Stat value="31k+" label="Dashboard lines" sublabel="TypeScript, Next.js" />
                <Stat value="880+" label="Tests" sublabel="Unit + integration" />
                <Stat value="3" label="Services in prod" sublabel="API, dashboard, marketing" />
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
                    Try the product or read the next case study
                  </h2>
                  <p className="text-sm mt-2" style={{ color: "var(--z-text-muted)" }}>
                    The demo dashboard is open to anyone. No signup, no credit card.
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
                  <ArrowUpRight className="size-4 group-hover:translate-x-1 transition-transform" />
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
