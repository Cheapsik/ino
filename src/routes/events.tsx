import { createFileRoute } from "@tanstack/react-router";
import { Calendar, MapPin, Search } from "lucide-react";
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
  return (
    <div className="min-h-[100dvh] bg-[#0B110D]">
      <Navbar />

      <main className="mx-auto w-full max-w-md px-5 pb-16 pt-6 sm:max-w-2xl lg:max-w-5xl">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Nadchodzące biegi
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Wybierz wydarzenie i zarezerwuj swoje miejsce w lesie.
          </p>
        </div>

        <div className="relative mt-5">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <input
            type="search"
            placeholder="Szukaj biegu lub lokalizacji…"
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/40 focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((evt) => (
            <article
              key={evt.id}
              className="glass-soft group flex flex-col rounded-2xl p-5 transition-all hover:border-primary/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-white/60">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{evt.date}</span>
                </div>
                <span className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                  {evt.status}
                </span>
              </div>

              <h2 className="mt-3 text-base font-semibold leading-tight text-white">{evt.title}</h2>

              <div className="mt-1.5 flex items-center gap-1 text-xs text-white/60">
                <MapPin className="h-3.5 w-3.5" />
                <span>{evt.location}</span>
              </div>

              <button
                type="button"
                className="mt-5 w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-xs font-semibold uppercase tracking-wider text-white/80 transition-all group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:text-primary"
              >
                Zapisz się
              </button>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
