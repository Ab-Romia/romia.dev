import { PERSONAL } from "@/data/resume";
import { ogImage } from "@/app/og-card";

export const alt = `${PERSONAL.name} (${PERSONAL.displayName}), ${PERSONAL.title}`;
export const size = { width: 1200, height: 675 };
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Portfolio", title: PERSONAL.headline, poster: true, height: size.height });
}
