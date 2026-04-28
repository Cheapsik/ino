import { createFileRoute, Link } from "@tanstack/react-router";
import lampion from "@/assets/lampion.mp4";
import lampionPoster from "@/assets/lampion.jpg";
import { Navbar } from "@/components/Navbar";
import { hasLiveEvent } from "@/data/events";
import { useEffect, useRef, useState } from "react";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const isLoopRestartingRef = useRef(false);
  const [zoomIn, setZoomIn] = useState(false);

  useEffect(() => {
    setZoomIn(true);
  }, []);

  const handleSeamlessLoop = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    if (isLoopRestartingRef.current || video.seeking) return;

    if (video.duration - video.currentTime <= 0.08) {
      isLoopRestartingRef.current = true;
      video.currentTime = 0.01;
      void video.play().catch(() => undefined);
      requestAnimationFrame(() => {
        isLoopRestartingRef.current = false;
      });
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          void video.play().catch(() => undefined);
          return;
        }

        video.pause();
      },
      { threshold: 0.25 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-black/45">
      {/* Hero video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[16000ms] ease-out ${
          zoomIn ? "scale-110" : "scale-100"
        }`}
        src={lampion}
        poster={lampionPoster}
        autoPlay
        muted
        loop={false}
        playsInline
        onTimeUpdate={handleSeamlessLoop}
        suppressHydrationWarning
        aria-hidden
      />
      {/* Subtle dark wash for legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0B110D]/85 via-[#0B110D]/45 to-[#0B110D]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 top-0 h-[48dvh] bg-gradient-to-b from-black/70 via-black/35 to-transparent"
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
            {hasLiveEvent() ? (
              <Link
                to="/live"
                className="text-xs font-medium uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
              >
                Wyniki na żywo →
              </Link>
            ) : null}
          </div>
        </main>
      </div>
    </div>
  );
}
