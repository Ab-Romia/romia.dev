import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  BLOG_POSTS,
  getPostBySlug,
  type ContentBlock,
  type InlineNode,
} from "@/data/blog";
import { FadeUp, BlurIn } from "@/components/motion-wrapper";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} | Abdelrahman Abouroumia`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
    alternates: { canonical: `/blog/${slug}` },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderInline(nodes: InlineNode[]) {
  return nodes.map((node, i) => {
    if (typeof node === "string") {
      return <span key={i}>{node}</span>;
    }
    if ("href" in node) {
      const external = node.href.startsWith("http");
      return (
        <a
          key={i}
          href={node.href}
          className="link-underline text-accent hover:text-accent-muted transition-colors"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {node.text}
        </a>
      );
    }
    return (
      <code
        key={i}
        className="font-mono text-sm bg-muted text-foreground px-1.5 py-0.5 rounded"
      >
        {node.code}
      </code>
    );
  });
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="text-2xl font-bold tracking-tight mt-12">{block.text}</h2>
      );
    case "p":
      return (
        <p className="text-muted-foreground leading-relaxed mt-5">
          {renderInline(block.content)}
        </p>
      );
    case "code":
      return (
        <pre className="mt-5 overflow-x-auto rounded-lg border border-border bg-card p-4">
          <code className="font-mono text-sm leading-relaxed text-foreground">
            {block.code}
          </code>
        </pre>
      );
    case "ul":
      return (
        <ul className="mt-5 space-y-2">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-muted-foreground leading-relaxed"
            >
              <span className="size-1.5 rounded-full bg-accent shrink-0 mt-2.5" />
              <span>{renderInline(item)}</span>
            </li>
          ))}
        </ul>
      );
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="size-4" />
              Back to Blog
            </Link>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-muted-foreground mb-4">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="size-1 rounded-full bg-border" />
              <span>{post.readingMinutes} min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground mt-3 leading-relaxed">
              {post.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono bg-muted text-muted-foreground px-2.5 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeUp>

          <div className="section-divider mt-10 mb-2" />

          <BlurIn>
            <article>
              {post.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </article>
          </BlurIn>

          <div className="section-divider mt-12 mb-8" />

          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
