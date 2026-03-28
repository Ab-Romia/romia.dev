import { BLOG_POSTS } from "@/data/resume";
import { BlurIn, StaggerContainer, StaggerItemScale } from "@/components/motion-wrapper";

export function Blog() {
  return (
    <section id="blog" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <BlurIn>
          <h2 className="text-3xl font-bold tracking-tight leading-tight">
            Writing
          </h2>
        </BlurIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-8">
          {BLOG_POSTS.map((post) => (
            <StaggerItemScale key={post.slug}>
              <div className="relative bg-card border border-border rounded-lg p-6 h-full">
                {/* Corner ribbon */}
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-mono text-accent border border-accent/30 bg-accent/5 px-2 py-0.5 rounded-full">
                    {"eta" in post ? post.eta : "Coming Soon"}
                  </span>
                </div>
                <h3 className="text-base font-semibold leading-snug pr-16">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground font-mono">
                  <span>Draft</span>
                  <span>&middot;</span>
                  <span>Coming Soon</span>
                </div>
              </div>
            </StaggerItemScale>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
