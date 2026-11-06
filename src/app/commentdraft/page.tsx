import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Lock } from "lucide-react";
import {
  COMMENTDRAFT_SHOWCASE,
  COMMENTDRAFT_GUIDES,
  COMMENTDRAFT_GUIDES_PAGE,
  COMMENTDRAFT_PLATFORMS,
  COMMENTDRAFT_FINDINGS,
  commentdraftGuideUrl,
} from "@/data/resume";
import { GitHubIcon } from "@/components/social-icons";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { BackLink } from "@/components/case-study";

export const metadata: Metadata = {
  title: COMMENTDRAFT_GUIDES_PAGE.metaTitle,
  description: COMMENTDRAFT_GUIDES_PAGE.metaDescription,
  keywords: [
    "comment API",
    "YouTube Data API comments",
    "Instagram Graph API comments",
    "Facebook Page comments API",
    "Threads API replies",
    "X API replies",
    "TikTok comment API",
    "LinkedIn comments API",
    "Reddit Data API",
    "commentdraft",
  ],
  openGraph: {
    title: `${COMMENTDRAFT_GUIDES_PAGE.metaTitle} | Abdelrahman Abouroumia`,
    description: COMMENTDRAFT_GUIDES_PAGE.metaDescription,
    url: "https://romia.dev/commentdraft",
    type: "article",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: COMMENTDRAFT_GUIDES_PAGE.metaTitle,
    description: COMMENTDRAFT_GUIDES_PAGE.metaDescription,
  },
  alternates: { canonical: "/commentdraft" },
};

/* The two facts are independent, so a row can carry both marks: a connector
   existing says nothing about whether the platform lets you in. */
function AccessMark({ platform }: { platform: (typeof COMMENTDRAFT_PLATFORMS)[number] }) {
  return (
    <>
      {platform.connector === "ships" && (
        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-accent border border-accent/30 rounded-full px-2.5 py-1">
          <Check className="size-3" aria-hidden="true" />
          connector ships
        </span>
      )}
      {platform.access === "gated" ? (
        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground border border-border rounded-full px-2.5 py-1">
          <Lock className="size-3" aria-hidden="true" />
          someone has to say yes
        </span>
      ) : (
        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground border border-border rounded-full px-2.5 py-1">
          no permission needed
        </span>
      )}
    </>
  );
}

export default function CommentdraftGuidesPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="pb-24 pt-28 md:pt-36">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 [&>*]:max-w-5xl">
          <BackLink href="/projects/commentdraft">commentdraft</BackLink>

          <div className="mt-10">
            <p className="eyebrow">commentdraft / docs / platforms</p>
            <h1 className="display-lg mt-5 max-w-4xl text-balance">
              {COMMENTDRAFT_GUIDES_PAGE.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
              {COMMENTDRAFT_GUIDES_PAGE.lede}
            </p>
          </div>

          <div>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-border pt-6 sm:grid-cols-4">
              {COMMENTDRAFT_GUIDES_PAGE.meta.map((m) => (
                <div key={m.label}>
                  <dd className="display-md tabular-nums">{m.value}</dd>
                  <dt className="eyebrow mt-1.5">
                    {m.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <p className="mt-10 max-w-3xl border-l-2 border-accent pl-5 text-[17px] leading-[1.7] text-foreground/90">
              {COMMENTDRAFT_GUIDES.honesty}
            </p>
          </div>

          <div className="section-divider my-16" />

          {/* The pattern that only shows up across all eight */}
          <div>
            <h2 className="display-md">
              {COMMENTDRAFT_GUIDES_PAGE.lessonHeading}
            </h2>
            <p className="mt-5 max-w-3xl text-[17px] leading-[1.75] text-foreground/90">
              {COMMENTDRAFT_GUIDES.lesson}
            </p>
          </div>

          {/* The eight, in the order worth attempting them in */}
          <div className="mt-16">
            <div>
              <h2 className="display-md">
                {COMMENTDRAFT_GUIDES_PAGE.orderHeading}
              </h2>
              <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
                {COMMENTDRAFT_GUIDES_PAGE.orderIntro}
              </p>
            </div>

            <div className="mt-8 space-y-4">
              {COMMENTDRAFT_PLATFORMS.map((p, i) => (
                <div key={p.slug}>
                  <article className="rounded-lg border border-border bg-card p-5 sm:p-7">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="font-mono text-xs text-muted-foreground tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="display-sm">{p.name}</h3>
                      <AccessMark platform={p} />
                    </div>

                    <dl className="mt-4 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-x-5 gap-y-1">
                        <dt className="eyebrow sm:pt-0.5">
                          In the way
                        </dt>
                        <dd className="text-[15px] leading-relaxed text-foreground/90">{p.blocker}</dd>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-x-5 gap-y-1">
                        <dt className="eyebrow sm:pt-0.5">
                          Reply path
                        </dt>
                        <dd className="text-[15px] leading-relaxed text-muted-foreground">{p.reply}</dd>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-x-5 gap-y-1">
                        <dt className="eyebrow sm:pt-0.5">
                          Cost
                        </dt>
                        <dd className="text-[15px] leading-relaxed text-muted-foreground">{p.cost}</dd>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-x-5 gap-y-1">
                        <dt className="eyebrow sm:pt-0.5">
                          Worth knowing
                        </dt>
                        <dd className="text-[15px] leading-relaxed text-muted-foreground">
                          {p.attempt}
                        </dd>
                      </div>
                    </dl>

                    <a
                      href={commentdraftGuideUrl(p.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1 text-sm font-medium transition-colors hover:text-accent"
                    >
                      Read the {p.name} guide
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </article>
                </div>
              ))}
            </div>

            <div>
              <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-foreground/90">
                {COMMENTDRAFT_GUIDES.closing}
              </p>
            </div>
          </div>

          {/* Corrections that came out of checking rather than trusting */}
          <div className="mt-16">
            <div>
              <h2 className="display-md">
                {COMMENTDRAFT_FINDINGS.heading}
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {COMMENTDRAFT_FINDINGS.items.map((f) => (
                <div key={f.platform}>
                  <div className="h-full rounded-lg border border-border bg-card p-5 sm:p-6">
                    <p className="eyebrow">
                      {f.platform}
                    </p>
                    <p className="display-sm mt-3">{f.title}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-foreground/90">
                {COMMENTDRAFT_FINDINGS.closing}
              </p>
            </div>
          </div>

          <div className="section-divider my-16" />

          <div>
            <h2 className="display-sm">
              {COMMENTDRAFT_GUIDES_PAGE.closingHeading}
            </h2>
            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
              {COMMENTDRAFT_GUIDES_PAGE.closing}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <a
                href={COMMENTDRAFT_SHOWCASE.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-[opacity,transform] hover:opacity-90 active:scale-[0.98]"
              >
                <GitHubIcon className="size-4" />
                The repository
              </a>
              <Link
                href="/projects/commentdraft"
                className="group inline-flex items-center gap-1.5 py-2.5 text-sm font-medium"
              >
                How the tool itself is built
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
