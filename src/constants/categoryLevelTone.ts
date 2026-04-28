import type { EventLevel } from "@/data/events";

/** Shared Low / Medium / High tile + badge styling (registration + success summary). */
export const categoryLevelTone: Record<EventLevel, { idle: string; active: string }> = {
  Low: {
    idle: "border-emerald-400/20 bg-emerald-400/5 text-emerald-200",
    active:
      "border-emerald-300 bg-emerald-400/15 text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.25)]",
  },
  Medium: {
    idle: "border-yellow-400/20 bg-yellow-400/5 text-yellow-200",
    active:
      "border-yellow-300 bg-yellow-400/15 text-yellow-100 shadow-[0_0_18px_rgba(250,204,21,0.25)]",
  },
  High: {
    idle: "border-red-400/20 bg-red-400/5 text-red-200",
    active: "border-red-300 bg-red-400/15 text-red-100 shadow-[0_0_18px_rgba(248,113,113,0.25)]",
  },
};
