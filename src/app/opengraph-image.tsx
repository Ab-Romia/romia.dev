import { PERSONAL } from "@/data/resume";
import { ogImage, OG_SIZE } from "@/app/og-card";

export const alt = `${PERSONAL.name} (${PERSONAL.displayName}), ${PERSONAL.title}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Portfolio", title: PERSONAL.headline, poster: true });
}
