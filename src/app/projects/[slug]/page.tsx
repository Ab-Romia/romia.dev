import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, Medal } from "lucide-react";
import { PROJECTS, getAdjacentProjects, getProjectBySlug } from "@/data/resume";
import { DemoEmbed } from "@/components/demo-embed";
import { CommentdraftPlatformList } from "@/components/commentdraft-platforms";
import { Connect4Wrapper } from "@/components/connect4-wrapper";
import { SudokuWrapper } from "@/components/sudoku-wrapper";
import { AdvisoryDriftResult } from "@/components/figures/advisorydrift-result";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { BackLink, ProjectPager } from "@/components/case-study";

/* zaylon-ai and talos have their own pages, and projects with a blog write-up
   redirect to it (next.config.ts), so neither gets a page from this template. */
export async function generateStaticParams() {
  return PROJECTS.filter((p) => p.slug !== "zaylon-ai" && p.slug !== "talos" && !p.blog).map(
    (p) => ({ slug: p.slug })
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} | Abdelrahman Abouroumia`,
      description: project.description,
    },
    alternates: { canonical: `/projects/${slug}` },
  };
}

/** The one figure that should be seen before the prose, where a project has it. */
const LEAD_FIGURES: Record<string, ReactNode> = {
  advisorydrift: <AdvisoryDriftResult />,
};

function Heading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="display-md mt-16 first:mt-0">
      {children}
    </h2>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return <p className="mt-5 text-[17px] leading-[1.75] text-foreground/90">{children}</p>;
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const cs = project.caseStudy;
  const lead = LEAD_FIGURES[slug];

  const sections = [
    { id: "problem", label: "The problem" },
    { id: "approach", label: "Approach" },
    ...(cs.decisions?.length ? [{ id: "decisions", label: "Decisions" }] : []),
    ...(cs.reference ? [{ id: "reference", label: cs.reference.heading }] : []),
    { id: "results", label: "Results" },
    ...(cs.embedDemo ? [{ id: "demo", label: "Try it" }] : []),
  ];

  const links = [
    project.url && { label: project.url.includes("pypi.org") ? "PyPI" : "Website", href: project.url },
    project.github && { label: "Source on GitHub", href: project.github },
    project.demo && { label: "Live demo", href: project.demo },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <>
      <Navbar />
      <main id="main-content" className="pb-24 pt-28 md:pt-36">
        <article className="mx-auto max-w-6xl px-5 sm:px-8">
          <BackLink href="/#projects">All work</BackLink>

          <header className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <p className="eyebrow flex flex-wrap gap-x-3">
                {project.role && <span>{project.role}</span>}
                <span>{project.year}</span>
                <span>{project.status}</span>
              </p>
              <h1 className="display-xl mt-5">{project.title}</h1>
              {project.award && (
                <p className="mt-5 flex items-start gap-2 text-[15px] text-accent">
                  <Medal className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {project.award.title}, {project.award.event}
                </p>
              )}
              <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted-foreground md:text-xl md:leading-relaxed">
                {project.description}
              </p>
            </div>

            <dl className="space-y-5 self-end text-[15px] lg:col-span-3 lg:col-start-10">
              <div className="border-t border-border pt-4">
                <dt className="eyebrow">Stack</dt>
                <dd className="mt-2 leading-relaxed">{project.tags.join(", ")}</dd>
              </div>
              {links.length > 0 && (
                <div className="border-t border-border pt-4">
                  <dt className="eyebrow">Links</dt>
                  <dd className="mt-2 space-y-1">
                    {links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 transition-colors hover:text-accent"
                      >
                        <span className="link-underline">{l.label}</span>
                        <ArrowUpRight className="size-3.5" aria-hidden="true" />
                      </a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </header>

          {lead && <div className="mt-14">{lead}</div>}

          {project.impact && !lead && (
            <p className="mt-14 border-l-2 border-accent pl-5 text-2xl font-semibold leading-snug md:text-[1.75rem]">
              {project.impact}
            </p>
          )}

          <div className="mt-16 grid gap-12 border-t border-border pt-14 lg:grid-cols-12 lg:gap-8">
            <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
              <ul className="sticky top-28 space-y-2 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="link-underline text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="min-w-0 lg:col-span-8 lg:col-start-5">
              <Heading id="problem">The problem</Heading>
              <Prose>{cs.problem}</Prose>

              <Heading id="approach">Approach</Heading>
              <Prose>{cs.approach}</Prose>

              {cs.figure && (
                <figure className="mt-10">
                  <a
                    href={cs.figure.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open the full-size image: ${cs.figure.alt}`}
                    className="block overflow-hidden rounded-md ring-1 ring-border transition-opacity hover:opacity-95"
                  >
                    <Image
                      src={cs.figure.src}
                      alt={cs.figure.alt}
                      width={cs.figure.width}
                      height={cs.figure.height}
                      sizes="(min-width: 1024px) 720px, 100vw"
                      className="h-auto w-full"
                    />
                  </a>
                  <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {cs.figure.caption}{" "}
                    <a href={cs.figure.src} target="_blank" rel="noopener noreferrer" className="link">
                      Open it full size
                    </a>
                    .
                  </figcaption>
                </figure>
              )}

              {cs.decisions && cs.decisions.length > 0 && (
                <>
                  <Heading id="decisions">Decisions</Heading>
                  <ol className="mt-8 border-t border-border">
                    {cs.decisions.map((d, i) => (
                      <li
                        key={d.title}
                        className="grid gap-x-5 gap-y-2 border-b border-border py-8 sm:grid-cols-[2.5rem_1fr]"
                      >
                        <span className="pt-1 font-mono text-xs text-muted-foreground">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="display-sm">{d.title}</h3>
                          <p className="mt-3 text-[16px] leading-[1.75] text-foreground/85">
                            {d.reasoning}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </>
              )}

              {cs.reference && (
                <>
                  <Heading id="reference">{cs.reference.heading}</Heading>
                  <Prose>{cs.reference.intro}</Prose>
                  <div className="mt-8">
                    {cs.reference.component === "commentdraft-platforms" && <CommentdraftPlatformList />}
                  </div>
                </>
              )}

              <Heading id="results">Results</Heading>
              <Prose>{cs.results}</Prose>

              {project.award && (
                <figure className="mt-10">
                  <a
                    href={project.award.certificate.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open the certificate full size"
                    className="block overflow-hidden rounded-md ring-1 ring-border transition-opacity hover:opacity-95"
                  >
                    <Image
                      src={project.award.certificate.src}
                      alt={`Certificate of Achievement from ${project.award.issuer}: ${project.award.title}, ${project.award.event}, presented to Abdelrahman Abouroumia`}
                      width={project.award.certificate.width}
                      height={project.award.certificate.height}
                      sizes="(min-width: 1024px) 720px, 100vw"
                      className="h-auto w-full"
                    />
                  </a>
                  <figcaption className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    The certificate, dated{" "}
                    {new Date(project.award.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                    : &ldquo;{project.award.citation}&rdquo;
                  </figcaption>
                </figure>
              )}

              {cs.embedDemo && (
                <>
                  <Heading id="demo">Try it</Heading>
                  <div className="mt-8">
                    {cs.embedDemo.type === "iframe" && cs.embedDemo.src && (
                      <DemoEmbed src={cs.embedDemo.src} title={`${project.title} demo`} />
                    )}
                    {cs.embedDemo.component === "connect4" && <Connect4Wrapper />}
                    {cs.embedDemo.component === "sudoku" && <SudokuWrapper />}
                  </div>
                </>
              )}
            </div>
          </div>

          <ProjectPager prev={prev} next={next} />
        </article>
      </main>
      <Footer />
    </>
  );
}
