import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import {
  ABOUT,
  AWARDS,
  CERTIFICATIONS,
  COMPETITIONS,
  EDUCATION,
  LANGUAGES_SPOKEN,
  REFERENCES,
  SKILLS,
} from "@/data/resume";
import { Section, SectionHeader, ArrowLink } from "@/components/section";

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-0.5 text-muted-foreground transition-colors hover:text-foreground"
    >
      <span className="link-underline">{children}</span>
      <ArrowUpRight className="size-3" aria-hidden="true" />
    </a>
  );
}

function Fact({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="border-t-2 border-foreground pt-5">
      <dt className="eyebrow text-accent">{term}</dt>
      <dd className="mt-3 text-[15px] leading-relaxed">{children}</dd>
    </div>
  );
}

function Recognition() {
  return (
    <div className="mt-14 border-t border-border pt-8">
      <p className="eyebrow">Recognition</p>
      {AWARDS.map((award) => (
        <div
          key={award.event}
          className="mt-6 grid items-start gap-6 sm:grid-cols-[minmax(0,15rem)_1fr]"
        >
          <a
            href={award.certificate.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open the ${award.event} certificate`}
            className="block overflow-hidden rounded-[3px] ring-1 ring-border transition-opacity hover:opacity-90"
          >
            <Image
              src={award.certificate.src}
              alt={`Certificate of Achievement from ${award.issuer}: ${award.title}, presented to Abdelrahman Abouroumia`}
              width={award.certificate.width}
              height={award.certificate.height}
              sizes="(min-width: 640px) 240px, 100vw"
              className="h-auto w-full"
            />
          </a>
          <div>
            <p className="display-sm">{award.title}</p>
            <p className="mt-1.5 text-[15px] text-muted-foreground">
              {award.event},{" "}
              {new Date(award.date).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
                timeZone: "UTC",
              })}
            </p>
            <blockquote className="mt-4 border-l-2 border-accent pl-4 text-lg font-medium leading-snug">
              &ldquo;{award.citation}&rdquo;
            </blockquote>
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <ArrowLink href={`/projects/${award.projectSlug}`}>The project it was for</ArrowLink>
              <ExternalLink href={award.certificate.src}>Certificate</ExternalLink>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function About() {
  return (
    <Section id="about">
      <SectionHeader index="05" title="About" />

      <div className="mt-12 grid gap-14 md:mt-16 lg:grid-cols-12 lg:gap-12">
        <div className="reveal lg:col-span-7">
          <p className="text-xl leading-relaxed md:text-[1.375rem] md:leading-[1.6]">{ABOUT.bio}</p>
          <Recognition />
        </div>

        <dl className="reveal space-y-10 lg:col-span-4 lg:col-start-9">
          <Fact term="Education">
            {EDUCATION.degree}
            <span className="block text-muted-foreground">{EDUCATION.university}</span>
            <span className="block text-muted-foreground">
              GPA {EDUCATION.gpa}, graduated {EDUCATION.graduated}
            </span>
          </Fact>

          <Fact term="Certifications">
            <ul className="space-y-3">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.name}>
                  {cert.name}
                  <span className="block text-sm text-muted-foreground">
                    {cert.issuer}, {cert.year}
                  </span>
                  {"certificates" in cert && (
                    <span className="mt-1 flex flex-wrap gap-x-4 text-sm">
                      {cert.certificates.map((c) => (
                        <ExternalLink key={c.src} href={"verifyUrl" in c ? c.verifyUrl : c.src}>
                          {"label" in c ? c.label : "verifyUrl" in c ? "Verify" : "Certificate"}
                        </ExternalLink>
                      ))}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Fact>

          <Fact term="Competitions">
            <ul className="space-y-2">
              {COMPETITIONS.map((c) => (
                <li key={c.name}>
                  {c.name}
                  <span className="text-muted-foreground">, {c.detail}</span>
                </li>
              ))}
            </ul>
          </Fact>

          <Fact term="Languages">
            {LANGUAGES_SPOKEN.map((l, i) => (
              <span key={l.language}>
                {l.language} <span className="text-muted-foreground">({l.level})</span>
                {i < LANGUAGES_SPOKEN.length - 1 ? ", " : ""}
              </span>
            ))}
          </Fact>
        </dl>
      </div>

      <div id="skills" className="reveal mt-20 grid gap-8 lg:grid-cols-12 lg:gap-12">
        <h3 className="display-sm lg:col-span-3">Stack</h3>
        <dl className="border-t-2 border-foreground lg:col-span-9">
          {Object.entries(SKILLS).map(([group, items]) => (
            <div key={group} className="grid gap-1.5 border-b border-border py-4 sm:grid-cols-[10rem_1fr]">
              <dt className="eyebrow pt-0.5">{group}</dt>
              <dd className="text-[15px] leading-relaxed">{items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-20 grid gap-8 lg:grid-cols-12 lg:gap-12">
        <h3 className="display-sm lg:col-span-3">References</h3>
        <div className="space-y-8 border-t-2 border-foreground pt-6 lg:col-span-9">
          {REFERENCES.map((ref) => (
            <div key={ref.name}>
              <p className="text-lg font-medium">
                {ref.name} <span className="font-normal text-muted-foreground">({ref.alsoKnownAs})</span>
              </p>
              <p className="mt-1 text-[15px] text-muted-foreground">
                {ref.title ? `${ref.title}, ` : null}
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link text-foreground"
                >
                  {ref.organization}
                </a>
                . {ref.credential}.
              </p>
              <p className="mt-1 text-[15px] text-muted-foreground">{ref.relationship}</p>
              <p className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-sm">
                <a href={`mailto:${ref.email}`} className="link">
                  {ref.email}
                </a>
                <a href={ref.phoneHref} className="link">
                  {ref.phone}
                </a>
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
