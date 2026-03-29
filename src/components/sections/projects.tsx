"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/data/resume";
import {
  BlurIn,
  FadeUp,
} from "@/components/motion-wrapper";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTilt } from "@/hooks/use-tilt";
import { useMouseGlow } from "@/hooks/use-mouse-glow";
import { Connect4Wrapper } from "@/components/connect4-wrapper";
import { SudokuWrapper } from "@/components/sudoku-wrapper";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

export const statusColors: Record<string, string> = {
  Production: "bg-green-500/10 text-green-400 border-green-500/20",
  Demo: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Ongoing: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Deployed: "bg-purple-500/10 text-purple-400 border-purple-500/20",
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
        </FadeUp>

        {/* Projects grid - key forces remount on filter change */}
        <div key={filter} className="mt-8 space-y-6">
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

        {/* Inline demos for Games/Puzzles */}
        {filter === "Games/Puzzles" && (
          <div key="demos" className="mt-12 space-y-12">
            <div>
              <h3 className="text-lg font-semibold mb-4">Play Connect4 vs AI</h3>
              <Connect4Wrapper />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Solve a Sudoku Puzzle</h3>
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
  const tilt = useTilt(featured ? 4 : 0);
  const glow = useMouseGlow();

  const cardHandlers = featured
    ? {
        onMouseMove: (e: React.MouseEvent) => {
          tilt.handlers.onMouseMove(e);
          glow.handlers.onMouseMove(e);
        },
        onMouseLeave: () => {
          tilt.handlers.onMouseLeave();
          glow.handlers.onMouseLeave();
        },
        onMouseEnter: glow.handlers.onMouseEnter,
      }
    : undefined;

  return (
    <div
      ref={featured ? tilt.ref : undefined}
      style={featured ? tilt.style : undefined}
      {...cardHandlers}
      className={cn(
        "group relative border rounded-lg h-full overflow-hidden transition-colors duration-300",
        featured
          ? "glass-card hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          : "bg-card border-border hover:border-accent/30 hover-glow",
        compact ? "p-4" : "p-6"
      )}
    >
      {featured && glow.glowStyle && (
        <div className="absolute inset-0 -z-10 pointer-events-none" style={glow.glowStyle} />
      )}

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
              <span className="size-1.5 rounded-full bg-green-400 animate-pulse" />
            )}
            {project.status}
          </span>
        </div>
      </div>

      <p className={cn("text-muted-foreground leading-relaxed mt-2", compact ? "text-xs" : "text-sm")}>
        {project.description}
      </p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, compact ? 3 : undefined).map((tag) => (
            <span key={tag} className="text-xs font-mono bg-muted text-muted-foreground px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="text-xs font-mono text-accent hover:text-accent-muted transition-colors">
              Demo
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors">
              <GitHubIcon className="size-4" />
            </a>
          )}
          {project.url && (
            <a href={project.url} target="_blank" rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors">
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
