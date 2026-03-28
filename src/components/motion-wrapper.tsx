"use client";

import { type ReactNode, useRef, useEffect } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useMotionValue,
  useTransform,
  useInView,
  animate,
  type HTMLMotionProps,
  LayoutGroup,
} from "motion/react";

function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

// --- Existing animations (kept for backward compat) ---

function FadeUp({
  children,
  delay = 0,
  className,
  ...props
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">) {
  return (
    <MotionProvider>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay, ease: "easeOut" }}
        className={className}
        {...props}
      >
        {children}
      </m.div>
    </MotionProvider>
  );
}

function StaggerContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <MotionProvider>
      <m.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
        className={className}
      >
        {children}
      </m.div>
    </MotionProvider>
  );
}

function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

// --- New animation variants ---

function BlurIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <MotionProvider>
      <m.div
        initial={{ opacity: 0, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay, ease: "easeOut" }}
        className={className}
      >
        {children}
      </m.div>
    </MotionProvider>
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
  return (
    <MotionProvider>
      <m.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.5,
          delay,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className={className}
      >
        {children}
      </m.div>
    </MotionProvider>
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
  return (
    <MotionProvider>
      <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.4,
          delay,
          type: "spring",
          stiffness: 150,
          damping: 20,
        }}
        className={className}
      >
        {children}
      </m.div>
    </MotionProvider>
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
  return (
    <MotionProvider>
      <m.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.03, delayChildren: delay },
          },
        }}
        className={className}
        aria-label={text}
      >
        {text.split("").map((char, i) => (
          <m.span
            key={`${char}-${i}`}
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
              visible: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.4 },
              },
            }}
            className="inline-block"
            aria-hidden
          >
            {char === " " ? "\u00A0" : char}
          </m.span>
        ))}
      </m.span>
    </MotionProvider>
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
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, { duration: 1.5, ease: "easeOut" });
    }
  }, [isInView, motionValue, value]);

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
  return (
    <m.div
      variants={{
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.4,
            type: "spring",
            stiffness: 150,
          },
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
};
