import { getProjectBySlug } from "@/data/resume";
import { generateStaticParams as pageParams } from "./page";
import { ogImage, OG_SIZE } from "@/app/og-card";

export const alt = "A case study by Abdelrahman Abouroumia (Romia)";
export const size = OG_SIZE;
export const contentType = "image/png";

// One card per case study, drawn at build time.
export const generateStaticParams = pageParams;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return ogImage({
    eyebrow: project?.award ? `Case study · ${project.award.title}` : "Case study",
    title: project?.title ?? "Abdelrahman Abouroumia (Romia)",
  });
}
