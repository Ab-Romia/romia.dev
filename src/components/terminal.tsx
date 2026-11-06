"use client";

import { useEffect, useRef, useState } from "react";
import { AWARDS, EDUCATION, EXPERIENCE, PERSONAL, PROJECTS } from "@/data/resume";

/* A small terminal that answers a handful of commands from the same data as
   the rest of the page. Always drawn dark, like a real one, whatever the theme. */

type Line = { kind: "cmd" | "out" | "hi"; text: string };

const COMMANDS: Record<string, Line[]> = {
  whoami: [
    { kind: "hi", text: `${PERSONAL.name} (${PERSONAL.displayName})` },
    { kind: "out", text: PERSONAL.headline },
    { kind: "out", text: "Software Engineer at Tutanic. Co-founder of Zaylon AI." },
  ],
  stack: [
    { kind: "out", text: "services    FastAPI, Django, Spring Boot, microservices" },
    { kind: "out", text: "messaging   NATS JetStream, Kafka" },
    { kind: "out", text: "data        Postgres + PgBouncer, Dragonfly, Redis, S3, pgvector" },
    { kind: "out", text: "ai          AWS Bedrock, RAG, AI tools, evaluation" },
    { kind: "out", text: "agents      LangGraph, CopilotKit, MCP" },
    { kind: "out", text: "deploy      AWS, Kubernetes, Helm, Docker, GitHub Actions" },
  ],
  "ls work": PROJECTS.filter((p) => !p.categories.includes("Games/Puzzles")).map((p) => ({
    kind: "out" as const,
    text: `${p.slug.padEnd(22)}${p.year}`,
  })),
  experience: EXPERIENCE.map((e) => ({
    kind: "out" as const,
    text: `${e.period.padEnd(21)}${e.role}, ${e.company}`,
  })),
  awards: AWARDS.map((a) => ({ kind: "hi" as const, text: `${a.title}, ${a.event}` })),
  education: [
    { kind: "out", text: EDUCATION.degree },
    { kind: "out", text: `${EDUCATION.university}, GPA ${EDUCATION.gpa}` },
  ],
  contact: [
    { kind: "hi", text: PERSONAL.email },
    { kind: "out", text: "github.com/Ab-Romia" },
    { kind: "out", text: "linkedin.com/in/abdelrahman-abouroumia" },
  ],
};

export function Terminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);

  function run(cmd: string) {
    if (cmd === "clear") return setLines([]);
    setLines((l) => [...l, { kind: "cmd", text: cmd }, ...COMMANDS[cmd]]);
  }

  // Type the first command once, when the terminal scrolls into view.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const target = "whoami";
        let i = 0;
        timer = setInterval(() => {
          i += 1;
          setTyping(target.slice(0, i));
          if (i === target.length) {
            clearInterval(timer);
            setTyping("");
            setLines([{ kind: "cmd", text: target }, ...COMMANDS[target]]);
          }
        }, 85);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    screen.current?.scrollTo({ top: screen.current.scrollHeight });
  }, [lines]);

  return (
    <div
      ref={root}
      className="overflow-hidden rounded-lg border border-[#26282d] bg-[#0d0e11] text-[#e6e3dc] shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)]"
    >
      <div className="flex items-center gap-2 border-b border-[#1d1f23] px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#2c2e33]" />
        <span className="size-2.5 rounded-full bg-[#2c2e33]" />
        <span className="size-2.5 rounded-full bg-[#2c2e33]" />
        <span className="ml-2 font-mono text-xs text-[#8f8c85]">romia@dev: ~</span>
      </div>
      <div
        ref={screen}
        aria-live="polite"
        className="h-[300px] overflow-y-auto p-5 font-mono text-[13px] leading-relaxed"
      >
        {lines.map((l, i) => (
          <p
            key={i}
            className={
              "whitespace-pre-wrap " +
              (l.kind === "cmd"
                ? "mt-3 first:mt-0"
                : l.kind === "hi"
                  ? "text-[#6b8aff]"
                  : "text-[#a9a69e]")
            }
          >
            {l.kind === "cmd" && <span className="text-[#6b8aff]">$ </span>}
            {l.text}
          </p>
        ))}
        <p className={lines.length ? "mt-3" : ""}>
          <span className="text-[#6b8aff]">$ </span>
          {typing}
          <span className="ml-0.5 inline-block h-3.5 w-2 translate-y-0.5 bg-[#e6e3dc] motion-safe:animate-pulse" />
        </p>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-[#1d1f23] px-5 py-4">
        {[...Object.keys(COMMANDS), "clear"].map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => run(c)}
            className="rounded-md border border-[#2c2e33] px-2.5 py-1.5 font-mono text-xs text-[#c9c6be] transition-colors hover:border-[#6b8aff] hover:text-[#6b8aff]"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
