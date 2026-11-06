import Image from "next/image";
import { EXPERIENCE } from "@/data/resume";
import { Section, SectionHeader } from "@/components/section";

const LOGOS: Record<string, { src: string; bg: string }> = {
  Tutanic: { src: "/logos/tutanic.png", bg: "#0C0C0C" },
  "Zaylon AI": { src: "/logos/zaylon.png", bg: "#1B3A35" },
  Ejada: { src: "/logos/ejada.jpg", bg: "#FFFFFF" },
  "Swift-ACT": { src: "/logos/swiftact.jpg", bg: "#FFFFFF" },
};

function Logo({ company }: { company: string }) {
  const logo = LOGOS[company];
  if (!logo) {
    return (
      <span
        aria-hidden="true"
        className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted font-display text-lg"
      >
        {company[0]}
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-md ring-1 ring-border"
      style={{ background: logo.bg }}
    >
      <Image src={logo.src} alt="" width={24} height={24} className="object-contain" />
    </span>
  );
}

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeader index="03" title="Experience" />

      <ol className="mt-12 border-t border-border md:mt-16">
        {EXPERIENCE.map((entry) => (
          <li
            key={entry.company}
            className="reveal grid gap-x-8 gap-y-4 border-b border-border py-9 md:grid-cols-12"
          >
            <p className="font-mono text-xs leading-6 text-muted-foreground md:col-span-3">
              {entry.period}
            </p>

            <div className="md:col-span-9">
              <div className="flex items-start gap-3.5">
                <Logo company={entry.company} />
                <div>
                  <h3 className="text-lg font-medium leading-snug">
                    {entry.role}
                    {"focus" in entry && entry.focus && (
                      <span className="font-normal text-muted-foreground">, {entry.focus}</span>
                    )}
                  </h3>
                  <p className="text-[15px] text-muted-foreground">
                    {"url" in entry && entry.url ? (
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline transition-colors hover:text-foreground"
                      >
                        {entry.company}
                      </a>
                    ) : (
                      entry.company
                    )}
                    {"type" in entry && entry.type && <span> · {entry.type}</span>}
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground">
                {entry.description}
              </p>

              {"stack" in entry && entry.stack && (
                <p className="mt-4 max-w-2xl font-mono text-xs leading-relaxed text-muted-foreground">
                  {entry.stack.join("  ·  ")}
                </p>
              )}

              {entry.highlights.length > 0 && (
                <ul className="mt-5 max-w-2xl space-y-2.5">
                  {entry.highlights.map((h) => (
                    <li
                      key={h}
                      className="relative pl-5 text-[15px] leading-relaxed text-muted-foreground before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-2.5 before:bg-border-strong"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
