import { Link, useRouterState } from "@tanstack/react-router";
import { Archive, Calendar, Radio, User } from "lucide-react";
import inoLogo from "@/assets/ino_logo.png";

const items = [
  { to: "/events", label: "Imprezy", icon: Calendar },
  { to: "/live", label: "Na żywo", icon: Radio },
  { to: "/", label: "Profil", icon: User },
  { to: "/", label: "Archiwum", icon: Archive },
] as const;

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden w-20 shrink-0 border-r border-white/10 bg-[#0a100c] md:flex md:flex-col md:items-center md:py-6">
      <Link
        to="/"
        className="mb-8 flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/5"
        aria-label="Strona główna"
      >
        <img src={inoLogo} alt="Logo InO" className="h-full w-full object-cover" />
      </Link>

      <nav className="flex flex-col gap-2">
        {items.map((item, idx) => {
          const active = pathname === item.to && idx < 3;
          const Icon = item.icon;
          return (
            <Link
              key={`${item.to}-${idx}`}
              to={item.to}
              className={
                "group relative flex h-11 w-11 items-center justify-center rounded-xl border transition-colors " +
                (active
                  ? "border-primary/50 bg-primary/15 text-primary"
                  : "border-transparent text-muted-forest hover:bg-white/5 hover:text-white")
              }
              aria-label={item.label}
            >
              <Icon className="h-5 w-5" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
