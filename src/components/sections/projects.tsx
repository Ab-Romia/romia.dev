import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight, Medal } from "lucide-react";
import { PROJECTS, projectHref, type Project } from "@/data/resume";
import { Section, SectionHeader, ArrowLink } from "@/components/section";
import { ZaylonTopology } from "@/components/figures/zaylon-topology";
import { AdvisoryDriftResult } from "@/components/figures/advisorydrift-result";
import { CommentdraftTriage } from "@/components/commentdraft-triage";

function bySlug(slug: string) {
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown project: ${slug}`);
  return p;
}

type ExternalLink = { label: string; href: string };

/* The three that lead, each with the one artefact that shows what it is. The
   ids keep old deep links (/#zaylon, /#commentdraft) working. */
const FEATURES: {
  slug: string;
  figure: ReactNode;
  links: ExternalLink[];
  extra?: { label: string; href: string };
  /** The figure runs the full width under the text instead of beside it. */
  wide?: boolean;
}[] = [
  {
    slug: "zaylon-ai",
    figure: <ZaylonTopology />,
    wide: true,
    links: [{ label: "zaylon.ai", href: "https://zaylon.ai" }],
  },
  {
    slug: "advisorydrift",
    figure: <AdvisoryDriftResult />,
    links: [{ label: "Source", href: "https://github.com/Ab-Romia/advisorydrift" }],
  },
  {
    slug: "commentdraft",
    figure: <CommentdraftTriage />,
    links: [
      { label: "Source", href: "https://github.com/Ab-Romia/commentdraft" },
      { label: "PyPI", href: "https://pypi.org/project/commentdraft/" },
    ],
    extra: { label: "The eight platform guides", href: "/commentdraft" },
  },
];

const FEATURED = new Set(FEATURES.map((f) => f.slug));
const isGame = (p: Project) => p.categories.includes("Games/Puzzles");

function Feature({
  index,
  project,
  figure,
  links,
  extra,
  wide = false,
}: {
  index: number;
  project: Project;
  figure: ReactNode;
  links: ExternalLink[];
  extra?: { label: string; href: string };
  wide?: boolean;
}) {
  const anchor = project.slug === "zaylon-ai" ? "zaylon" : project.slug;

  const identity = (
    <>
      <p aria-hidden="true" className="poster drift text-[5rem] text-accent md:text-[6.5rem]">
        {String(index).padStart(2, "0")}
      </p>
      <p className="eyebrow mt-6 flex flex-wrap gap-x-3">
        {project.role && <span>{project.role}</span>}
        <span>{project.year}</span>
      </p>
      <h3 className="display-lg mt-3">
        <Link href={projectHref(project)} className="link-underline">
          {project.title}
        </Link>
      </h3>
      {project.award && (
        <p className="mt-3 flex items-start gap-2 text-sm leading-snug text-accent">
          <Medal className="mt-px size-4 shrink-0" aria-hidden="true" />
          <span>
            {project.award.title}, {project.award.event}
          </span>
        </p>
      )}
    </>
  );

  const body = (
    <>
      <p className="leading-relaxed text-muted-foreground">{project.description}</p>
      {project.impact && <p className="mt-4 leading-relaxed">{project.impact}</p>}
      <p className="mt-5 font-mono text-xs leading-relaxed text-muted-foreground">
        {project.tags.join("  ·  ")}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <ArrowLink href={projectHref(project)}>Read the case study</ArrowLink>
        {extra && <ArrowLink href={extra.href}>{extra.label}</ArrowLink>}
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="link-underline">{l.label}</span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        ))}
      </div>
    </>
  );

  return (
    <article
      id={anchor}
      className="grid gap-10 border-t-2 border-foreground py-14 first:border-t-0 first:pt-0 md:py-20 lg:grid-cols-12 lg:gap-12"
    >
      {wide ? (
        <>
          <div className="reveal lg:col-span-5">{identity}</div>
          <div className="reveal lg:col-span-7 lg:self-end">{body}</div>
          <div className="reveal lg:col-span-12">{figure}</div>
        </>
      ) : (
        <>
          <div className="reveal lg:col-span-5">
            {identity}
            <div className="mt-5">{body}</div>
          </div>
          <div className="reveal lg:col-span-7">{figure}</div>
        </>
      )}
    </article>
  );
}

export function Projects() {
  const more = PROJECTS.filter((p) => !FEATURED.has(p.slug) && !isGame(p));
  const games = PROJECTS.filter(isGame);

  return (
    <Section id="projects">
      <SectionHeader
        index="02"
        title="Selected work"
        intro="The company I co-founded, the agent that won micro1's Best Demonstrated Improvement, and a tool I published on PyPI. Each one is shown with the artefact that explains it best."
      />

      <div className="mt-14 md:mt-20">
        {FEATURES.map(({ slug, ...rest }, i) => (
          <Feature key={slug} index={i + 1} project={bySlug(slug)} {...rest} />
        ))}
      </div>

      <div className="mt-6 border-t-2 border-foreground pt-14 md:pt-20">
        <h3 className="display-md">More projects</h3>
        <ul className="mt-8 border-t border-border">
          {more.map((p) => (
            <li key={p.slug} className="reveal border-b border-border">
              <Link
                href={projectHref(p)}
                className="group -mx-3 grid gap-x-8 gap-y-2 rounded-sm px-3 py-6 transition-colors hover:bg-muted/60 md:grid-cols-12"
              >
                <span className="md:col-span-4">
                  <span className="display-sm block">
                    {p.title}
                  </span>
                  <span className="mt-1.5 block font-mono text-xs text-muted-foreground">
                    {p.year}
                    {p.role ? `  ·  ${p.role}` : ""}
                  </span>
                </span>
                <span className="text-[15px] leading-relaxed text-muted-foreground md:col-span-7">
                  {p.description}
                </span>
                <span className="hidden justify-self-end pt-1 md:col-span-1 md:block">
                  <ArrowUpRight
                    className="size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {games.length === 2 && (
          <p className="mt-8 max-w-3xl text-[15px] leading-relaxed text-muted-foreground">
            Smaller things: a{" "}
            <Link href={projectHref(games[0])} className="link text-foreground">
              Connect 4 agent
            </Link>{" "}
            that searches with minimax and alpha-beta pruning, and a{" "}
            <Link href={projectHref(games[1])} className="link text-foreground">
              Sudoku solver
            </Link>{" "}
            built on constraint propagation. Both play in the browser.
          </p>
        )}
      </div>
    </Section>
  );
}
