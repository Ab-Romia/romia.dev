import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPostBySlug, type ContentBlock } from "@/data/blog";
import { PROJECTS } from "@/data/resume";
import { DemoEmbed } from "@/components/demo-embed";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { BackLink } from "@/components/case-study";
import { formatDate } from "@/lib/utils";

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


const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Render a small markdown subset: [text](url) links, `inline code`,
// **bold**, and *italic*.
function renderMd(md: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const re =
    /\[([^\]]+)\]\(([^)]+)\)|`([^`]+)`|\*\*([^*]+)\*\*|\*([^*\s][^*]*)\*/g;
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
          className="link text-accent"
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {m[1]}
        </a>
      );
    } else if (m[3] !== undefined) {
      nodes.push(
        <code
          key={key++}
          className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
        >
          {m[3]}
        </code>
      );
    } else if (m[4] !== undefined) {
      nodes.push(
        <strong key={key++} className="font-semibold text-foreground">
          {m[4]}
        </strong>
      );
    } else {
      nodes.push(<em key={key++}>{m[5]}</em>);
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
        <h2 id={slugify(block.text)} className="display-md mt-16">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="mt-5 text-[17px] leading-[1.75] text-foreground/90">{renderMd(block.md)}</p>
      );
    case "code":
      return (
        <pre className="mt-6 overflow-x-auto rounded-md border border-border bg-card p-4">
          <code className="font-mono text-[13px] leading-relaxed text-foreground">{block.code}</code>
        </pre>
      );
    case "table":
      return (
        <figure className="mt-8">
          <div className="overflow-x-auto border-y border-border-strong">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="text-left">
                  {block.headers.map((h) => (
                    <th
                      key={h}
                      className="whitespace-nowrap px-3 py-3 font-mono text-xs font-normal uppercase tracking-[0.08em] text-muted-foreground"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => {
                  const highlight = block.highlightRow === r;
                  return (
                    <tr
                      key={r}
                      className={
                        highlight
                          ? "border-t border-border bg-accent/[0.07]"
                          : "border-t border-border"
                      }
                    >
                      {row.map((cell, c) => (
                        <td
                          key={c}
                          className={
                            "px-3 py-3 " +
                            (c === 1 ? "font-mono text-xs " : "font-mono ") +
                            (highlight && c !== 1
                              ? "font-medium text-accent"
                              : c === 0
                                ? "text-foreground"
                                : "text-muted-foreground")
                          }
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {block.caption ? (
            <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    case "ul":
      return (
        <ul className="mt-5 space-y-2.5">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="relative pl-5 text-[17px] leading-[1.75] text-foreground/90 before:absolute before:left-0 before:top-[0.85em] before:h-px before:w-2.5 before:bg-border-strong"
            >
              {renderMd(item)}
            </li>
          ))}
        </ul>
      );
    case "figure":
      // The SVG diagrams are drawn light-on-dark and the PNG charts dark-on-white,
      // so each sits on the plate it was drawn for, whatever the page theme.
      return (
        <figure className="mt-10">
          <div
            className={
              block.src.endsWith(".svg")
                ? "overflow-x-auto rounded-md border border-[#2a2925] bg-[#161613]"
                : "overflow-x-auto rounded-md border border-border bg-white"
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={block.src} alt={block.alt} className="w-full min-w-[640px] p-4 md:p-6" />
          </div>
          {block.caption ? (
            <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    case "callout":
      return (
        <aside className="mt-8 border-l-2 border-accent pl-5">
          {block.title ? <p className="font-medium">{block.title}</p> : null}
          <p className="mt-1.5 text-[16px] leading-[1.7] text-muted-foreground">{renderMd(block.md)}</p>
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

  const headings = post.body.flatMap((b) =>
    b.type === "h2" ? [{ text: b.text, id: slugify(b.text) }] : []
  );

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: `https://romia.dev/blog/${slug}`,
    mainEntityOfPage: `https://romia.dev/blog/${slug}`,
    image: "https://romia.dev/opengraph-image",
    keywords: post.tags,
    author: { "@id": "https://romia.dev/#person" },
    publisher: { "@id": "https://romia.dev/#person" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
      />
      <Navbar />
      <main id="main-content" className="pb-24 pt-28 md:pt-36">
        <article className="mx-auto max-w-6xl px-5 sm:px-8">
          <BackLink href="/blog">All writing</BackLink>

          <header className="mt-10 max-w-4xl">
            <p className="eyebrow">
              <time dateTime={post.date}>{formatDate(post.date, "long")}</time>
              <span className="mx-2" aria-hidden="true">·</span>
              {post.readingMinutes} min read
            </p>
            <h1 className="display-lg mt-5">{post.title}</h1>
            <p className="mt-6 max-w-[62ch] text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
              {post.description}
            </p>
            <p className="mt-6 font-mono text-xs text-muted-foreground">{post.tags.join("  ·  ")}</p>
          </header>

          <div className="mt-14 grid gap-12 border-t border-border pt-12 lg:grid-cols-12 lg:gap-8">
            {headings.length > 1 && (
              <nav aria-label="Contents" className="hidden lg:col-span-3 lg:block">
                <p className="eyebrow">Contents</p>
                <ul className="sticky top-28 mt-4 space-y-2.5 text-sm">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="link-underline leading-snug text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div className="min-w-0 lg:col-span-8 lg:col-start-5 [&>*:first-child]:mt-0">
              {post.body.map((block, i) => (
                <Block key={i} block={block} />
              ))}

              {embed?.type === "iframe" && embed.src && (
                <section>
                  <h2 id="try-it" className="display-md mt-16">
                    Try it
                  </h2>
                  <p className="mt-5 text-[17px] leading-[1.75] text-foreground/90">
                    The live demo runs in your browser. It may take a few seconds to wake up.
                  </p>
                  <div className="mt-8">
                    <DemoEmbed src={embed.src} title={`${demoProject!.title} demo`} />
                  </div>
                </section>
              )}
            </div>
          </div>

          <div className="mt-24 border-t border-border pt-8">
            <Link href="/blog" className="group">
              <span className="eyebrow">Back to</span>
              <span className="display-sm mt-2 block decoration-1 underline-offset-[0.2em] group-hover:underline">
                All writing
              </span>
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
