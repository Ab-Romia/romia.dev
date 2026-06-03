"use client";

import { type ReactNode, useRef, useEffect } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useMotionValue,
  useTransform,
  useInView,
  useReducedMotion,
  animate,
  type HTMLMotionProps,
  LayoutGroup,
} from "motion/react";

// ---------------------------------------------------------------------------
// Motion tokens. One source of truth so every reveal shares a coherent rhythm
// and timing/easing can be tuned in a single place.
// ---------------------------------------------------------------------------
type Cubic = [number, number, number, number];

// Expressive entrance: fast start, long soft settle. Reads as intentional.
const EASE_OUT_EXPO: Cubic = [0.16, 1, 0.3, 1];
// Snappy entrance for smaller, supporting elements.
const EASE_OUT_SOFT: Cubic = [0.22, 1, 0.36, 1];

const SPRING_GENTLE = { type: "spring", stiffness: 120, damping: 18 } as const;

// Fire as the element enters from the bottom rather than after it is already
// well inside the viewport (which reads as pop-in on fast scroll).
const VIEWPORT = { once: true, amount: 0.2 } as const;

// Wraps the whole tree once so subsequent `m.*` usages do not re-register features.
function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

function FadeUp({
  children,
  delay = 0,
  y = 16,
  duration = 0.5,
  className,
  ...props
}: {
  children: ReactNode;
  delay?: number;
  /** Travel distance. Headings travel further than supporting text. */
  y?: number;
  duration?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">) {
  const reduce = useReducedMotion();
  return (
    <m.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={
        reduce
          ? { duration: 0.2, delay: 0 }
          : { duration, delay, ease: EASE_OUT_EXPO }
      }
      className={className}
      {...props}
    >
      {children}
    </m.div>
  );
}

function StaggerContainer({
  children,
  className,
  stagger = 0.06,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 14 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.45, ease: EASE_OUT_EXPO },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

function BlurIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return (
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.2 }}
        className={className}
      >
        {children}
      </m.div>
    );
  }
  return (
    <m.div
      initial={{ opacity: 0, filter: "blur(6px)", y: 8 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.55, delay, ease: EASE_OUT_EXPO }}
      className={className}
    >
      {children}
    </m.div>
  );
}

function SlideFromLeft({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={VIEWPORT}
      transition={reduce ? { duration: 0.2 } : { delay, ...SPRING_GENTLE }}
      className={className}
    >
      {children}
    </m.div>
  );
}

function ScaleUp({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={reduce ? { duration: 0.2 } : { delay, ...SPRING_GENTLE }}
      className={className}
    >
      {children}
    </m.div>
  );
}

function TextReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  // Reduced motion: show the text immediately, no per-character animation.
  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <m.span
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: 0.025, delayChildren: delay },
        },
      }}
      className={className}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <m.span
          key={`${char}-${i}`}
          variants={{
            hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.45, ease: EASE_OUT_EXPO },
            },
          }}
          className="inline-block"
          aria-hidden
        >
          {char === " " ? " " : char}
        </m.span>
      ))}
    </m.span>
  );
}

function CountUp({
  value,
  suffix = "",
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v));
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (reduce) {
      motionValue.set(value);
      return;
    }
    const controls = animate(motionValue, value, {
      duration: 1.1,
      ease: EASE_OUT_SOFT,
    });
    return () => controls.stop();
  }, [isInView, motionValue, value, reduce]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${v}${suffix}`;
      }
    });
    return unsubscribe;
  }, [rounded, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}

function StaggerItemScale({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: SPRING_GENTLE,
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

export {
  FadeUp,
  StaggerContainer,
  StaggerItem,
  BlurIn,
  SlideFromLeft,
  ScaleUp,
  TextReveal,
  CountUp,
  StaggerItemScale,
  MotionProvider,
  LayoutGroup,
  m,
  EASE_OUT_EXPO,
  EASE_OUT_SOFT,
  SPRING_GENTLE,
};
