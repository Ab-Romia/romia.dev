# The definitive blueprint for Romia's AI engineer portfolio

**romia.dev should be a dark-first, multi-page Next.js portfolio combining Apple-like minimalism with a subtle hacker aesthetic, built on the Geist + Tailwind + shadcn/ui stack, featuring interactive AI demos powered by Vercel AI SDK and Transformers.js.** This blueprint synthesizes design research, technical implementation specifics, content strategy, and visual specifications into a production-ready plan. The recommendations draw from award-winning portfolios, FAANG recruiter insights, and the latest tooling ecosystem as of early 2026. Every specification below — hex codes, font names, library versions, spacing values — is actionable and ready to implement.

---

## 1. Real portfolio examples worth studying

The strongest dark minimalist developer portfolios share a common DNA: bold typography as the primary visual element, one accent color maximum, scroll-triggered content reveals, and ruthless content hierarchy. Here are the most instructive examples for Romia's use case:

**Tier 1 — Study closely:**
- **Brittany Chiang** (brittanychiang.com) — The gold standard for dark developer portfolios. Dark navy `#0a192f` background with teal accent `#64ffda`, sticky sidebar navigation, monospace accents. Won a One Page Website Award. Her project descriptions strike the perfect balance between brevity and technical depth.
- **Lee Robinson** (leerob.io) — VP of Developer Experience at Vercel. Built with Next.js + Tailwind. Ultra-minimal dark design, blog-first approach, fast performance. The site itself is a portfolio piece demonstrating Next.js mastery.
- **Dennis Snellenberg** (dennissnellenberg.com) — Frequently cited as one of the best dark developer portfolios. GSAP-powered scroll animations, large display typography, project hover previews.
- **Mitchell Sparrow** (mitchellsparrow.com) — An actual ML engineer portfolio built with Next.js, TypeScript, Framer Motion, and Tailwind. Shows how to present ML projects with technical depth on a dark canvas.

**Tier 2 — Borrow specific elements:**
- **Hisami Kurita** (hsmkrt1996.com) — Awwwards Site of the Day + CSS Design Awards winner. Dark background with bold typographic hero and animated shapes using Three.js + GSAP. Proof that dark minimalism + typography + micro-interactions is an award-winning formula.
- **Tamal Sen** (tamalsen.dev) — IDE-inspired dark aesthetic with code snippets as visual texture. Perfect for signaling AI/ML technical credibility.
- **Sarah Dayan** (sarahdayan.dev) — Staff Engineer at Algolia. Establishes authority through open-source contributions and technical writing alongside projects.

**Award-winning references:** Awwwards and CSS Design Awards consistently reward portfolios that combine oversized display fonts (**72–120px**), subtle micro-interactions, and minimal color palettes. The Darkfolio Framer template and Valentina Pastushenko's minimalistic portfolio (Awwwards Honorable Mention) both demonstrate the exact aesthetic Romia should target.

---

## 2. Recommended tech stack and architecture

The dominant stack among top developer portfolios in 2025–2026 is Next.js App Router + Tailwind CSS + shadcn/ui + Motion (Framer Motion). This stack itself becomes a portfolio piece — it signals modern engineering judgment.

### Core stack

| Layer | Technology | Notes |
|-------|-----------|-------|
| Framework | **Next.js 15+** (App Router) | React Server Components by default |
| Styling | **Tailwind CSS v4** | CSS variables for theming via `@theme inline` |
| UI Components | **shadcn/ui** | Copy-paste component library, OKLCH color tokens |
| Animations | **Motion 12.x** (formerly Framer Motion) | Import from `motion/react` |
| Smooth Scroll | **Lenis** | Optional, ~5KB gzipped, for premium feel |
| MDX Blog | **Velite** or **Content Collections** | Contentlayer is abandoned — do NOT use it |
| Dark Theme | **next-themes** | With Tailwind `class` strategy |
| Fonts | **next/font** (Geist Sans + Geist Mono) | Self-hosted, zero CLS |
| Syntax Highlighting | **rehype-pretty-code** + **Shiki** | Server-rendered, no client JS |
| Deployment | **Vercel** (free Hobby tier) | Zero-config for Next.js |

### Starter templates to fork

The best starting point is **dillionverma/portfolio** on GitHub (~1,300+ stars) — a minimalist dark template using Next.js 14, Tailwind, shadcn/ui, and Magic UI with an object-driven data structure. An alternative is **namanbarkiya/minimal-next-portfolio** (Next.js 16, React 19, 100% Lighthouse score, 7 built-in themes including dark).

### Animation implementation

**Motion (Framer Motion)** handles **90%** of portfolio animation needs at ~16KB gzipped. The essential patterns:

- **Scroll-triggered fade-up reveals** — the single most common portfolio animation pattern. Use `whileInView` with `opacity: 0 → 1` and `y: 20 → 0`, duration 0.5s, `viewport={{ once: true }}`.
- **Staggered project card reveals** — `staggerChildren: 0.1` in container variants.
- **Subtle card hover** — `whileHover={{ scale: 1.02, y: -4 }}` with spring physics.
- **Page transitions** — `AnimatePresence` with 200ms opacity crossfade + slight vertical shift.
- **Performance rule:** Only animate `transform` and `opacity` for 60fps. Use `LazyMotion` with `domAnimation` features to tree-shake unused code.

**Avoid:** Matrix rain effects, heavy Three.js 3D elements in the hero (kills mobile performance and LCP), custom cursor effects (accessibility nightmare), auto-playing text carousels, 3D tilt cards everywhere, and any animation that delays first contentful paint past 2.5 seconds.

**GSAP** is needed only if you want complex scroll-pinning timelines or SVG morphing — most portfolios don't need it. **Lenis** adds a polished smooth-scroll feel for about 5KB.

### Performance targets

Target **95+ Lighthouse scores** across all four categories. Key strategies:

- Use **Static Site Generation** (SSG) for all portfolio and blog pages — massive speed gain since content is pre-rendered at build time.
- React Server Components by default; add `"use client"` only for interactive components (theme toggle, animations, demos).
- **next/font** for zero-CLS font loading: self-hosts fonts automatically, subsets unused glyphs (**60% smaller**).
- **next/image** with `priority` only on 1–2 above-fold images, `sizes` prop for responsive serving, WebP/AVIF auto-conversion, and `placeholder="blur"` for visual stability.
- Lazy-load everything below the fold with `next/dynamic` for heavy components like 3D elements or demo embeds.
- Analyze bundles with `@next/bundle-analyzer` and keep dependencies minimal.

### MDX blog setup

**Velite** is the recommended Contentlayer replacement — active development, Zod-based schema validation, and seamless MDX compilation. Define collections in `velite.config.ts` with typed schemas for blog posts (title, slug, date, description, tags, body). Essential MDX plugins: `rehype-pretty-code` for syntax highlighting, `rehype-slug` + `rehype-autolink-headings` for linkable headings, `remark-gfm` for GitHub Flavored Markdown, and `@tailwindcss/typography` with `prose dark:prose-invert` for beautiful dark-mode prose styling.

### SEO implementation

Next.js Metadata API provides everything needed. Set `metadataBase: new URL("https://romia.dev")` in root layout (critical for OG images). Use template titles (`"%s | Romia"`), generate dynamic metadata for blog posts with `generateMetadata()`, create `app/sitemap.ts` and `app/robots.ts` using Next.js's built-in types, and add JSON-LD structured data (`Person` schema on homepage, `Article` schema on blog posts).

### Dark theme architecture

Use **next-themes** with `attribute="class"`, `defaultTheme="dark"`, and `enableSystem={true}`. The library injects a blocking `<script>` before React hydration that reads `localStorage` and sets the theme class immediately — this **prevents flash of wrong theme** (FOUC). Add `suppressHydrationWarning` to the `<html>` tag. Use `resolvedTheme` (not `theme`) in your toggle component, and render a placeholder until `mounted` is `true` to prevent hydration mismatches.

### Deployment

**Vercel** is the clear winner for a Next.js portfolio: first-class support (built by the same team), zero-config deployment, preview deployments for every PR, built-in analytics, and a free Hobby tier with **100GB bandwidth**. Custom domain setup: add `romia.dev` in Vercel project settings, then point DNS with an A record to `76.76.21.21` or CNAME to `cname.vercel-dns.com`. SSL is automatic.

---

## 3. Visual design specifications

### Color palette (recommended: "Vercel Noir" with cyan accent)

This palette combines the corporate professionalism of Vercel's design system with an AI-signaling cyan accent. All values meet **WCAG AAA** contrast standards.

| Token | Hex | Usage |
|-------|-----|-------|
| `--background` | `#09090B` | Primary page background |
| `--card` | `#111113` | Card and section backgrounds |
| `--muted` | `#18181B` | Elevated surfaces, code blocks |
| `--border` | `#27272A` | Borders and dividers |
| `--foreground` | `#FAFAFA` | Primary text (**18:1** contrast ratio) |
| `--muted-foreground` | `#A1A1AA` | Secondary text (**7.5:1** contrast) |
| `--accent` | `#00D4FF` | Primary accent — cyan (**10:1** contrast) |
| `--accent-muted` | `#0EA5E9` | Hover/secondary accent |
| `--ring` | `#3F3F46` | Focus rings |

**Alternative palette — "Tokyo Night"** for a warmer, more developer-recognizable aesthetic: background `#1A1B26`, cards `#1F2335`, text `#C0CAF5` (blue-tinted white), with purple accent `#BB9AF7` and cyan secondary `#7DCFFF`.

Use the **shadcn/ui token naming convention** (the industry standard used by OpenAI, Sonos, Adobe) and expose tokens to Tailwind v4 via `@theme inline`.

### Typography

**Primary recommendation: Geist Sans + Geist Mono** — the Vercel pairing, default in Next.js 15+. Geometric Swiss-inspired sans-serif with a purpose-built monospace companion. Free, open source, variable font, optimized for Next.js via `next/font`.

**Alternative pairing: Space Grotesk + JetBrains Mono** — Space Grotesk retains monospace quirks but is optimized for readability, described as "ideal for AI tools, Web3 apps." JetBrains Mono offers programming ligatures excellent for code blocks.

**Type scale:** Hero headline at `text-5xl md:text-7xl` (48–72px), section headings at `text-3xl` (30px), body at `text-base` (16px). Dark backgrounds require slightly more generous spacing: body `line-height: 1.7` (`leading-relaxed`), headings `line-height: 1.1–1.2` (`leading-tight`), heading letter-spacing `tracking-tight` (-0.025em).

### Layout system

- **Container:** `max-w-5xl` (1024px) centered with `mx-auto px-6 lg:px-8` — matches the focused content width used by Vercel's blog and Linear's docs.
- **Section padding:** `py-16` (64px) on mobile, `py-24` (96px) on desktop, `py-32` (128px) for the hero.
- **Card padding:** `p-6` (24px) or `p-8` (32px). Card gaps: `gap-4` mobile, `gap-6` desktop.
- **Breakpoints:** Tailwind defaults — `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`.

### Hero section design

The hero should load in **under 1.5 seconds** and communicate identity in **under 3 seconds**. Recommended structure:

```
py-32 md:py-48
├── <p class="text-accent font-mono text-sm">AI Engineer</p>
├── <h1 class="text-5xl md:text-7xl font-bold tracking-tight mt-4">Romia.</h1>
├── <p class="text-xl text-muted-foreground mt-6 max-w-xl leading-relaxed">
│     Building intelligent systems — from multi-agent architectures to production ML pipelines.
│   </p>
├── <div class="flex gap-4 mt-8">
│     [Download Resume] (primary button)  [View Projects →] (ghost button)
│   </div>
└── Background: CSS gradient mesh (zero JS, performant)
```

For the background visual, use a **CSS gradient mesh** — two radial gradients with very low opacity accent colors creating a subtle, sophisticated glow:
```css
background: radial-gradient(ellipse at 20% 50%, rgba(0, 212, 255, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 20%, rgba(187, 154, 247, 0.06) 0%, transparent 50%);
```

Optionally overlay a subtle **dot grid pattern** for the "Linear" aesthetic: `background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 24px 24px;`

### Code and terminal styling

Use the **Tokyo Night** syntax theme (`#1A1B26` background) via Shiki/rehype-pretty-code — server-rendered at build time, no client JavaScript. Add a macOS-style terminal header with colored dots (`#FF5F56`, `#FFBD2E`, `#27C93F`) above code blocks. Apply `rounded-lg border border-border/50` with an optional subtle cyan glow: `box-shadow: 0 0 30px -10px rgba(0, 212, 255, 0.1)`.

### Micro-interactions

**Card hover:** `transition-all duration-300 ease-out` + `hover:-translate-y-1 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5`. **Link underline animation:** pseudo-element that expands width from 0 to 100% on hover. **Scroll progress indicator:** thin bar at top using Motion's `useScroll` + `scaleX`. Always respect `prefers-reduced-motion` with a CSS media query that reduces all animation durations to 0.01ms.

### Light/dark toggle

**Dark-first, but support light mode.** Default to dark (it's the brand), but respect `prefers-color-scheme` — some users physically need light mode, and it costs almost nothing with CSS variables. Place a small sun/moon icon toggle (Lucide icons) in the header navigation, right side. Make it unobtrusive — don't draw attention to a utility function.

---

## 4. Interactive demo integration strategies

This is where Romia's portfolio can genuinely differentiate itself from every other AI engineer's site. The strategy: **use the right demo technology for each project type**, balancing impressiveness with cost and complexity.

### Demo technology matrix for Romia's projects

| Project | Demo Type | Tool | Cost |
|---------|-----------|------|------|
| **Zaylon AI** (LangGraph multi-agent) | Animated architecture diagram + video walkthrough | **React Flow** for interactive node graph + Loom recording | $0 |
| **ContextIQ RAG System** | Live chatbot demo | **Vercel AI SDK** with rate-limited API route → GPT-4o-mini | ~$1–3/mo |
| **Multimodal Emotion Recognition** | In-browser model | **Transformers.js** with quantized model (zero API cost) | $0 |
| **AI Collaborative Workspace** | Video walkthrough + architecture diagram | Loom/OBS recording + Mermaid diagram | $0 |
| **Connect4 AI Agent** | Playable game in browser | Custom React component, minimax runs client-side | $0 |
| **VoicePrint AI Text Humanizer** | Live text transformation demo | Simple API route or client-side processing | ~$0–1/mo |

### Vercel AI SDK for chat demos

The **Vercel AI SDK** (`github.com/vercel/ai`) is the ideal choice for Romia's Next.js chat interfaces. It provides native Next.js integration with streaming support, a unified API across OpenAI/Anthropic/Google providers, and the `useChat` hook for instant chat UIs. The official `vercel/chatbot` template on GitHub is a full-featured, hackable starting point. For the RAG demo, create an API route at `/api/chat` that calls a backend with your RAG pipeline, rate-limited to **10 requests per hour per IP** using `@upstash/ratelimit` with Redis.

### Transformers.js for in-browser demos

**Transformers.js v3** by Hugging Face runs ONNX models directly in the browser with **WebGPU acceleration** (Chrome 113+). This is the most impressive demo approach because it works with **zero API costs, zero latency** after initial model download, and complete privacy. For Romia's emotion recognition project, deploy a quantized sentiment/emotion classifier: `pipeline("sentiment-analysis", "Xenova/distilbert-base-uncased-finetuned-sst-2-english", { dtype: "q4" })`. Users type text, get instant emotion predictions — entirely client-side.

### Showcasing LangGraph multi-agent systems

For the Zaylon AI project, the most effective approach combines three elements:

1. **React Flow** (reactflow.dev) for an interactive node-based diagram where each node represents an agent and edges show data flow. Users can click nodes to see agent descriptions, tools, and example outputs. This runs entirely client-side and is the single most impressive way to visualize multi-agent architectures.

2. **Pre-recorded agent traces** — Record a full LangGraph execution trace as JSON, then replay it step-by-step in the React Flow diagram with animated edge highlights. This shows the multi-agent system "thinking" without any API costs during viewing.

3. **Short video walkthrough** — A 60–90 second Loom recording showing the actual system processing a real customer interaction, narrated by Romia.

### Cost management

For live API-backed demos, monthly costs with **100 visitors doing 3 chat turns each** are approximately **$0.50–$2** with GPT-4o or **$0.02–$0.05** with GPT-4o-mini. Set **hard spending caps** in the OpenAI dashboard at $10–20/month. Implement per-session token limits (2,000 tokens max per conversation) in your API routes. For zero-cost alternatives: HuggingFace Spaces free CPU tier for Gradio apps, Transformers.js for in-browser models, and Google Gemini API's generous free tier for Gemini Flash models.

### Project case study page template

Each project page at `/projects/[slug]` should follow this structure: hero section with title + tech badges + "Try Demo" and "View Code" buttons → problem statement (why it matters) → approach and architecture (interactive React Flow or Mermaid diagram) → implementation highlights (code snippets with syntax highlighting) → results and metrics (charts, before/after comparisons) → interactive demo embed → GitHub link. **Critical insight from FAANG recruiters:** "A project shows what you did. A case study shows what you learned." Include key design decisions and tradeoffs — this separates senior from junior thinking.

---

## 5. Content strategy for big tech applications

### Writing project descriptions that resonate

FAANG hiring managers scan portfolios in **~30 seconds**. Lead every project with the **business problem, not the technology**. Write "Automated document analysis reducing manual review time by 80%" — not "Built a RAG system with ChromaDB and GPT-4." Then layer in technical architecture, your specific individual contribution, key design decisions and tradeoffs, and quantified impact metrics.

Every project needs at least **2–3 specific metrics**. For Romia's projects:
- Zaylon AI: "Multi-agent conversational commerce system processing X customer interactions daily across MENA markets" + latency and accuracy numbers
- ContextIQ RAG: "Document QA system achieving X% retrieval accuracy on Y-page documents at $Z per query"
- Emotion Recognition: "X% accuracy across Y emotion classes combining audio, visual, and text modalities"

### Framing startup experience without triggering "founder flight risk"

Research from a **Yale/HBR study** found former startup founders are **43% less likely** to receive interview callbacks. Recruiters worry about flight risk and inability to take direction.

**Title strategy:** Use **"AI Engineer at Zaylon AI (Co-Founded)"** — engineer identity first, founder as a qualifier showing leadership capacity. On the portfolio, frame all Zaylon content around technical architecture decisions, production system complexity, and individual engineering contributions. Emphasize "Designed and implemented multi-agent LangGraph architecture serving conversational commerce" rather than "Founded a startup." Avoid business metrics like revenue, fundraising, or customer acquisition. Include subtle language signaling long-term commitment: "I'm passionate about building AI systems at scale."

### About section framework (~150–200 words + photo)

Open with a positioning statement tying AI/ML + backend expertise. Follow with technical identity (what problems excite you), proof points with numbers, the human element (languages, personality), and a clear CTA. Frame multilingual ability as a cross-cultural collaboration asset — "I collaborate across cultures and time zones" resonates at global companies far more than a plain language list. **Professional photo:** high-quality headshot, clean background, professional but approachable (no suit needed for tech), consistent across portfolio/LinkedIn/GitHub.

### Blog as a differentiator

A blog is **not required** for FAANG applications but is a **significant differentiator**. An engineer at Amazon credited his Medium posts as a factor; engineers who shared technical breakdowns "often landed offers before they applied." Start with **3–5 posts** on topics where Romia has unique expertise: multi-agent system architecture patterns, RAG optimization strategies, LangGraph production patterns, Arabic NLP challenges, and RLHF insights (without violating NDAs). Each post should be 1,000–2,000 words with code snippets and architecture diagrams.

### Certifications and education

**FAANG companies don't hire based on certifications**, but Romia's certs are strategically valuable because they're from his target companies — Google AI Agents, Meta Back-end Developer, AWS Cloud & ML. Present them as **compact logo badges** (Google, Meta, AWS, Anthropic logos) in the About section, not as a dedicated page. Include GPA (**3.73 is strong** and worth showing). Format: "B.Sc. Computer & Communications Engineering (AI Focus) — Alexandria University — 3.73 GPA — Expected July 2026."

### Priority project selection

From Romia's project list, lead with these five in this order:

1. **Zaylon AI** — Most impressive. Production multi-agent system, startup scale, real users.
2. **AI Collaborative Workspace** — Full-stack graduation project, FastAPI + RAG integration.
3. **ContextIQ RAG System** — Hot topic, demonstrates retrieval architecture expertise.
4. **Scale AI / Turing RLHF work** — Frontier AI experience working on Claude Code training.
5. **Virtual Banking Microservices** — Shows backend systems thinking for SWE roles.

---

## 6. Page structure and navigation

### Route architecture

Use a **multi-page structure with a single-page "feel" for the homepage** — this serves both quick-scanning recruiters and deep-diving engineers, while providing SEO benefits (each project page ranks independently).

```
/                    → Home (hero + highlights + skills + CTA)
/projects            → Project grid with category filters
/projects/[slug]     → Individual project case study
/blog                → Blog listing with tags
/blog/[slug]         → Individual blog post
/about               → About + education + certs + languages
/contact             → Contact form + calendar + social links
```

### Homepage sections (top to bottom)

1. **Hero** — Name, "AI Engineer" label, one-line tagline, "Download Resume" + "View Projects" CTAs, gradient mesh background
2. **Featured projects** (3–4 cards) — Title, one-line description, tech tags, thumbnail → link to `/projects/[slug]`
3. **Skills/tech stack** — Visual grid grouped by category (AI/ML, Backend, Cloud/DevOps, Languages)
4. **Brief about** — 2–3 sentences + "Read More →" link to `/about`
5. **Latest blog posts** (2–3 cards) — Title, date, reading time → link to `/blog/[slug]`
6. **CTA section** — "Open to AI/ML and Software Engineer opportunities" + contact link
7. **Footer** — Social links, nav links, email, copyright

### Navigation design

**Fixed/sticky header** on all pages: `Logo/Name | Projects | Blog | About | Contact | [Resume ↓]`. Keep to **5–6 items maximum**. The Resume download should be a **visually distinct accent-colored button**, not a text link — it's the single most important CTA for recruiter engagement. On mobile, use a hamburger menu with smooth slide-in animation. The header should hide on scroll down and reappear on scroll up.

### Recruiter engagement CTAs

Place contact touchpoints at **multiple strategic locations:**
- **Header:** Resume download button (always visible) + LinkedIn icon
- **Hero:** "Download Resume" primary CTA
- **Every project page footer:** "Interested in discussing this? Let's talk →"
- **Contact page:** Simple form (Name, Email, Message) + `hello@romia.dev` + Cal.com booking link for "Schedule a Chat" + all social links
- **Footer (every page):** LinkedIn, GitHub, Twitter/X, email icons

Use the language "Open to AI/ML and Software Engineer opportunities" and "Let's build something together" — avoid "Hire Me" (too aggressive for big tech targeting).

### Mobile priorities

Mobile responsiveness is **non-negotiable** — 66% of web traffic is mobile and recruiters frequently review portfolios on phones. Priorities: hero must be impactful on small screens, project cards stack vertically with clear thumbnails, all touch targets minimum **44×44px**, code snippets need horizontal scroll containers, contact form must be thumb-friendly. Test on real devices, not just browser devtools.

### Loading and first impression

The hero should render in **under 1.5 seconds**. No loading screens, splash pages, or elaborate entrance animations — recruiters have approximately **10 seconds** of attention. Use skeleton loading states (`animate-pulse` placeholders) for project cards loading below the fold. Leverage Next.js static generation so pages are served from CDN with near-instant TTFB.

## Conclusion

The strongest AI engineer portfolios in 2026 don't just list projects — they demonstrate engineering judgment through their very construction. Romia's portfolio at romia.dev should be built as a **production-grade Next.js application** that itself serves as proof of technical capability: server-rendered for performance, properly themed with design tokens, accessible, SEO-optimized, and featuring interactive demos that no other candidate's portfolio will match.

The three highest-impact differentiators for Romia specifically are: **interactive AI demos** (a live RAG chatbot via Vercel AI SDK + an in-browser emotion classifier via Transformers.js), **React Flow visualizations** of the LangGraph multi-agent architecture at Zaylon AI, and **business-first project case studies** with quantified metrics and architecture diagrams. Combined with the dark minimalist visual identity built on the Geist + shadcn/ui + cyan accent system, this portfolio will stand apart in a recruiter's inbox. The total monthly cost for running live demos should stay under **$5** with proper rate limiting and model selection — a negligible investment for the career impact of a portfolio that actually demonstrates what most candidates only describe.