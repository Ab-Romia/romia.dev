import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projectHref, type Project } from "@/data/resume";

/** The quiet "back" link at the top of a case study or post. */
export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <ArrowLeft
        className="size-3.5 transition-transform group-hover:-translate-x-0.5"
        aria-hidden="true"
      />
      {children}
    </Link>
  );
}

/** Previous and next project, at the foot of every case study. */
export function ProjectPager({ prev, next }: { prev: Project | null; next: Project | null }) {
  return (
    <nav aria-label="More projects" className="mt-24 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
      {prev ? (
        <Link href={projectHref(prev)} className="group">
          <span className="eyebrow">Previous</span>
          <span className="display-sm mt-2 block decoration-1 underline-offset-[0.2em] group-hover:underline">
            {prev.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={projectHref(next)} className="group sm:text-right">
          <span className="eyebrow">Next</span>
          <span className="display-sm mt-2 block decoration-1 underline-offset-[0.2em] group-hover:underline">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
