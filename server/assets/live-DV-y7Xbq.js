import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BBPuhNZi.js";
import { N as Navbar } from "./Navbar-C_EG0ANP.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-dPRkpuyW.js";
import { e as events } from "./router-B8zQIBMN.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1e3);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  const seconds = totalSeconds % 60;
  const pad = (n) => n.toString().padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
function LiveClock({ raceStartTime, eventStatus }) {
  const [nowMs, setNowMs] = reactExports.useState(() => Date.now());
  const raceStartMs = reactExports.useMemo(() => new Date(raceStartTime).getTime(), [raceStartTime]);
  const frozenElapsedMsRef = reactExports.useRef(0);
  if (eventStatus === "finished" && frozenElapsedMsRef.current === 0) {
    frozenElapsedMsRef.current = Math.max(0, Date.now() - raceStartMs);
  }
  reactExports.useEffect(() => {
    if (eventStatus === "finished") {
      return;
    }
    const id = window.setInterval(() => setNowMs(Date.now()), 1e3);
    return () => window.clearInterval(id);
  }, [eventStatus]);
  const elapsedMs = eventStatus === "finished" ? frozenElapsedMsRef.current : nowMs - raceStartMs;
  const hasStarted = elapsedMs > 0;
  const label = hasStarted || eventStatus === "finished" ? "CZAS BIEGU" : "DO STARTU";
  const displayMs = hasStarted ? elapsedMs : Math.max(0, raceStartMs - nowMs);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-white/40", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-3xl tabular-nums tracking-tight text-white sm:text-4xl", children: formatDuration(displayMs) })
  ] });
}
const leaderboard = {
  Low: [
    {
      rank: 1,
      name: "Anna Wiśniewska",
      club: "KS Kompas Warszawa",
      punches: "6/6 PK",
      time: "00:24:11"
    },
    { rank: 2, name: "Tomasz Lis", club: "OK Beskid", punches: "6/6 PK", time: "00:25:42" },
    { rank: 3, name: "Karolina Mazur", club: "OK Bory", punches: "6/6 PK", time: "00:27:03" },
    { rank: 4, name: "Piotr Dąb", club: "KS InO", punches: "5/6 PK", time: "DSQ", dsq: true },
    { rank: 5, name: "Marta Sosna", club: "OK Mazury", punches: "6/6 PK", time: "00:31:18" }
  ],
  Medium: [
    { rank: 1, name: "Marek Nowak", club: "OK Bory", punches: "8/8 PK", time: "00:42:07" },
    {
      rank: 2,
      name: "Joanna Kruk",
      club: "KS Kompas Warszawa",
      punches: "8/8 PK",
      time: "00:43:55"
    },
    { rank: 3, name: "Bartek Zięba", club: "OK Beskid", punches: "8/8 PK", time: "00:44:12" },
    { rank: 4, name: "Ewa Sokół", club: "OK Mazury", punches: "8/8 PK", time: "00:46:30" },
    { rank: 5, name: "Adam Lis", club: "KS InO", punches: "7/8 PK", time: "DSQ", dsq: true },
    { rank: 6, name: "Michał Buk", club: "OK Bory", punches: "8/8 PK", time: "00:51:09" }
  ],
  High: [
    { rank: 1, name: "Jan Kowalski", club: "KS InO", punches: "9/9 PK", time: "01:02:14" },
    { rank: 2, name: "Paweł Sokół", club: "OK Beskid", punches: "9/9 PK", time: "01:04:48" },
    { rank: 3, name: "Magda Jeleń", club: "OK Bory", punches: "9/9 PK", time: "01:06:22" },
    {
      rank: 4,
      name: "Krzysztof Dzik",
      club: "KS Kompas Warszawa",
      punches: "9/9 PK",
      time: "01:09:07"
    },
    { rank: 5, name: "Iga Wilk", club: "OK Mazury", punches: "8/9 PK", time: "DSQ", dsq: true },
    { rank: 6, name: "Rafał Sosna", club: "OK Beskid", punches: "9/9 PK", time: "01:14:50" },
    { rank: 7, name: "Łukasz Brzoza", club: "KS InO", punches: "9/9 PK", time: "01:18:33" }
  ]
};
function Row({
  entry
}) {
  const isLeader = entry.rank === 1 && !entry.dsq;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-3 overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.05] " + (isLeader ? "border-primary/30" : ""), children: [
    isLeader && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-y-0 left-0 w-1 bg-primary", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 shrink-0 text-center text-sm font-bold " + (isLeader ? "text-primary" : "text-white/70"), children: entry.rank }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-medium text-white", children: entry.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-[11px] text-white/50", children: [
        entry.club,
        " · ",
        entry.punches
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-[72px] text-right font-mono text-sm tabular-nums " + (entry.dsq ? "text-[#FF6B00]" : isLeader ? "text-primary" : "text-white"), children: entry.time })
  ] });
}
function LivePage() {
  const [tab, setTab] = reactExports.useState("High");
  const liveEvent = events.find((event) => event.status === "live") ?? events[0];
  const eventDateLabel = new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date(liveEvent.date));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-[100dvh] bg-black/45", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto w-full max-w-md px-5 pb-16 pt-6 sm:max-w-2xl lg:max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-start justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-70" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-red-400" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-[0.25em] text-red-400", children: "Live" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl", children: liveEvent.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-0.5 text-xs text-white/50", children: [
            liveEvent.location,
            " · ",
            eventDateLabel
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(LiveClock, { raceStartTime: liveEvent.raceStartTime, eventStatus: liveEvent.status })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-8 text-sm font-semibold uppercase tracking-widest text-white/70", children: "Najlepsze czasy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: tab, onValueChange: (v) => setTab(v), className: "mt-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "w-full bg-white/[0.04]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "Low", className: "flex-1 text-xs", children: "Low" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "Medium", className: "flex-1 text-xs", children: "Medium" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "High", className: "flex-1 text-xs", children: "High" })
        ] }),
        ["Low", "Medium", "High"].map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: cat, className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", children: leaderboard[cat].map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { entry }, `${cat}-${entry.rank}`)) }) }, cat))
      ] })
    ] })
  ] });
}
export {
  LivePage as component
};
