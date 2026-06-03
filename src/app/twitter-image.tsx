import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Abdelrahman Abouroumia (Romia) - AI Engineer";
export const size = { width: 1200, height: 675 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
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
            marginBottom: "16px",
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
            AI Engineer
          </span>
        </div>
        <h1
          style={{
            color: "#FAFAFA",
            fontSize: "64px",
            fontWeight: 700,
            lineHeight: 1.1,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Abdelrahman
          <br />
          Abouroumia
        </h1>
        <p style={{ color: "#34D399", fontSize: "20px", marginTop: "16px" }}>
          aka Romia
        </p>
        <p
          style={{
            color: "#34D399",
            fontSize: "22px",
            marginTop: "24px",
            maxWidth: "600px",
            lineHeight: 1.5,
          }}
        >
          I build production multi-agent LLM systems. Customers shop and check
          out by chatting in their own dialect over WhatsApp and Instagram.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginTop: "auto",
          }}
        >
          <span
            style={{ color: "#34D399", fontSize: "24px", fontWeight: 600 }}
          >
            romia.dev
          </span>
          <span style={{ color: "#3F3F46" }}>|</span>
          <span style={{ color: "#71717A", fontSize: "18px" }}>
            Co-Founder, Zaylon AI
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
