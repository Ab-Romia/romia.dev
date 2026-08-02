import { COMMENTDRAFT_TRIAGE } from "@/data/resume";
import { cn } from "@/lib/utils";

/**
 * What the tool decided on one real run, read out of the run's own CSV.
 *
 * A single emerald carries all three states: solid for the replies it wrote,
 * half-strength for the ones it handed to a person, and the plain border for
 * the ones it left alone. Static, so there is nothing to operate: the point is
 * the judgement, and that most of what arrives gets no draft.
 */

/* Filled means a draft was written, hollow means it was handed to a person,
   grey means it was left alone. One hue carries all three. */
const BAR: Record<string, string> = {
  reply: "bg-accent",
  skip: "bg-muted-foreground/25",
  escalate: "bg-accent/20 ring-1 ring-inset ring-accent/60",
};

const DOT: Record<string, string> = {
  reply: "bg-accent",
  skip: "bg-muted-foreground/40",
  escalate: "bg-transparent ring-[1.5px] ring-accent",
};

export function CommentdraftTriage() {
  const { label, total, counts, samples, closing, provenance } = COMMENTDRAFT_TRIAGE;

  return (
    <div className="rounded-xl border border-border bg-card p-5 sm:p-6">
      <p className="text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground">
        {label}
        <span className="mx-2 text-border">/</span>
        {total} comments
      </p>

      {/* One bar, split by what the run decided */}
      <div className="mt-4 flex gap-1" aria-hidden="true">
        {counts.map((c) => (
          <div
            key={c.decision}
            className={cn("h-2 rounded-full", BAR[c.decision])}
            style={{ flexGrow: c.n }}
          />
        ))}
      </div>

      <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
        {counts.map((c) => (
          <li key={c.decision} className="flex items-center gap-2 font-mono text-xs">
            <span className={cn("size-2 rounded-full shrink-0", DOT[c.decision])} aria-hidden="true" />
            <span className="text-muted-foreground">{c.decision}</span>
            <span className="text-foreground tabular-nums">{c.n}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-4 border-t border-border pt-5">
        {samples.map((s) => (
          <div key={s.decision} className="flex gap-3">
            <span
              className={cn("mt-1.5 size-2 rounded-full shrink-0", DOT[s.decision])}
              aria-hidden="true"
            />
            <div className="min-w-0">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {s.decision}
              </p>
              <p className="text-sm text-foreground mt-1 leading-relaxed">
                &ldquo;{s.comment}&rdquo;
              </p>
              <p className="font-mono text-[11px] text-muted-foreground mt-1 leading-relaxed">
                {s.reason}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-5 border-t border-border pt-4 text-sm text-foreground">{closing}</p>
      <p className="mt-2 font-mono text-[11px] text-muted-foreground leading-relaxed">
        {provenance}
      </p>
    </div>
  );
}
