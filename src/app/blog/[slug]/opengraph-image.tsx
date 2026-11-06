import { BLOG_POSTS, getPostBySlug } from "@/data/blog";
import { ogImage, OG_SIZE } from "@/app/og-card";

export const alt = "Writing by Abdelrahman Abouroumia (Romia)";
export const size = OG_SIZE;
export const contentType = "image/png";

// One card per post, drawn at build time.
export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return ogImage({ eyebrow: "Writing", title: post?.title ?? "Abdelrahman Abouroumia (Romia)" });
}
