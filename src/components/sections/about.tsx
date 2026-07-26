"use client";

import { useState } from "react";
import {
  ABOUT,
  EDUCATION,
  CERTIFICATIONS,
  COMPETITIONS,
  LANGUAGES_SPOKEN,
} from "@/data/resume";
import Image from "next/image";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { BlurIn, ScaleUp } from "@/components/motion-wrapper";

function CertRow({ cert }: { cert: (typeof CERTIFICATIONS)[number] }) {
  const [open, setOpen] = useState(false);
  const certificates = "certificates" in cert ? cert.certificates : undefined;

  const inner = (
    <>
      {cert.logo.endsWith(".svg") ? (
        // Brand SVGs sit on a white chip so dark logo marks stay legible in
        // dark mode, matching the orb's integration pills.
        <div className="size-8 rounded-md bg-white p-1.5 shrink-0 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cert.logo} alt="" className="w-full h-full object-contain" />
        </div>
      ) : (
        <div className="size-8 rounded-md overflow-hidden shrink-0">
          <Image src={cert.logo} alt="" width={32} height={32} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="min-w-0 text-left">
        <p className="text-sm font-medium leading-tight">{cert.name}</p>
        <p className="text-xs text-muted-foreground">
          {cert.issuer}
          {"year" in cert && cert.year && ` · ${cert.year}`}
        </p>
      </div>
      {certificates && (
        <ChevronDown
          aria-hidden="true"
          className={`size-4 text-muted-foreground ml-auto shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      )}
    </>
  );

  if (!certificates) {
    return <div className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50">{inner}</div>;
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center gap-3 p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
      >
        {inner}
      </button>
      {open && (
        <div className="mt-2 space-y-3">
          {certificates.map((c) => (
            <div key={c.src}>
              <div className="rounded-lg overflow-hidden border border-border">
                <Image
                  src={c.src}
                  alt={`${cert.name} certificate`}
                  width={c.width}
                  height={c.height}
                  className="w-full h-auto"
                />
              </div>
              {"verifyUrl" in c && c.verifyUrl && (
                <a
                  href={c.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-accent hover:text-accent-muted transition-colors inline-flex items-center gap-1 mt-2 p-2 -m-2"
                >
                  {c.verifyLabel} <ArrowUpRight className="size-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function InfoCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <BlurIn>
          <h2 className="text-3xl font-bold tracking-tight leading-tight">
            About Romia
          </h2>
        </BlurIn>

        <div className="flex flex-col-reverse md:flex-row gap-8 mt-6">
          <BlurIn delay={0.1}>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              {ABOUT.bio}
            </p>
          </BlurIn>

          <ScaleUp delay={0.15}>
            <div className="relative size-32 md:size-40 rounded-full overflow-hidden border-2 border-accent/30 shrink-0 mx-auto md:mx-0">
              <Image
                src="/photo.jpeg"
                alt="Abdelrahman Abouroumia (Romia)"
                width={160}
                height={160}
                className="w-full h-full object-cover"
                priority={false}
              />
            </div>
          </ScaleUp>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <ScaleUp delay={0.1}>
            <InfoCard className="bg-card border border-border rounded-lg p-6 h-full transition-colors duration-200 hover:border-accent/40">
              <h3 className="text-sm font-mono text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" />
                Education
              </h3>
              <p className="font-semibold text-sm">{EDUCATION.degree}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {EDUCATION.university}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                GPA: {EDUCATION.gpa}
              </p>
            </InfoCard>
          </ScaleUp>

          <ScaleUp delay={0.15}>
            <InfoCard className="bg-card border border-border rounded-lg p-6 h-full transition-colors duration-200 hover:border-accent/40">
              <h3 className="text-sm font-mono text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" />
                Spoken Languages
              </h3>
              <div className="flex flex-wrap gap-3">
                {LANGUAGES_SPOKEN.map((lang) => (
                  <div key={lang.language} className="flex items-center gap-2 text-sm">
                    <span className="text-foreground">{lang.language}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full hover:bg-accent/10 hover:text-accent transition-colors">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </InfoCard>
          </ScaleUp>

          <ScaleUp delay={0.2}>
            <InfoCard className="bg-card border border-border rounded-lg p-6 h-full transition-colors duration-200 hover:border-accent/40">
              <h3 className="text-sm font-mono text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" />
                Certifications
              </h3>
              <div className="space-y-3">
                {CERTIFICATIONS.map((cert) => (
                  <CertRow key={cert.name} cert={cert} />
                ))}
              </div>
            </InfoCard>
          </ScaleUp>

          <ScaleUp delay={0.25}>
            <InfoCard className="bg-card border border-border rounded-lg p-6 h-full transition-colors duration-200 hover:border-accent/40">
              <h3 className="text-sm font-mono text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" />
                Competitions & Hackathons
              </h3>
              <div className="space-y-2">
                {COMPETITIONS.map((comp) => (
                  <div key={comp.name} className="flex items-start gap-2 text-sm">
                    <span className="text-accent mt-0.5 shrink-0">&#9656;</span>
                    <span>
                      <span className="text-foreground">{comp.name}</span>
                      <span className="text-muted-foreground"> · {comp.detail}</span>
                    </span>
                  </div>
                ))}
              </div>
            </InfoCard>
          </ScaleUp>
        </div>
      </div>
    </section>
  );
}
