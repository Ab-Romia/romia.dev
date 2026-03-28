"use client";

import { useState } from "react";
import { PROJECTS } from "@/data/resume";
import { StaggerContainer, StaggerItem, FadeUp } from "@/components/motion-wrapper";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

const statusColors: Record<string, string> = {
  Production: "bg-green-500/10 text-green-400 border-green-500/20",
  Demo: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Ongoing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Deployed: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const featuredProjects = PROJECTS.filter((p) => "featured" in p && p.featured);
const otherProjects = PROJECTS.filter((p) => !("featured" in p && p.featured));

export function Projects() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight leading-tight">
          Featured Projects
        </h2>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">
          {featuredProjects.map((project) => (
            <StaggerItem key={project.title}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {otherProjects.length > 0 && (
          <div className="mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {showAll ? "Show Less" : `View All Projects (${PROJECTS.length})`}
              {showAll ? (
                <ChevronUp className="size-4" />
              ) : (
                <ChevronDown className="size-4" />
              )}
            </button>

            {showAll && (
              <FadeUp className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                {otherProjects.map((project) => (
                  <ProjectCard key={project.title} project={project} compact />
                ))}
              </FadeUp>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  compact = false,
}: {
  project: (typeof PROJECTS)[number];
  compact?: boolean;
}) {
  const hasUrl = "url" in project && project.url;
  const hasGithub = "github" in project && project.github;
  const hasDemo = "demo" in project && project.demo;
  const hasBadge = "badge" in project && project.badge;

  return (
    <div
      className={cn(
        "group bg-card border border-border rounded-lg h-full transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5",
        compact ? "p-4" : "p-6"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className={cn("font-semibold", compact ? "text-sm" : "text-lg")}>
          {hasUrl ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors inline-flex items-center gap-1"
            >
              {project.title}
              <ArrowUpRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ) : (
            project.title
          )}
        </h3>

        <div className="flex items-center gap-2 shrink-0">
          {hasBadge && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-accent border border-accent/30 px-1.5 py-0.5 rounded">
              {project.badge}
            </span>
          )}
          <span
            className={cn(
              "text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border",
              statusColors[project.status]
            )}
          >
            {project.status}
          </span>
        </div>
      </div>

      <p
        className={cn(
          "text-muted-foreground leading-relaxed mt-2",
          compact ? "text-xs" : "text-sm"
        )}
      >
        {project.description}
      </p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, compact ? 3 : undefined).map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono bg-muted text-muted-foreground px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0 ml-2">
          {hasDemo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live demo`}
              className="text-xs font-mono text-accent hover:text-accent-muted transition-colors"
            >
              Demo
            </a>
          )}
          {hasGithub && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <GitHubIcon className="size-4" />
            </a>
          )}
          {hasUrl && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.title}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
