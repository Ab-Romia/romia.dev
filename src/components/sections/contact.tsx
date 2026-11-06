import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { PERSONAL } from "@/data/resume";
import { SOCIAL_LINKS } from "@/components/social-icons";

export function Contact() {
  return (
    <section id="contact" className="border-t-2 border-foreground">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-36">
        <p className="eyebrow flex items-center gap-3 text-accent">
          06
          <span aria-hidden="true" className="h-px w-10 bg-current" />
        </p>
        <h2 className="display-lg mt-4">Get in touch</h2>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-[1.375rem] md:leading-[1.6]">
          If you are building agents, backend infrastructure or AI products, or hiring for one,
          I would like to hear about it. Email reaches me fastest.
        </p>
        <p className="reveal mt-8">
          <a
            href={`mailto:${PERSONAL.email}`}
            className="break-words font-extrabold text-[clamp(1.6rem,6.2vw,4.8rem)] leading-none tracking-[-0.035em] [font-stretch:115%] underline decoration-accent decoration-[3px] underline-offset-[0.14em] transition-colors hover:text-accent"
          >
            {PERSONAL.email}
          </a>
        </p>
        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
          {SOCIAL_LINKS.filter((s) => !s.href.startsWith("mailto:")).map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="link-underline">{s.label}</span>
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            </li>
          ))}
          <li>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="link-underline">Résumé (PDF)</span>
              <ArrowDownToLine className="size-3.5" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
