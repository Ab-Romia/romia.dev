import { SKILLS } from "@/data/resume";
import { BlurIn, StaggerContainer, StaggerItemScale } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";

const categories = Object.entries(SKILLS);

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
            <StaggerItemScale key={category}>
              <div
                className={cn(
                  "border border-border rounded-lg p-6 h-full",
                  i === 0 ? "glass-card sm:col-span-2" : "bg-card"
                )}
              >
                <h3 className="text-sm font-mono text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent" />
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full hover:text-foreground hover:bg-muted/80 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItemScale>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
