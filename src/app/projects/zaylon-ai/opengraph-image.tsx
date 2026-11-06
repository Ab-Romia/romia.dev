import { ogImage, OG_SIZE } from "@/app/og-card";

export const alt = "Zaylon AI, a case study by Abdelrahman Abouroumia (Romia)";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Case study", title: "Zaylon AI" });
}
