import type { ReactElement } from "react";

export const OG_SIZE = { width: 1200, height: 630 };

export function ogCard(title: string): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "#09090B",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#34D399",
          }}
        />
        <span
          style={{
            color: "#34D399",
            fontSize: "20px",
            fontFamily: "monospace",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          AI &amp; Backend Engineer
        </span>
      </div>
      <h1
        style={{
          color: "#FAFAFA",
          fontSize: "60px",
          fontWeight: 700,
          lineHeight: 1.1,
          margin: 0,
          letterSpacing: "-0.02em",
          maxWidth: "1040px",
        }}
      >
        {title}
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          marginTop: "auto",
        }}
      >
        <span
          style={{
            color: "#34D399",
            fontSize: "24px",
            fontWeight: 600,
          }}
        >
          romia.dev
        </span>
        <span style={{ color: "#3F3F46" }}>|</span>
        <span style={{ color: "#71717A", fontSize: "18px" }}>
          Abdelrahman Abouroumia (Romia)
        </span>
      </div>
    </div>
  );
}
