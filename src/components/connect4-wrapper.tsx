"use client";

import dynamic from "next/dynamic";

const Connect4Game = dynamic(
  () => import("@/components/connect4-game").then((m) => m.Connect4Game),
  { ssr: false, loading: () => <div className="h-96 bg-muted animate-pulse rounded-lg" /> }
);

export function Connect4Wrapper() {
  return <Connect4Game />;
}
