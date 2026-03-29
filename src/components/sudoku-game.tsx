"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

type Board = (number | null)[][];

function generatePuzzle(): { puzzle: Board; solution: Board } {
  const solution = createSolvedBoard();
  const puzzle = solution.map((r) => [...r]) as Board;
  // Remove ~45 cells for a medium difficulty puzzle
  const positions = Array.from({ length: 81 }, (_, i) => i);
  shuffle(positions);
  for (let i = 0; i < 45; i++) {
    const r = Math.floor(positions[i] / 9);
    const c = positions[i] % 9;
    puzzle[r][c] = null;
  }
  return { puzzle, solution };
}

function shuffle(arr: number[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function createSolvedBoard(): number[][] {
  const board: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillBoard(board);
  return board;
}

function fillBoard(board: number[][]): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== 0) continue;
      const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      shuffle(nums);
      for (const n of nums) {
        if (isValid(board, r, c, n)) {
          board[r][c] = n;
          if (fillBoard(board)) return true;
          board[r][c] = 0;
        }
      }
      return false;
    }
  }
  return true;
}

function isValid(board: number[][], row: number, col: number, num: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }
  const br = Math.floor(row / 3) * 3;
  const bc = Math.floor(col / 3) * 3;
  for (let r = br; r < br + 3; r++)
    for (let c = bc; c < bc + 3; c++)
      if (board[r][c] === num) return false;
  return true;
}

function solveWithCSP(board: Board): Board | null {
  const b = board.map((r) => r.map((v) => v ?? 0));
  if (solveBoardCSP(b)) return b;
  return null;
}

function solveBoardCSP(board: number[][]): boolean {
  // MRV: find empty cell with fewest candidates
  let minCands = 10;
  let bestR = -1;
  let bestC = -1;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== 0) continue;
      let count = 0;
      for (let n = 1; n <= 9; n++) if (isValid(board, r, c, n)) count++;
      if (count === 0) return false;
      if (count < minCands) {
        minCands = count;
        bestR = r;
        bestC = c;
      }
    }
  }
  if (bestR === -1) return true; // all filled

  for (let n = 1; n <= 9; n++) {
    if (!isValid(board, bestR, bestC, n)) continue;
    board[bestR][bestC] = n;
    if (solveBoardCSP(board)) return true;
    board[bestR][bestC] = 0;
  }
  return false;
}

export function SudokuGame() {
  const [{ puzzle, solution }, setGame] = useState(generatePuzzle);
  const [userBoard, setUserBoard] = useState<Board>(() => puzzle.map((r) => [...r]));
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [solved, setSolved] = useState(false);
  const [errors, setErrors] = useState<Set<string>>(new Set());

  const isGiven = useCallback(
    (r: number, c: number) => puzzle[r][c] !== null,
    [puzzle]
  );

  const handleCellClick = (r: number, c: number) => {
    if (solved || isGiven(r, c)) return;
    setSelected([r, c]);
  };

  const handleNumberInput = useCallback(
    (num: number) => {
      if (!selected || solved) return;
      const [r, c] = selected;
      if (isGiven(r, c)) return;

      const newBoard = userBoard.map((row) => [...row]);
      newBoard[r][c] = num === 0 ? null : num;
      setUserBoard(newBoard);

      // Check errors
      const newErrors = new Set<string>();
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          const val = newBoard[row][col];
          if (val === null) continue;
          if (val !== solution[row][col]) {
            newErrors.add(`${row}-${col}`);
          }
        }
      }
      setErrors(newErrors);

      // Check win
      if (newErrors.size === 0 && newBoard.every((row) => row.every((v) => v !== null))) {
        setSolved(true);
      }
    },
    [selected, solved, userBoard, solution, isGiven]
  );

  const handleSolve = () => {
    const result = solveWithCSP(puzzle);
    if (result) {
      setUserBoard(result);
      setSolved(true);
      setErrors(new Set());
      setSelected(null);
    }
  };

  const handleNew = () => {
    const g = generatePuzzle();
    setGame(g);
    setUserBoard(g.puzzle.map((r) => [...r]));
    setSelected(null);
    setSolved(false);
    setErrors(new Set());
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!selected) return;
      const num = parseInt(e.key);
      if (num >= 1 && num <= 9) handleNumberInput(num);
      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") handleNumberInput(0);

      const [r, c] = selected;
      if (e.key === "ArrowUp" && r > 0) setSelected([r - 1, c]);
      if (e.key === "ArrowDown" && r < 8) setSelected([r + 1, c]);
      if (e.key === "ArrowLeft" && c > 0) setSelected([r, c - 1]);
      if (e.key === "ArrowRight" && c < 8) setSelected([r, c + 1]);
    },
    [selected, handleNumberInput]
  );

  return (
    <div className="max-w-sm mx-auto" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="flex items-center justify-between mb-4">
        <p className={cn("text-sm font-medium", solved && "text-accent")}>
          {solved ? "Solved!" : "Fill in the blanks"}
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleSolve}
            disabled={solved}
            className="text-xs font-mono text-accent hover:text-accent-muted transition-colors px-3 py-1 rounded border border-accent/30 hover:border-accent disabled:opacity-50"
          >
            AI Solve
          </button>
          <button
            onClick={handleNew}
            className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors px-3 py-1 rounded border border-border hover:border-accent/30"
          >
            New Puzzle
          </button>
        </div>
      </div>

      {/* Board */}
      <div className="bg-card border-2 border-foreground/20 rounded-lg overflow-hidden">
        {userBoard.map((row, r) => (
          <div key={r} className={cn("flex", r % 3 === 2 && r < 8 && "border-b-2 border-foreground/20")}>
            {row.map((cell, c) => {
              const isSelected = selected?.[0] === r && selected?.[1] === c;
              const sameNum = selected && cell !== null && cell === userBoard[selected[0]][selected[1]];
              const sameRowCol = selected && (selected[0] === r || selected[1] === c);
              const sameBox =
                selected &&
                Math.floor(selected[0] / 3) === Math.floor(r / 3) &&
                Math.floor(selected[1] / 3) === Math.floor(c / 3);
              const hasError = errors.has(`${r}-${c}`);

              return (
                <button
                  key={c}
                  onClick={() => handleCellClick(r, c)}
                  className={cn(
                    "size-9 sm:size-10 flex items-center justify-center text-sm sm:text-base font-mono transition-colors",
                    c % 3 === 2 && c < 8 && "border-r-2 border-foreground/20",
                    c % 3 !== 2 && c < 8 && "border-r border-border",
                    r < 8 && r % 3 !== 2 && "border-b border-border",
                    isSelected && "bg-accent/20",
                    !isSelected && (sameRowCol || sameBox) && "bg-muted/50",
                    !isSelected && sameNum && "bg-accent/10",
                    isGiven(r, c) ? "text-foreground font-semibold" : "text-accent",
                    hasError && "text-red-500",
                    !isGiven(r, c) && !solved && "cursor-pointer hover:bg-muted/30"
                  )}
                  disabled={solved && !isGiven(r, c)}
                  aria-label={`Row ${r + 1}, Column ${c + 1}${cell ? `, value ${cell}` : ", empty"}`}
                >
                  {cell || ""}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Number pad */}
      {!solved && (
        <div className="grid grid-cols-9 gap-1 mt-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <button
              key={n}
              onClick={() => handleNumberInput(n)}
              className="aspect-square rounded text-sm font-mono bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
            >
              {n}
            </button>
          ))}
        </div>
      )}

      <p className="text-[10px] text-muted-foreground mt-3 text-center">
        Click a cell, then click a number or use keyboard (1-9, arrows, backspace)
      </p>
    </div>
  );
}
