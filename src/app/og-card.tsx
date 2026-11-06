import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { PERSONAL } from "@/data/resume";

/* Social cards in the site's own look: near-black, warm off-white, one blue
   accent, Archivo for words and JetBrains Mono for labels. The fonts are static
   instances in assets/fonts because the card renderer cannot read variable fonts. */

export const OG_SIZE = { width: 1200, height: 630 };

const BG = "#0A0B0D";
const INK = "#ECEAE4";
const MUTED = "#9A978F";
const ACCENT = "#6B8AFF";

async function assets() {
  // Literal paths, so the bundler traces these files and nothing else.
  const [poster, regular, semibold, mono, photo] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/archivo-125-900.woff")),
    readFile(join(process.cwd(), "assets/fonts/archivo-100-400.woff")),
    readFile(join(process.cwd(), "assets/fonts/archivo-100-600.woff")),
    readFile(join(process.cwd(), "assets/fonts/jetbrains-mono-400.woff")),
    readFile(join(process.cwd(), "public/avatar.jpg")),
  ]);
  return {
    avatar: `data:image/jpeg;base64,${photo.toString("base64")}`,
    fonts: [
      { name: "Poster", data: poster, weight: 900 as const, style: "normal" as const },
      { name: "Archivo", data: regular, weight: 400 as const, style: "normal" as const },
      { name: "Archivo", data: semibold, weight: 600 as const, style: "normal" as const },
      { name: "Mono", data: mono, weight: 400 as const, style: "normal" as const },
    ],
  };
}

/** Long titles step down so they still fit in three lines. */
function titleSize(title: string) {
  if (title.length > 90) return 50;
  if (title.length > 56) return 60;
  return 76;
}

export async function ogImage({
  eyebrow,
  title,
  poster = false,
  height = OG_SIZE.height,
}: {
  eyebrow: string;
  title: string;
  /** The homepage card: the name as a poster, the title beneath it. */
  poster?: boolean;
  height?: number;
}) {
  const { avatar, fonts } = await assets();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px 72px",
          background: BG,
          color: INK,
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={avatar} alt="" width={60} height={60} style={{ borderRadius: 999 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 25, fontWeight: 600 }}>{PERSONAL.name}</span>
              <span style={{ fontSize: 19, color: MUTED }}>{PERSONAL.title}</span>
            </div>
          </div>
          <span style={{ fontFamily: "Mono", fontSize: 20, color: ACCENT }}>romia.dev</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <span style={{ fontFamily: "Mono", fontSize: 19, color: ACCENT, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {eyebrow}
          </span>
          {poster ? (
            <span style={{ fontFamily: "Poster", fontSize: 210, lineHeight: 0.85, letterSpacing: "-0.04em", marginTop: 10 }}>
              ROMIA
            </span>
          ) : null}
          <span
            style={{
              marginTop: poster ? 14 : 16,
              fontWeight: 600,
              fontSize: poster ? 44 : titleSize(title),
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              maxWidth: 1040,
            }}
          >
            {title}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 36,
            paddingTop: 20,
            borderTop: `2px solid ${INK}`,
            fontSize: 19,
            color: MUTED,
          }}
        >
          Software Engineer at Tutanic · Co-founder of Zaylon AI
        </div>
      </div>
    ),
    { width: OG_SIZE.width, height, fonts }
  );
}
