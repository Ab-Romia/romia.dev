import { Topology, type TopologySpec } from "@/components/figures/topology";
import { cn } from "@/lib/utils";

/* Zaylon's services and how one conversation moves between them, at the level
   the case study already describes: service boundaries, the event bus, the
   stores, and the agent's tool groups. No tool counts or names, timings or
   model settings (see CLAUDE.md, Zaylon AI Context). */
const W = 190; // standard node width

const ZAYLON: TopologySpec = {
  ariaLabel:
    "Zaylon's architecture. Customer messages from WhatsApp, Instagram, Messenger, TikTok and web chat reach a FastAPI webhook gateway; the merchant dashboard, built with Next.js and CopilotKit, talks to a FastAPI merchant API. Both publish to Kafka. A conversation service consumes the events, batches messages and detects the dialect using Redis; an agent service runs the LangGraph agent, which calls sales, support and checkout tools and reaches an integrations service for the stores and a payments service for Stripe, Paymob and Fawry. Data lives in Postgres with pgvector. Every service, Kafka, Redis and Postgres run on Railway, each with its own deployment config.",
  width: 1080,
  height: 435,
  boundary: { x: 212, y: 40, w: 865, h: 388, label: "railway: every service deployed with its own config" },
  nodes: [
    { x: 10, y: 80, w: W, label: "Channels", sub: "WhatsApp, Instagram, +3" },
    { x: 10, y: 360, w: W, label: "Merchant dashboard", sub: "Next.js, CopilotKit" },
    { x: 220, y: 80, w: W, label: "Webhook gateway", sub: "FastAPI service" },
    { x: 220, y: 360, w: W, label: "Merchant API", sub: "FastAPI service" },
    { x: 440, y: 80, w: W, label: "Redis", sub: "sessions, batching, cache" },
    { x: 440, y: 220, w: W, label: "Kafka", sub: "events between services", hot: true },
    { x: 440, y: 360, w: W, label: "Postgres", sub: "pgvector, per-tenant rows" },
    { x: 660, y: 80, w: W, label: "Conversation service", sub: "batching, 3 dialects" },
    { x: 660, y: 220, w: W, label: "Agent service", sub: "LangGraph, tool calling", hot: true },
    { x: 660, y: 360, w: W, label: "Integrations service", sub: "Shopify, Salla, +4" },
    { x: 880, y: 170, w: W, label: "Sales tools", sub: "catalog, recommend" },
    { x: 880, y: 226, w: W, label: "Support tools", sub: "orders, policies" },
    { x: 880, y: 282, w: W, label: "Checkout tools", sub: "cart, pay, confirm" },
    { x: 880, y: 360, w: W, label: "Payments service", sub: "Stripe, Paymob, Fawry" },
  ],
  edges: [
    "M200 104 H220",
    "M315 128 V244 H440",
    "M200 384 H220",
    "M335 360 V256 H440",
    "M410 384 H440",
    "M630 232 H645 V104 H660",
    "M755 80 V58 H535 V80",
    "M630 256 H660",
    "M850 244 H865 V194 H880",
    "M850 250 H880",
    "M850 244 H865 V306 H880",
    "M755 268 V360",
    "M820 268 V340 H975 V360",
    "M660 384 H630",
  ],
};

export function ZaylonTopology({ className }: { className?: string }) {
  return (
    <figure className={cn("rounded-lg border border-border bg-card p-4 sm:p-6", className)}>
      {/* Wide on purpose: on a phone it scrolls sideways rather than shrinking to illegible. */}
      <div className="overflow-x-auto">
        <div className="min-w-[860px]">
          <Topology {...ZAYLON} />
        </div>
      </div>
      <figcaption className="mt-4 border-t border-border pt-4 font-mono text-xs text-muted-foreground">
        Zaylon&apos;s services: one conversation travels from a channel, through Kafka, to the agent
        and its tools, and out to the merchant&apos;s store and payment provider.
      </figcaption>
    </figure>
  );
}
