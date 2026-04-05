"use client";

import { EXPERIENCE } from "@/data/resume";
import { FadeUp, BlurIn } from "@/components/motion-wrapper";

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
        <BlurIn>
          <h2 className="text-3xl font-bold tracking-tight leading-tight">
            Experience
          </h2>
        </BlurIn>

        <div className="mt-8 space-y-6">
          {EXPERIENCE.map((entry, i) => {
            const isCurrent = entry.period.includes("Present");

            return (
              <FadeUp key={entry.company} delay={i * 0.1}>
                <div
                  className="group relative border border-border rounded-xl p-6 sm:p-8 hover:border-accent/30 transition-all duration-300 cursor-glow bg-card/30"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    e.currentTarget.style.setProperty("--glow-x", `${e.clientX - rect.left}px`);
                    e.currentTarget.style.setProperty("--glow-y", `${e.clientY - rect.top}px`);
                  }}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                        <span className="text-accent text-sm font-bold">{entry.company.charAt(0)}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold leading-snug">
                          {entry.role}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-0.5">
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
                            <span>{entry.company}</span>
                          )}
                          {"type" in entry && entry.type && (
                            <span className="text-muted-foreground/70"> · {entry.type}</span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:mt-1">
                      <span className="text-xs text-muted-foreground font-mono">
                        {entry.period}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-mono text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20 flex items-center gap-1">
                          <span className="size-1.5 rounded-full bg-green-400 animate-pulse" />
                          Current
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  {"description" in entry && entry.description && (
                    <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                      {entry.description}
                    </p>
                  )}

                  {/* Highlights */}
                  <ul className="mt-4 space-y-2.5">
                    {entry.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-sm text-muted-foreground leading-relaxed flex gap-2.5"
                      >
                        <span className="text-accent mt-1 shrink-0 text-xs">&#9656;</span>
                        <span>{highlightNumbers(highlight)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
