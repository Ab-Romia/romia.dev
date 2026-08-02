import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Lock } from "lucide-react";
import {
  COMMENTDRAFT_GUIDES,
  COMMENTDRAFT_PLATFORMS,
  COMMENTDRAFT_SHOWCASE,
  commentdraftGuideUrl,
} from "@/data/resume";

/**
 * The eight platforms at reading width: what stands between an operator and a
 * first working call on each, and which single one has a connector.
 *
 * Compact by design. The full treatment, with what each costs and the order
 * worth attempting them in, is the /commentdraft route this links to.
 */
export function CommentdraftPlatformList() {
  return (
    <div>
      <p className="text-sm leading-relaxed text-foreground/90 border-l-2 border-accent/40 pl-5">
        {COMMENTDRAFT_GUIDES.honesty}
      </p>

      {/* One legend for all eight rows, rather than a chip on the single row
          that would carry one. */}
      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <Check className="size-3.5 text-accent shrink-0" aria-hidden="true" />
          connector ships
        </li>
        <li className="flex items-center gap-1.5">
          <span className="size-3.5 shrink-0 flex items-center justify-center" aria-hidden="true">
            <span className="size-1.5 rounded-full border border-muted-foreground/60" />
          </span>
          no permission needed
        </li>
        <li className="flex items-center gap-1.5">
          <Lock className="size-3.5 shrink-0" aria-hidden="true" />
          someone has to say yes
        </li>
      </ul>

      <ul className="mt-4 border-t border-border">
        {COMMENTDRAFT_PLATFORMS.map((p) => (
          <li
            key={p.slug}
            className="grid grid-cols-1 sm:grid-cols-[11.5rem_1fr] gap-x-5 gap-y-1.5 py-4 border-b border-border"
          >
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
              {p.connector === "ships" ? (
                <Check className="size-3.5 text-accent shrink-0" aria-hidden="true" />
              ) : p.access === "gated" ? (
                <Lock className="size-3.5 text-muted-foreground shrink-0" aria-hidden="true" />
              ) : (
                <span
                  className="size-3.5 shrink-0 flex items-center justify-center"
                  aria-hidden="true"
                >
                  <span className="size-1.5 rounded-full border border-muted-foreground/60" />
                </span>
              )}
              <a
                href={commentdraftGuideUrl(p.slug)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm text-foreground hover:text-accent transition-colors inline-flex items-center gap-1 whitespace-nowrap"
              >
                {p.name}
                <ArrowUpRight className="size-3 opacity-60" aria-hidden="true" />
              </a>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{p.blocker}</p>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm leading-relaxed text-foreground/90">
        {COMMENTDRAFT_GUIDES.closing}
      </p>

      <Link
        href={COMMENTDRAFT_SHOWCASE.guidesHref}
        className="inline-flex items-center gap-1.5 mt-4 text-sm font-mono text-accent group py-2.5 -my-0.5"
      >
        All eight guides, and what each one costs
        <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
