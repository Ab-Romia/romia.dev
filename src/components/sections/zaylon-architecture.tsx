"use client";

const E = {
  primary: "#3A8A7A",
  bg: "rgba(27, 58, 53, 0.4)",
  border: "rgba(58, 138, 122, 0.25)",
  text: "#e0f2f1",
  muted: "#80bbb2",
  dim: "#5a9a90",
};

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
      className={`rounded-lg border p-3 transition-all duration-200 ${className}`}
      style={{
        background: E.bg,
        borderColor: E.border,
        boxShadow: pulse ? `0 0 12px rgba(58,138,122,0.3)` : undefined,
      }}
    >
      <p className="text-xs font-semibold" style={{ color: accent ? E.primary : E.text }}>
        {label}
      </p>
      {sub && (
        <p className="text-[10px] mt-0.5 leading-snug" style={{ color: E.muted }}>
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
        <line x1="1" y1="0" x2="1" y2="16" stroke={E.primary} strokeWidth="1.5" strokeDasharray="4 3"
          style={{ animation: "dash-flow 1.5s linear infinite" }} opacity={0.5} />
      </svg>
    </div>
  );
}

export function ZaylonArchitecture() {
  return (
    <div className="space-y-1">
      {/* Messaging channels */}
      <div className="grid grid-cols-3 gap-2">
        <Box label="WhatsApp" sub="Business API" />
        <Box label="Instagram" sub="Messenger API" />
        <Box label="Web Chat" sub="Real-time streaming" />
      </div>

      <Arrow />

      {/* Message processing */}
      <div className="grid grid-cols-2 gap-2">
        <Box label="Message Accumulator" sub="Batches rapid-fire messages into coherent conversation turns" />
        <Box label="DialectBridge" sub="Tri-lingual NLP with automatic language detection and dialect-aware routing" accent />
      </div>

      <Arrow />

      {/* Supervisor */}
      <Box
        label="Supervisor Agent"
        sub="LangGraph state machine routing conversations to specialized agents based on intent and customer context"
        pulse
        className="text-center"
      />

      <Arrow />

      {/* Specialist agents */}
      <div className="grid grid-cols-3 gap-2">
        <Box label="Sales Agent" sub="Product discovery, recommendations, and visual search" accent />
        <Box label="Support Agent" sub="Knowledge base, order tracking, escalation, and feedback" accent />
        <Box label="Checkout Agent" sub="Cart management, multi-provider payments, and fulfillment" accent />
      </div>

      <Arrow />

      {/* Infrastructure */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Box label="Multi-Tenant DB" sub="Tenant-isolated PostgreSQL with vector search" />
        <Box label="Caching & Queues" sub="Session state, rate limiting, event bus" />
        <Box label="Payment Processing" sub="Multiple providers with webhook verification" />
        <Box label="Security" sub="Layered encryption, PII protection, row-level isolation" />
      </div>
    </div>
  );
}
