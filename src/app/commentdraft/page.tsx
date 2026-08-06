import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Lock } from "lucide-react";
import {
  COMMENTDRAFT_SHOWCASE,
  COMMENTDRAFT_GUIDES,
  COMMENTDRAFT_GUIDES_PAGE,
  COMMENTDRAFT_PLATFORMS,
  COMMENTDRAFT_FINDINGS,
  commentdraftGuideUrl,
} from "@/data/resume";
import { FadeUp, BlurIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { GitHubIcon } from "@/components/social-icons";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";

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
      <main id="main-content" className="min-h-screen pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <FadeUp>
            <Link
              href="/#commentdraft"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="size-4" />
              Back to commentdraft
            </Link>
          </FadeUp>

          <BlurIn>
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
              commentdraft / docs / platforms
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 text-balance">
              {COMMENTDRAFT_GUIDES_PAGE.title}
            </h1>
            <p className="text-base text-muted-foreground mt-4 leading-relaxed max-w-3xl">
              {COMMENTDRAFT_GUIDES_PAGE.lede}
            </p>
          </BlurIn>

          <FadeUp delay={0.1}>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border">
              {COMMENTDRAFT_GUIDES_PAGE.meta.map((m) => (
                <div key={m.label}>
                  <dd className="text-lg font-semibold tabular-nums">{m.value}</dd>
                  <dt className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-1.5">
                    {m.label}
                  </dt>
                </div>
              ))}
            </dl>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p className="mt-8 text-base leading-relaxed text-foreground/90 border-l-2 border-accent/40 pl-5 max-w-3xl">
              {COMMENTDRAFT_GUIDES.honesty}
            </p>
          </FadeUp>

          <div className="section-divider mt-12 mb-12" />

          {/* The pattern that only shows up across all eight */}
          <FadeUp>
            <h2 className="text-2xl font-bold tracking-tight">
              {COMMENTDRAFT_GUIDES_PAGE.lessonHeading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground max-w-3xl">
              {COMMENTDRAFT_GUIDES.lesson}
            </p>
          </FadeUp>

          {/* The eight, in the order worth attempting them in */}
          <div className="mt-16">
            <BlurIn>
              <h2 className="text-2xl font-bold tracking-tight">
                {COMMENTDRAFT_GUIDES_PAGE.orderHeading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-3xl">
                {COMMENTDRAFT_GUIDES_PAGE.orderIntro}
              </p>
            </BlurIn>

            <StaggerContainer className="mt-8 space-y-4">
              {COMMENTDRAFT_PLATFORMS.map((p, i) => (
                <StaggerItem key={p.slug}>
                  <article className="rounded-xl border border-border bg-card p-5 sm:p-6 transition-colors hover:border-accent/40">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="font-mono text-xs text-muted-foreground tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
                      <AccessMark platform={p} />
                    </div>

                    <dl className="mt-4 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-x-5 gap-y-1">
                        <dt className="text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground sm:pt-0.5">
                          In the way
                        </dt>
                        <dd className="text-sm leading-relaxed text-foreground/90">{p.blocker}</dd>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-x-5 gap-y-1">
                        <dt className="text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground sm:pt-0.5">
                          Reply path
                        </dt>
                        <dd className="text-sm leading-relaxed text-muted-foreground">{p.reply}</dd>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-x-5 gap-y-1">
                        <dt className="text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground sm:pt-0.5">
                          Cost
                        </dt>
                        <dd className="text-sm leading-relaxed text-muted-foreground">{p.cost}</dd>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-[7.5rem_1fr] gap-x-5 gap-y-1">
                        <dt className="text-xs font-mono uppercase tracking-[0.14em] text-muted-foreground sm:pt-0.5">
                          Worth knowing
                        </dt>
                        <dd className="text-sm leading-relaxed text-muted-foreground">
                          {p.attempt}
                        </dd>
                      </div>
                    </dl>

                    <a
                      href={commentdraftGuideUrl(p.slug)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-5 text-sm font-mono text-accent hover:text-accent-muted transition-colors"
                    >
                      Read the {p.name} guide
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  </article>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeUp delay={0.1}>
              <p className="mt-8 text-sm leading-relaxed text-foreground/90 max-w-3xl">
                {COMMENTDRAFT_GUIDES.closing}
              </p>
            </FadeUp>
          </div>

          {/* Corrections that came out of checking rather than trusting */}
          <div className="mt-16">
            <BlurIn>
              <h2 className="text-2xl font-bold tracking-tight">
                {COMMENTDRAFT_FINDINGS.heading}
              </h2>
            </BlurIn>

            <StaggerContainer className="grid sm:grid-cols-2 gap-4 mt-8">
              {COMMENTDRAFT_FINDINGS.items.map((f) => (
                <StaggerItem key={f.platform}>
                  <div className="h-full rounded-xl border border-border bg-card p-5">
                    <p className="text-xs font-mono uppercase tracking-[0.15em] text-accent">
                      {f.platform}
                    </p>
                    <p className="text-base font-semibold mt-2.5 leading-snug">{f.title}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground mt-2">{f.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <FadeUp delay={0.1}>
              <p className="mt-6 text-sm leading-relaxed text-foreground/90 max-w-3xl">
                {COMMENTDRAFT_FINDINGS.closing}
              </p>
            </FadeUp>
          </div>

          <div className="section-divider mt-14 mb-10" />

          <FadeUp>
            <h2 className="text-lg font-semibold tracking-tight">
              {COMMENTDRAFT_GUIDES_PAGE.closingHeading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground max-w-3xl">
              {COMMENTDRAFT_GUIDES_PAGE.closing}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <a
                href={COMMENTDRAFT_SHOWCASE.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 transition-[transform,background-color] active:scale-[0.97]"
              >
                <GitHubIcon className="size-4" />
                The repository
              </a>
              <Link
                href="/projects/commentdraft"
                className="inline-flex items-center gap-1.5 text-sm font-mono text-accent group py-2.5"
              >
                How the tool itself is built
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </FadeUp>
        </div>
      </main>
      <Footer />
    </>
  );
}
