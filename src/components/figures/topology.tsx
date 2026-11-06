/* A live topology diagram: boxes, the paths between them, and packets moving
   along those paths. Packets are SMIL, so the figure needs no JavaScript, and
   reduced motion hides them. Feed it high-level shapes only. */

export type TopologyNode = {
  x: number;
  y: number;
  w: number;
  label: string;
  sub: string;
  /** Drawn in the accent: the part of the system the figure is about. */
  hot?: boolean;
};

export type TopologySpec = {
  ariaLabel: string;
  /** viewBox width; text is drawn at 1:1 when the figure is shown this wide. */
  width?: number;
  height: number;
  nodes: TopologyNode[];
  /** SVG path data, from one box edge to another. */
  edges: string[];
  /** Optional dashed boundary, e.g. what runs inside one deployment. */
  boundary?: { x: number; y: number; w: number; h: number; label: string };
};

export function Topology({ ariaLabel, width = 590, height, nodes, edges, boundary }: TopologySpec) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label={ariaLabel}>
      <style>{`@media (prefers-reduced-motion: reduce) { .packet { display: none } }`}</style>
      {boundary && (
        <>
          <rect
            x={boundary.x}
            y={boundary.y}
            width={boundary.w}
            height={boundary.h}
            rx="10"
            fill="none"
            strokeDasharray="4 5"
            style={{ stroke: "var(--border-strong)" }}
          />
          <text
            x={boundary.x + 10}
            y={boundary.y - 8}
            fontSize="10.5"
            fontFamily="var(--font-code)"
            style={{ fill: "var(--muted-foreground)" }}
          >
            {boundary.label}
          </text>
        </>
      )}

      {edges.map((d) => (
        <path key={d} d={d} fill="none" strokeWidth="1.25" style={{ stroke: "var(--border-strong)" }} />
      ))}
      {edges.map((d, i) => (
        <circle key={`packet-${d}`} className="packet" r="2.8" style={{ fill: "var(--accent)" }}>
          <animateMotion
            dur={`${2.1 + (i % 3) * 0.6}s`}
            begin={`${(i * 0.37).toFixed(2)}s`}
            repeatCount="indefinite"
            path={d}
          />
        </circle>
      ))}

      {nodes.map((n) => (
        <g key={n.label}>
          <rect
            x={n.x}
            y={n.y}
            width={n.w}
            height="48"
            rx="6"
            style={{ fill: "var(--card)", stroke: n.hot ? "var(--accent)" : "var(--border-strong)" }}
          />
          <text
            x={n.x + 13}
            y={n.y + 21}
            fontSize="13.5"
            fontWeight="600"
            fontFamily="var(--font-archivo)"
            style={{ fill: "var(--foreground)" }}
          >
            {n.label}
          </text>
          <text
            x={n.x + 13}
            y={n.y + 37}
            fontSize="10.5"
            fontFamily="var(--font-code)"
            style={{ fill: "var(--muted-foreground)" }}
          >
            {n.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}
