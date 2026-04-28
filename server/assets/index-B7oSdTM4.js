import { r as reactExports, U as jsxRuntimeExports } from "./worker-entry-BBPuhNZi.js";
import { L as Link, h as hasLiveEvent } from "./router-B8zQIBMN.js";
import { N as Navbar } from "./Navbar-C_EG0ANP.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const lampion = "/ino/assets/lampion-C1mlr0ap.mp4";
const lampionPoster = "/ino/assets/lampion-ypg221JK.jpg";
function Index() {
  const videoRef = reactExports.useRef(null);
  const isLoopRestartingRef = reactExports.useRef(false);
  const [zoomIn, setZoomIn] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setZoomIn(true);
  }, []);
  const handleSeamlessLoop = () => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return;
    if (isLoopRestartingRef.current || video.seeking) return;
    if (video.duration - video.currentTime <= 0.08) {
      isLoopRestartingRef.current = true;
      video.currentTime = 0.01;
      void video.play().catch(() => void 0);
      requestAnimationFrame(() => {
        isLoopRestartingRef.current = false;
      });
    }
  };
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        void video.play().catch(() => void 0);
        return;
      }
      video.pause();
    }, {
      threshold: 0.25
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-[100dvh] overflow-hidden bg-black/45", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("video", { ref: videoRef, className: `absolute inset-0 h-full w-full object-cover transition-transform duration-[16000ms] ease-out ${zoomIn ? "scale-110" : "scale-100"}`, src: lampion, poster: lampionPoster, autoPlay: true, muted: true, loop: false, playsInline: true, onTimeUpdate: handleSeamlessLoop, suppressHydrationWarning: true, "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-[#0B110D]/85 via-[#0B110D]/45 to-[#0B110D]", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-[48dvh] bg-gradient-to-b from-black/70 via-black/35 to-transparent", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex min-h-[100dvh] flex-col", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Navbar, { transparent: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-8 pt-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl", children: "Imprezy na Orientację" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-xs text-sm leading-relaxed text-white/80 sm:text-base", children: "Sprawdź najbliższe imprezy, szczegóły tras i wyniki na żywo." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto flex flex-col items-center gap-4 pt-12", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/events", className: "flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-[0_8px_30px_rgba(0,255,102,0.35)] transition-all hover:bg-[#00CC55]", children: "Przejdź do aplikacji" }),
          hasLiveEvent() ? /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/live", className: "text-xs font-medium uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white", children: "Wyniki na żywo →" }) : null
        ] })
      ] })
    ] })
  ] });
}
export {
  Index as component
};
