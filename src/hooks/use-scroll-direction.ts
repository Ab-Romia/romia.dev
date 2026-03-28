"use client";

import { useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

export function useScrollDirection(threshold = 50) {
  const { scrollY } = useScroll();
  const [direction, setDirection] = useState<"up" | "down">("up");
  const [isAtTop, setIsAtTop] = useState(true);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsAtTop(current < threshold);
    if (current > previous && current > threshold) {
      setDirection("down");
    } else if (current < previous) {
      setDirection("up");
    }
  });

  return { direction, isAtTop };
}
