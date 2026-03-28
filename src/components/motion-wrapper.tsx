"use client";

import { type ReactNode } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  type HTMLMotionProps,
} from "motion/react";

function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

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

export { FadeUp, StaggerContainer, StaggerItem };
