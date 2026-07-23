import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const glyph = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <linearGradient id="g" gradientUnits="userSpaceOnUse" x1="7" y1="11" x2="25" y2="21">
      <stop offset="0%" stop-color="#34D399"/>
      <stop offset="100%" stop-color="#10B981"/>
    </linearGradient>
  </defs>
  <path d="M7 11l6 5-6 5" fill="none" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="16" y1="21" x2="25" y2="21" stroke="url(#g)" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#09090B",
        }}
      >
        <img
          alt=""
          width={108}
          height={108}
          src={`data:image/svg+xml,${encodeURIComponent(glyph)}`}
        />
      </div>
    ),
    { ...size }
  );
}
