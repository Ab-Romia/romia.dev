"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const ROWS = 6;
const COLS = 7;
const EMPTY = 0;
const PLAYER = 1;
const AI = 2;
const DEPTH = 5;

type Board = number[][];

function createBoard(): Board {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));
}

function clone(board: Board): Board {
  return board.map((r) => [...r]);
}

function drop(board: Board, col: number, piece: number): { board: Board; row: number } | null {
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === EMPTY) {
      const b = clone(board);
      b[r][col] = piece;
      return { board: b, row: r };
    }
  }
  return null;
}

function checkWin(board: Board, piece: number): [number, number][] | null {
  const dirs = [[0, 1], [1, 0], [1, 1], [1, -1]];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c] !== piece) continue;
      for (const [dr, dc] of dirs) {
        const cells: [number, number][] = [];
        let ok = true;
        for (let i = 0; i < 4; i++) {
          const nr = r + dr * i;
          const nc = c + dc * i;
          if (nr < 0 || nr >= ROWS || nc < 0 || nc >= COLS || board[nr][nc] !== piece) {
            ok = false;
            break;
          }
          cells.push([nr, nc]);
        }
        if (ok) return cells;
      }
    }
  }
  return null;
}

function isFull(board: Board): boolean {
  return board[0].every((c) => c !== EMPTY);
}

function validCols(board: Board): number[] {
  return Array.from({ length: COLS }, (_, i) => i).filter((c) => board[0][c] === EMPTY);
}

function scoreWindow(window: number[]): number {
  const ai = window.filter((c) => c === AI).length;
  const pl = window.filter((c) => c === PLAYER).length;
  const em = window.filter((c) => c === EMPTY).length;
  if (ai === 4) return 100;
  if (ai === 3 && em === 1) return 5;
  if (ai === 2 && em === 2) return 2;
  if (pl === 4) return -100;
  if (pl === 3 && em === 1) return -4;
  return 0;
}

function evaluate(board: Board): number {
  let score = 0;
  // Center column preference
  for (let r = 0; r < ROWS; r++) if (board[r][3] === AI) score += 3;
  // Horizontal
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c <= COLS - 4; c++)
      score += scoreWindow([board[r][c], board[r][c + 1], board[r][c + 2], board[r][c + 3]]);
  // Vertical
  for (let c = 0; c < COLS; c++)
    for (let r = 0; r <= ROWS - 4; r++)
      score += scoreWindow([board[r][c], board[r + 1][c], board[r + 2][c], board[r + 3][c]]);
  // Diagonal
  for (let r = 0; r <= ROWS - 4; r++)
    for (let c = 0; c <= COLS - 4; c++)
      score += scoreWindow([board[r][c], board[r + 1][c + 1], board[r + 2][c + 2], board[r + 3][c + 3]]);
  for (let r = 0; r <= ROWS - 4; r++)
    for (let c = 3; c < COLS; c++)
      score += scoreWindow([board[r][c], board[r + 1][c - 1], board[r + 2][c - 2], board[r + 3][c - 3]]);
  return score;
}

function minimax(board: Board, depth: number, alpha: number, beta: number, maximizing: boolean): number {
  if (checkWin(board, AI)) return 10000 + depth;
  if (checkWin(board, PLAYER)) return -10000 - depth;
  if (isFull(board) || depth === 0) return evaluate(board);

  const cols = validCols(board);
  if (maximizing) {
    let max = -Infinity;
    for (const c of cols) {
      const result = drop(board, c, AI);
      if (!result) continue;
      const val = minimax(result.board, depth - 1, alpha, beta, false);
      max = Math.max(max, val);
      alpha = Math.max(alpha, val);
      if (beta <= alpha) break;
    }
    return max;
  } else {
    let min = Infinity;
    for (const c of cols) {
      const result = drop(board, c, PLAYER);
      if (!result) continue;
      const val = minimax(result.board, depth - 1, alpha, beta, true);
      min = Math.min(min, val);
      beta = Math.min(beta, val);
      if (beta <= alpha) break;
    }
    return min;
  }
}

function bestMove(board: Board): number {
  let best = -1;
  let bestScore = -Infinity;
  // Prioritize center columns for evaluation order
  const cols = validCols(board).sort((a, b) => Math.abs(a - 3) - Math.abs(b - 3));
  for (const c of cols) {
    const result = drop(board, c, AI);
    if (!result) continue;
    const score = minimax(result.board, DEPTH - 1, -Infinity, Infinity, false);
    if (score > bestScore) {
      bestScore = score;
      best = c;
    }
  }
  return best;
}

export function Connect4Game() {
  const [board, setBoard] = useState(createBoard);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(0);
  const [thinking, setThinking] = useState(false);
  const [winCells, setWinCells] = useState<[number, number][]>([]);
  const [hoverCol, setHoverCol] = useState<number | null>(null);

  const isWinCell = useCallback(
    (r: number, c: number) => winCells.some(([wr, wc]) => wr === r && wc === c),
    [winCells]
  );

  const handleClick = useCallback(
    (col: number) => {
      if (gameOver || thinking || board[0][col] !== EMPTY) return;

      const result = drop(board, col, PLAYER);
      if (!result) return;

      const win = checkWin(result.board, PLAYER);
      if (win) {
        setBoard(result.board);
        setWinCells(win);
        setWinner(PLAYER);
        setGameOver(true);
        return;
      }
      if (isFull(result.board)) {
        setBoard(result.board);
        setGameOver(true);
        return;
      }

      setBoard(result.board);
      setThinking(true);

      setTimeout(() => {
        const aiCol = bestMove(result.board);
        const aiResult = drop(result.board, aiCol, AI);
        if (!aiResult) { setThinking(false); return; }

        const aiWin = checkWin(aiResult.board, AI);
        if (aiWin) {
          setBoard(aiResult.board);
          setWinCells(aiWin);
          setWinner(AI);
          setGameOver(true);
          setThinking(false);
          return;
        }
        if (isFull(aiResult.board)) {
          setBoard(aiResult.board);
          setGameOver(true);
          setThinking(false);
          return;
        }

        setBoard(aiResult.board);
        setThinking(false);
      }, 200);
    },
    [board, gameOver, thinking]
  );

  const reset = () => {
    setBoard(createBoard());
    setGameOver(false);
    setWinner(0);
    setThinking(false);
    setWinCells([]);
    setHoverCol(null);
  };

  const status = gameOver
    ? winner === PLAYER
      ? "You win!"
      : winner === AI
      ? "AI wins!"
      : "Draw!"
    : thinking
    ? "AI thinking..."
    : "Your turn (click a column)";

  return (
    <div className="max-w-sm mx-auto">
      <div className="flex items-center justify-between mb-4">
        <p className={cn("text-sm font-medium", gameOver && winner === PLAYER && "text-accent")}>
          {status}
        </p>
        <button
          onClick={reset}
          className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors px-3 py-1 rounded border border-border hover:border-accent/30"
        >
          New Game
        </button>
      </div>

      <div className="bg-card border border-border rounded-lg p-2 sm:p-3">
        {/* Column hover zones */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
          {Array.from({ length: COLS }, (_, c) => (
            <button
              key={`top-${c}`}
              className={cn(
                "aspect-square rounded-full transition-colors",
                hoverCol === c && !gameOver && !thinking && board[0][c] === EMPTY
                  ? "bg-accent/30"
                  : "bg-transparent"
              )}
              onMouseEnter={() => setHoverCol(c)}
              onMouseLeave={() => setHoverCol(null)}
              onClick={() => handleClick(c)}
              disabled={gameOver || thinking}
              aria-label={`Drop in column ${c + 1}`}
            />
          ))}
        </div>

        {/* Board */}
        {board.map((row, r) => (
          <div key={r} className="grid grid-cols-7 gap-1 sm:gap-1.5 mb-1 sm:mb-1.5 last:mb-0">
            {row.map((cell, c) => (
              <button
                key={`${r}-${c}`}
                className={cn(
                  "aspect-square rounded-full transition-all duration-200 border-2",
                  cell === EMPTY && "bg-muted/30 border-transparent",
                  cell === PLAYER && "bg-accent border-accent/50",
                  cell === AI && "bg-red-500 border-red-400/50",
                  isWinCell(r, c) && "ring-2 ring-white animate-pulse scale-105"
                )}
                onMouseEnter={() => setHoverCol(c)}
                onMouseLeave={() => setHoverCol(null)}
                onClick={() => handleClick(c)}
                disabled={gameOver || thinking}
                aria-label={`Row ${r + 1}, Column ${c + 1}`}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 mt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-accent" /> You
        </span>
        <span className="flex items-center gap-1.5">
          <span className="size-3 rounded-full bg-red-500" /> AI
        </span>
      </div>
    </div>
  );
}
