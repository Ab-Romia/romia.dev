"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDownToLine, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, PERSONAL } from "@/data/resume";
import { SOCIAL_LINKS } from "@/components/social-icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { useActiveSection } from "@/hooks/use-active-section";

// Module scope so the hook sees a stable array and observes once.
const SECTION_IDS = NAV_LINKS.filter((l) => l.href.startsWith("#")).map((l) =>
  l.href.slice(1)
);

/** Hash links resolve against the homepage, so they work from every route. */
function hrefFor(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

export function Navbar() {
  const pathname = usePathname();
  const activeSection = useActiveSection(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href.startsWith("#")
      ? pathname === "/" && activeSection === href.slice(1)
      : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200",
        open
          ? "border-border bg-background"
          : scrolled
            ? "border-border bg-background/85 backdrop-blur-md"
            : "border-transparent bg-background/0"
      )}
    >
      <span
        aria-hidden="true"
        className="scroll-progress absolute inset-x-0 top-0 h-0.5 bg-accent"
      />
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8"
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-full"
          aria-label={`${PERSONAL.name}, home`}
        >
          <Image
            src="/avatar.jpg"
            alt=""
            width={32}
            height={32}
            priority
            className="size-8 rounded-full object-cover ring-1 ring-border"
          />
          {/* The full name wraps on the narrowest phones; the hero repeats it. */}
          <span className="whitespace-nowrap text-[15px] font-medium tracking-[-0.005em]">
            <span className="min-[400px]:hidden">{PERSONAL.displayName}</span>
            <span className="hidden min-[400px]:inline">{PERSONAL.name}</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <ul className="flex items-center">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={hrefFor(link.href)}
                  aria-current={isActive(link.href) ? "true" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors",
                    isActive(link.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <a
            href="/resume.pdf"
            download
            className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-border-strong px-3.5 py-1.5 text-sm transition-colors hover:border-foreground"
          >
            Résumé
            <ArrowDownToLine className="size-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="flex items-center lg:hidden">
          <ThemeToggle />
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 p-2.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-border lg:hidden">
          <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={hrefFor(link.href)}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between border-b border-border py-3.5 display-md"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mx-auto flex max-w-6xl items-center justify-between px-5 pb-5 pt-2 sm:px-8">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-sm"
            >
              Résumé
              <ArrowDownToLine className="size-3.5" aria-hidden="true" />
            </a>
            <div className="flex items-center">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-2.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <s.Icon className="size-[18px]" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
