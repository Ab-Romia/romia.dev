import { EXPERIENCE } from "@/data/resume";
import { FadeUp } from "@/components/motion-wrapper";

export function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight leading-tight">
          Experience
        </h2>

        <div className="mt-8 space-y-0">
          {EXPERIENCE.map((entry, i) => (
            <FadeUp key={entry.company} delay={i * 0.1}>
              <div className="relative pl-8 pb-10 last:pb-0 border-l border-border">
                {/* Timeline dot */}
                <div className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-accent border-2 border-background" />

                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div>
                    <h3 className="text-base font-semibold">
                      {entry.role}
                      <span className="text-muted-foreground font-normal">
                        {" — "}
                        {"url" in entry && entry.url ? (
                          <a
                            href={entry.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition-colors"
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
                  <span className="text-sm text-muted-foreground font-mono shrink-0">
                    {entry.period}
                  </span>
                </div>

                <ul className="mt-3 space-y-2">
                  {entry.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                    >
                      <span className="text-accent mt-1.5 shrink-0">&#8226;</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
