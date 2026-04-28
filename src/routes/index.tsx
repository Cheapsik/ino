import { createFileRoute, Link } from "@tanstack/react-router";
import lampion from "@/assets/lampion.jpg";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Impreza na Orientację" },
      {
        name: "description",
        content:
          "W aplikacji InO sprawdzisz najbliższe imprezy, szczegóły tras i wyniki na żywo - wszystko w jednym miejscu.",
      },
      { property: "og:title", content: "Impreza na Orientację" },
      {
        property: "og:description",
        content: "Sprawdź imprezy InO, trasy i wyniki na żywo - wygodnie, w jednej aplikacji.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#0B110D]">
      {/* Hero photo */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${lampion})` }}
        suppressHydrationWarning
        aria-hidden
      />
      {/* Subtle dark wash for legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0B110D]/40 via-[#0B110D]/30 to-[#0B110D]"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        <Navbar transparent />

        <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-8 pt-16">
          {/* Headline block — top */}
          <div className="text-center">
            <h1 className="text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Imprezy na Orientację
            </h1>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-white/80 sm:text-base">
              Sprawdź najbliższe imprezy, szczegóły tras i wyniki na żywo.
            </p>
          </div>

          {/* Bottom CTA */}
          <div className="mt-auto flex flex-col items-center gap-4 pt-12">
            <Link
              to="/events"
              className="flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-[0_8px_30px_rgba(0,255,102,0.35)] transition-all hover:bg-[#00CC55]"
            >
              Przejdź do aplikacji
            </Link>
            <Link
              to="/live"
              className="text-xs font-medium uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
            >
              Wyniki na żywo →
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
