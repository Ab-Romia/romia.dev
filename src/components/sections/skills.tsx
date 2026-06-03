"use client";

import { SKILLS } from "@/data/resume";
import { BlurIn, StaggerContainer, StaggerItemScale } from "@/components/motion-wrapper";

const categories = Object.entries(SKILLS);

function SkillCard({
  category,
  skills,
}: {
  category: string;
  skills: readonly string[];
}) {
  return (
    <StaggerItemScale>
      <div className="border border-border rounded-lg p-6 h-full bg-card transition-colors duration-200 hover:border-accent/40">
        <h3 className="text-sm font-mono text-accent uppercase tracking-wider mb-1 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-accent" />
          {category}
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          {category === "AI / ML" && "Powers Zaylon AI, ContextIQ RAG, Emotion Recognition"}
          {category === "Backend" && "Powers Zaylon AI, Virtual Banking, ContextIQ RAG"}
          {category === "DevOps & Cloud" && "CI/CD and deployment across all projects"}
          {category === "Languages" && "Primary: Python, Java. Growing: Go, TypeScript"}
        </p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </StaggerItemScale>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <BlurIn>
          <h2 className="text-3xl font-bold tracking-tight leading-tight">
            Tech Stack
          </h2>
        </BlurIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8">
          {categories.map(([category, skills], i) => (
            <div key={category} className={i === 0 ? "sm:col-span-2" : ""}>
              <SkillCard category={category} skills={skills} />
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
