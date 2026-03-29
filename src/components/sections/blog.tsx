import { BLOG_POSTS } from "@/data/resume";
import { BlurIn, FadeUp } from "@/components/motion-wrapper";

export function Blog() {
  return (
    <section id="blog" className="py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <BlurIn>
          <h2 className="text-3xl font-bold tracking-tight leading-tight">
            Writing
          </h2>
        </BlurIn>

        <FadeUp delay={0.1}>
          <div className="relative mt-8">
            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 opacity-30 blur-[6px] pointer-events-none select-none"
              aria-hidden="true"
            >
              {BLOG_POSTS.map((post) => (
                <div
                  key={post.slug}
                  className="bg-card border border-border rounded-lg p-6 h-full"
                >
                  <h3 className="text-base font-semibold leading-snug">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground font-mono">
                    <span>{"eta" in post ? post.eta : "Draft"}</span>
                    <span>&middot;</span>
                    <span>5 min read</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-mono text-muted-foreground bg-background/80 backdrop-blur-sm px-4 py-2 rounded-lg border border-border">
                Posts in progress
              </span>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
