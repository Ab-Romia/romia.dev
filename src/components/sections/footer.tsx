"use client";

import { PERSONAL, NAV_LINKS } from "@/data/resume";
import { Mail } from "lucide-react";
import { Magnetic } from "@/components/magnetic";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065Zm1.782 13.019H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </svg>
  );
}

function HuggingFaceIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="currentColor" className={className}>
      <path d="M37.7 56.4c-1.5-.4-3 .5-3.4 2-.4 1.5.5 3 2 3.4 1.5.4 3-.5 3.4-2 .4-1.5-.5-3-2-3.4zm44.6 0c-1.5.4-2.4 1.9-2 3.4.4 1.5 1.9 2.4 3.4 2 1.5-.4 2.4-1.9 2-3.4-.4-1.5-1.9-2.4-3.4-2zM60 0C26.9 0 0 26.9 0 60s26.9 60 60 60 60-26.9 60-60S93.1 0 60 0zm0 110c-27.6 0-50-22.4-50-50S32.4 10 60 10s50 22.4 50 50-22.4 50-50 50zm22.8-62.5c2.8-3.2 4.5-7.3 4.5-11.8 0-1.7-.2-3.3-.7-4.9-.3-1-.4-2.1-.2-3.1.4-1.7-.7-3.3-2.4-3.7-1.7-.4-3.3.7-3.7 2.4-.3 1.5-.2 3.1.3 4.6.3 1 .5 2.1.5 3.2 0 5.5-4.5 10-10 10h-2.2c-5.5 0-10-4.5-10-10 0-1.1.2-2.2.5-3.2.4-1.5.6-3.1.3-4.6-.4-1.7-2-2.7-3.7-2.4-1.7.4-2.7 2-2.4 3.7.2 1 .1 2.1-.2 3.1-.4 1.6-.7 3.2-.7 4.9 0 4.5 1.7 8.6 4.5 11.8-5.5 2.9-9.8 8-11.5 14.2-.5 1.7.5 3.4 2.2 3.8 1.7.5 3.4-.5 3.8-2.2 1.8-6.5 7.8-11 14.7-11h2.2c6.9 0 12.9 4.5 14.7 11 .5 1.7 2.2 2.7 3.8 2.2 1.7-.5 2.7-2.2 2.2-3.8-1.7-6.2-6-11.3-11.5-14.2zM47 78c-1.2-1.2-2.7-1.8-4.3-1.8s-3.1.6-4.3 1.8c-1.2 1.2-1.8 2.7-1.8 4.3s.6 3.1 1.8 4.3c1.2 1.2 2.7 1.8 4.3 1.8s3.1-.6 4.3-1.8c1.2-1.2 1.8-2.7 1.8-4.3S48.2 79.2 47 78zm34.3 0c-1.2-1.2-2.7-1.8-4.3-1.8s-3.1.6-4.3 1.8c-1.2 1.2-1.8 2.7-1.8 4.3s.6 3.1 1.8 4.3c1.2 1.2 2.7 1.8 4.3 1.8s3.1-.6 4.3-1.8c1.2-1.2 1.8-2.7 1.8-4.3s-.6-3.1-1.8-4.3z" />
    </svg>
  );
}

const socialLinks = [
  { label: "GitHub", href: PERSONAL.links.github, Icon: GitHubIcon },
  { label: "LinkedIn", href: PERSONAL.links.linkedin, Icon: LinkedInIcon },
  { label: "Hugging Face", href: PERSONAL.links.huggingface, Icon: HuggingFaceIcon },
  { label: "Email", href: `mailto:${PERSONAL.email}`, Icon: Mail },
];

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

        <div className="flex items-center justify-center gap-4 mb-6">
          {socialLinks.map((link) => (
            <Magnetic key={link.label} strength={0.3}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <link.Icon className="size-5" />
              </a>
            </Magnetic>
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
