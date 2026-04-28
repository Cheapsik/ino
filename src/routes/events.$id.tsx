import { Link, Outlet, createFileRoute, useMatchRoute } from "@tanstack/react-router";
import { Calendar, Clock, Map, MapPin, Trophy, Users, X, ZoomIn } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { events, type EventLevel, type OrienteeringEvent } from "@/data/events";

const statusLabel: Record<OrienteeringEvent["status"], string> = {
  open: "Otwarte zapisy",
  closed: "Zapisy zamknięte",
  live: "Na żywo",
  finished: "Zakończony",
};

const resultCategories: EventLevel[] = ["Low", "Medium", "High"];

export const Route = createFileRoute("/events/$id")({
  component: EventDetailsPage,
});

function formatEventDate(isoDate: string) {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getSpotClass(availableSpots: number, totalSpots: number) {
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

function getStatusBadge(status: OrienteeringEvent["status"]) {
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

function getCountdownLabel(now: number, eventStart: number, status: OrienteeringEvent["status"]) {
  if (status === "finished") {
    return "Zakończony";
  }

  if (status === "live" || now >= eventStart) {
    return "Trwa!";
  }

  const totalSeconds = Math.max(0, Math.floor((eventStart - now) / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  return `Za ${days} dni ${hours} godz. ${minutes} min.`;
}

function EventDetailsPage() {
  const { id } = Route.useParams();
  const matchRoute = useMatchRoute();
  const isDetailsRoute = Boolean(
    matchRoute({
      to: "/events/$id",
      params: { id },
      fuzzy: false,
    }),
  );

  if (!isDetailsRoute) {
    return <Outlet />;
  }

  return <EventDetailsContent id={id} />;
}

function EventDetailsContent({ id }: { id: string }) {
  const event = events.find((item) => item.id === id);
  const [now, setNow] = useState(() => Date.now());
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<EventLevel>("Low");

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => window.clearInterval(timerId);
  }, []);

  const countdown = useMemo(() => {
    if (!event) {
      return "";
    }

    return getCountdownLabel(now, new Date(event.date).getTime(), event.status);
  }, [event, now]);

  if (!event) {
    return (
      <div className="min-h-dvh bg-black/45">
        <Navbar />
        <main className="mx-auto w-full max-w-4xl px-5 pb-20 pt-8">
          <Link to="/events" className="text-sm text-white/70 transition-colors hover:text-white">
            ← Nadchodzące biegi
          </Link>
          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
            <h1 className="text-2xl font-semibold text-white">Nie znaleziono biegu</h1>
            <p className="mt-3 text-sm text-[#A3B5A8]">
              Sprawdź adres albo wróć do listy wydarzeń.
            </p>
            <Link
              to="/events"
              className="mt-6 inline-flex rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Wróć do wydarzeń
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const statusClass = getStatusBadge(event.status);
  const currentResults =
    event.results?.find((result) => result.category === activeTab)?.entries ?? [];

  return (
    <div className="min-h-dvh bg-black/38">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl space-y-4 px-3 pb-32 pt-3 sm:space-y-8 sm:px-6 sm:pb-40 sm:pt-6">
        <Link to="/events" className="text-sm text-white/70 transition-colors hover:text-white">
          ← Nadchodzące biegi
        </Link>

        <section className="relative mt-1.5 overflow-hidden rounded-2xl border border-white/10 sm:mt-3 sm:rounded-3xl">
          {event.mapImageUrl ? (
            <img
              src={event.mapImageUrl}
              alt={`Tło wydarzenia ${event.title}`}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
          ) : (
            <div className="hero-notebook-grid absolute inset-0" />
          )}

          <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[#0B110D]" />

          <div className="relative aspect-[16/7] w-full md:aspect-[21/8]" />

          <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-5xl">
              {event.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href={event.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-black/35"
              >
                <MapPin className="h-3.5 w-3.5" />
                {event.location}
              </a>

              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusClass}`}
              >
                {event.status === "live" ? (
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-80" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
                  </span>
                ) : null}
                {statusLabel[event.status]}
              </span>
            </div>
          </div>
        </section>

        {event.status !== "finished" ? (
          <section className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-2 shadow-xl backdrop-blur-xl [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.4)] sm:rounded-3xl sm:px-4 sm:py-3">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3 sm:gap-x-4">
              <div className="space-y-0.5 text-center sm:text-left">
                <p className="text-[10px] uppercase tracking-widest text-[#657A6B]">
                  Data i godzina startu
                </p>
                <p className="text-sm font-medium leading-snug text-white sm:text-[15px]">
                  {formatEventDate(event.date)}
                </p>
              </div>

              <div className="space-y-0.5 text-center sm:border-l sm:border-white/10 sm:pl-3 sm:text-left">
                <p className="text-[10px] uppercase tracking-widest text-[#657A6B]">Lokalizacja</p>
                <a
                  href={event.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium leading-snug text-white transition-colors hover:text-[#00FF66] sm:text-[15px]"
                >
                  {event.location}
                </a>
              </div>

              <div className="space-y-1.5 border-t border-white/10 pt-2 text-center sm:col-span-2 sm:text-left">
                <p className="text-[10px] uppercase tracking-widest text-[#657A6B]">
                  Dostępne miejsca
                </p>
                <div className="grid grid-cols-3 gap-1 tabular-nums sm:gap-1.5">
                  {event.categories.map((category) => {
                    const availableSpots = category.spotsTotal - category.spotsTaken;
                    const colorClass = getSpotClass(availableSpots, category.spotsTotal);
                    return (
                      <div key={category.name} className="space-y-0.5">
                        <p className="text-[11px] text-white/80">{category.name}</p>
                        <p className={`text-sm font-medium ${colorClass}`}>
                          {availableSpots}/{category.spotsTotal}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-0.5 border-t border-white/10 pt-2 text-center sm:col-span-2 sm:text-left">
                <p className="text-[10px] uppercase tracking-widest text-[#657A6B]">
                  Czas do startu
                </p>
                <p className="flex flex-wrap items-center justify-center gap-1 text-sm font-medium leading-tight text-white sm:justify-start sm:text-[15px]">
                  {countdown === "Trwa!" ? (
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400/80" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
                    </span>
                  ) : null}
                  <span>{countdown}</span>
                </p>
              </div>
            </div>
          </section>
        ) : null}

        <section className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.4)] sm:rounded-3xl sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white sm:text-xl">
            <Clock className="h-5 w-5 shrink-0 text-[#00FF66] sm:h-5" />
            Harmonogram dnia
          </h2>

          <div className="relative mt-3 sm:mt-5">
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-4 left-[5.25rem] top-4 w-0.5 -translate-x-1/2 bg-[#00FF66]/20"
            />
            {event.schedule.map((entry) => {
              return (
                <div key={`${entry.time}-${entry.label}`} className="flex items-start gap-3 px-3">
                  <div className="w-12 shrink-0 py-3 text-right font-mono text-sm font-bold text-[#00FF66]">
                    {entry.time}
                  </div>

                  <div className="flex w-6 shrink-0 items-start justify-center py-3">
                    <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-[#00FF66]" />
                  </div>

                  <div className="flex-1 py-3">
                    <p className="text-sm font-medium text-white">{entry.label}</p>
                    {entry.note ? (
                      <p className="mt-0.5 text-sm text-[#A3B5A8]">{entry.note}</p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.4)] sm:rounded-3xl sm:p-6">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-white sm:text-xl">
            <Map className="h-5 w-5 shrink-0 text-[#00FF66]" />
            Mapa obszaru
          </h2>

          {event.mapImageUrl ? (
            <div className="relative mt-3 overflow-hidden rounded-2xl border border-white/10 sm:mt-5">
              <img
                src={event.mapImageUrl}
                alt={`Mapa obszaru dla ${event.title}`}
                className="h-auto w-full object-cover object-center"
              />
              <button
                type="button"
                onClick={() => setIsMapOpen(true)}
                className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-lg border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-black/55"
              >
                <ZoomIn className="h-3.5 w-3.5" />
                Powiększ
              </button>
            </div>
          ) : (
            <div className="map-grid-bg relative mt-3 flex min-h-[200px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/20 px-3 text-center sm:mt-5 sm:min-h-[240px] sm:px-4">
              <div className="map-scanline" />
              <Map className="h-12 w-12 text-white/20" />
              <p className="mt-3 text-sm italic text-[#A3B5A8]">
                Mapa zostanie udostępniona po zakończeniu wydarzenia
              </p>
            </div>
          )}
        </section>

        {event.status === "finished" ? (
          <section
            id="results"
            className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl [box-shadow:inset_0_1px_0_rgba(255,255,255,0.05),0_20px_60px_rgba(0,0,0,0.4)] sm:rounded-3xl sm:p-6"
          >
            <h2 className="flex items-center gap-2 text-lg font-semibold text-white sm:text-xl">
              <Trophy className="h-5 w-5 shrink-0 text-[#00FF66]" />
              Wyniki
            </h2>

            <Tabs
              value={activeTab}
              onValueChange={(value) => setActiveTab(value as EventLevel)}
              className="mt-3 sm:mt-4"
            >
              <TabsList className="w-full bg-white/4">
                {resultCategories.map((category) => (
                  <TabsTrigger key={category} value={category} className="flex-1 text-xs">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>

              {resultCategories.map((category) => {
                const entries =
                  event.results?.find((result) => result.category === category)?.entries ?? [];
                return (
                  <TabsContent key={category} value={category} className="mt-4">
                    <div className="overflow-hidden rounded-2xl border border-white/10">
                      <table className="w-full text-left">
                        <thead className="bg-white/3">
                          <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-[#A3B5A8]">
                            <th className="px-4 py-3">Rank</th>
                            <th className="px-4 py-3">Imię i nazwisko</th>
                            <th className="px-4 py-3">Czas</th>
                            <th className="px-4 py-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {entries.map((entry) => {
                            const isLeader = entry.rank === 1 && !entry.dsq;
                            return (
                              <tr
                                key={`${category}-${entry.rank}-${entry.name}`}
                                className={`border-b border-white/10 last:border-none ${
                                  isLeader
                                    ? "border-l-2 border-l-amber-300 bg-amber-200/5 shadow-[inset_0_0_18px_rgba(251,191,36,0.16)]"
                                    : "bg-white/1"
                                }`}
                              >
                                <td className="px-4 py-3 text-sm font-semibold text-white">
                                  {entry.rank}
                                </td>
                                <td className="px-4 py-3 text-sm text-white">{entry.name}</td>
                                <td
                                  className={`px-4 py-3 font-mono text-sm ${
                                    entry.dsq ? "text-[#FF6B00]" : "text-white"
                                  }`}
                                >
                                  {entry.dsq ? "DSQ" : entry.time}
                                </td>
                                <td className="px-4 py-3 text-sm text-[#A3B5A8]">
                                  {entry.dsq ? "Dyskwalifikacja" : "Ukończono"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
          </section>
        ) : null}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#0B110D]/80 px-4 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4">
          <p className="truncate text-sm text-[#A3B5A8]">{event.title}</p>

          {event.status === "open" ? (
            <Link
              to="/events/$id/register"
              params={{ id: event.id }}
              className="inline-flex rounded-xl bg-[#00FF66] px-4 py-2 text-sm font-semibold text-[#0B110D] transition-opacity hover:opacity-90"
            >
              Zapisz się →
            </Link>
          ) : null}

          {event.status === "closed" ? (
            <button
              type="button"
              disabled
              className="inline-flex cursor-not-allowed rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/50"
            >
              Zapisy zamknięte
            </button>
          ) : null}

          {event.status === "live" ? (
            <Link
              to="/live"
              className="inline-flex rounded-xl bg-[#00FF66] px-4 py-2 text-sm font-semibold text-[#0B110D] transition-opacity hover:opacity-90"
            >
              Wyniki na żywo →
            </Link>
          ) : null}

          {event.status === "finished" ? (
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("results")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
              className="inline-flex rounded-xl border border-white/20 bg-transparent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Zobacz wyniki ↓
            </button>
          ) : null}
        </div>
      </div>

      {isMapOpen && event.mapImageUrl ? (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/75 p-4"
          onClick={() => setIsMapOpen(false)}
          role="presentation"
        >
          <div className="relative max-h-[90vh] max-w-6xl overflow-hidden rounded-2xl border border-white/20">
            <button
              type="button"
              className="absolute right-3 top-3 rounded-full bg-black/55 p-2 text-white transition-colors hover:bg-black/75"
              onClick={() => setIsMapOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={event.mapImageUrl}
              alt={`Powiększona mapa obszaru dla ${event.title}`}
              className="max-h-[90vh] w-full object-contain"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
