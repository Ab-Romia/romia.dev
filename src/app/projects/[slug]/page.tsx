import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PROJECTS, getProjectBySlug, getAdjacentProjects } from "@/data/resume";
import { FadeUp, BlurIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { DemoEmbed } from "@/components/demo-embed";
import { Connect4Wrapper } from "@/components/connect4-wrapper";
import { SudokuWrapper } from "@/components/sudoku-wrapper";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { cn } from "@/lib/utils";

const statusColors: Record<string, string> = {
  Production: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/30",
  Demo: "bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30",
  Ongoing: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
  Deployed: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30",
};

export async function generateStaticParams() {
  // zaylon-ai has its own dedicated case study page at /projects/zaylon-ai/page.tsx
  return PROJECTS.filter((p) => p.slug !== "zaylon-ai").map((p) => ({ slug: p.slug }));
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
    description: project.caseStudy.problem,
    openGraph: {
      title: `${project.title} | Abdelrahman Abouroumia`,
      description: project.caseStudy.problem,
    },
    alternates: { canonical: `/projects/${slug}` },
  };
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);
  const cs = project.caseStudy;

  return (
    <>
    <Navbar />
    <main id="main-content" className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Back link */}
        <FadeUp>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="size-4" />
            Back to Projects
          </Link>
        </FadeUp>

        {/* Hero */}
        <FadeUp delay={0.1}>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className={cn(
                "text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded border",
                statusColors[project.status]
              )}
            >
              {project.status}
            </span>
            {project.categories.map((cat) => (
              <span key={cat} className="text-xs font-mono text-muted-foreground px-2 py-0.5 rounded bg-muted">
                {cat}
              </span>
            ))}
            {project.badge && (
              <span className="text-xs font-mono text-accent border border-accent/30 px-2 py-0.5 rounded">
                {project.badge}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground mt-3 leading-relaxed">
            {project.description}
          </p>
        </FadeUp>

        {/* Tags + Links */}
        <FadeUp delay={0.15}>
          <div className="flex flex-wrap gap-2 mt-6">
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono bg-muted text-muted-foreground px-2.5 py-1 rounded">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-muted transition-colors">
                <ArrowUpRight className="size-4" /> Visit Site
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <GitHubIcon className="size-4" /> Source Code
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowUpRight className="size-4" /> Live Demo
              </a>
            )}
          </div>
        </FadeUp>

        <div className="section-divider mt-10 mb-10" />

        {/* The Problem */}
        <BlurIn>
          <h2 className="text-2xl font-bold tracking-tight">The Problem</h2>
          <p className="text-muted-foreground leading-relaxed mt-3">{cs.problem}</p>
        </BlurIn>

        {/* Architecture & Approach */}
        <FadeUp delay={0.1}>
          <h2 className="text-2xl font-bold tracking-tight mt-12">
            Architecture & Approach
          </h2>
          <p className="text-muted-foreground leading-relaxed mt-3">{cs.approach}</p>
        </FadeUp>

        {/* Key Technical Decisions */}
        {cs.decisions && cs.decisions.length > 0 && (
          <>
            <FadeUp delay={0.15}>
              <h2 className="text-2xl font-bold tracking-tight mt-12">
                Key Technical Decisions
              </h2>
            </FadeUp>
            <StaggerContainer className="space-y-4 mt-6">
              {cs.decisions.map((d) => (
                <StaggerItem key={d.title}>
                  <div className="bg-card border border-border rounded-lg p-5">
                    <h3 className="text-sm font-semibold text-foreground">
                      {d.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {d.reasoning}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </>
        )}

        {/* Results */}
        <FadeUp>
          <h2 className="text-2xl font-bold tracking-tight mt-12">Results</h2>
          <p className="text-muted-foreground leading-relaxed mt-3">{cs.results}</p>
        </FadeUp>

        {/* Embedded Demo */}
        {cs.embedDemo && (
          <FadeUp>
            <h2 className="text-2xl font-bold tracking-tight mt-12">
              Interactive Demo
            </h2>
            <div className="mt-6">
              {cs.embedDemo.type === "iframe" && cs.embedDemo.src && (
                <DemoEmbed src={cs.embedDemo.src} title={`${project.title} Demo`} />
              )}
              {cs.embedDemo.type === "component" && cs.embedDemo.component === "connect4" && (
                <Connect4Wrapper />
              )}
              {cs.embedDemo.type === "component" && cs.embedDemo.component === "sudoku" && (
                <SudokuWrapper />
              )}
            </div>
          </FadeUp>
        )}

        <div className="section-divider mt-12 mb-8" />

        {/* Previous / Next */}
        <div className="flex items-center justify-between">
          {prev ? (
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">{prev.title}</span>
              <span className="sm:hidden">Previous</span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/projects/${next.slug}`}
              className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="hidden sm:inline">{next.title}</span>
              <span className="sm:hidden">Next</span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
