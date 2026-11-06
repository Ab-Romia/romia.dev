import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** A homepage section: a hairline above, then the content at page width. */
export function Section({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("border-t border-border", className)}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">{children}</div>
    </section>
  );
}

export function SectionHeader({
  index,
  title,
  intro,
  action,
}: {
  /** "01", "02": the section's place on the page, set as a label above the title. */
  index?: string;
  title: string;
  intro?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="reveal flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        {index && (
          <p className="eyebrow mb-4 flex items-center gap-3 text-accent">
            {index}
            <span aria-hidden="true" className="h-px w-10 bg-current" />
          </p>
        )}
        <h2 className="display-lg">{title}</h2>
        {intro && (
          <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">{intro}</p>
        )}
      </div>
      {action}
    </div>
  );
}

/** "Read more" style link with an arrow that nudges on hover. */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-medium text-foreground",
        className
      )}
    >
      <span className="link-underline">{children}</span>
      <ArrowRight
        className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
        aria-hidden="true"
      />
    </Link>
  );
}
