"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ZaylonBrainOrb = dynamic(() => import("./zaylon-brain-orb"), {
  ssr: false,
  loading: () => <OrbPlaceholder />,
});

function OrbPlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div
        className="size-32 rounded-full opacity-40 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(52, 211, 153, 0.4) 0%, rgba(52, 211, 153, 0.1) 45%, transparent 75%)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
}

export function ZaylonBrainOrbLazy() {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldMount(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "200px 0px" },
    );

    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full h-full">
      {shouldMount ? <ZaylonBrainOrb /> : <OrbPlaceholder />}
    </div>
  );
}
