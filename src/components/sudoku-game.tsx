"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

type CellValue = number | null;
type Board = CellValue[][];
type Notes = Set<number>[][];
type Difficulty = "Easy" | "Medium" | "Hard" | "Expert";

const REMOVE_COUNT: Record<Difficulty, number> = {
  Easy: 35,
  Medium: 45,
  Hard: 52,
  Expert: 58,
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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
  return false || true ? board[row][col] === 0 || board[row][col] === num : false;
}

function isValidPlacement(board: number[][], row: number, col: number, num: number): boolean {
  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i] === num) return false;
    if (i !== row && board[i][col] === num) return false;
  }
  const br = Math.floor(row / 3) * 3;
  const bc = Math.floor(col / 3) * 3;
  for (let r = br; r < br + 3; r++)
    for (let c = bc; c < bc + 3; c++)
      if (r !== row && c !== col && board[r][c] === num) return false;
  return true;
}

function fillBoard(board: number[][]): boolean {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== 0) continue;
      for (const n of shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])) {
        if (isValidPlacement(board, r, c, n)) {
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

function generatePuzzle(difficulty: Difficulty): { puzzle: Board; solution: Board } {
  const board: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillBoard(board);
  const solution: Board = board.map((r) => [...r]);
  const puzzle: Board = board.map((r) => [...r]);

  const positions = shuffle(Array.from({ length: 81 }, (_, i) => i));
  const toRemove = REMOVE_COUNT[difficulty];
  for (let i = 0; i < toRemove && i < positions.length; i++) {
    const r = Math.floor(positions[i] / 9);
    const c = positions[i] % 9;
    puzzle[r][c] = null;
  }
  return { puzzle, solution };
}

function createEmptyNotes(): Notes {
  return Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => new Set<number>())
  );
}

function solveCSP(board: Board): Board | null {
  const b = board.map((r) => r.map((v) => v ?? 0));
  if (solveWithMRV(b)) return b;
  return null;
}

function solveWithMRV(board: number[][]): boolean {
  let minCands = 10;
  let bestR = -1;
  let bestC = -1;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (board[r][c] !== 0) continue;
      let count = 0;
      for (let n = 1; n <= 9; n++) if (isValidPlacement(board, r, c, n)) count++;
      if (count === 0) return false;
      if (count < minCands) { minCands = count; bestR = r; bestC = c; }
    }
  }
  if (bestR === -1) return true;
  for (let n = 1; n <= 9; n++) {
    if (!isValidPlacement(board, bestR, bestC, n)) continue;
    board[bestR][bestC] = n;
    if (solveWithMRV(board)) return true;
    board[bestR][bestC] = 0;
  }
  return false;
}

export function SudokuGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [{ puzzle, solution }, setGame] = useState(() => generatePuzzle("Medium"));
  const [userBoard, setUserBoard] = useState<Board>(() => puzzle.map((r) => [...r]));
  const [notes, setNotes] = useState<Notes>(createEmptyNotes);
  const [noteMode, setNoteMode] = useState(false);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [solved, setSolved] = useState(false);
  const [errors, setErrors] = useState<Set<string>>(new Set());

  const isGiven = useCallback(
    (r: number, c: number) => puzzle[r][c] !== null,
    [puzzle]
  );

  const newGame = useCallback((diff: Difficulty) => {
    setDifficulty(diff);
    const g = generatePuzzle(diff);
    setGame(g);
    setUserBoard(g.puzzle.map((r) => [...r]));
    setNotes(createEmptyNotes());
    setSelected(null);
    setSolved(false);
    setErrors(new Set());
    setNoteMode(false);
  }, []);

  const handleCellClick = (r: number, c: number) => {
    if (solved) return;
    setSelected([r, c]);
  };

  const handleNumberInput = useCallback(
    (num: number) => {
      if (!selected || solved) return;
      const [r, c] = selected;
      if (isGiven(r, c)) return;

      if (noteMode) {
        const newNotes = notes.map((row) => row.map((s) => new Set(s)));
        if (num === 0) {
          newNotes[r][c].clear();
        } else {
          if (newNotes[r][c].has(num)) newNotes[r][c].delete(num);
          else newNotes[r][c].add(num);
        }
        setNotes(newNotes);
        return;
      }

      const newBoard = userBoard.map((row) => [...row]);
      newBoard[r][c] = num === 0 ? null : num;

      // Clear notes for this cell when placing a number
      if (num !== 0) {
        const newNotes2 = notes.map((row) => row.map((s) => new Set(s)));
        newNotes2[r][c].clear();
        // Also remove this number from notes in same row/col/box
        for (let i = 0; i < 9; i++) {
          newNotes2[r][i].delete(num);
          newNotes2[i][c].delete(num);
        }
        const br = Math.floor(r / 3) * 3;
        const bc = Math.floor(c / 3) * 3;
        for (let row = br; row < br + 3; row++)
          for (let col = bc; col < bc + 3; col++)
            newNotes2[row][col].delete(num);
        setNotes(newNotes2);
      }

      setUserBoard(newBoard);

      const newErrors = new Set<string>();
      for (let row = 0; row < 9; row++)
        for (let col = 0; col < 9; col++) {
          const val = newBoard[row][col];
          if (val !== null && val !== solution[row][col])
            newErrors.add(`${row}-${col}`);
        }
      setErrors(newErrors);

      if (newErrors.size === 0 && newBoard.every((row) => row.every((v) => v !== null)))
        setSolved(true);
    },
    [selected, solved, userBoard, solution, isGiven, noteMode, notes]
  );

  const handleSolve = () => {
    const result = solveCSP(puzzle);
    if (result) {
      setUserBoard(result);
      setSolved(true);
      setErrors(new Set());
      setSelected(null);
      setNotes(createEmptyNotes());
    }
  };

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!selected) return;
      const num = parseInt(e.key);
      if (num >= 1 && num <= 9) handleNumberInput(num);
      if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") handleNumberInput(0);
      if (e.key === "n" || e.key === "N") setNoteMode((m) => !m);

      const [r, c] = selected;
      if (e.key === "ArrowUp" && r > 0) setSelected([r - 1, c]);
      if (e.key === "ArrowDown" && r < 8) setSelected([r + 1, c]);
      if (e.key === "ArrowLeft" && c > 0) setSelected([r, c - 1]);
      if (e.key === "ArrowRight" && c < 8) setSelected([r, c + 1]);
    },
    [selected, handleNumberInput]
  );

  const selectedVal = selected ? userBoard[selected[0]][selected[1]] : null;

  return (
    <div className="max-w-sm mx-auto" onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <p className={cn("text-sm font-medium", solved && "text-accent")}>
          {solved ? "Solved!" : noteMode ? "Notes mode (N)" : "Fill in the blanks"}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setNoteMode((m) => !m)}
            className={cn(
              "text-xs font-mono px-2.5 py-1 rounded border transition-colors",
              noteMode
                ? "bg-accent text-accent-foreground border-accent"
                : "text-muted-foreground border-border hover:border-accent/30"
            )}
          >
            Notes
          </button>
          <button onClick={handleSolve} disabled={solved}
            className="text-xs font-mono text-accent hover:text-accent-muted transition-colors px-2.5 py-1 rounded border border-accent/30 hover:border-accent disabled:opacity-50">
            AI Solve
          </button>
        </div>
      </div>

      {/* Difficulty pills */}
      <div className="flex gap-1.5 mb-3">
        {(["Easy", "Medium", "Hard", "Expert"] as Difficulty[]).map((d) => (
          <button
            key={d}
            onClick={() => newGame(d)}
            className={cn(
              "text-[10px] font-mono px-2.5 py-1 rounded-full border transition-all",
              difficulty === d && !solved
                ? "bg-accent text-accent-foreground border-accent"
                : "text-muted-foreground border-border hover:border-accent/30"
            )}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Board */}
      <div className="bg-card border-2 border-foreground/20 rounded-lg overflow-hidden">
        {userBoard.map((row, r) => (
          <div key={r} className={cn("flex", r % 3 === 2 && r < 8 && "border-b-2 border-foreground/20")}>
            {row.map((cell, c) => {
              const isSel = selected?.[0] === r && selected?.[1] === c;
              const sameNum = selected && cell !== null && cell === selectedVal && selectedVal !== null;
              const sameRowCol = selected && (selected[0] === r || selected[1] === c);
              const sameBox = selected &&
                Math.floor(selected[0] / 3) === Math.floor(r / 3) &&
                Math.floor(selected[1] / 3) === Math.floor(c / 3);
              const hasError = errors.has(`${r}-${c}`);
              const cellNotes = notes[r][c];

              return (
                <button
                  key={c}
                  onClick={() => handleCellClick(r, c)}
                  className={cn(
                    "size-9 sm:size-10 flex items-center justify-center text-sm sm:text-base font-mono transition-colors relative",
                    c % 3 === 2 && c < 8 && "border-r-2 border-foreground/20",
                    c % 3 !== 2 && c < 8 && "border-r border-border",
                    r < 8 && r % 3 !== 2 && "border-b border-border",
                    isSel && "bg-accent/20",
                    !isSel && (sameRowCol || sameBox) && "bg-muted/50",
                    !isSel && sameNum && "bg-accent/10",
                    isGiven(r, c) ? "text-foreground font-semibold" : "text-accent",
                    hasError && "text-red-500",
                    !isGiven(r, c) && !solved && "cursor-pointer hover:bg-muted/30"
                  )}
                  disabled={solved}
                  aria-label={`Row ${r + 1}, Column ${c + 1}${cell ? `, value ${cell}` : ", empty"}`}
                >
                  {cell ? (
                    cell
                  ) : cellNotes.size > 0 ? (
                    <span className="grid grid-cols-3 grid-rows-3 w-full h-full text-[6px] sm:text-[7px] leading-none text-muted-foreground">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                        <span key={n} className="flex items-center justify-center">
                          {cellNotes.has(n) ? n : ""}
                        </span>
                      ))}
                    </span>
                  ) : (
                    ""
                  )}
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
              className={cn(
                "aspect-square rounded text-sm font-mono transition-colors",
                noteMode
                  ? "bg-accent/10 text-accent hover:bg-accent/20"
                  : "bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80"
              )}
            >
              {n}
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-between mt-3">
        <p className="text-[10px] text-muted-foreground">
          Click cell, then number. Press N for notes mode.
        </p>
        <button
          onClick={() => handleNumberInput(0)}
          className="text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear cell
        </button>
      </div>
    </div>
  );
}
