"use client";

import { SKILLS } from "@/data/resume";
import { BlurIn, StaggerContainer, StaggerItemScale, m, MotionProvider } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";
import { useTilt } from "@/hooks/use-tilt";

const categories = Object.entries(SKILLS);

function SkillCard({
  category,
  skills,
  isFirst,
}: {
  category: string;
  skills: readonly string[];
  isFirst: boolean;
}) {
  const { ref, style, handlers } = useTilt(3);

  return (
    <StaggerItemScale>
      <div
        ref={ref}
        style={style}
        {...handlers}
        className={cn(
          "border border-border rounded-lg p-6 h-full",
          isFirst ? "glass-card border-border" : "bg-card hover-glow"
        )}
      >
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
          <MotionProvider>
            {skills.map((skill) => (
              <m.span
                key={skill}
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full hover:text-foreground hover:bg-muted/80 transition-colors cursor-default"
              >
                {skill}
              </m.span>
            ))}
          </MotionProvider>
        </div>
      </div>
    </StaggerItemScale>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <BlurIn>
          <h2 className="text-3xl font-bold tracking-tight leading-tight">
            Tech Stack
          </h2>
        </BlurIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8">
          {categories.map(([category, skills], i) => (
            <div key={category} className={i === 0 ? "sm:col-span-2" : ""}>
              <SkillCard category={category} skills={skills} isFirst={i === 0} />
            </div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
