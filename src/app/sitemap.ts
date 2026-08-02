import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/resume";
import { BLOG_POSTS } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  // Projects with a blog write-up redirect to the blog, so they are not listed
  // as case-study URLs here; the blog post represents them instead.
  const projectPages = PROJECTS.filter((project) => !project.blog).map((project) => ({
    url: `https://romia.dev/projects/${project.slug}`,
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
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://romia.dev/blog",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      // The platform guides stand on their own for someone who has never heard
      // of the tool they came out of, so they are indexed as a resource.
      url: "https://romia.dev/commentdraft",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projectPages,
    ...blogPostPages,
  ];
}
