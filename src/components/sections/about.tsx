import {
  ABOUT,
  EDUCATION,
  CERTIFICATIONS,
  COMPETITIONS,
  LANGUAGES_SPOKEN,
} from "@/data/resume";
import { FadeUp } from "@/components/motion-wrapper";

export function About() {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight leading-tight">
          About
        </h2>

        <FadeUp>
          <p className="text-muted-foreground leading-relaxed mt-6 max-w-3xl">
            {ABOUT.bio}
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {/* Education */}
          <FadeUp delay={0.1}>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-sm font-mono text-accent uppercase tracking-wider mb-4">
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
            </div>
          </FadeUp>

          {/* Languages */}
          <FadeUp delay={0.15}>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-sm font-mono text-accent uppercase tracking-wider mb-4">
                Languages
              </h3>
              <div className="flex flex-wrap gap-3">
                {LANGUAGES_SPOKEN.map((lang) => (
                  <div
                    key={lang.language}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span className="text-foreground">{lang.language}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Certifications */}
          <FadeUp delay={0.2}>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-sm font-mono text-accent uppercase tracking-wider mb-4">
                Certifications
              </h3>
              <div className="space-y-2">
                {CERTIFICATIONS.map((cert) => (
                  <div key={cert.name} className="flex items-start gap-2 text-sm">
                    <span className="text-accent mt-0.5 shrink-0">&#10003;</span>
                    <span>
                      <span className="text-foreground">{cert.name}</span>
                      <span className="text-muted-foreground">
                        {" — "}
                        {cert.issuer}
                        {"year" in cert && cert.year && `, ${cert.year}`}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Competitions */}
          <FadeUp delay={0.25}>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-sm font-mono text-accent uppercase tracking-wider mb-4">
                Competitions & Hackathons
              </h3>
              <div className="space-y-2">
                {COMPETITIONS.map((comp) => (
                  <div key={comp.name} className="flex items-start gap-2 text-sm">
                    <span className="text-accent mt-0.5 shrink-0">&#9679;</span>
                    <span>
                      <span className="text-foreground">{comp.name}</span>
                      <span className="text-muted-foreground">
                        {" — "}
                        {comp.detail}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
