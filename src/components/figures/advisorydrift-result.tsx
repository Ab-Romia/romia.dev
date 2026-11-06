import { cn } from "@/lib/utils";

/* The headline from github.com/Ab-Romia/advisorydrift, reproducible offline with
   `python3 evals/regression_gate.py --threshold 0.37 --expect-n 38`. Strict
   exact-set match on the 38 cases both arms scored; whiskers are Wilson 95%. */
const ARMS = [
  {
    name: "AdvisoryDrift",
    note: "the agent",
    hits: 15,
    ci: [26, 55],
    lead: true,
  },
  {
    name: "Deterministic baseline",
    note: "oracle-best, an upper bound",
    hits: 5,
    ci: [6, 27],
    lead: false,
  },
];
const N = 38;
const MAX = 60; // axis runs 0 to 60%
const TICKS = [0, 20, 40, 60];
const at = (pct: number) => `${(pct / MAX) * 100}%`;

export function AdvisoryDriftResult({ className }: { className?: string }) {
  return (
    <figure className={cn("rounded-lg border border-border bg-card p-5 sm:p-7", className)}>
      <p className="eyebrow">Exact-set match on {N} held-out corrections</p>

      <div className="relative mt-7">
        {/* Recessive gridlines behind both rows */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 top-8">
          {TICKS.map((t) => (
            <span
              key={t}
              className="absolute inset-y-0 w-px bg-border"
              style={{ left: at(t) }}
            />
          ))}
        </div>

        <div className="space-y-8">
          {ARMS.map((arm) => {
            const pct = Math.round((arm.hits / N) * 100);
            return (
              <div key={arm.name}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="text-[15px] font-medium">
                    {arm.name}{" "}
                    <span className="font-normal text-muted-foreground">{arm.note}</span>
                  </p>
                  <p className="font-mono text-sm tabular-nums">
                    {arm.hits}/{N} = {pct}%
                  </p>
                </div>
                <div
                  className="relative mt-3 h-5"
                  title={`${arm.name}: ${arm.hits} of ${N}, ${pct}%. Wilson 95% interval ${arm.ci[0]}% to ${arm.ci[1]}%.`}
                >
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 h-3 -translate-y-1/2 rounded-r-[4px]",
                      arm.lead ? "bg-accent" : "bg-faint"
                    )}
                    style={{ width: at(pct) }}
                  />
                  {/* Wilson 95% interval */}
                  <span
                    className="absolute top-1/2 h-px bg-foreground"
                    style={{ left: at(arm.ci[0]), width: `${((arm.ci[1] - arm.ci[0]) / MAX) * 100}%` }}
                  />
                  {arm.ci.map((c) => (
                    <span
                      key={c}
                      className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-foreground"
                      style={{ left: at(c) }}
                    />
                  ))}
                </div>
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  95% interval {arm.ci[0]} to {arm.ci[1]}%
                </p>
              </div>
            );
          })}
        </div>

        <div aria-hidden="true" className="relative mt-4 h-4 font-mono text-[11px] text-muted-foreground">
          {TICKS.map((t) => (
            <span
              key={t}
              className={cn("absolute", t === 0 ? "" : t === MAX ? "-translate-x-full" : "-translate-x-1/2")}
              style={{ left: at(t) }}
            >
              {t}%
            </span>
          ))}
        </div>
      </div>

      <figcaption className="mt-6 border-t border-border pt-4 text-sm leading-relaxed text-muted-foreground">
        Same cases for both, paired McNemar exact test:{" "}
        <span className="font-mono text-foreground">p = 0.0063</span>. The baseline is credited
        whenever either of its two arms is right, which no real system could do.
      </figcaption>
    </figure>
  );
}
