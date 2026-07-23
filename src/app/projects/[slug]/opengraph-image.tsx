import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/data/resume";
import { ogCard, OG_SIZE } from "@/app/og-card";

export const runtime = "edge";
export const alt = "Abdelrahman Abouroumia (Romia)";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const title = project?.title ?? "Abdelrahman Abouroumia (Romia)";
  return new ImageResponse(ogCard(title), { ...OG_SIZE });
}
