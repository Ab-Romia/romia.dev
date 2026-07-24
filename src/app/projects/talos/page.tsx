import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  FileCog,
  Layers,
  ListFilter,
  Quote,
  BookOpen,
} from "lucide-react";
import { FadeUp, BlurIn } from "@/components/motion-wrapper";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";
import { getAdjacentProjects } from "@/data/resume";

export const metadata: Metadata = {
  title: "Talos: RAG Assistant Case Study",
  description:
    "Case study of Talos, a team chat platform with a retrieval-augmented assistant that answers from your own documents with citations. I owned the AI, retrieval, evaluation, and deployment, and proved the retrieval fix with a paired experiment that raised judged answer correctness from 0.657 to 0.855 on the workspace's own corpus.",
  openGraph: {
    title: "Talos | Case Study by Abdelrahman Abouroumia",
    description:
      "A team chat platform with a RAG assistant grounded in your own documents. Graduation project. I owned the AI, retrieval, evaluation, and deployment.",
    images: ["/projects/talos/01-chat-ai-answer.png"],
  },
  alternates: { canonical: "/projects/talos" },
};

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-mono uppercase tracking-[0.18em] text-accent mb-3">
      {children}
    </p>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{children}</h2>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base md:text-lg text-muted-foreground leading-relaxed mt-4 max-w-3xl">
      {children}
    </p>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-base text-muted-foreground leading-relaxed mt-4 max-w-3xl">
      {children}
    </p>
  );
}

function Shot({
  src,
  alt,
  caption,
  width,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <figure className="mt-8">
      <div className="rounded-xl border border-border overflow-hidden bg-card">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 896px"
          className="w-full h-auto"
        />
      </div>
      <figcaption className="mt-3 text-center text-xs font-mono text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
}

const PIPELINE = [
  {
    Icon: Upload,
    title: "Upload",
    body: "A file lands in MinIO, checked by magic-byte MIME sniffing, capped, and SHA-256 deduped. The API returns 202 and hands off to a background worker.",
  },
  {
    Icon: FileCog,
    title: "Process",
    body: "A taskiq worker parses the document, chunks it by title, embeds each chunk with bge-small, and writes the vectors into the workspace's Milvus collection.",
  },
  {
    Icon: Layers,
    title: "Retrieve",
    body: "A question runs dense search and BM25 in parallel, fused with reciprocal rank fusion. It fetches about 50 candidates so nothing good gets missed early.",
  },
  {
    Icon: ListFilter,
    title: "Rerank",
    body: "A cross-encoder reads the question and each candidate together and keeps the top 10. That second pass is what pulls the right passage up from the pack.",
  },
  {
    Icon: Quote,
    title: "Answer",
    body: "The model answers from the reranked passages only, streamed token by token with inline citations. Ask something the corpus doesn't cover and it says so instead of guessing.",
  },
];

const EVAL_ROWS = [
  {
    arm: "A0 baseline",
    config: "recursive chunks + MiniLM, rerank 20→5",
    correctness: "0.657",
    delta: "ref",
    p: "n/a",
    r: "n/a",
    winner: false,
  },
  {
    arm: "A1",
    config: "by_title chunks + MiniLM, 50→10",
    correctness: "0.843",
    delta: "+0.186",
    p: "8.2e-06",
    r: "0.79",
    winner: false,
  },
  {
    arm: "A2 (winner)",
    config: "by_title + bge-small, 50→10, rewrite on",
    correctness: "0.855",
    delta: "+0.198",
    p: "5.5e-06",
    r: "0.81",
    winner: true,
  },
  {
    arm: "A3",
    config: "A2 without query rewrite",
    correctness: "0.849",
    delta: "+0.192",
    p: "3.3e-05",
    r: "0.67",
    winner: false,
  },
  {
    arm: "A4",
    config: "A2 without reranker",
    correctness: "0.837",
    delta: "+0.180",
    p: "3.8e-05",
    r: "0.64",
    winner: false,
  },
];

const CONTRIBUTORS = [
  {
    name: "Abdelrahman Abouroumia",
    role: "AI and RAG system: implementation, integration, evaluation, and the live demo deployment.",
    github: "https://github.com/Ab-Romia",
  },
  {
    name: "Mohab Sherif",
    role: "MCP server and the third-party integrations that connect the assistant to external tools.",
    github: "https://github.com/MohabG2",
  },
  {
    name: "Kyria Ekladyous",
    role: "Notification system and the workspace features that keep teams organized.",
    github: "https://github.com/KyriaEkladyous",
  },
  {
    name: "Kyrollos Salama",
    role: "Permission system and the security model across workspaces and channels.",
    github: "https://github.com/k1rowashere",
  },
  {
    name: "Abdelrahman Mashaal",
    role: "Frontend and backend integration, wiring the interface to the platform APIs.",
    github: "https://github.com/mash3al-29",
  },
  {
    name: "Abdullah Elsalmy",
    role: "Frontend development across the app's screens, flows, and components.",
    github: "https://github.com/aelsalmy",
  },
  {
    name: "Nourhane Tarek",
    role: "Messaging system: channels, direct messages, threads, and group chats.",
    github: "https://github.com/nourhanetarek",
  },
];

export default function TalosCaseStudyPage() {
  const { prev, next } = getAdjacentProjects("talos");

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Back link */}
          <FadeUp>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            >
              <ArrowLeft className="size-4" />
              Back to projects
            </Link>
          </FadeUp>

          {/* Hero */}
          <FadeUp delay={0.1}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded border bg-muted text-muted-foreground border-border">
                Completed
              </span>
              <span className="text-xs font-mono text-muted-foreground px-2 py-0.5 rounded bg-muted">
                Graduation project, 2026
              </span>
              <span className="text-xs font-mono text-muted-foreground px-2 py-0.5 rounded bg-muted">
                AI/ML
              </span>
              <span className="text-xs font-mono text-muted-foreground px-2 py-0.5 rounded bg-muted">
                Backend
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Talos</h1>
            <p className="text-lg md:text-xl text-foreground mt-3 font-medium">
              A team chat platform whose assistant answers from your own documents, with citations.
            </p>
            <p className="text-base text-muted-foreground mt-4 leading-relaxed max-w-3xl">
              Talos is workspaces, channels, DMs, and threaded messaging with an in-channel
              assistant that retrieves, reranks, and answers from a team&apos;s uploaded files.
              It was our graduation project. I owned the AI, retrieval, and evaluation track, and
              the one thing I&apos;m proudest of is that the retrieval isn&apos;t asserted to work.
              I measured it.
            </p>
          </FadeUp>

          {/* Tags + role note + source */}
          <FadeUp delay={0.15}>
            <div className="flex flex-wrap gap-2 mt-6">
              {["FastAPI", "Python 3.13", "LangChain", "Milvus", "MinIO", "taskiq / Redis", "HTTP streaming"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono bg-muted text-muted-foreground px-2.5 py-1 rounded"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
            <p className="text-sm text-accent font-mono mt-4 flex items-start gap-2">
              <span className="size-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
              My track: retrieval-augmented assistant, ingestion and retrieval, and the evaluation
              that proved the fix.
            </p>

            <div className="flex flex-wrap gap-4 mt-5">
              <a
                href="https://github.com/Ab-Romia/talos"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <GitHubIcon className="size-4" /> Source Code
              </a>
              <Link
                href="/blog/talos-rag-retrieval-evaluation"
                className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent-muted transition-colors"
              >
                <BookOpen className="size-4" /> Read the write-up
              </Link>
            </div>
          </FadeUp>

          {/* Hero shot */}
          <FadeUp delay={0.2}>
            <Shot
              src="/projects/talos/01-chat-ai-answer.png"
              alt="A team channel where a user asks the Talos assistant how it decides which document chunks to use, and it replies with a grounded answer citing its sources."
              caption="Ask the assistant in any channel; it retrieves, reranks, and answers with citations."
              width={2561}
              height={1371}
              priority
            />
          </FadeUp>

          <div className="section-divider mt-14 mb-14" />

          {/* The problem */}
          <section>
            <BlurIn>
              <Eyebrow>The problem</Eyebrow>
              <H2>A team&apos;s real knowledge lives in its own files</H2>
            </BlurIn>
            <Body>
              A general chatbot is useless for a specific team, because the answers it needs are in
              that team&apos;s own documents, not in the model&apos;s training data. We wanted the
              assistant to sit inside the chat people already use, answer only from the workspace&apos;s
              uploaded files, point to the exact source of each answer, and say so when the
              files don&apos;t cover the question. Scoped per workspace, so one team&apos;s documents
              never leak into another team&apos;s answers.
            </Body>
          </section>

          {/* What we built */}
          <section className="mt-16">
            <BlurIn>
              <Eyebrow>What we built</Eyebrow>
              <H2>A chat platform, with a grounded assistant inside it</H2>
            </BlurIn>
            <Lead>
              The platform is the usual team surface: workspaces, channels, direct messages, group
              chats, threads, and mentions that turn into notifications. Sign-in runs over passwords,
              TOTP, Google and GitHub OAuth, and WebAuthn passkeys, with JWE-encrypted sessions. What
              makes it Talos is the assistant woven through it.
            </Lead>

            <Shot
              src="/projects/talos/05-ai-assistant.png"
              alt="The dedicated Talos AI page, grounded in the workspace corpus and answering with citations."
              caption="A workspace-grounded assistant, not a generic chatbot."
              width={2561}
              height={1371}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <Shot
                src="/projects/talos/02-team-conversation.png"
                alt="A team channel with multiple members coordinating in real time."
                caption="Workspaces, channels, and real-time team chat."
                width={2561}
                height={1371}
              />
              <Shot
                src="/projects/talos/03-workspace-members.png"
                alt="The workspace members roster shown over a cited assistant answer."
                caption="Per-workspace membership and access control."
                width={2561}
                height={1371}
              />
              <Shot
                src="/projects/talos/06-direct-message.png"
                alt="A one-to-one direct message between teammates."
                caption="Direct messages between teammates."
                width={2561}
                height={1371}
              />
              <Shot
                src="/projects/talos/07-group-chat.png"
                alt="A group conversation with several named senders."
                caption="Group conversations."
                width={2561}
                height={1371}
              />
            </div>
          </section>

          {/* How it works */}
          <section className="mt-16">
            <BlurIn>
              <Eyebrow>How it works</Eyebrow>
              <H2>Upload, process, retrieve, rerank, answer</H2>
            </BlurIn>
            <Lead>
              A file goes in once and gets processed out of band. A question runs through two
              retrieval stages before the model ever sees it. Here is the whole path.
            </Lead>

            {/* Pipeline diagram */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {PIPELINE.map((step, i) => (
                <FadeUp key={step.title} delay={0.05 * i}>
                  <div className="relative h-full bg-card border border-border rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-accent/10 border border-accent/20 shrink-0">
                        <step.Icon className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-1.5">
                      {step.body}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>

            <Body>
              Processing is asynchronous on purpose. The upload endpoint returns immediately and a
              taskiq worker does the slow work, so a half-ingested file can never be queried as if it
              were ready. Storage and search stay separate: MinIO holds the raw bytes and issues
              short-lived presigned download URLs, Milvus holds the vectors, one collection scoped to
              each workspace. Soft-deleting a file removes its chunks from Milvus too, so retrieval
              never surfaces something a user thought they deleted.
            </Body>

            <Shot
              src="/projects/talos/04-documents.png"
              alt="The Documents page showing drag-and-drop upload, Drive import, and indexed files marked Ready."
              caption="Upload documents (PDF, DOCX, PPTX, TXT, MD, and images) or import from Drive; they're parsed, chunked, and indexed for retrieval."
              width={2561}
              height={1371}
            />
          </section>

          {/* The hard problem: centerpiece */}
          <section className="mt-16">
            <BlurIn>
              <Eyebrow>The hard problem</Eyebrow>
              <H2>The assistant gave weak answers, so I measured why</H2>
            </BlurIn>
            <Body>
              Early on, the in-channel assistant kept giving thin, hand-wavy answers on a workspace
              whose corpus was a single 90-page guide. It wasn&apos;t the model and it wasn&apos;t
              the prompt. I went and looked at what retrieval was actually pulling, and the problem
              was upstream of all of it. That one document had been ingested with a recursive
              splitter that cut it into 1,778 tiny fragments, median 67 characters each. At that
              size, whole-page boilerplate outranked the real content, so the assistant was reading
              headers and footers instead of answers.
            </Body>
            <Body>
              A hunch isn&apos;t a fix, so I ran a real experiment. I wrote 83 questions with
              page-level gold labels, LLM-authored and then LLM-reviewed, and paraphrase-constrained
              so a question couldn&apos;t win just by sharing words with its source. The harness runs
              the exact production chunking, retrieval, and prompt. The only thing swapped out is the
              vector store, replaced with an in-memory one that ranks by the same cosine geometry, so
              the eval measures what actually ships. I swept 48 retrieval configurations, then took 5
              end-to-end arms all the way to a graded answer, scored by a gpt-4o judge against the
              reference answer, paired per question, with Wilcoxon signed-rank tests, Holm correction,
              and effect sizes.
            </Body>

            {/* Results table */}
            <div className="mt-8 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm border-collapse min-w-[640px]">
                <caption className="sr-only">
                  Judged answer correctness across five end-to-end evaluation arms.
                </caption>
                <thead>
                  <tr className="bg-muted/60 text-left">
                    <th className="font-semibold text-foreground px-4 py-3">Arm</th>
                    <th className="font-semibold text-foreground px-4 py-3">Config</th>
                    <th className="font-semibold text-foreground px-4 py-3 whitespace-nowrap">
                      Correctness
                    </th>
                    <th className="font-semibold text-foreground px-4 py-3">&Delta;</th>
                    <th className="font-semibold text-foreground px-4 py-3 whitespace-nowrap">
                      Wilcoxon p
                    </th>
                    <th className="font-semibold text-foreground px-4 py-3">Effect r</th>
                  </tr>
                </thead>
                <tbody>
                  {EVAL_ROWS.map((row) => (
                    <tr
                      key={row.arm}
                      className={
                        row.winner
                          ? "border-t border-border bg-accent/5"
                          : "border-t border-border"
                      }
                    >
                      <td
                        className={
                          "px-4 py-3 font-mono whitespace-nowrap " +
                          (row.winner ? "text-accent font-semibold" : "text-foreground")
                        }
                      >
                        {row.arm}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground font-mono text-xs">
                        {row.config}
                      </td>
                      <td
                        className={
                          "px-4 py-3 font-mono " +
                          (row.winner ? "text-accent font-semibold" : "text-foreground")
                        }
                      >
                        {row.correctness}
                      </td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">{row.delta}</td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">{row.p}</td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">{row.r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs font-mono text-muted-foreground text-center">
              Judged correctness is the gpt-4o judge&apos;s score against the reference answer, paired
              per question across 83 questions.
            </p>

            <Body>
              The reading is clean. Chunk hygiene was the whole ballgame: fixing the fragmentation
              alone lifted correctness by 18.6 points, before touching the embedder or anything else.
              Swapping MiniLM for bge-small added a small, consistent gain on top. The reranker earned
              its latency, since dropping it cost real accuracy end to end. Query rewrite was marginal
              on these standalone questions, but I left it on because a separate benchmark showed it
              worth about +0.41 recall@5 on conversational follow-ups, which is where it matters.
            </Body>

            {/* Caveats callout */}
            <aside className="mt-8 rounded-lg border border-accent/30 bg-accent/5 p-5">
              <p className="text-sm font-semibold text-accent">What this does and doesn&apos;t prove</p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                The questions and the judge are both LLMs, so there are no human relevance labels
                here. And it&apos;s one corpus in one domain, so the +19.8-point headline is specific
                to this document&apos;s particular problem. Don&apos;t quote it as a general benchmark.
                What transfers is the direction: chunk hygiene mattered far more than the embedder,
                which mattered more than the reranker or the rewrite. That ordering is the finding
                worth carrying to the next corpus.
              </p>
            </aside>
          </section>

          {/* Where it runs: Slack + MCP */}
          <section className="mt-16">
            <BlurIn>
              <Eyebrow>Where it runs</Eyebrow>
              <H2>The same assistant, in Slack</H2>
            </BlurIn>
            <Lead>
              A team doesn&apos;t always live in a new app, so the assistant meets them where they
              already are. An MCP server exposes Jira, GitHub, filesystem, chat, and RAG tools, and a
              Slack bot answers over the same workspace corpus, citing the exact PDF page it drew
              from.
            </Lead>

            <Shot
              src="/projects/talos/08-slack-integration.png"
              alt="The Talos app answering a question in Slack and citing a source PDF page."
              caption="The same assistant, in Slack: it answers from your documents and cites the source."
              width={1848}
              height={860}
            />
            <Shot
              src="/projects/talos/09-slack-compare.png"
              alt="Talos answering in Slack with multi-source citations across several document pages."
              caption="Grounded, multi-source answers delivered where the team already works."
              width={1848}
              height={860}
            />
          </section>

          {/* Outcome & reflection */}
          <section className="mt-16">
            <BlurIn>
              <Eyebrow>Outcome</Eyebrow>
              <H2>A+, demoed live, then decommissioned</H2>
            </BlurIn>
            <Body>
              The project got an A+. I deployed the stack for the defense, a Dockerized backend,
              worker, and scheduler on Railway with managed Milvus on Zilliz Cloud, and we ran the
              whole thing live, then took the hosted app down afterward. The screenshots here are
              from that running build.
            </Body>
            <Body>
              If I kept going, I know the next moves. The honest gap in the evaluation is the lack of
              human relevance labels, so real qrels come first. After that, more than one corpus and
              more than one domain, to see which of these gains hold and which were specific to this
              document. Then the ordinary work of scaling: the retrieval path is sound, but the
              indexing and memory would need real load before I&apos;d trust them under a busy team.
            </Body>
          </section>

          {/* Contributors */}
          <section className="mt-16">
            <BlurIn>
              <Eyebrow>Contributors</Eyebrow>
              <H2>The team</H2>
            </BlurIn>
            <Lead>
              Talos was a team project. I owned the AI, retrieval, evaluation, and deployment track;
              here is everyone who built it.
            </Lead>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {CONTRIBUTORS.map((c) => (
                <FadeUp key={c.name} delay={0.05}>
                  <div className="h-full rounded-xl border p-5 bg-card border-border">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold text-foreground">{c.name}</h3>
                      <a
                        href={c.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${c.name} on GitHub`}
                        className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                      >
                        <GitHubIcon className="size-4" />
                      </a>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-2">{c.role}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </section>

          <div className="section-divider mt-16 mb-8" />

          {/* Prev / next */}
          <div className="flex items-center justify-between">
            {prev ? (
              <Link
                href={prev.blog ?? `/projects/${prev.slug}`}
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">{prev.title}</span>
                <span className="sm:hidden">Previous</span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={next.blog ?? `/projects/${next.slug}`}
                className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="hidden sm:inline">{next.title}</span>
                <span className="sm:hidden">Next</span>
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
