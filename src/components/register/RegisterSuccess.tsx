import { Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { categoryLevelTone } from "@/constants/categoryLevelTone";
import type { EventLevel, OrienteeringEvent } from "@/data/events";

type RegisterSuccessData = {
  email: string;
  patrolPhone: string;
  teamName: string;
  teamMembers: string;
  category: EventLevel;
};

type RegisterSuccessProps = {
  event: OrienteeringEvent;
  successData: RegisterSuccessData;
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

export function RegisterSuccess({ event, successData }: RegisterSuccessProps) {
  return (
    <section className="space-y-5 text-center">
      <CheckCircle2 className="mx-auto h-16 w-16 text-[#00FF66]" />
      <div>
        <h2 className="text-2xl font-bold text-white">Zgłoszenie przyjęte!</h2>
        <p className="mt-2 text-sm text-[#A3B5A8]">
          Potwierdzenie zostanie wysłane na podany adres e-mail.
        </p>
      </div>

      <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
        <p className="text-sm text-[#A3B5A8]">
          Nazwa patrolu: <span className="font-medium text-white">{successData.teamName}</span>
        </p>
        <p className="text-sm text-[#A3B5A8]">
          Email: <span className="font-medium text-white">{successData.email}</span>
        </p>
        <p className="text-sm text-[#A3B5A8]">
          Telefon patrolowego:{" "}
          <span className="font-medium text-white">{successData.patrolPhone}</span>
        </p>
        <p className="text-sm text-[#A3B5A8]">
          Poziom:{" "}
          <span
            className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${categoryLevelTone[successData.category].active}`}
          >
            {successData.category}
          </span>
        </p>
        <p className="text-sm text-[#A3B5A8]">
          Wydarzenie: <span className="font-medium text-white">{event.title}</span>
        </p>
        <p className="text-sm text-[#A3B5A8]">
          Data: <span className="font-medium text-white">{formatEventDate(event.date)}</span>
        </p>
        <p className="text-sm text-[#A3B5A8]">
          Skład patrolu: <span className="font-medium text-white">{successData.teamMembers}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          to="/events"
          className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 text-sm font-semibold text-white transition-colors hover:bg-white/10"
        >
          ← Wróć do wydarzeń
        </Link>
        <Link
          to="/live"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-[#00FF66] px-4 text-sm font-bold text-[#0B110D] transition-all hover:brightness-105 hover:shadow-[0_0_24px_rgba(0,255,102,0.4)]"
        >
          Sprawdź wyniki na żywo →
        </Link>
      </div>
    </section>
  );
}

export type { RegisterSuccessData };
