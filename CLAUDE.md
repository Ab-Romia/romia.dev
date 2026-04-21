# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# romia.dev

## Commands
- `npm run dev` : start Turbopack dev server on http://localhost:3000
- `npm run build` : production build (Turbopack)
- `npm run start` : serve the production build
- `npm run lint` : ESLint (flat config in `eslint.config.mjs`, extends `next/core-web-vitals` + `next/typescript`)
- No test framework is configured in this repo; do not invent test commands
- React Compiler is enabled (`reactCompiler: true` in `next.config.ts` + `babel-plugin-react-compiler`). Avoid manual `useMemo`/`useCallback` unless profiling shows a need; the compiler handles memoization.
- LaTeX CV: `pdflatex -interaction=nonstopmode abdelrahman_abouroumia_cv.tex && cp abdelrahman_abouroumia_cv.pdf public/resume.pdf`

## Owner
- **Full name:** Abdelrahman Abouroumia
- **Nickname:** Romia
- **GitHub:** Ab-Romia
- **Email:** aabouroumia@gmail.com
- **Portfolio:** https://romia.dev (deployed on Vercel, DNS on Vercel)
- **Goal:** Network and get into top high-tech companies (Google, Meta, Amazon, etc.)

## Rules
- All commits must be authored solely as `Ab-Romia <aabouroumia@gmail.com>` with no co-author lines
- No em-dashes anywhere in content; use commas, periods, semicolons, or colons instead
- No location references that restrict where Romia might be based (no "based in Alexandria", no "Alexandria, Egypt" in bio/header). Factual references to Alexandria University (education) and Egyptian Arabic (NLP feature) are fine
- No "gym" in bio
- Do NOT mention Vercel in footer or anywhere visible on the site
- Keep the site fast: no heavy dependencies, lazy-load demos, only animate transform + opacity

## Tech Stack
- **Framework:** Next.js 16.2.1 (App Router, Turbopack)
- **React:** 19.2.4
- **Styling:** Tailwind CSS v4 (no tailwind.config; uses `@theme inline` in globals.css)
- **UI Components:** shadcn/ui (new-york/base-nova style, `@base-ui/react`, not Radix)
- **Animations:** Motion 12.x (import from `motion/react`, use `LazyMotion` + `domAnimation`)
- **Theme:** next-themes with `attribute="class"`, `defaultTheme="dark"`, `enableSystem`
- **Fonts:** Geist Sans + Geist Mono via `next/font/google`
- **Analytics:** @vercel/analytics + @vercel/speed-insights
- **Path alias:** `@/*` maps to `./src/*`

## Project Structure
```
src/
  app/
    layout.tsx             Root layout, metadata, ThemeProvider, SpotlightBg, Analytics
    page.tsx               Homepage (all sections assembled), JSON-LD schemas
    globals.css            Theme tokens (@theme inline), keyframes, utilities
    not-found.tsx          Custom 404 page
    sitemap.ts             Dynamic sitemap including /projects/[slug]
    robots.ts              Robots.txt
    manifest.ts            PWA manifest
    icon.svg               Favicon (geometric R monogram, cyan gradient)
    opengraph-image.tsx    Dynamic OG image (1200x630, edge runtime)
    twitter-image.tsx      Dynamic Twitter card image (1200x675)
    projects/[slug]/
      page.tsx             Case study pages (generateStaticParams for all 8 projects)
  components/
    sections/              All homepage sections (hero, zaylon-showcase, projects, etc.)
    motion-wrapper.tsx     Animation primitives (FadeUp, BlurIn, TextReveal, CountUp, etc.)
    navbar.tsx             Sticky nav with scroll hide/show, active section, scroll progress bar
    theme-provider.tsx     next-themes wrapper
    theme-toggle.tsx       Sun/moon toggle
    spotlight-bg.tsx       Global mouse-following spotlight (disabled on touch)
    magnetic.tsx           Magnetic pull effect for buttons
    typing-effect.tsx      Typewriter text with blinking cursor
    scroll-to-top.tsx      Floating scroll-to-top button
    demo-embed.tsx         HuggingFace iframe embed with loading skeleton
    connect4-game.tsx      Playable Connect4 with minimax AI (depth 7, alpha-beta pruning)
    connect4-wrapper.tsx   Client wrapper for dynamic import
    sudoku-game.tsx        Playable Sudoku with CSP solver (MRV heuristic, AC-3, 4 difficulty levels)
    sudoku-wrapper.tsx     Client wrapper for dynamic import
    ui/button.tsx          shadcn button (base-ui, not Radix)
  data/
    resume.ts              ALL content: personal info, projects, experience, skills, etc.
  hooks/
    use-scroll-direction.ts  Scroll up/down detection for navbar
    use-active-section.ts    IntersectionObserver for nav highlighting
    use-mouse-glow.ts        Mouse-following radial gradient on cards
    use-tilt.ts              3D perspective tilt on hover
  lib/
    utils.ts               cn() helper (clsx + tailwind-merge)
```

## Content Architecture
**All text and data lives in `src/data/resume.ts`.** Section components pull from it.

Key exports:
- `PERSONAL` : name, displayName, title, email, tagline, social links
- `NAV_LINKS` : navigation items
- `ZAYLON_SHOWCASE` : Zaylon AI showcase data (highlights, features, tech stack)
- `PROJECTS: Project[]` : all 8 projects with slug, categories (array), caseStudy, links
- `EXPERIENCE` : work timeline entries
- `SKILLS` : tech stack grouped by category
- `EDUCATION`, `CERTIFICATIONS`, `COMPETITIONS`, `LANGUAGES_SPOKEN`, `ABOUT`, `BLOG_POSTS`
- `getProjectBySlug()`, `getAdjacentProjects()` : helpers for case study pages

## Projects
Each project has `categories: string[]` so it can appear in multiple filter tabs:
- Zaylon AI: AI/ML, Backend, Full-Stack
- AI Collaborative Workspace: AI/ML, Backend, Full-Stack
- ContextIQ RAG: AI/ML
- Virtual Banking: Backend, Full-Stack
- Emotion Recognition: AI/ML
- VoicePrint: AI/ML
- Connect4: Games/Puzzles
- Sudoku: Games/Puzzles

The Games/Puzzles filter shows playable demos (Connect4 + Sudoku) inline below the cards.

## Design System

### Colors (dark mode primary)
- `--background: #09090B` | `--foreground: #FAFAFA`
- `--card: #111113` | `--muted: #18181B`
- `--accent: #00D4FF` (cyan) | `--accent-muted: #0EA5E9`
- `--border: #27272A` | `--ring: #3F3F46`

### Typography
- Hero: `text-5xl md:text-7xl font-bold tracking-[-0.02em]`
- Section headings: `text-3xl font-bold tracking-tight`
- Body: `text-base`, `leading-relaxed` for paragraphs
- Mono accents: `font-mono text-sm` for labels, badges, code

### Layout
- Container: `max-w-5xl mx-auto px-6 lg:px-8`
- Case study pages: `max-w-3xl mx-auto px-6 lg:px-8`
- Section spacing varies: hero py-32, zaylon py-20, projects py-20, etc.

### Animation Primitives (motion-wrapper.tsx)
- `FadeUp` : opacity 0 to 1, y 20 to 0 (most common)
- `BlurIn` : blur 8px to 0 + opacity (section headings)
- `SlideFromLeft` : x -30 to 0 with spring (experience entries)
- `ScaleUp` : scale 0.95 to 1 with spring (about cards)
- `TextReveal` : character-by-character blur+y stagger (hero name)
- `CountUp` : animated number counter (Zaylon stats)
- `StaggerContainer/StaggerItem/StaggerItemScale` : staggered grid reveals

Performance rule: only animate `transform` and `opacity`. Use `will-change` sparingly.

### Interactive Effects
- `SpotlightBg` : global mouse-following cyan glow (disabled on touch via `(hover: hover)`)
- `useTilt` : 3D card perspective on hover (max 4deg)
- `useMouseGlow` : radial gradient follows cursor on featured cards
- `Magnetic` : buttons/icons pull toward cursor
- `TypingEffect` : typewriter text with blinking cursor (hero tagline)

### CSS Utilities (globals.css)
- `.link-underline` : animated underline width 0 to 100% on hover
- `.section-divider` : gradient accent line between sections
- `.glass-card` : subtle glassmorphism (handles dark/light)
- `.hover-glow` : pulsing glow animation on hover
- `.cursor-blink` : blinking cursor for typing effect
- `@keyframes dash-flow` : animated SVG dashed lines
- `@media (prefers-reduced-motion: reduce)` : disables all animations

## SEO
- Title: "Abdelrahman Abouroumia (Romia) | AI Engineer"
- JSON-LD: Person schema (name, alternateName, sameAs, knowsAbout, alumniOf, worksFor) + WebSite schema
- Dynamic OG images generated at edge runtime
- Canonical URLs on all pages
- Keywords meta with all name variations
- googleBot directives for max previews
- Sitemap includes homepage + all 8 project case study pages

## LaTeX CV
- Source: `abdelrahman_abouroumia_cv.tex` (project root)
- Compiled PDF: `public/resume.pdf` (downloadable from site)
- Compile: `pdflatex -interaction=nonstopmode abdelrahman_abouroumia_cv.tex && cp abdelrahman_abouroumia_cv.pdf public/resume.pdf`
- Build artifacts (*.aux, *.log, *.out) are in .gitignore
- romia.dev link appears prominently in CV header
- No location in CV header
- All bullet points fit single lines

## GitHub Profile
- Profile repo: `Ab-Romia/Ab-Romia` (separate from romia.dev)
- Clean minimal README: name, intro, tree-style skills, project table, social links
- No animated headers, snake games, trophies, or badge walls
- romia.dev linked prominently

## Zaylon AI Context
- Romia co-founded Zaylon AI (zaylon.ai)
- 40,000+ lines of Python backend, 31,000+ lines of TypeScript dashboard
- Multi-agent supervisor architecture (LangGraph): Sales, Support, Checkout agents
- DialectBridge: tri-lingual NLP (English, Egyptian Arabic, Franco-Arabic)
- 6 e-commerce platforms (Shopify, Salla, WooCommerce, Odoo, YouCan, Zoho)
- 3 payment providers (Stripe, Paymob, Fawry)
- Architecture diagram on portfolio is HIGH-LEVEL only (no implementation secrets per competitive advice)
- Do NOT expose: specific tool counts per agent, encryption algorithms, Redis timing, LLM temperature values, or shared tool names

## Key Decisions
- Dark-first design with light mode support
- No React Flow (1.19MB, overkill) for diagrams; pure SVG/CSS instead
- Connect4 and Sudoku games run entirely client-side (zero API cost)
- HuggingFace demos embedded via iframe with loading skeleton
- `as const` removed from PROJECTS array to support Project interface with caseStudy
- Spotlight background disabled on touch devices via `(hover: hover)` media query
- Security headers (HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy) in next.config.ts
