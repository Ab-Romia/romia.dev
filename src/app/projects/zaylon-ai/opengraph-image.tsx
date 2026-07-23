import { ImageResponse } from "next/og";
import { ogCard, OG_SIZE } from "@/app/og-card";

export const runtime = "edge";
export const alt = "Zaylon AI";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(ogCard("Zaylon AI"), { ...OG_SIZE });
}
