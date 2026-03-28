import { PROJECTS } from "@/data/resume";
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper";

export function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight leading-tight">
          Featured Projects
        </h2>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">
          {PROJECTS.map((project) => (
            <StaggerItem key={project.title}>
              <div className="group bg-card border border-border rounded-lg p-6 h-full transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono bg-muted text-muted-foreground px-2 py-1 rounded"
                    >
                      {tag}
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
