import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** "Aug 6, 2026" or "August 6, 2026", fixed to UTC so the build and the
 *  browser agree on the day. */
export function formatDate(iso: string, month: "short" | "long" = "short") {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month,
    day: "numeric",
    timeZone: "UTC",
  });
}
