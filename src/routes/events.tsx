import { Link, Outlet, createFileRoute, useMatchRoute } from "@tanstack/react-router";
import { Calendar, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { events } from "@/data/events";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Nadchodzące biegi — Impreza na Orientację" },
      {
        name: "description",
        content:
          "Lista nadchodzących biegów na orientację. Wybierz wydarzenie i zapisz się online.",
      },
      { property: "og:title", content: "Nadchodzące biegi — Impreza na Orientację" },
      {
        property: "og:description",
        content: "Przeglądaj nadchodzące biegi na orientację i zapisuj się jednym kliknięciem.",
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const matchRoute = useMatchRoute();
  const isEventsIndex = Boolean(matchRoute({ to: "/events", fuzzy: false }));

  const [query, setQuery] = useState("");

  const filteredEvents = useMemo(() => {
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
    return <Outlet />;
  }

  const statusLabel = {
    open: "Otwarte zapisy",
    closed: "Zapisy zamknięte",
    live: "Na żywo",
    finished: "Zakończony",
  } as const;

  const statusClass = {
    open: "border-white/15 bg-white/8 text-white/80",
    closed: "border-white/15 bg-white/8 text-white/70",
    live: "border-red-400/40 bg-red-500/10 text-red-300",
    finished: "border-white/15 bg-white/8 text-white/65",
  } as const;

  const formatDate = (dateIso: string) =>
    new Intl.DateTimeFormat("pl-PL", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateIso));

  return (
    <div className="min-h-dvh bg-black/45">
      <Navbar />

      <main className="mx-auto w-full max-w-md px-5 pb-16 pt-6 sm:max-w-2xl lg:max-w-5xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Wydarzenia</h1>
          <p className="mt-1 text-sm text-white/60">Wybierz wydarzenie i zarezerwuj swój zespół</p>
        </div>

        <div className="relative mt-5">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Szukaj..."
            aria-label="Szukaj wydarzeń"
            className="w-full rounded-xl border border-white/10 bg-white/4 py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((evt) => (
            <article
              key={evt.id}
              className="glass-soft group flex flex-col rounded-2xl p-5 transition-colors hover:bg-white/[0.06]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-white/60">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{formatDate(evt.date)}</span>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${statusClass[evt.status]}`}
                >
                  {evt.status === "live" ? (
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-80" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
                    </span>
                  ) : null}
                  {statusLabel[evt.status]}
                </span>
              </div>

              <h2 className="mt-3 text-base font-semibold leading-tight text-white">{evt.title}</h2>

              <div className="mt-1.5 flex items-center gap-1 text-xs text-white/60">
                <MapPin className="h-3.5 w-3.5" />
                <span>{evt.location}</span>
              </div>

              <div className="mt-5 flex items-center gap-2">
                {evt.status === "open" ? (
                  <Link
                    to="/events/$id/register"
                    params={{ id: evt.id }}
                    className="flex-1 rounded-xl bg-[#00FF66] py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#0B110D] transition-opacity hover:opacity-90"
                  >
                    Zapisz się
                  </Link>
                ) : null}

                {evt.status === "live" ? (
                  <Link
                    to="/live"
                    className="flex-1 rounded-xl border border-[#00FF66]/40 bg-[#00FF66]/10 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-[#00FF66] transition-colors hover:bg-[#00FF66]/20"
                  >
                    Wyniki
                  </Link>
                ) : null}

                <Link
                  to="/events/$id"
                  params={{ id: evt.id }}
                  className="flex-1 rounded-xl border border-white/10 bg-white/3 py-2.5 text-center text-xs font-semibold uppercase tracking-wider text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Szczegóły
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredEvents.length === 0 ? (
          <p className="mt-8 text-center text-sm text-white/50">
            Brak wydarzeń pasujących do wyszukiwania.
          </p>
        ) : null}
      </main>
    </div>
  );
}
