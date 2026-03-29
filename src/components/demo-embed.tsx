"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function DemoEmbed({
  src,
  title,
  height = "600px",
}: {
  src: string;
  title: string;
  height?: string;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative rounded-lg border border-border overflow-hidden" style={{ height }}>
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <p className="text-sm text-muted-foreground font-mono">
            Loading demo (free tier may take 30s to wake up)...
          </p>
        </div>
      )}
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        loading="lazy"
        allow="accelerometer; camera; microphone"
        className={cn(
          "border-0 transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
