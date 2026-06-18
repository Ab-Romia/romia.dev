import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BLOG_POSTS, getPostBySlug, type ContentBlock } from "@/data/blog";
import { PROJECTS } from "@/data/resume";
import { FadeUp } from "@/components/motion-wrapper";
import { DemoEmbed } from "@/components/demo-embed";
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

// Render a small markdown subset: [text](url) links and `inline code`.
function renderMd(md: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(md)) !== null) {
    if (m.index > last) {
      nodes.push(<span key={key++}>{md.slice(last, m.index)}</span>);
    }
    if (m[1] !== undefined) {
      const href = m[2];
      const external = href.startsWith("http");
      nodes.push(
        <a
          key={key++}
          href={href}
          className="link-underline text-accent hover:text-accent-muted transition-colors"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {m[1]}
        </a>
      );
    } else {
      nodes.push(
        <code
          key={key++}
          className="font-mono text-sm bg-muted text-foreground px-1.5 py-0.5 rounded"
        >
          {m[3]}
        </code>
      );
    }
    last = re.lastIndex;
  }
  if (last < md.length) {
    nodes.push(<span key={key++}>{md.slice(last)}</span>);
  }
  return nodes;
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
          {renderMd(block.md)}
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
              <span>{renderMd(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "figure":
      return (
        <figure className="mt-8">
          {/* Diagrams are self-contained SVGs in /public; a plain img keeps
              them portable and avoids the loader for vector art. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.alt}
            className="w-full rounded-lg border border-border bg-card p-4 md:p-6"
          />
          {block.caption ? (
            <figcaption className="mt-3 text-center text-xs font-mono text-muted-foreground">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    case "callout":
      return (
        <aside className="mt-6 rounded-lg border border-accent/30 bg-accent/5 p-5">
          {block.title ? (
            <p className="text-sm font-semibold text-accent">{block.title}</p>
          ) : null}
          <p className="text-sm text-muted-foreground leading-relaxed mt-1.5">
            {renderMd(block.md)}
          </p>
        </aside>
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

  // If a project points its write-up at this post, surface that project's
  // interactive demo at the bottom of the article.
  const demoProject = PROJECTS.find((p) => p.blog === `/blog/${slug}`);
  const embed = demoProject?.caseStudy.embedDemo;

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

          {/* Render the body directly. A single scroll-reveal wrapper around the
              whole article cannot reliably cross its visibility threshold on a long
              page, which left the post body invisible. */}
          <article>
            {post.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </article>

          {embed?.type === "iframe" && embed.src && (
            <section>
              <h2 className="text-2xl font-bold tracking-tight mt-12">Try it</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                The live demo runs in your browser. It may take a few seconds to wake up.
              </p>
              <div className="mt-6">
                <DemoEmbed src={embed.src} title={`${demoProject!.title} demo`} />
              </div>
            </section>
          )}

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
