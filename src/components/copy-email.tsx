"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { PERSONAL } from "@/data/resume";
import { cn } from "@/lib/utils";

export function CopyEmail({ className }: { className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(PERSONAL.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard access can be refused; the address is still a mailto link.
    }
  }

  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      <a href={`mailto:${PERSONAL.email}`} className="link">
        {PERSONAL.email}
      </a>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Email address copied" : "Copy email address"}
        className="rounded-md p-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        {copied ? (
          <Check className="size-3.5" aria-hidden="true" />
        ) : (
          <Copy className="size-3.5" aria-hidden="true" />
        )}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </span>
  );
}
