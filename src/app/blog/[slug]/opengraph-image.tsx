import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/data/blog";
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
  const post = getPostBySlug(slug);
  const title = post?.title ?? "Abdelrahman Abouroumia (Romia)";
  return new ImageResponse(ogCard(title), { ...OG_SIZE });
}
