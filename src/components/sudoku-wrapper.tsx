"use client";

import dynamic from "next/dynamic";

const SudokuGame = dynamic(
  () => import("@/components/sudoku-game").then((m) => m.SudokuGame),
  { ssr: false, loading: () => <div className="h-96 bg-muted animate-pulse rounded-lg" /> }
);

export function SudokuWrapper() {
  return <SudokuGame />;
}
