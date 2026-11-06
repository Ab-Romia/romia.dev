import { PERSONAL } from "@/data/resume";
import { SOCIAL_LINKS } from "@/components/social-icons";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {PERSONAL.name}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {SOCIAL_LINKS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="link-underline text-muted-foreground transition-colors hover:text-foreground"
              >
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/resume.pdf"
              download
              className="link-underline text-muted-foreground transition-colors hover:text-foreground"
            >
              Résumé
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
