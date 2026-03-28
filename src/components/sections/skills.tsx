import { SKILLS } from "@/data/resume";
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper";

export function Skills() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight leading-tight">
          Tech Stack
        </h2>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mt-8">
          {Object.entries(SKILLS).map(([category, skills]) => (
            <StaggerItem key={category}>
              <div className="bg-card border border-border rounded-lg p-6 h-full">
                <h3 className="text-sm font-mono text-accent uppercase tracking-wider mb-4">
                  {category}
                </h3>
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
