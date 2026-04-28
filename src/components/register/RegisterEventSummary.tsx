import { Calendar, MapPin } from "lucide-react";
import type { EventLevel, OrienteeringEvent } from "@/data/events";

type RegisterEventSummaryProps = {
  event: OrienteeringEvent;
  selectedCategory?: EventLevel;
};

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

export function RegisterEventSummary({ event, selectedCategory }: RegisterEventSummaryProps) {
  return (
    <section className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      <p className="text-base font-semibold text-white">{event.title}</p>
      <div className="mt-2 space-y-1 text-sm text-[#A3B5A8]">
        <p className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {formatEventDate(event.date)}
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          {event.location}
        </p>
      </div>
      <div className="mt-3">
        {selectedCategory ? (
          <span className="inline-flex rounded-full border border-[#00FF66] bg-[#00FF66]/10 px-3 py-1 text-xs font-semibold text-[#00FF66]">
            Poziom trudności: {selectedCategory}
          </span>
        ) : (
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/60">
            Poziom trudności: nie wybrano
          </span>
        )}
      </div>
    </section>
  );
}
