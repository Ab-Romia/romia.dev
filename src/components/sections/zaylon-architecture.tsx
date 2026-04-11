"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

function Box({
  label,
  sub,
  accent,
  pulse,
  active,
  onClick,
  className = "",
}: {
  label: string;
  sub?: string;
  accent?: boolean;
  pulse?: boolean;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "z-card rounded-lg p-3 transition-all duration-300",
        active && "scale-[1.02] !border-[rgba(45,106,94,0.5)] shadow-[0_0_12px_rgba(45,106,94,0.2)]",
        onClick && "cursor-pointer",
        className
      )}
    >
      <p
        className="text-xs font-semibold"
        style={{ color: accent ? "var(--z-tertiary)" : "var(--z-text)" }}
      >
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

function Arrow() {
  return (
    <div className="flex justify-center py-1">
      <svg width="6" height="20" className="overflow-visible">
        <line x1="3" y1="0" x2="3" y2="20"
          stroke="var(--z-secondary, #2D6A5E)" strokeWidth="1" strokeDasharray="4 3" opacity={0.3} />
        <circle r="2" cx="3" fill="var(--z-tertiary, #3A8A7A)" opacity={0.7}>
          <animateMotion dur="1.5s" repeatCount="indefinite" path="M 0 0 L 0 20" />
        </circle>
      </svg>
    </div>
  );
}

const agentDetails: Record<string, string> = {
  "Sales Agent": "Handles product discovery, catalog search, recommendations, and visual product matching",
  "Support Agent": "Manages knowledge base queries, order tracking, escalation to human agents, and feedback collection",
  "Checkout Agent": "Processes cart operations, multi-provider payments, address collection, and order fulfillment",
};

export function ZaylonArchitecture() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);

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
        {["Sales Agent", "Support Agent", "Checkout Agent"].map((name) => (
          <Box
            key={name}
            label={name}
            sub={activeAgent === name ? agentDetails[name] : name.replace(" Agent", "") + " operations"}
            accent
            active={activeAgent === name}
            onClick={() => setActiveAgent(activeAgent === name ? null : name)}
          />
        ))}
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
