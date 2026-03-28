"use client";

function Box({
  label,
  sub,
  accent,
  pulse,
  className = "",
}: {
  label: string;
  sub?: string;
  accent?: boolean;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-border bg-card p-3 transition-all duration-200 hover:border-accent/30 ${
        pulse ? "shadow-[0_0_12px_rgba(var(--accent-raw,0,212,255),0.15)]" : ""
      } ${className}`}
    >
      <p className={`text-xs font-semibold ${accent ? "text-accent" : "text-foreground"}`}>
        {label}
      </p>
      {sub && (
        <p className="text-[10px] mt-0.5 leading-snug text-muted-foreground">
          {sub}
        </p>
      )}
    </div>
  );
}

function Arrow() {
  return (
    <div className="flex justify-center py-1">
      <svg width="2" height="16" className="overflow-visible">
        <line
          x1="1" y1="0" x2="1" y2="16"
          className="stroke-accent"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          style={{ animation: "dash-flow 1.5s linear infinite" }}
          opacity={0.4}
        />
      </svg>
    </div>
  );
}

export function ZaylonArchitecture() {
  return (
    <div className="space-y-1">
      <div className="grid grid-cols-3 gap-2">
        <Box label="WhatsApp" sub="Business API" />
        <Box label="Instagram" sub="Messenger API" />
        <Box label="Web Chat" sub="Real-time streaming" />
      </div>

      <Arrow />

      <div className="grid grid-cols-2 gap-2">
        <Box label="Message Accumulator" sub="Batches rapid-fire messages into coherent conversation turns" />
        <Box label="DialectBridge" sub="Tri-lingual NLP with automatic language detection and dialect-aware routing" accent />
      </div>

      <Arrow />

      <Box
        label="Supervisor Agent"
        sub="LangGraph state machine routing conversations to specialized agents based on intent and customer context"
        pulse
        className="text-center"
      />

      <Arrow />

      <div className="grid grid-cols-3 gap-2">
        <Box label="Sales Agent" sub="Product discovery, recommendations, and visual search" accent />
        <Box label="Support Agent" sub="Knowledge base, order tracking, escalation, and feedback" accent />
        <Box label="Checkout Agent" sub="Cart management, multi-provider payments, and fulfillment" accent />
      </div>

      <Arrow />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Box label="Multi-Tenant DB" sub="Tenant-isolated PostgreSQL with vector search" />
        <Box label="Caching & Queues" sub="Session state, rate limiting, event bus" />
        <Box label="Payment Processing" sub="Multiple providers with webhook verification" />
        <Box label="Security" sub="Layered encryption, PII protection, row-level isolation" />
      </div>
    </div>
  );
}
