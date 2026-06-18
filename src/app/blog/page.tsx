import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/blog";
import { FadeUp, BlurIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on NLP, stylometry, and the systems I build. Plain, technical notes from Abdelrahman Abouroumia (Romia).",
  openGraph: {
    title: "Blog | Abdelrahman Abouroumia",
    description:
      "Writing on NLP, stylometry, and the systems I build. Plain, technical notes from Abdelrahman Abouroumia (Romia).",
  },
  alternates: { canonical: "/blog" },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="size-4" />
              Back Home
            </Link>
          </FadeUp>

          <BlurIn>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Blog</h1>
            <p className="text-base text-muted-foreground mt-3 leading-relaxed max-w-2xl">
              Technical notes on NLP, stylometry, and the systems I build. No filler.
            </p>
          </BlurIn>

          <div className="section-divider mt-10 mb-10" />

          <StaggerContainer className="space-y-8">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <article className="group bg-card border border-border rounded-lg p-6 transition-colors hover:border-accent/30">
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-muted-foreground">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      <span className="size-1 rounded-full bg-border" />
                      <span>{post.readingMinutes} min read</span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold tracking-tight mt-3 group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {post.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-mono bg-muted text-muted-foreground px-2.5 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <span className="inline-flex items-center gap-1.5 text-sm text-accent mt-5">
                      Read post
                      <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </main>
      <Footer />
    </>
  );
}
