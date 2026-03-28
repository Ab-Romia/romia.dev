"use client";

import { useState } from "react";

const E = {
  primary: "#3A8A7A",
  dark: "#1B3A35",
  bg: "rgba(27, 58, 53, 0.4)",
  border: "rgba(58, 138, 122, 0.25)",
  borderHover: "rgba(58, 138, 122, 0.5)",
  text: "#e0f2f1",
  muted: "#80bbb2",
  dim: "#5a9a90",
};

type AgentId = "sales" | "support" | "checkout";

const agentData: Record<AgentId, { tools: string[]; desc: string }> = {
  sales: {
    desc: "Product discovery, recommendations, visual search",
    tools: ["search_products", "get_product_details", "send_product_card", "search_by_image"],
  },
  support: {
    desc: "Policies, order tracking, escalation, feedback",
    tools: ["search_knowledge_base", "check_order_status", "escalate_to_human", "collect_feedback"],
  },
  checkout: {
    desc: "Cart, payments (Stripe/Paymob/Fawry), shipping",
    tools: ["get_cart", "add_to_cart", "remove_from_cart", "initiate_checkout", "create_cod_order", "create_stripe_payment", "create_paymob_payment", "create_fawry_payment", "create_wallet_payment"],
  },
};

function Box({
  label,
  sub,
  accent,
  pulse,
  children,
  onClick,
  active,
  className = "",
}: {
  label: string;
  sub?: string;
  accent?: boolean;
  pulse?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg border p-3 transition-all duration-200 ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={{
        background: E.bg,
        borderColor: active ? E.borderHover : E.border,
        boxShadow: pulse
          ? `0 0 12px rgba(58,138,122,0.3)`
          : active
          ? `0 0 8px rgba(58,138,122,0.2)`
          : undefined,
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
      {children}
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
  const [selected, setSelected] = useState<AgentId | null>(null);
  const agent = selected ? agentData[selected] : null;

  return (
    <div className="space-y-1">
      {/* Row 1: Entry points */}
      <div className="grid grid-cols-3 gap-2">
        <Box label="WhatsApp" sub="Business API" />
        <Box label="Instagram" sub="Messenger API" />
        <Box label="Web Chat" sub="Real-time WebSocket" />
      </div>

      <Arrow />

      {/* Row 2: Message processing layer */}
      <div className="grid grid-cols-2 gap-2">
        <Box label="Message Accumulator" sub="Redis-backed batching. Groups rapid-fire messages into single turns (3s window)" />
        <Box label="DialectBridge" sub="Auto-detects English, Egyptian Arabic, and Franco-Arabic. Routes to dialect-specific LLM" accent />
      </div>

      <Arrow />

      {/* Row 3: Supervisor */}
      <Box
        label="Supervisor Agent"
        sub="LangGraph state machine. Routes by intent, conversation phase, and RFM customer segment. Principle of least privilege: each agent only sees its own tools"
        pulse
        className="text-center"
      />

      <Arrow />

      {/* Row 4: Specialist agents */}
      <div className="grid grid-cols-3 gap-2">
        {(["sales", "support", "checkout"] as const).map((id) => (
          <Box
            key={id}
            label={`${id.charAt(0).toUpperCase() + id.slice(1)} Agent`}
            sub={agentData[id].desc}
            onClick={() => setSelected(selected === id ? null : id)}
            active={selected === id}
            accent
          >
            <p className="text-[10px] mt-1.5 font-mono" style={{ color: E.dim }}>
              {agentData[id].tools.length} tools
            </p>
          </Box>
        ))}
      </div>

      {/* Tool expansion */}
      {agent && (
        <div
          className="rounded-lg border p-3 mt-1"
          style={{ background: E.bg, borderColor: E.borderHover }}
        >
          <div className="flex flex-wrap gap-1.5">
            {agent.tools.map((t) => (
              <span
                key={t}
                className="text-[10px] font-mono px-2 py-0.5 rounded"
                style={{ background: "rgba(58,138,122,0.15)", color: E.muted }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      <Arrow />

      {/* Row 5: Infrastructure layer */}
      <div className="grid grid-cols-4 gap-2">
        <Box label="Supabase" sub="Multi-tenant PostgreSQL with Row-Level Security" />
        <Box label="pgvector" sub="Hybrid search: semantic + keyword with Reciprocal Rank Fusion" />
        <Box label="Redis" sub="Session state, message queue, rate limiting with fallback" />
        <Box label="Payments" sub="Stripe, Paymob, Fawry. HMAC-SHA256 webhook verification" />
      </div>

      <Arrow />

      {/* Row 6: Intelligence layer */}
      <div className="grid grid-cols-3 gap-2">
        <Box label="Vision AI" sub="GPT-4o image analysis. Product photo search without multimodal checkpointing" />
        <Box label="Proactive Engine" sub="6 detection rules (cart abandonment, sentiment, etc.) + LLM triage" />
        <Box label="Encryption" sub="3-layer: Fernet (messages) + AES-256-GCM (PII) + PostgreSQL RLS" />
      </div>

      {/* Shared tools */}
      <p className="text-[10px] font-mono mt-3" style={{ color: E.dim }}>
        Shared tools across all agents: get_customer_profile, get_customer_orders, update_customer_preferences
      </p>
    </div>
  );
}
