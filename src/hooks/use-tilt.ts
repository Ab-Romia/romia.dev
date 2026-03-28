"use client";

import { useRef, useCallback, useState, type CSSProperties, type MouseEvent } from "react";

export function useTilt(maxDeg = 4) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({
    transform: "perspective(800px) rotateX(0deg) rotateY(0deg)",
    transition: "transform 0.1s ease-out",
  });

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / rect.height) * -maxDeg * 2;
      const rotateY = ((x - centerX) / rect.width) * maxDeg * 2;
      setStyle({
        transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: "transform 0.1s ease-out",
      });
    },
    [maxDeg]
  );

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.4s ease-out",
    });
  }, []);

  return { ref, style, handlers: { onMouseMove, onMouseLeave } };
}
