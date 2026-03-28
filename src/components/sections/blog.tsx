import { BLOG_POSTS } from "@/data/resume";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";

export function Blog() {
  return (
    <section id="blog" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight leading-tight">
          Writing
        </h2>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mt-8">
          {BLOG_POSTS.map((post) => (
            <StaggerItem key={post.slug}>
              <div className="relative bg-card border border-border rounded-lg p-6 h-full overflow-hidden">
                <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
                  <span className="text-sm font-mono text-accent border border-accent/30 bg-accent/5 px-3 py-1.5 rounded-full">
                    Coming Soon
                  </span>
                </div>
                <h3 className="text-base font-semibold leading-snug">
                  {post.title}
                </h3>
                <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground font-mono">
                  <span>Draft</span>
                  <span>&middot;</span>
                  <span>5 min read</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
