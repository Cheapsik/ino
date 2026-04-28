import { a0 as useMatchRoute, U as jsxRuntimeExports, $ as Outlet, r as reactExports } from "./worker-entry-BBPuhNZi.js";
import { R as Route, e as events, L as Link } from "./router-B8zQIBMN.js";
import { N as Navbar } from "./Navbar-C_EG0ANP.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-dPRkpuyW.js";
import { c as createLucideIcon, M as MapPin } from "./map-pin-CptN-Dg1.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
];
const Clock = createLucideIcon("clock", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z",
      key: "169xi5"
    }
  ],
  ["path", { d: "M15 5.764v15", key: "1pn4in" }],
  ["path", { d: "M9 3.236v15", key: "1uimfh" }]
];
const Map = createLucideIcon("map", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978", key: "1n3hpd" }],
  ["path", { d: "M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978", key: "rfe1zi" }],
  ["path", { d: "M18 9h1.5a1 1 0 0 0 0-5H18", key: "7xy6bh" }],
  ["path", { d: "M4 22h16", key: "57wxv0" }],
  ["path", { d: "M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z", key: "1mhfuq" }],
  ["path", { d: "M6 9H4.5a1 1 0 0 1 0-5H6", key: "tex48p" }]
];
const Trophy = createLucideIcon("trophy", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode$1);
const __iconNode = [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["line", { x1: "21", x2: "16.65", y1: "21", y2: "16.65", key: "13gj7c" }],
  ["line", { x1: "11", x2: "11", y1: "8", y2: "14", key: "1vmskp" }],
  ["line", { x1: "8", x2: "14", y1: "11", y2: "11", key: "durymu" }]
];
const ZoomIn = createLucideIcon("zoom-in", __iconNode);
const statusLabel = {
  open: "Otwarte zapisy",
  closed: "Zapisy zamknięte",
  live: "Na żywo",
  finished: "Zakończony"
};
const resultCategories = ["Low", "Medium", "High"];
function formatEventDate(isoDate) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}
function getSpotClass(availableSpots, totalSpots) {
  if (totalSpots <= 0) {
    return "text-red-300";
  }
  const availabilityRatio = availableSpots / totalSpots;
  if (availableSpots <= 0) {
    return "text-red-300";
  }
  if (availabilityRatio <= 0.15) {
    return "text-orange-300";
  }
  if (availabilityRatio <= 0.4) {
    return "text-yellow-300";
  }
  return "text-emerald-300";
}
function getStatusBadge(status) {
  if (status === "open") {
    return "border-[#00FF66]/60 bg-[#00FF66]/10 text-[#00FF66]";
  }
  if (status === "closed") {
    return "border-yellow-400/50 bg-yellow-400/10 text-yellow-300";
  }
  if (status === "live") {
    return "border-red-400/60 bg-red-500/10 text-red-300";
  }
  return "border-white/20 bg-white/10 text-white/70";
}
function getCountdownLabel(now, eventStart, status) {
  if (status === "finished") {
    return "Zakończony";
  }
  if (status === "live" || now >= eventStart) {
    return "Trwa!";
  }
  const totalSeconds = Math.max(0, Math.floor((eventStart - now) / 1e3));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor(totalSeconds % 86400 / 3600);
  const minutes = Math.floor(totalSeconds % 3600 / 60);
  return `Za ${days} dni ${hours} godz. ${minutes} min.`;
}
function EventDetailsPage() {
  const {
    id
  } = Route.useParams();
  const matchRoute = useMatchRoute();
  const isDetailsRoute = Boolean(matchRoute({
    to: "/events/$id",
    params: {
      id
    },
    fuzzy: false
  }));
  if (!isDetailsRoute) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(EventDetailsContent, { id });
}
function EventDetailsContent({
  id
}) {
  const event = events.find((item) => item.id === id);
  const [now, setNow] = reactExports.useState(() => Date.now());
  const [isMapOpen, setIsMapOpen] = reactExports.useState(false);
  const [activeTab, setActiveTab] = reactExports.useState("Low");
  reactExports.useEffect(() => {
    const timerId = window.setInterval(() => {
      setNow(Date.now());
    }, 1e3);
    return () => window.clearInterval(timerId);
  }, []);
  const countdown = reactExports.useMemo(() => {
    if (!event) {
      return "";
    }
    return getCountdownLabel(now, new Date(event.date).getTime(), event.status);
  }, [event, now]);
  if (!event) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-black/45", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto w-full max-w-4xl px-5 pb-20 pt-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/events", className: "text-sm text-white/70 transition-colors hover:text-white", children: "← Nadchodzące biegi" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-white", children: "Nie znaleziono biegu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm text-[#A3B5A8]", children: "Sprawdź adres albo wróć do listy wydarzeń." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/events", className: "mt-6 inline-flex rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10", children: "Wróć do wydarzeń" })
        ] })
      ] })
    ] });
  }
  const statusClass = getStatusBadge(event.status);
  event.results?.find((result) => result.category === activeTab)?.entries ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-black/38", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto w-full max-w-5xl space-y-4 px-3 pb-32 pt-3 sm:space-y-8 sm:px-6 sm:pb-40 sm:pt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/events", className: "text-sm text-white/70 transition-colors hover:text-white", children: "← Nadchodzące biegi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative mt-1.5 overflow-hidden rounded-2xl border border-white/10 sm:mt-3 sm:rounded-3xl", children: [
        event.mapImageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: event.mapImageUrl, alt: `Tło wydarzenia ${event.title}`, className: "absolute inset-0 h-full w-full object-cover object-center" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hero-notebook-grid absolute inset-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#0B110D]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-[16/7] w-full md:aspect-[21/8]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-5xl", children: event.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: event.googleMapsUrl, target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-black/35", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
              event.location
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusClass}`, children: [
              event.status === "live" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-80" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-red-400" })
              ] }) : null,
              statusLabel[event.status]
            ] })
          ] })
        ] })
      ] }),
      event.status !== "finished" ? /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 shadow-xl backdrop-blur-xl [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.4)] sm:rounded-3xl sm:px-4 sm:py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 sm:gap-x-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5 text-center sm:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-[#657A6B]", children: "Data i godzina startu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium leading-snug text-white sm:text-[15px]", children: formatEventDate(event.date) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5 text-center sm:border-l sm:border-white/10 sm:pl-3 sm:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-[#657A6B]", children: "Lokalizacja" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: event.googleMapsUrl, target: "_blank", rel: "noreferrer", className: "text-sm font-medium leading-snug text-white transition-colors hover:text-[#00FF66] sm:text-[15px]", children: event.location })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 border-t border-white/10 pt-2 text-center sm:col-span-2 sm:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-[#657A6B]", children: "Dostępne miejsca" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1 tabular-nums sm:gap-1.5", children: event.categories.map((category) => {
            const availableSpots = category.spotsTotal - category.spotsTaken;
            const colorClass = getSpotClass(availableSpots, category.spotsTotal);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/80", children: category.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-sm font-medium ${colorClass}`, children: [
                availableSpots,
                "/",
                category.spotsTotal
              ] })
            ] }, category.name);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5 border-t border-white/10 pt-2 text-center sm:col-span-2 sm:text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-[#657A6B]", children: "Czas do startu" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex flex-wrap items-center justify-center gap-1 text-sm font-medium leading-tight text-white sm:justify-start sm:text-[15px]", children: [
            countdown === "Trwa!" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400/80" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-red-400" })
            ] }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: countdown })
          ] })
        ] })
      ] }) }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.4)] sm:rounded-3xl sm:p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 text-lg font-semibold text-white sm:text-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5 shrink-0 text-[#00FF66] sm:h-5" }),
          "Harmonogram dnia"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-3 sm:mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": true, className: "pointer-events-none absolute bottom-4 left-[5.25rem] top-4 w-0.5 -translate-x-1/2 bg-[#00FF66]/20" }),
          event.schedule.map((entry) => {
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 px-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 shrink-0 py-3 text-right font-mono text-sm font-bold text-[#00FF66]", children: entry.time }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-6 shrink-0 items-start justify-center py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#00FF66]" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 py-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-white", children: entry.label }),
                entry.note ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-0.5 text-sm text-[#A3B5A8]", children: entry.note }) : null
              ] })
            ] }, `${entry.time}-${entry.label}`);
          })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.4)] sm:rounded-3xl sm:p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 text-lg font-semibold text-white sm:text-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "h-5 w-5 shrink-0 text-[#00FF66]" }),
          "Mapa obszaru"
        ] }),
        event.mapImageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-3 overflow-hidden rounded-2xl border border-white/10 sm:mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: event.mapImageUrl, alt: `Mapa obszaru dla ${event.title}`, className: "h-auto w-full object-cover object-center" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setIsMapOpen(true), className: "absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-black/55", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ZoomIn, { className: "h-3.5 w-3.5" }),
            "Powiększ"
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "map-grid-bg relative mt-3 flex min-h-[200px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/20 px-3 text-center sm:mt-5 sm:min-h-[240px] sm:px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "map-scanline" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "h-12 w-12 text-white/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm italic text-[#A3B5A8]", children: "Mapa zostanie udostępniona po zakończeniu wydarzenia" })
        ] })
      ] }),
      event.status === "finished" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: "results", className: "rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.4)] sm:rounded-3xl sm:p-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "flex items-center gap-2 text-lg font-semibold text-white sm:text-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "h-5 w-5 shrink-0 text-[#00FF66]" }),
          "Wyniki"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: activeTab, onValueChange: (value) => setActiveTab(value), className: "mt-3 sm:mt-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { className: "w-full bg-white/4", children: resultCategories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: category, className: "flex-1 text-xs", children: category }, category)) }),
          resultCategories.map((category) => {
            const entries = event.results?.find((result) => result.category === category)?.entries ?? [];
            return /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: category, className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-white/3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-white/10 text-xs uppercase tracking-wider text-[#A3B5A8]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Rank" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Imię i nazwisko" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Czas" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3", children: "Status" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: entries.map((entry) => {
                const isLeader = entry.rank === 1 && !entry.dsq;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `border-b border-white/10 last:border-none ${isLeader ? "border-l-2 border-l-amber-300 bg-amber-200/5 shadow-[inset_0_0_18px_rgba(251,191,36,0.16)]" : "bg-white/1"}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm font-semibold text-white", children: entry.rank }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-white", children: entry.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: `px-4 py-3 font-mono text-sm ${entry.dsq ? "text-[#FF6B00]" : "text-white"}`, children: entry.dsq ? "DSQ" : entry.time }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-sm text-[#A3B5A8]", children: entry.dsq ? "Dyskwalifikacja" : "Ukończono" })
                ] }, `${category}-${entry.rank}-${entry.name}`);
              }) })
            ] }) }) }, category);
          })
        ] })
      ] }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0B110D]/80 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex w-full max-w-6xl items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm text-[#A3B5A8]", children: event.title }),
      event.status === "open" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/events/$id/register", params: {
        id: event.id
      }, className: "inline-flex rounded-xl bg-[#00FF66] px-4 py-2 text-sm font-semibold text-[#0B110D] transition-opacity hover:opacity-90", children: "Zapisz się →" }) : null,
      event.status === "closed" ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", disabled: true, className: "inline-flex cursor-not-allowed rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/50", children: "Zapisy zamknięte" }) : null,
      event.status === "live" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/live", className: "inline-flex rounded-xl bg-[#00FF66] px-4 py-2 text-sm font-semibold text-[#0B110D] transition-opacity hover:opacity-90", children: "Wyniki na żywo →" }) : null,
      event.status === "finished" ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => document.getElementById("results")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      }), className: "inline-flex rounded-xl border border-white/20 bg-transparent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10", children: "Zobacz wyniki ↓" }) : null
    ] }) }),
    isMapOpen && event.mapImageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-60 flex items-center justify-center bg-black/75 p-4", onClick: () => setIsMapOpen(false), role: "presentation", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-h-[90vh] max-w-6xl overflow-hidden rounded-2xl border border-white/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "absolute right-3 top-3 rounded-full bg-black/55 p-2 text-white transition-colors hover:bg-black/75", onClick: () => setIsMapOpen(false), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: event.mapImageUrl, alt: `Powiększona mapa obszaru dla ${event.title}`, className: "max-h-[90vh] w-full object-contain" })
    ] }) }) : null
  ] });
}
export {
  EventDetailsPage as component
};
