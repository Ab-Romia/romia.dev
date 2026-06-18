import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/resume";
import { BLOG_POSTS } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = PROJECTS.map((project) => ({
    url: `https://romia.dev/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogPostPages = BLOG_POSTS.map((post) => ({
    url: `https://romia.dev/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://romia.dev",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://romia.dev/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projectPages,
    ...blogPostPages,
  ];
}
