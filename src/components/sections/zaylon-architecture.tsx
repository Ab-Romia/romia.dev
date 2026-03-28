"use client";

import { useState } from "react";

const E = {
  primary: "#3A8A7A",
  dark: "#1B3A35",
  bg: "rgba(27, 58, 53, 0.5)",
  border: "rgba(58, 138, 122, 0.3)",
  text: "#e0f2f1",
  muted: "#80bbb2",
};

const agents = [
  {
    id: "sales",
    label: "Sales",
    toolCount: 4,
    tools: ["search_products", "get_product_details", "send_product_card", "search_by_image"],
  },
  {
    id: "support",
    label: "Support",
    toolCount: 4,
    tools: ["search_knowledge_base", "check_order_status", "escalate_to_human", "collect_feedback"],
  },
  {
    id: "checkout",
    label: "Checkout",
    toolCount: 9,
    tools: ["get_cart", "add_to_cart", "remove_from_cart", "initiate_checkout", "create_cod_order", "create_stripe_payment", "create_paymob_payment", "create_fawry_payment", "create_wallet_payment"],
  },
];

const sharedTools = ["get_customer_profile", "get_customer_orders", "update_customer_preferences"];

const dash: React.CSSProperties = {
  stroke: E.primary,
  strokeWidth: 1.5,
  strokeDasharray: "6 4",
  fill: "none",
  opacity: 0.5,
  animation: "dash-flow 1.5s linear infinite",
};

function Node({
  x, y, w, h, label, sub, pulse, badge, onEnter, onLeave,
}: {
  x: number; y: number; w: number; h: number;
  label: string; sub?: string; pulse?: boolean; badge?: number;
  onEnter?: () => void; onLeave?: () => void;
}) {
  return (
    <g onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ cursor: onEnter ? "pointer" : "default" }}>
      <rect x={x} y={y} width={w} height={h} rx={8} fill={E.bg} stroke={E.border} strokeWidth={1}
        style={pulse ? { animation: "emerald-pulse 3s ease-in-out infinite" } : undefined} />
      <text x={x + w / 2} y={y + (sub ? h / 2 - 5 : h / 2 + 1)} textAnchor="middle" dominantBaseline="middle"
        fill={E.text} fontSize={12} fontWeight={600} fontFamily="system-ui, sans-serif">{label}</text>
      {sub && <text x={x + w / 2} y={y + h / 2 + 10} textAnchor="middle" dominantBaseline="middle"
        fill={E.muted} fontSize={9} fontFamily="system-ui, sans-serif">{sub}</text>}
      {badge !== undefined && (
        <>
          <circle cx={x + w - 6} cy={y + 6} r={9} fill={E.primary} />
          <text x={x + w - 6} y={y + 7} textAnchor="middle" dominantBaseline="middle"
            fill="#fff" fontSize={8} fontWeight={700} fontFamily="system-ui, sans-serif">{badge}</text>
        </>
      )}
    </g>
  );
}

function DesktopDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);
  const agent = agents.find((a) => a.id === hovered);

  // Layout constants
  const W = 700;
  const cx = W / 2;
  const nw = 160; // top node width
  const nh = 40;  // top node height
  const aw = 120; // agent node width
  const ah = 40;  // agent node height
  const gap = 20; // gap between agent nodes

  // Row Y positions (compact)
  const Y = { msg: 20, dial: 85, sup: 150, agents: 230, resp: 310 };

  // Agent X positions: 3 evenly spaced
  const totalAgentW = aw * 3 + gap * 2;
  const agentStartX = cx - totalAgentW / 2;
  const agentXs = [agentStartX, agentStartX + aw + gap, agentStartX + 2 * (aw + gap)];

  return (
    <div className="relative">
      <svg viewBox={`0 0 ${W} 360`} width="100%" preserveAspectRatio="xMidYMid meet" className="hidden md:block">
        <defs>
          <marker id="arw" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill={E.primary} opacity={0.5} />
          </marker>
        </defs>

        {/* Vertical edges: msg→dial→sup */}
        <line x1={cx} y1={Y.msg + nh} x2={cx} y2={Y.dial} markerEnd="url(#arw)" style={dash} />
        <line x1={cx} y1={Y.dial + nh} x2={cx} y2={Y.sup} markerEnd="url(#arw)" style={dash} />

        {/* Fan out: sup → 3 agents */}
        {agentXs.map((ax, i) => (
          <line key={`down-${i}`} x1={cx} y1={Y.sup + nh} x2={ax + aw / 2} y2={Y.agents} markerEnd="url(#arw)" style={dash} />
        ))}

        {/* Fan in: 3 agents → response */}
        {agentXs.map((ax, i) => (
          <line key={`up-${i}`} x1={ax + aw / 2} y1={Y.agents + ah} x2={cx} y2={Y.resp} markerEnd="url(#arw)" style={dash} />
        ))}

        {/* Top nodes */}
        <Node x={cx - nw / 2} y={Y.msg} w={nw} h={nh} label="Customer Message" sub="WhatsApp / Instagram / Messenger" />
        <Node x={cx - nw / 2} y={Y.dial} w={nw} h={nh} label="DialectBridge" sub="Language Detection" />
        <Node x={cx - nw / 2} y={Y.sup} w={nw} h={nh} label="Supervisor Agent" sub="Intent Router (temp=0.0)" pulse />

        {/* Agent nodes */}
        {agents.map((a, i) => (
          <Node key={a.id} x={agentXs[i]} y={Y.agents} w={aw} h={ah}
            label={a.label} badge={a.toolCount}
            onEnter={() => setHovered(a.id)} onLeave={() => setHovered(null)} />
        ))}

        {/* Response node */}
        <Node x={cx - nw / 2} y={Y.resp} w={nw} h={nh} label="Response" sub="Back to Customer" />
      </svg>

      {/* Tooltip */}
      {agent && (
        <div className="absolute hidden md:block z-10 p-3 rounded-lg border text-xs font-mono"
          style={{ background: E.bg, borderColor: E.border, backdropFilter: "blur(12px)",
            bottom: "8%", left: "50%", transform: "translateX(-50%)" }}>
          <p className="font-semibold mb-1" style={{ color: E.text }}>{agent.label} Agent Tools:</p>
          <ul className="space-y-0.5" style={{ color: E.muted }}>
            {agent.tools.map((t) => <li key={t}>{t}</li>)}
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
        <div key={node.label} className="relative pl-6 pb-4 border-l" style={{ borderColor: E.border }}>
          <div className="absolute -left-[5px] top-2 size-2.5 rounded-full"
            style={{ background: E.primary, boxShadow: node.pulse ? `0 0 8px ${E.primary}` : undefined }} />
          <div className="rounded-lg p-3 border" style={{ background: E.bg, borderColor: E.border }}>
            <p className="text-sm font-semibold" style={{ color: E.text }}>{node.label}</p>
            {node.sub && <p className="text-xs mt-0.5" style={{ color: E.muted }}>{node.sub}</p>}
          </div>
        </div>
      ))}
      <div className="pl-6 pb-4">
        <div className="grid grid-cols-3 gap-2">
          {agents.map((a) => (
            <div key={a.id} className="rounded-lg p-2.5 border text-center" style={{ background: E.bg, borderColor: E.border }}>
              <p className="text-xs font-semibold" style={{ color: E.text }}>{a.label}</p>
              <p className="text-[10px] mt-0.5" style={{ color: E.muted }}>{a.toolCount} tools</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative pl-6 border-l" style={{ borderColor: E.border }}>
        <div className="absolute -left-[5px] top-2 size-2.5 rounded-full" style={{ background: E.primary }} />
        <div className="rounded-lg p-3 border" style={{ background: E.bg, borderColor: E.border }}>
          <p className="text-sm font-semibold" style={{ color: E.text }}>Response</p>
          <p className="text-xs mt-0.5" style={{ color: E.muted }}>Back to Customer</p>
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
      <p className="text-xs font-mono mt-4" style={{ color: E.muted }}>
        Shared tools (all agents): {sharedTools.join(", ")}
      </p>
    </div>
  );
}
