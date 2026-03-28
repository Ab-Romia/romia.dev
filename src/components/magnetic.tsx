"use client";

import { useRef, useCallback, useState, type ReactNode, type CSSProperties } from "react";

export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({
    transform: "translate(0px, 0px)",
    transition: "transform 0.15s ease-out",
  });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) * strength;
      const dy = (e.clientY - centerY) * strength;
      setStyle({
        transform: `translate(${dx}px, ${dy}px)`,
        transition: "transform 0.15s ease-out",
      });
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: "translate(0px, 0px)",
      transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    });
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={style}
      className={className}
    >
      {children}
    </div>
  );
}
