"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FadeUp, BlurIn } from "@/components/motion-wrapper";
import { GitHubIcon } from "@/components/social-icons";
import { CommentdraftTriage } from "@/components/commentdraft-triage";
import { COMMENTDRAFT_SHOWCASE } from "@/data/resume";

/**
 * A peer of the Zaylon section, not a second landing page. Everything that
 * needs room lives behind the two links: the build story on the case study,
 * the eight platform guides on their own route.
 */

/** A refusal, stated the way a spec plate states a rating. */
function Refusal({ head, body }: { head: string; body: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-[0.55rem] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
      <div>
        <p className="text-sm font-semibold leading-snug">{head}</p>
        <p className="text-sm leading-relaxed text-muted-foreground mt-1">{body}</p>
      </div>
    </div>
  );
}

export function CommentdraftShowcase() {
  return (
    <section id="commentdraft" className="commentdraft-section py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-14 items-start">
          <div>
            <BlurIn>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                <span className="size-1.5 rounded-full bg-accent" />
                {COMMENTDRAFT_SHOWCASE.role}
              </span>
            </BlurIn>

            <FadeUp delay={0.1}>
              {/* Mono is wide: the name has to step down further than a sans
                  heading would to clear a 320px viewport. */}
              <h2 className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-mono font-bold tracking-tighter mt-4">
                {COMMENTDRAFT_SHOWCASE.title}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mt-3 leading-snug">
                {COMMENTDRAFT_SHOWCASE.subtitle}
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="leading-relaxed mt-6 text-base text-muted-foreground">
                {COMMENTDRAFT_SHOWCASE.description}
              </p>
            </FadeUp>

            <FadeUp delay={0.3}>
              <div className="mt-8 pt-6 border-t border-border space-y-4">
                {COMMENTDRAFT_SHOWCASE.refusals.map((r) => (
                  <Refusal key={r.head} head={r.head} body={r.body} />
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.4}>
              <div className="flex flex-wrap items-center gap-3 mt-8">
                <a
                  href={COMMENTDRAFT_SHOWCASE.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 transition-[transform,background-color] active:scale-[0.97]"
                >
                  <GitHubIcon className="size-4" />
                  Read the source
                </a>
                <a
                  href={COMMENTDRAFT_SHOWCASE.pypi}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm text-muted-foreground border border-border rounded-xl px-4 py-3 hover:border-accent/40 hover:text-foreground transition-colors"
                >
                  <span className="text-accent" aria-hidden="true">
                    $
                  </span>
                  {COMMENTDRAFT_SHOWCASE.install}
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5">
                <Link
                  href="/projects/commentdraft"
                  className="inline-flex items-center gap-1.5 text-sm font-mono text-accent group py-2.5 -my-0.5"
                >
                  Read the case study
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href={COMMENTDRAFT_SHOWCASE.guidesHref}
                  className="inline-flex items-center gap-1.5 text-sm font-mono text-accent group py-2.5 -my-0.5"
                >
                  The eight platform guides
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </FadeUp>
          </div>

          {/* What it decided on a real run. Judgement, not effort. */}
          <FadeUp delay={0.15}>
            <CommentdraftTriage />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
