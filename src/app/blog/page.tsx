import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Write-ups of the systems Abdelrahman Abouroumia (Romia) builds: how each one works, what was measured, and what the measurement changed.",
  openGraph: {
    title: "Writing | Abdelrahman Abouroumia",
    description:
      "Write-ups of the systems Abdelrahman Abouroumia (Romia) builds: how each one works, what was measured, and what the measurement changed.",
    images: ["/opengraph-image"],
  },
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <Navbar />
      <main id="main-content" className="pb-24 pt-28 md:pt-36">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <header className="max-w-3xl">
            <p className="eyebrow">Writing</p>
            <h1 className="display-xl mt-5">Notes on what I build</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
              Each post walks through one system: how it works, what was measured, and what the
              measurement changed.
            </p>
          </header>

          <ul className="mt-16 border-t border-border md:mt-20">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-border">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group -mx-3 grid gap-x-8 gap-y-3 rounded-sm px-3 py-8 transition-colors hover:bg-muted/60 md:grid-cols-12"
                >
                  <span className="font-mono text-xs leading-8 text-muted-foreground md:col-span-3">
                    <time dateTime={post.date}>{formatDate(post.date, "long")}</time>
                    <span className="block">{post.readingMinutes} min read</span>
                  </span>
                  <span className="md:col-span-9">
                    <span className="display-md block decoration-1 underline-offset-[0.18em] group-hover:underline">
                      {post.title}
                    </span>
                    <span className="mt-3 block max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
                      {post.description}
                    </span>
                    <span className="mt-4 block font-mono text-xs text-muted-foreground">
                      {post.tags.join("  ·  ")}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
