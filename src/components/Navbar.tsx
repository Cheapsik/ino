import { Link } from "@tanstack/react-router";
import inoLogo from "@/assets/ino_logo.png";
import { hasLiveEvent } from "@/data/events";

type NavbarProps = {
  transparent?: boolean;
};

export function Navbar({ transparent = false }: NavbarProps) {
  const links = [
    { to: "/events", label: "Imprezy", showLivePulse: false },
    ...(hasLiveEvent() ? ([{ to: "/live", label: "Na żywo", showLivePulse: true }] as const) : []),
  ];

  return (
    <header
      className={
        "sticky top-0 z-30 border-b backdrop-blur " +
        (transparent ? "border-white/10 bg-black/15" : "border-white/10 bg-[#0B110D]/85")
      }
    >
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5">
        <Link
          to="/"
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-white/15 bg-white/5"
          aria-label="Strona główna InO"
        >
          <img src={inoLogo} alt="Logo InO" className="h-full w-full object-cover" />
        </Link>
        <nav className="flex items-center gap-1.5">
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/75 transition-colors hover:text-white"
              activeProps={{ className: "bg-primary/15 text-primary" }}
            >
              {item.showLivePulse ? (
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
                </span>
              ) : null}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
