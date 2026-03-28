"use client";

import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m } from "motion/react";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS, PERSONAL } from "@/data/resume";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { useActiveSection } from "@/hooks/use-active-section";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const { direction, isAtTop } = useScrollDirection();
  const sectionIds = useMemo(
    () => NAV_LINKS.map((link) => link.href.replace("#", "")),
    []
  );
  const activeSection = useActiveSection(sectionIds);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <LazyMotion features={domAnimation}>
      <header
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
          <a
            href="#hero"
            className="text-lg font-bold tracking-tight text-foreground hover:text-accent transition-colors"
          >
            {PERSONAL.displayName}
          </a>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const sectionId = link.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              );
            })}
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

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Open menu"
          >
            <Menu className="size-5" />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md md:hidden"
          >
            <div className="flex items-center justify-between h-16 px-6">
              <span className="text-lg font-bold tracking-tight text-foreground">
                {PERSONAL.displayName}
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close menu"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center gap-6 pt-16">
              {NAV_LINKS.map((link) => {
                const sectionId = link.href.replace("#", "");
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "text-2xl font-medium transition-colors",
                      isActive
                        ? "text-accent"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}
              <a
                href="/resume.pdf"
                download
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg bg-accent text-accent-foreground hover:bg-accent/90 transition-colors mt-4"
              >
                <Download className="size-5" />
                Download Resume
              </a>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
