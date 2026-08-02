"use client";

import { useState } from "react";
import { COMMENTDRAFT_GATE } from "@/data/resume";
import { cn } from "@/lib/utils";

/**
 * The publish prompt, reproduced.
 *
 * commentdraft shows one comment and one draft at a time and waits: `y` sends
 * that one, `e` opens it in $EDITOR, `s` skips, `q` stops, and Enter does
 * nothing at all. The held state is the point, so this component holds too. It
 * advances by exactly one row per key and never on its own.
 *
 * Nothing is sent. There is nowhere for it to go: the drafts are four real rows
 * from the run behind the review screenshot below it, and this is a page.
 *
 * Keys are bound to the container rather than the window, so they only fire
 * while focus is inside the gate. The four buttons carry the same actions and
 * are the path for pointer and assistive-technology users.
 */

type Mark = "pending" | "sent" | "skipped";

const DRAFTS = COMMENTDRAFT_GATE.drafts;

export function CommentdraftGate() {
  const [index, setIndex] = useState(0);
  const [marks, setMarks] = useState<Mark[]>(() => DRAFTS.map(() => "pending"));
  const [stopped, setStopped] = useState(false);
  const [showEditNote, setShowEditNote] = useState(false);
  const [status, setStatus] = useState("Holding. Nothing advances until you press a key.");

  const finished = index >= DRAFTS.length;
  const closed = stopped || finished;
  const current = closed ? null : DRAFTS[index];
  const sent = marks.filter((m) => m === "sent").length;
  const skipped = marks.filter((m) => m === "skipped").length;

  function resolve(mark: Exclude<Mark, "pending">) {
    if (closed) return;
    const next = [...marks];
    next[index] = mark;
    setMarks(next);
    setShowEditNote(false);
    const at = index + 1;
    setIndex(at);
    setStatus(
      at >= DRAFTS.length
        ? `${mark === "sent" ? "Sent" : "Skipped"}. Queue empty.`
        : `${mark === "sent" ? "Sent" : "Skipped"}. Draft ${at + 1} of ${DRAFTS.length}.`,
    );
  }

  function press(key: string) {
    if (key === "y") resolve("sent");
    else if (key === "s") resolve("skipped");
    else if (key === "e") {
      if (closed) return;
      setShowEditNote(true);
      setStatus("Still holding. The draft has not moved.");
    } else if (key === "q") {
      if (closed) return;
      setStopped(true);
      setShowEditNote(false);
      setStatus("Stopped. The rest of the queue is untouched.");
    }
  }

  function reset() {
    setIndex(0);
    setMarks(DRAFTS.map(() => "pending"));
    setStopped(false);
    setShowEditNote(false);
    setStatus("Holding. Nothing advances until you press a key.");
  }

  return (
    <div
      // A focusable group: tab to it, then the same keys the real prompt takes.
      tabIndex={0}
      role="group"
      aria-label="The commentdraft publish prompt, reproduced. Press y, e, s or q."
      onKeyDown={(event) => {
        if (event.metaKey || event.ctrlKey || event.altKey) return;
        const key = event.key.toLowerCase();
        if (key === "y" || key === "e" || key === "s" || key === "q") {
          event.preventDefault();
          press(key);
        }
      }}
      className="cd-gate rounded-xl overflow-hidden text-left"
    >
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-border bg-muted/40">
        <span className="font-mono text-xs text-muted-foreground truncate">
          <span className="text-accent" aria-hidden="true">
            ${" "}
          </span>
          {COMMENTDRAFT_GATE.command}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground shrink-0 tabular-nums">
          {closed ? (
            `${sent} sent`
          ) : (
            <>
              {/* Short form on narrow screens so the command keeps its verb. */}
              <span className="sm:hidden">
                {index + 1}/{DRAFTS.length}
              </span>
              <span className="hidden sm:inline">
                draft {index + 1} of {DRAFTS.length}
              </span>
            </>
          )}
        </span>
      </div>

      {/* Queue state: one mark per draft, held until a key resolves it. */}
      <div className="flex items-center gap-1.5 px-4 pt-3.5" aria-hidden="true">
        {marks.map((mark, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors duration-200",
              mark === "sent" && "bg-accent",
              mark === "skipped" && "bg-muted-foreground/40",
              mark === "pending" && (i === index && !closed ? "bg-foreground/30" : "bg-border"),
            )}
          />
        ))}
      </div>

      <div className="px-4 py-4 min-h-[15.5rem] sm:min-h-[14.5rem] flex flex-col">
        {current ? (
          <>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              <span className="text-accent/80">{current.platform}</span>
              <span className="mx-1.5 text-border">/</span>
              {current.author}
              <span className="mx-1.5 text-border">/</span>
              <span className="normal-case tracking-normal">{current.context}</span>
            </p>

            <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">
              <span className="text-border select-none" aria-hidden="true">
                &gt;{" "}
              </span>
              {current.comment}
            </p>

            <div className="my-3 border-t border-border" />

            <p className="text-[13px] sm:text-sm leading-relaxed text-foreground">
              {current.reply}
            </p>

            <p className="mt-2.5 font-mono text-[11px] text-muted-foreground leading-relaxed">
              {current.reason}
            </p>
          </>
        ) : (
          <div className="flex-1 flex flex-col justify-center">
            <p className="font-mono text-sm text-foreground">
              {stopped ? "Stopped." : "Queue empty."}
            </p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {sent} sent, {skipped} skipped
              {stopped && `, ${DRAFTS.length - sent - skipped} left untouched`}. Each one cost a
              key.
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-4 self-start font-mono text-xs text-accent border border-accent/30 rounded-md px-3 py-2 hover:border-accent/60 transition-colors active:scale-[0.97]"
            >
              run it again
            </button>
          </div>
        )}
      </div>

      <div className="px-4 py-3 border-t border-border bg-muted/40">
        <div className="flex flex-wrap items-center gap-1.5">
          {COMMENTDRAFT_GATE.keys.map((k) => (
            <button
              key={k.key}
              type="button"
              disabled={closed}
              onClick={() => press(k.key)}
              className={cn(
                "font-mono text-xs px-2.5 py-1.5 rounded-md border transition-colors",
                "border-border text-muted-foreground",
                "enabled:hover:border-accent/50 enabled:hover:text-foreground enabled:active:scale-[0.97]",
                "disabled:opacity-40 disabled:cursor-not-allowed",
              )}
            >
              <span className="text-accent">[{k.key}]</span> {k.label}
            </button>
          ))}
          {!closed && (
            <span className="font-mono text-xs text-muted-foreground ml-1" aria-hidden="true">
              &gt;<span className="cursor-blink text-accent">_</span>
            </span>
          )}
        </div>

        <p aria-live="polite" className="mt-2.5 font-mono text-[11px] text-muted-foreground">
          {status}
        </p>

        {showEditNote && (
          <p className="mt-1.5 font-mono text-[11px] text-muted-foreground leading-relaxed">
            {COMMENTDRAFT_GATE.editNote}
          </p>
        )}
      </div>
    </div>
  );
}
