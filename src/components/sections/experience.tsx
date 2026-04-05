"use client";

import { EXPERIENCE } from "@/data/resume";
import { FadeUp, SlideFromLeft } from "@/components/motion-wrapper";

function highlightNumbers(text: string) {
  const parts = text.split(/(\d+[\w+]*)/g);
  return parts.map((part, i) =>
    /^\d/.test(part) ? (
      <span key={i} className="text-foreground font-medium">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function Experience() {
  return (
    <section id="experience" className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight leading-tight">
          Experience
        </h2>

        <div className="mt-8 space-y-0">
          {EXPERIENCE.map((entry, i) => {
            const isCurrent = entry.period.includes("Present");
            const Wrapper = i < 2 ? SlideFromLeft : FadeUp;

            return (
              <Wrapper key={entry.company} delay={i * 0.1}>
                <div
                  className={`group relative pl-8 pb-10 last:pb-0 border-l transition-colors duration-300 ${
                    isCurrent
                      ? "border-accent/40 hover:border-accent/60"
                      : "border-border hover:border-accent/20"
                  }`}
                >
                  {isCurrent ? (
                    <>
                      <div className="absolute -left-[7px] top-1 size-3.5 rounded-full bg-accent border-2 border-background shadow-[0_0_8px_rgba(0,212,255,0.4)] group-hover:shadow-[0_0_14px_rgba(0,212,255,0.6)] transition-shadow" />
                      <div className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-accent/30 animate-ping" />
                    </>
                  ) : (
                    <div className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-muted-foreground/50 border-2 border-background group-hover:bg-accent/50 group-hover:shadow-[0_0_6px_rgba(0,212,255,0.3)] transition-all" />
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div className="flex items-center gap-3">
                      <div className="size-8 rounded-md bg-accent/10 flex items-center justify-center shrink-0">
                        <span className="text-accent text-xs font-bold">{entry.company.charAt(0)}</span>
                      </div>
                      <h3 className="text-base font-semibold">
                        {entry.role}
                        <span className="text-muted-foreground font-normal">
                          {" at "}
                          {"url" in entry && entry.url ? (
                            <a
                              href={entry.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-accent transition-colors link-underline"
                            >
                              {entry.company}
                            </a>
                          ) : (
                            entry.company
                          )}
                        </span>
                        {"type" in entry && entry.type && (
                          <span className="text-xs text-muted-foreground font-normal ml-2">
                            ({entry.type})
                          </span>
                        )}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground font-mono shrink-0">
                        {entry.period}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-mono text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">
                          Current
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="mt-3 space-y-2">
                    {entry.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                      >
                        <span className="text-accent mt-1.5 shrink-0">&#8226;</span>
                        <span>{highlightNumbers(highlight)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
