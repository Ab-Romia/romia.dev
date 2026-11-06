import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";
import { Section, SectionHeader, ArrowLink } from "@/components/section";
import { formatDate } from "@/lib/utils";

export function Writing() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  if (posts.length === 0) return null;

  return (
    <Section id="writing">
      <SectionHeader
        index="04"
        title="Writing"
        intro="Write-ups of the systems above: how each one works, what was measured, and what the measurement changed."
        action={<ArrowLink href="/blog">All posts</ArrowLink>}
      />

      <ul className="mt-12 border-t border-border md:mt-16">
        {posts.map((post) => (
          <li key={post.slug} className="reveal border-b border-border">
            <Link
              href={`/blog/${post.slug}`}
              className="group -mx-3 grid gap-x-8 gap-y-2 rounded-sm px-3 py-7 transition-colors hover:bg-muted/60 md:grid-cols-12"
            >
              <time
                dateTime={post.date}
                className="font-mono text-xs leading-7 text-muted-foreground md:col-span-3"
              >
                {formatDate(post.date)}
              </time>
              <span className="md:col-span-7">
                <span className="display-sm block decoration-2 underline-offset-[0.2em] group-hover:underline">
                  {post.title}
                </span>
                <span className="mt-2 block text-[15px] leading-relaxed text-muted-foreground">
                  {post.description}
                </span>
              </span>
              <span className="font-mono text-xs leading-7 text-muted-foreground md:col-span-2 md:text-right">
                {post.readingMinutes} min read
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
