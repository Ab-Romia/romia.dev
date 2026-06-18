"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/data/resume";
import {
  BlurIn,
  FadeUp,
} from "@/components/motion-wrapper";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { GitHubIcon } from "@/components/social-icons";
import { Connect4Wrapper } from "@/components/connect4-wrapper";
import { SudokuWrapper } from "@/components/sudoku-wrapper";

export const statusColors: Record<string, string> = {
  Production: "bg-green-500/15 text-green-700 dark:text-green-400 border-green-500/30",
  Demo: "bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/30",
  Ongoing: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/30",
  Deployed: "bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/30",
};

const categories = ["All", "AI/ML", "Backend", "Full-Stack", "Games/Puzzles"] as const;

export function Projects() {
  const [filter, setFilter] = useState<string>("All");

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter as never));
  const featured = filtered.filter((p) => p.featured);
  const others = filtered.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <BlurIn>
          <h2 className="text-3xl font-bold tracking-tight leading-tight">
            Projects
          </h2>
        </BlurIn>

        {/* Category filters */}
        <FadeUp delay={0.05}>
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={cn(
                  "text-xs font-mono px-3 py-1.5 rounded-full border transition-all duration-200",
                  filter === cat
                    ? "bg-accent text-accent-foreground border-accent"
                    : "text-muted-foreground border-border hover:border-accent/30 hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="sr-only">
            {filtered.length} {filtered.length === 1 ? "project" : "projects"}
          </p>
        </FadeUp>

        {/* Projects grid */}
        <div className="mt-6 space-y-6">
          {featured.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {featured.map((project) => (
                <ProjectCard key={project.slug} project={project} featured />
              ))}
            </div>
          )}

          {others.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {others.map((project) => (
                <ProjectCard key={project.slug} project={project} compact />
              ))}
            </div>
          )}
        </div>

        {filtered.length === 0 && (
          <p className="text-muted-foreground text-sm mt-8">No projects in this category.</p>
        )}

        {/* Playable demos appear only when the Games/Puzzles filter is chosen */}
        {filter === "Games/Puzzles" && (
          <div className="mt-12 space-y-12">
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect 4 vs the AI</h3>
              <Connect4Wrapper />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Sudoku solver</h3>
              <SudokuWrapper />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  compact = false,
  featured = false,
}: {
  project: (typeof PROJECTS)[number];
  compact?: boolean;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative border rounded-lg h-full overflow-hidden bg-card border-border transition-colors duration-200 hover:border-accent/40",
        compact ? "p-4" : "p-6"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className={cn("font-semibold", compact ? "text-sm" : "text-lg")}>
          <Link
            href={`/projects/${project.slug}`}
            className="hover:text-accent transition-colors inline-flex items-center gap-1"
          >
            {project.title}
            <ArrowUpRight className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          {project.badge && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-accent border border-accent/30 px-1.5 py-0.5 rounded">
              {project.badge}
            </span>
          )}
          <span
            className={cn(
              "text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border inline-flex items-center gap-1",
              statusColors[project.status]
            )}
          >
            {project.status === "Production" && (
              <span className="size-1.5 rounded-full bg-green-500 dark:bg-green-400 animate-pulse" />
            )}
            {project.status}
          </span>
        </div>
      </div>

      <p className={cn("text-muted-foreground leading-relaxed mt-2", compact ? "text-xs" : "text-sm")}>
        {project.description}
      </p>

      {project.impact && featured && (
        <p className="text-sm text-accent font-mono mt-3 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent shrink-0" />
          {project.impact}
        </p>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, compact ? 3 : undefined).map((tag) => (
            <span key={tag} className="text-xs font-mono bg-muted text-muted-foreground px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          {project.blog && (
            <Link href={project.blog}
              aria-label={`Read the write-up for ${project.title}`}
              className="text-xs font-mono text-accent hover:text-accent-muted transition-colors inline-flex items-center gap-1">
              <BookOpen className="size-3.5" />
              Blog
            </Link>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="text-xs font-mono text-accent hover:text-accent-muted transition-colors">
              Demo
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              aria-label={`${project.title} source on GitHub`}
              className="p-1.5 -m-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <GitHubIcon className="size-4" />
            </a>
          )}
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              aria-label={`Visit ${project.title}`}
              className="p-1.5 -m-1.5 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
      </div>

      <Link
        href={`/projects/${project.slug}`}
        className="text-xs font-mono text-accent hover:text-accent-muted transition-colors mt-3 inline-flex items-center gap-1"
      >
        View Case Study <ArrowUpRight className="size-3" />
      </Link>
    </div>
  );
}
