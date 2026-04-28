import { Calendar, MapPin } from "lucide-react";
import type { OrienteeringEvent } from "@/data/events";

type RegisterEventSummaryProps = {
  event: OrienteeringEvent;
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

export function RegisterEventSummary({ event }: RegisterEventSummaryProps) {
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
    </section>
  );
}
