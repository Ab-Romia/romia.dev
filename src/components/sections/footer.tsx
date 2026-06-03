"use client";

import { NAV_LINKS } from "@/data/resume";
import { SOCIAL_LINKS } from "@/components/social-icons";

export function Footer() {
  return (
    <footer className="border-t border-border py-10 mt-auto">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-6 mb-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="p-2.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <link.Icon className="size-5" aria-hidden="true" />
            </a>
          ))}
        </div>

        <div className="pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Abdelrahman Abouroumia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
