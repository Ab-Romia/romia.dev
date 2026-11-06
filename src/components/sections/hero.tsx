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
    <section id="hero" className="pt-24 md:pt-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h1>
          <span className="sr-only">
            {PERSONAL.name} ({PERSONAL.displayName}), {PERSONAL.title}
          </span>
          {/* The poster: the name as wide as the page, never animated (it is the LCP). */}
          <span
            aria-hidden="true"
            className="poster poster-scroll -ml-[0.04em] block select-none text-[clamp(3rem,19.4vw,16.4rem)]"
          >
            ROMIA
          </span>
        </h1>
      </div>

      <div className="relative mt-6 overflow-hidden border-y-2 border-foreground md:mt-8">
        {/* The photo as a backdrop: black and white with a hint of the accent,
            blurred, and faded out towards the statement so the text stays clear. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-full [mask-image:linear-gradient(to_right,transparent_15%,black_70%)] lg:w-[68%]"
        >
          <div className="photo-zoom absolute inset-0">
            <Image
              src="/portrait.jpg"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 70vw, 100vw"
              className="scale-110 object-cover object-[50%_30%] opacity-70 blur-[7px] grayscale contrast-[1.1]"
            />
            <div className="absolute inset-0 bg-accent opacity-30 mix-blend-color" />
          </div>
          <div className="absolute inset-0 bg-background/40" />
        </div>

        <div className="relative mx-auto grid max-w-6xl lg:grid-cols-12 lg:divide-x-2 lg:divide-foreground">
          <div className="px-5 py-10 sm:px-8 lg:col-span-7 lg:py-14">
            <p className="eyebrow">
              {PERSONAL.name} <span aria-hidden="true">/</span> {PERSONAL.title}
            </p>
            <p className="display-lg mt-6 max-w-[14ch]">
              Backend and <span className="text-accent">AI systems</span> engineer.
            </p>
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

          {/* High-contrast black and white: Romia's pick of six treatments. */}
          <dl
            className="rise grid content-between gap-8 border-t-2 border-foreground px-5 py-10 sm:px-8 lg:col-span-5 lg:border-t-0 lg:px-10 lg:py-14"
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
      </div>
    </section>
  );
}
