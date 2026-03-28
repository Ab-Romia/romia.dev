"use client";

import { useState } from "react";

const EMERALD = {
  primary: "#3A8A7A",
  dark: "#1B3A35",
  light: "#4A9A8A",
  bg: "rgba(27, 58, 53, 0.5)",
  border: "rgba(58, 138, 122, 0.3)",
  text: "#e0f2f1",
  muted: "#80bbb2",
};

const agents = [
  {
    id: "sales",
    label: "Sales Agent",
    toolCount: 4,
    tools: [
      "search_products",
      "get_product_details",
      "send_product_card",
      "search_by_image",
    ],
  },
  {
    id: "support",
    label: "Support Agent",
    toolCount: 4,
    tools: [
      "search_knowledge_base",
      "check_order_status",
      "escalate_to_human",
      "collect_feedback",
    ],
  },
  {
    id: "checkout",
    label: "Checkout Agent",
    toolCount: 9,
    tools: [
      "get_cart",
      "add_to_cart",
      "remove_from_cart",
      "initiate_checkout",
      "create_cod_order",
      "create_stripe_payment",
      "create_paymob_payment",
      "create_fawry_payment",
      "create_wallet_payment",
    ],
  },
];

const sharedTools = [
  "get_customer_profile",
  "get_customer_orders",
  "update_customer_preferences",
];

const edgeStyle: React.CSSProperties = {
  stroke: EMERALD.primary,
  strokeWidth: 1.5,
  strokeDasharray: "6 4",
  fill: "none",
  opacity: 0.6,
  animation: "dash-flow 1.5s linear infinite",
};

function ArchNode({
  x,
  y,
  width,
  height,
  label,
  subtitle,
  pulse,
  badge,
  onHover,
  onLeave,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  subtitle?: string;
  pulse?: boolean;
  badge?: number;
  onHover?: () => void;
  onLeave?: () => void;
}) {
  return (
    <g
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ cursor: onHover ? "pointer" : "default" }}
    >
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={10}
        fill={EMERALD.bg}
        stroke={EMERALD.border}
        strokeWidth={1}
        style={
          pulse
            ? { animation: "emerald-pulse 3s ease-in-out infinite" }
            : undefined
        }
      />
      <text
        x={x + width / 2}
        y={y + (subtitle ? height / 2 - 6 : height / 2 + 1)}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={EMERALD.text}
        fontSize={13}
        fontWeight={600}
        fontFamily="system-ui, sans-serif"
      >
        {label}
      </text>
      {subtitle && (
        <text
          x={x + width / 2}
          y={y + height / 2 + 12}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={EMERALD.muted}
          fontSize={10}
          fontFamily="system-ui, sans-serif"
        >
          {subtitle}
        </text>
      )}
      {badge !== undefined && (
        <>
          <circle
            cx={x + width - 8}
            cy={y + 8}
            r={10}
            fill={EMERALD.primary}
          />
          <text
            x={x + width - 8}
            y={y + 9}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#fff"
            fontSize={9}
            fontWeight={700}
            fontFamily="system-ui, sans-serif"
          >
            {badge}
          </text>
        </>
      )}
    </g>
  );
}

function DesktopDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredAgent = agents.find((a) => a.id === hovered);

  const W = 800;
  const nodeW = 180;
  const nodeH = 48;
  const agentW = 150;
  const agentH = 48;
  const cx = W / 2;

  const rows = {
    customer: 30,
    dialect: 110,
    supervisor: 190,
    agents: 290,
    response: 380,
  };

  const agentPositions = [
    { x: cx - agentW - 60, id: "sales" },
    { x: cx - agentW / 2, id: "support" },
    { x: cx + 60, id: "checkout" },
  ];

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} 430`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        className="hidden md:block"
      >
        <defs>
          <marker
            id="arrow"
            markerWidth="8"
            markerHeight="6"
            refX="8"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L8,3 L0,6" fill={EMERALD.primary} opacity={0.6} />
          </marker>
        </defs>

        {/* Edges: customer → dialect → supervisor */}
        <line
          x1={cx}
          y1={rows.customer + nodeH}
          x2={cx}
          y2={rows.dialect}
          markerEnd="url(#arrow)"
          style={edgeStyle}
        />
        <line
          x1={cx}
          y1={rows.dialect + nodeH}
          x2={cx}
          y2={rows.supervisor}
          markerEnd="url(#arrow)"
          style={edgeStyle}
        />

        {/* Edges: supervisor → agents */}
        {agentPositions.map((pos) => (
          <line
            key={pos.id}
            x1={cx}
            y1={rows.supervisor + nodeH}
            x2={pos.x + agentW / 2}
            y2={rows.agents}
            markerEnd="url(#arrow)"
            style={edgeStyle}
          />
        ))}

        {/* Edges: agents → response */}
        {agentPositions.map((pos) => (
          <line
            key={`${pos.id}-resp`}
            x1={pos.x + agentW / 2}
            y1={rows.agents + agentH}
            x2={cx}
            y2={rows.response}
            markerEnd="url(#arrow)"
            style={edgeStyle}
          />
        ))}

        {/* Nodes */}
        <ArchNode
          x={cx - nodeW / 2}
          y={rows.customer}
          width={nodeW}
          height={nodeH}
          label="Customer Message"
          subtitle="WhatsApp / Instagram / Messenger"
        />
        <ArchNode
          x={cx - nodeW / 2}
          y={rows.dialect}
          width={nodeW}
          height={nodeH}
          label="DialectBridge"
          subtitle="Language Detection"
        />
        <ArchNode
          x={cx - nodeW / 2}
          y={rows.supervisor}
          width={nodeW}
          height={nodeH}
          label="Supervisor Agent"
          subtitle="Intent Router (temp=0.0)"
          pulse
        />

        {/* Agent nodes */}
        {agentPositions.map((pos) => {
          const agent = agents.find((a) => a.id === pos.id)!;
          return (
            <ArchNode
              key={pos.id}
              x={pos.x}
              y={rows.agents}
              width={agentW}
              height={agentH}
              label={agent.label}
              badge={agent.toolCount}
              onHover={() => setHovered(pos.id)}
              onLeave={() => setHovered(null)}
            />
          );
        })}

        <ArchNode
          x={cx - nodeW / 2}
          y={rows.response}
          width={nodeW}
          height={nodeH}
          label="Response"
          subtitle="Back to Customer"
        />
      </svg>

      {/* Hover tooltip */}
      {hoveredAgent && (
        <div
          className="absolute hidden md:block z-10 p-3 rounded-lg border text-xs font-mono"
          style={{
            background: EMERALD.bg,
            borderColor: EMERALD.border,
            backdropFilter: "blur(12px)",
            top: "72%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <p
            className="font-semibold mb-1.5"
            style={{ color: EMERALD.text }}
          >
            {hoveredAgent.label} Tools:
          </p>
          <ul className="space-y-0.5" style={{ color: EMERALD.muted }}>
            {hoveredAgent.tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function MobileDiagram() {
  return (
    <div className="block md:hidden space-y-0">
      {[
        { label: "Customer Message", sub: "WhatsApp / Instagram / Messenger" },
        { label: "DialectBridge", sub: "Language Detection" },
        { label: "Supervisor Agent", sub: "Intent Router", pulse: true },
      ].map((node) => (
        <div key={node.label} className="relative pl-6 pb-6 border-l" style={{ borderColor: EMERALD.border }}>
          <div
            className="absolute -left-[5px] top-2 size-2.5 rounded-full"
            style={{
              background: EMERALD.primary,
              boxShadow: node.pulse ? `0 0 8px ${EMERALD.primary}` : undefined,
            }}
          />
          <div
            className="rounded-lg p-3 border"
            style={{ background: EMERALD.bg, borderColor: EMERALD.border }}
          >
            <p className="text-sm font-semibold" style={{ color: EMERALD.text }}>{node.label}</p>
            {node.sub && <p className="text-xs mt-0.5" style={{ color: EMERALD.muted }}>{node.sub}</p>}
          </div>
        </div>
      ))}

      {/* Agent branches */}
      <div className="pl-6 pb-4">
        <div className="grid grid-cols-3 gap-2">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="rounded-lg p-2.5 border text-center"
              style={{ background: EMERALD.bg, borderColor: EMERALD.border }}
            >
              <p className="text-xs font-semibold" style={{ color: EMERALD.text }}>
                {agent.label.replace(" Agent", "")}
              </p>
              <p className="text-[10px] mt-0.5" style={{ color: EMERALD.muted }}>
                {agent.toolCount} tools
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative pl-6 border-l" style={{ borderColor: EMERALD.border }}>
        <div
          className="absolute -left-[5px] top-2 size-2.5 rounded-full"
          style={{ background: EMERALD.primary }}
        />
        <div
          className="rounded-lg p-3 border"
          style={{ background: EMERALD.bg, borderColor: EMERALD.border }}
        >
          <p className="text-sm font-semibold" style={{ color: EMERALD.text }}>Response</p>
          <p className="text-xs mt-0.5" style={{ color: EMERALD.muted }}>Back to Customer</p>
        </div>
      </div>
    </div>
  );
}

export function ZaylonArchitecture() {
  return (
    <div>
      <DesktopDiagram />
      <MobileDiagram />
      <p className="text-xs font-mono mt-4" style={{ color: EMERALD.muted }}>
        Shared tools (all agents): {sharedTools.join(", ")}
      </p>
    </div>
  );
}
