"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { ZaylonCoreLogo } from "./zaylon-brain-orb";

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
      {/* 3D scene fills the container */}
      <div className="absolute inset-0">
        {shouldMount ? <ZaylonBrainOrb /> : <OrbPlaceholder />}
      </div>

      {/* Z logo, dead-centered on the canvas and always on top of the scene.
          The inner backdrop disc sits behind the logo to visually anchor it
          inside the wireframe core. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
          {/* Soft disc backdrop that reads as the core's interior */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(16, 120, 92, 0.55) 0%, rgba(52, 211, 153, 0.25) 35%, rgba(52, 211, 153, 0.08) 60%, transparent 75%)",
              filter: "blur(6px)",
            }}
          />
          <div className="zaylon-core-logo relative">
            <ZaylonCoreLogo size={96} />
          </div>
        </div>
      </div>
    </div>
  );
}
