"use client";

import {
  ABOUT,
  EDUCATION,
  CERTIFICATIONS,
  COMPETITIONS,
  LANGUAGES_SPOKEN,
} from "@/data/resume";
import Image from "next/image";
import { BlurIn, ScaleUp } from "@/components/motion-wrapper";
import { useTilt } from "@/hooks/use-tilt";

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, style, handlers } = useTilt(3);
  return (
    <div ref={ref} style={style} {...handlers} className={className}>
      {children}
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <BlurIn>
          <h2 className="text-3xl font-bold tracking-tight leading-tight">
            About
          </h2>
        </BlurIn>

        <div className="flex flex-col-reverse md:flex-row gap-8 mt-6">
          <BlurIn delay={0.1}>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              {ABOUT.bio}
            </p>
          </BlurIn>

          <ScaleUp delay={0.15}>
            <div className="relative size-32 md:size-40 rounded-full overflow-hidden border-2 border-accent/30 shadow-[0_0_20px_rgba(0,212,255,0.15)] shrink-0 mx-auto md:mx-0">
              <Image
                src="/photo.jpeg"
                alt="Abdelrahman Abouroumia"
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
            <TiltCard className="bg-card border border-border rounded-lg p-6 h-full hover-glow">
              <h3 className="text-sm font-mono text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" />
                Education
              </h3>
              <p className="font-semibold text-sm">{EDUCATION.degree}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {EDUCATION.university}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                <span>GPA: {EDUCATION.gpa}</span>
                <span>{EDUCATION.expected}</span>
              </div>
            </TiltCard>
          </ScaleUp>

          <ScaleUp delay={0.15}>
            <TiltCard className="bg-card border border-border rounded-lg p-6 h-full hover-glow">
              <h3 className="text-sm font-mono text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" />
                Languages
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
            </TiltCard>
          </ScaleUp>

          <ScaleUp delay={0.2}>
            <TiltCard className="bg-card border border-border rounded-lg p-6 h-full hover-glow">
              <h3 className="text-sm font-mono text-accent uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-accent" />
                Certifications
              </h3>
              <div className="space-y-3">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.name} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-colors group/cert">
                    <div className="size-8 rounded-md bg-accent/10 flex items-center justify-center shrink-0 group-hover/cert:bg-accent/20 transition-colors">
                      <span className="text-accent text-sm font-bold">{cert.issuer.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-tight">{cert.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {cert.issuer}
                        {"year" in cert && cert.year && ` · ${cert.year}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TiltCard>
          </ScaleUp>

          <ScaleUp delay={0.25}>
            <TiltCard className="bg-card border border-border rounded-lg p-6 h-full hover-glow">
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
            </TiltCard>
          </ScaleUp>
        </div>
      </div>
    </section>
  );
}
