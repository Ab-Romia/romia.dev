import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { BackLink, ProjectPager } from "@/components/case-study";
import { ZaylonTopology } from "@/components/figures/zaylon-topology";
import { ZAYLON_SHOWCASE, getAdjacentProjects, getProjectBySlug } from "@/data/resume";

export const metadata: Metadata = {
  title: "Zaylon AI: Conversational Commerce",
  description:
    "Case study of Zaylon AI, the conversational commerce platform Abdelrahman Abouroumia co-founded: one LangGraph agent that sells over WhatsApp and Instagram for MENA merchants, in English, Egyptian Arabic and Franco-Arabic.",
  openGraph: {
    title: "Zaylon AI | Case Study by Abdelrahman Abouroumia",
    description:
      "Conversational commerce for MENA merchants: one LangGraph agent, three dialects, six commerce platforms and five messaging channels.",
  },
  alternates: { canonical: "/projects/zaylon-ai" },
};

const DIALECTS = [
  { lang: "English", sample: "Hi, is the M size back in stock?" },
  { lang: "Egyptian Arabic", sample: "السلام عليكم، مقاس الميديوم متوفر؟", rtl: true },
  { lang: "Franco-Arabic", sample: "salam, el medium raga3 el stock?" },
];

const INTEGRATIONS = [
  { group: "Messaging", items: "WhatsApp, Instagram, Messenger, TikTok, web chat" },
  { group: "Commerce", items: "Shopify, Salla, WooCommerce, Odoo, YouCan, Zoho" },
  { group: "Payments", items: "Stripe, Paymob, Fawry" },
  { group: "Shipping", items: "Bosta, Aramex" },
];

const ROLE = [
  "Conversational AI architecture and the LangGraph agent",
  "FastAPI application, services, and API surface",
  "Database schema, migrations, and multi-tenant isolation",
  "Hybrid product search: keyword and vector retrieval with rank fusion",
  "Tri-lingual NLP for English, Egyptian Arabic, and Franco-Arabic",
  "Proactive engine that spots sales opportunities in a conversation",
  "Auth, permissions, plan entitlements, and tenant security",
  "Deployment, CI, and observability for the backend",
];

const SECTIONS = [
  { id: "problem", label: "The problem" },
  { id: "dialects", label: "Three dialects" },
  { id: "approach", label: "Approach" },
  { id: "decisions", label: "Decisions" },
  { id: "capabilities", label: "What it does" },
  { id: "integrations", label: "Integrations" },
  { id: "role", label: "My role" },
  { id: "results", label: "Where it stands" },
];

function Heading({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="display-md mt-16 first:mt-0">
      {children}
    </h2>
  );
}

function Prose({ children }: { children: ReactNode }) {
  return <p className="mt-5 text-[17px] leading-[1.75] text-foreground/90">{children}</p>;
}

function DashList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-5 text-[16px] leading-[1.7] text-foreground/90 before:absolute before:left-0 before:top-[0.8em] before:h-px before:w-2.5 before:bg-border-strong"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ZaylonCaseStudyPage() {
  const project = getProjectBySlug("zaylon-ai")!;
  const cs = project.caseStudy;
  const { prev, next } = getAdjacentProjects("zaylon-ai");

  return (
    <>
      <Navbar />
      <main id="main-content" className="pb-24 pt-28 md:pt-36">
        <article className="mx-auto max-w-6xl px-5 sm:px-8">
          <BackLink href="/#projects">All work</BackLink>

          <header className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <p className="eyebrow flex flex-wrap gap-x-3">
                <span>Co-founder</span>
                <span>{project.year}</span>
                <span>{project.status}</span>
              </p>
              <h1 className="display-xl mt-5">Zaylon AI</h1>
              <p className="mt-5 text-2xl font-medium leading-snug md:text-[1.75rem]">
                {ZAYLON_SHOWCASE.subtitle}.
              </p>
              <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted-foreground">
                {ZAYLON_SHOWCASE.description}
              </p>
            </div>

            <dl className="space-y-5 self-end text-[15px] lg:col-span-3 lg:col-start-10">
              <div className="border-t border-border pt-4">
                <dt className="eyebrow">Built</dt>
                <dd className="mt-2 leading-relaxed">The AI system and the backend behind it</dd>
              </div>
              <div className="border-t border-border pt-4">
                <dt className="eyebrow">Stack</dt>
                <dd className="mt-2 leading-relaxed">{ZAYLON_SHOWCASE.techStack.join(", ")}</dd>
              </div>
              <div className="border-t border-border pt-4">
                <dt className="eyebrow">Product</dt>
                <dd className="mt-2">
                  <a
                    href={ZAYLON_SHOWCASE.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 transition-colors hover:text-accent"
                  >
                    <span className="link-underline">zaylon.ai</span>
                    <ArrowUpRight className="size-3.5" aria-hidden="true" />
                  </a>
                </dd>
              </div>
            </dl>
          </header>

          <div className="mt-14">
            <ZaylonTopology />
          </div>

          <div className="mt-16 grid gap-12 border-t border-border pt-14 lg:grid-cols-12 lg:gap-8">
            <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
              <ul className="sticky top-28 space-y-2 text-sm">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="link-underline text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="min-w-0 lg:col-span-8 lg:col-start-5">
              <Heading id="problem">The problem</Heading>
              <Prose>{cs.problem}</Prose>

              <Heading id="dialects">Three dialects, one conversation</Heading>
              <Prose>
                Egyptian customers rarely write in Modern Standard Arabic. They mix dialect,
                Franco-Arabic, and English, sometimes in one sentence. Zaylon detects the dominant
                language on every turn and replies in the same register, so the same question can
                arrive three ways and get the same answer back in the way it was asked.
              </Prose>
              <dl className="mt-8 border-t border-border">
                {DIALECTS.map((d) => (
                  <div
                    key={d.lang}
                    className="grid gap-x-6 gap-y-1 border-b border-border py-4 sm:grid-cols-[10rem_1fr]"
                  >
                    <dt className="eyebrow pt-1">{d.lang}</dt>
                    <dd
                      lang={d.rtl ? "ar" : undefined}
                      dir={d.rtl ? "rtl" : undefined}
                      className="text-lg sm:text-left"
                    >
                      {d.sample}
                    </dd>
                  </div>
                ))}
              </dl>

              <Heading id="approach">Approach</Heading>
              <Prose>{cs.approach}</Prose>

              <Heading id="decisions">Decisions</Heading>
              <ol className="mt-8 border-t border-border">
                {cs.decisions?.map((d, i) => (
                  <li
                    key={d.title}
                    className="grid gap-x-5 gap-y-2 border-b border-border py-8 sm:grid-cols-[2.5rem_1fr]"
                  >
                    <span className="pt-1 font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="display-sm">{d.title}</h3>
                      <p className="mt-3 text-[16px] leading-[1.75] text-foreground/85">{d.reasoning}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <Heading id="capabilities">What it does</Heading>
              <DashList items={ZAYLON_SHOWCASE.features} className="mt-6 space-y-3" />

              <Heading id="integrations">Integrations</Heading>
              <Prose>
                Every merchant&apos;s stack is different, so the agent works through the systems a
                merchant already runs rather than asking them to move.
              </Prose>
              <dl className="mt-8 border-t border-border">
                {INTEGRATIONS.map((g) => (
                  <div
                    key={g.group}
                    className="grid gap-x-6 gap-y-1 border-b border-border py-4 sm:grid-cols-[10rem_1fr]"
                  >
                    <dt className="eyebrow pt-0.5">{g.group}</dt>
                    <dd className="text-[16px] leading-relaxed">{g.items}</dd>
                  </div>
                ))}
              </dl>

              <Heading id="role">My role</Heading>
              <Prose>
                I co-founded Zaylon and built its AI system and backend: the conversational
                architecture, the LangGraph agent that runs it, the tri-lingual NLP, and the FastAPI
                application with its database layer and the multi-tenant security around it.
              </Prose>
              <DashList items={ROLE} className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2" />

              <Heading id="results">Where it stands</Heading>
              <Prose>{cs.results}</Prose>
            </div>
          </div>

          <ProjectPager prev={prev} next={next} />
        </article>
      </main>
      <Footer />
    </>
  );
}
