import { useEffect, useMemo, useRef, useState } from "react";
import type { OrienteeringEvent } from "@/data/events";

type LiveClockProps = {
  raceStartTime: string;
  eventStatus: OrienteeringEvent["status"];
};

function formatDuration(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

export function LiveClock({ raceStartTime, eventStatus }: LiveClockProps) {
  const [nowMs, setNowMs] = useState(() => Date.now());
  const raceStartMs = useMemo(() => new Date(raceStartTime).getTime(), [raceStartTime]);
  const frozenElapsedMsRef = useRef<number>(0);

  if (eventStatus === "finished" && frozenElapsedMsRef.current === 0) {
    frozenElapsedMsRef.current = Math.max(0, Date.now() - raceStartMs);
  }

  useEffect(() => {
    if (eventStatus === "finished") {
      return;
    }

    const id = window.setInterval(() => setNowMs(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [eventStatus]);

  const elapsedMs = eventStatus === "finished" ? frozenElapsedMsRef.current : nowMs - raceStartMs;
  const hasStarted = elapsedMs > 0;
  const label = hasStarted || eventStatus === "finished" ? "CZAS BIEGU" : "DO STARTU";
  const displayMs = hasStarted ? elapsedMs : Math.max(0, raceStartMs - nowMs);

  return (
    <div className="text-right">
      <p className="text-[10px] uppercase tracking-widest text-white/40">{label}</p>
      <span className="font-mono text-3xl tabular-nums tracking-tight text-white sm:text-4xl">
        {formatDuration(displayMs)}
      </span>
    </div>
  );
}
