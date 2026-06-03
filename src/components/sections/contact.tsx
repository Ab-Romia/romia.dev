"use client";

import { useState } from "react";
import { PERSONAL } from "@/data/resume";
import { BlurIn, FadeUp } from "@/components/motion-wrapper";
import { Mail, Check, Copy, Download } from "lucide-react";
import { SOCIAL_LINKS } from "@/components/social-icons";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    await navigator.clipboard.writeText(PERSONAL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
        <BlurIn>
          <h2 className="text-3xl font-bold tracking-tight leading-tight">
            Let&apos;s Connect
          </h2>
          <p className="text-muted-foreground font-light mt-4 max-w-lg mx-auto leading-relaxed">
            I like building systems that actually ship. If you&apos;re working on
            agents, backend infrastructure, or AI products, or hiring for one,
            say hi.
          </p>
        </BlurIn>

        <FadeUp delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${PERSONAL.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-[transform,background-color] active:scale-[0.97]"
            >
              <Mail className="size-4" />
              Email Me
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-border text-foreground hover:border-accent/40 hover:text-accent transition-[transform,border-color,color] active:scale-[0.97]"
            >
              <Download className="size-4" />
              Download Resume
            </a>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div className="mt-6 inline-flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2.5 hover:border-accent/40 transition-colors">
            <span className="text-xs font-mono text-muted-foreground">{PERSONAL.email}</span>
            <button
              onClick={copyEmail}
              className="ml-1 p-1 rounded hover:bg-muted transition-colors active:scale-90"
              aria-label={copied ? "Email copied" : "Copy email"}
            >
              {copied ? (
                <Check className="size-3.5 text-green-600 dark:text-green-400" />
              ) : (
                <Copy className="size-3.5 text-muted-foreground" />
              )}
            </button>
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="flex items-center justify-center gap-2 mt-8">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="p-3 text-muted-foreground hover:text-accent transition-colors"
              >
                <link.Icon className="size-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
