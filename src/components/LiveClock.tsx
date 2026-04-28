import { useEffect, useState } from "react";

function format(d: Date) {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function LiveClock() {
  const [now, setNow] = useState<string>(() => format(new Date()));

  useEffect(() => {
    const id = setInterval(() => setNow(format(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-3xl tabular-nums tracking-tight text-white sm:text-4xl">
      {now}
    </span>
  );
}
