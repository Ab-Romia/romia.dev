"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog";
import { BlurIn, FadeUp } from "@/components/motion-wrapper";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function Writing() {
  const posts = [...BLOG_POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  if (posts.length === 0) return null;

  return (
    <section id="writing" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <BlurIn>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tight leading-tight">
              Writing
            </h2>
            <Link
              href="/blog"
              className="text-sm font-mono text-accent hover:text-accent-muted transition-colors inline-flex items-center gap-1 shrink-0"
            >
              All posts <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </BlurIn>

        <FadeUp delay={0.05}>
          <p className="text-muted-foreground mt-3 max-w-2xl leading-relaxed">
            Long-form notes on what I build and what I learn doing it.
          </p>
        </FadeUp>

        <div className="mt-8 space-y-4">
          {posts.map((post, i) => (
            <FadeUp key={post.slug} delay={0.1 + i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block border rounded-lg bg-card border-border p-6 transition-colors duration-200 hover:border-accent/40"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-muted-foreground">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="size-1 rounded-full bg-border" />
                  <span>{post.readingMinutes} min read</span>
                </div>

                <h3 className="text-lg font-semibold mt-2 inline-flex items-center gap-1 group-hover:text-accent transition-colors">
                  {post.title}
                  <ArrowUpRight className="size-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                  {post.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {post.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono bg-muted text-muted-foreground px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
