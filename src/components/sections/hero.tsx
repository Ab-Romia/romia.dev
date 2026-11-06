import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownToLine, ArrowRight } from "lucide-react";
import { HERO_FACTS, PERSONAL } from "@/data/resume";
import { SOCIAL_LINKS } from "@/components/social-icons";
import { CopyEmail } from "@/components/copy-email";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-28 md:pt-36">
      {/* The photo as a quiet backdrop on the right: black and white with a hint
          of the accent, blurred, and faded out towards the text. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-full [mask-image:linear-gradient(to_right,transparent_20%,black_75%)] lg:w-[60%]"
      >
        <Image
          src="/portrait.jpg"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="scale-110 object-cover object-[50%_30%] opacity-50 blur-[10px] grayscale"
        />
        <div className="absolute inset-0 bg-accent opacity-25 mix-blend-color" />
        <div className="absolute inset-0 bg-background/50" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-20 sm:px-8 md:pb-28 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h1>
            <span className="eyebrow block">
              {PERSONAL.name} ({PERSONAL.displayName})
            </span>
            <span className="display-lg mt-5 block max-w-[16ch]">
              Backend and <span className="text-accent">AI systems</span> engineer.
            </span>
          </h1>
          <p
            className="rise mt-6 max-w-[54ch] text-[17px] leading-relaxed text-muted-foreground"
            style={step(0)}
          >
            {PERSONAL.intro}
          </p>
          <div className="rise mt-8 flex flex-wrap items-center gap-x-5 gap-y-4" style={step(1)}>
            <a
              href="/resume.pdf"
              download
              className="inline-flex h-11 items-center gap-2 rounded-md bg-accent px-5 text-sm font-semibold text-accent-foreground transition-[opacity,transform] hover:opacity-90 active:scale-[0.98]"
            >
              Résumé
              <ArrowDownToLine className="size-4" aria-hidden="true" />
            </a>
            <CopyEmail className="text-sm" />
            <ul className="flex items-center">
              {SOCIAL_LINKS.filter((s) => !s.href.startsWith("mailto:")).map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="block p-2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <s.Icon className="size-[18px]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <dl
            className="rise grid gap-7 self-end border-t border-border pt-8 lg:col-span-4 lg:col-start-9 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0"
            style={step(2)}
          >
            {HERO_FACTS.map((fact) => {
              const body = fact.lines.map((line, i) => (
                <span key={line} className={i === 0 ? "block" : "block text-muted-foreground"}>
                  {line}
                </span>
              ));
              return (
                <div key={fact.label}>
                  <dt className="eyebrow text-accent">{fact.label}</dt>
                  <dd className="mt-2.5 text-[15px] leading-snug">
                    {"href" in fact ? (
                      <Link href={fact.href} className="group block">
                        {body}
                        <span className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold">
                          <span className="link-underline">The project</span>
                          <ArrowRight
                            className="size-3.5 transition-transform group-hover:translate-x-0.5"
                            aria-hidden="true"
                          />
                        </span>
                      </Link>
                    ) : (
                      body
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
      </div>
    </section>
  );
}
