"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  m,
  LayoutGroup,
  useScroll,
  useReducedMotion,
} from "motion/react";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/data/resume";
import { SOCIAL_LINKS } from "@/components/social-icons";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { useActiveSection } from "@/hooks/use-active-section";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const { direction, isAtTop } = useScrollDirection();
  const { scrollYProgress } = useScroll();
  const sectionIds = useMemo(
    () => NAV_LINKS.map((link) => link.href.replace("#", "")),
    []
  );
  const activeSection = useActiveSection(sectionIds);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  const closeMenu = () => setMobileOpen(false);

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (mobileOpen) {
      wasOpen.current = true;
      document.body.style.overflow = "hidden";
      main?.toggleAttribute("inert", true);
    } else {
      document.body.style.overflow = "";
      main?.toggleAttribute("inert", false);
      // Restore focus only after the header's inert is gone; focusing an
      // inert subtree is silently ignored.
      if (wasOpen.current) {
        wasOpen.current = false;
        hamburgerRef.current?.focus();
      }
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (mobileOpen) window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      main?.removeAttribute("inert");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <>
      {/* Scroll progress bar */}
      <m.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-accent z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <header
        inert={mobileOpen}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-16 transition-transform duration-300 motion-reduce:transition-none",
          direction === "down" && !isAtTop && !mobileOpen
            ? "-translate-y-full"
            : "translate-y-0",
          isAtTop
            ? "bg-transparent"
            : "bg-background/80 backdrop-blur-sm border-b border-border"
        )}
      >
        <nav className="max-w-5xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
          <Link
            href="/#hero"
            aria-label="Romia home"
            className="group flex items-center gap-2.5 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" className="size-7 shrink-0">
              <defs>
                <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#34D399"/>
                  <stop offset="100%" stopColor="#10B981"/>
                </linearGradient>
              </defs>
              <rect width="32" height="32" rx="7" fill="#111113" />
              <path d="M7 11l6 5-6 5" fill="none" stroke="url(#logo-g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="16" y1="21" x2="25" y2="21" stroke="url(#logo-g)" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <span className="text-sm font-mono tracking-[0.15em] uppercase text-foreground group-hover:text-accent transition-colors">
              romia<span className="text-accent">.</span>dev
            </span>
          </Link>

          {/* Desktop navigation. Breaks at lg rather than md: eight links plus
              the theme toggle and the resume button do not fit a tablet. */}
          <div className="hidden lg:flex items-center gap-1">
            <LayoutGroup>
              {NAV_LINKS.map((link) => {
                const isRouteLink = !link.href.startsWith("#");
                const isActive = isRouteLink
                  ? pathname.startsWith(link.href)
                  : pathname === "/" &&
                    activeSection === link.href.replace("#", "");
                const Comp = isRouteLink ? Link : "a";
                const hrefProp = isRouteLink ? link.href : `/${link.href}`;
                return (
                  <Comp
                    key={link.href}
                    href={hrefProp}
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? "text-accent"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <m.span
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-2 right-2 h-0.5 bg-accent rounded-full"
                        transition={
                          reduceMotion
                            ? { duration: 0 }
                            : { type: "spring", stiffness: 350, damping: 30 }
                        }
                      />
                    )}
                  </Comp>
                );
              })}
            </LayoutGroup>
            <ThemeToggle />
            <a
              href="/resume.pdf"
              download
              className="ml-1 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors"
            >
              <Download className="size-4" />
              Resume
            </a>
          </div>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-1">
            <ThemeToggle className="p-3.5" />
            <button
              ref={hamburgerRef}
              onClick={() => setMobileOpen(true)}
              className="p-3 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            animate={reduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { x: "100%" }}
            transition={
              reduceMotion
                ? { duration: 0.1 }
                : { type: "spring", damping: 25, stiffness: 200 }
            }
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between h-16 px-6 shrink-0">
              <span className="text-sm font-mono tracking-[0.15em] uppercase text-foreground">
                romia<span className="text-accent">.</span>dev
              </span>
              <button
                onClick={closeMenu}
                className="p-3 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close menu"
                autoFocus
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col items-center justify-center gap-6 overflow-y-auto overscroll-contain px-6 py-8">
              {NAV_LINKS.map((link) => {
                const isRouteLink = !link.href.startsWith("#");
                const isActive = isRouteLink
                  ? pathname.startsWith(link.href)
                  : pathname === "/" &&
                    activeSection === link.href.replace("#", "");
                const Comp = isRouteLink ? Link : "a";
                const hrefProp = isRouteLink ? link.href : `/${link.href}`;
                return (
                  <Comp
                    key={link.href}
                    href={hrefProp}
                    onClick={closeMenu}
                    className={cn(
                      "text-2xl font-medium transition-colors",
                      isActive
                        ? "text-accent"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Comp>
                );
              })}
              <a
                href="/resume.pdf"
                download
                onClick={closeMenu}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors mt-4"
              >
                <Download className="size-5" />
                Download Resume
              </a>
              <div className="flex items-center justify-center gap-2 mt-8">
                {SOCIAL_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    onClick={() => setMobileOpen(false)}
                    className="p-3 text-muted-foreground hover:text-accent transition-colors"
                  >
                    <link.Icon className="size-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
