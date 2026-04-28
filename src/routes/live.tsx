import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { LiveClock } from "@/components/LiveClock";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { leaderboard, type Category, type LeaderboardEntry } from "@/data/leaderboard";

export const Route = createFileRoute("/live")({
  head: () => ({
    meta: [
      { title: "Wyniki na żywo — Impreza na Orientację" },
      {
        name: "description",
        content:
          "Śledź wyniki biegów na orientację na żywo. Klasyfikacja w kategoriach Low, Medium i High.",
      },
      { property: "og:title", content: "Wyniki na żywo — Impreza na Orientację" },
      {
        property: "og:description",
        content: "Aktualne czasy zawodników w trzech kategoriach trudności.",
      },
    ],
  }),
  component: LivePage,
});

function Row({ entry }: { entry: LeaderboardEntry }) {
  const isLeader = entry.rank === 1 && !entry.dsq;

  return (
    <div
      className={
        "relative flex items-center gap-3 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.05] " +
        (isLeader ? "border-primary/30" : "")
      }
    >
      {isLeader && <span className="absolute inset-y-0 left-0 w-1 bg-primary" aria-hidden />}
      <span
        className={
          "w-6 shrink-0 text-center text-sm font-bold " +
          (isLeader ? "text-primary" : "text-white/70")
        }
      >
        {entry.rank}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{entry.name}</p>
        <p className="truncate text-[11px] text-white/50">
          {entry.club} · {entry.punches}
        </p>
      </div>

      <span
        className={
          "min-w-[72px] text-right font-mono text-sm tabular-nums " +
          (entry.dsq ? "text-[#FF6B00]" : isLeader ? "text-primary" : "text-white")
        }
      >
        {entry.time}
      </span>
    </div>
  );
}

function LivePage() {
  const [tab, setTab] = useState<Category>("High");

  return (
    <div className="min-h-[100dvh] bg-[#0B110D]">
      <Navbar />

      <main className="mx-auto w-full max-w-md px-5 pb-16 pt-6 sm:max-w-2xl lg:max-w-3xl">
        <header className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
                Live
              </span>
            </div>
            <h1 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
              Nocny Bieg o Puchar Lasu
            </h1>
            <p className="mt-0.5 text-xs text-white/50">Puszcza Kampinoska · 12 maja 2026</p>
          </div>

          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-white/40">Czas</p>
            <LiveClock />
          </div>
        </header>

        <h2 className="mt-8 text-sm font-semibold uppercase tracking-widest text-white/70">
          Najlepsze czasy
        </h2>

        <Tabs value={tab} onValueChange={(v) => setTab(v as Category)} className="mt-3">
          <TabsList className="w-full bg-white/[0.04]">
            <TabsTrigger value="Low" className="flex-1 text-xs">
              Low
            </TabsTrigger>
            <TabsTrigger value="Medium" className="flex-1 text-xs">
              Medium
            </TabsTrigger>
            <TabsTrigger value="High" className="flex-1 text-xs">
              High
            </TabsTrigger>
          </TabsList>

          {(["Low", "Medium", "High"] as Category[]).map((cat) => (
            <TabsContent key={cat} value={cat} className="mt-4">
              <div className="flex flex-col gap-2">
                {leaderboard[cat].map((entry) => (
                  <Row key={`${cat}-${entry.rank}`} entry={entry} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
