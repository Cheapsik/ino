import { a0 as useMatchRoute, r as reactExports, U as jsxRuntimeExports, $ as Outlet } from "./worker-entry-BBPuhNZi.js";
import { e as events, L as Link } from "./router-B8zQIBMN.js";
import { N as Navbar } from "./Navbar-C_EG0ANP.js";
import { c as createLucideIcon, M as MapPin } from "./map-pin-CptN-Dg1.js";
import { C as Calendar } from "./calendar-D3FNpfXH.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function EventsPage() {
  const matchRoute = useMatchRoute();
  const isEventsIndex = Boolean(matchRoute({
    to: "/events",
    fuzzy: false
  }));
  const [query, setQuery] = reactExports.useState("");
  const filteredEvents = reactExports.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return events;
    }
    return events.filter((evt) => {
      const haystack = `${evt.title} ${evt.location}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [query]);
  if (!isEventsIndex) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {});
  }
  const statusLabel = {
    open: "Otwarte zapisy",
    closed: "Zapisy zamknięte",
    live: "Na żywo",
    finished: "Zakończony"
  };
  const statusClass = {
    open: "border-white/15 bg-white/8 text-white/80",
    closed: "border-white/15 bg-white/8 text-white/70",
    live: "border-red-400/40 bg-red-500/10 text-red-300",
    finished: "border-white/15 bg-white/8 text-white/65"
  };
  const formatDate = (dateIso) => new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(dateIso));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-dvh bg-black/45", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto w-full max-w-md px-5 pb-16 pt-6 sm:max-w-2xl lg:max-w-5xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold tracking-tight text-white sm:text-3xl", children: "Wydarzenia" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-white/60", children: "Wybierz wydarzenie i zarezerwuj swój zespół" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "search", value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Szukaj...", "aria-label": "Szukaj wydarzeń", className: "w-full rounded-xl border border-white/10 bg-white/4 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: filteredEvents.map((evt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "glass-soft group flex flex-col rounded-2xl p-5 transition-colors hover:bg-white/[0.06]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-white/60", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatDate(evt.date) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${statusClass[evt.status]}`, children: [
            evt.status === "live" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-80" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-red-400" })
            ] }) : null,
            statusLabel[evt.status]
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 text-base font-semibold leading-tight text-white", children: evt.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center gap-1 text-xs text-white/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3.5 w-3.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: evt.location })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 flex items-center gap-2", children: [
          evt.status === "open" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/events/$id/register", params: {
            id: evt.id
          }, className: "flex-1 rounded-xl bg-[#00FF66] py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#0B110D] transition-opacity hover:opacity-90", children: "Zapisz się" }) : null,
          evt.status === "live" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/live", className: "flex-1 rounded-xl border border-[#00FF66]/40 bg-[#00FF66]/10 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#00FF66] transition-colors hover:bg-[#00FF66]/20", children: "Wyniki" }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/events/$id", params: {
            id: evt.id
          }, className: "flex-1 rounded-xl border border-white/10 bg-white/3 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white/80 transition-colors hover:bg-white/10 hover:text-white", children: "Szczegóły" })
        ] })
      ] }, evt.id)) }),
      filteredEvents.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-center text-sm text-white/50", children: "Brak wydarzeń pasujących do wyszukiwania." }) : null
    ] })
  ] });
}
export {
  EventsPage as component
};
