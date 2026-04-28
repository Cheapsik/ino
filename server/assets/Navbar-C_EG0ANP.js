import { U as jsxRuntimeExports } from "./worker-entry-BBPuhNZi.js";
import { h as hasLiveEvent, L as Link } from "./router-B8zQIBMN.js";
const inoLogo = "/ino/assets/ino_logo-Ckv3SLiN.png";
function Navbar({ transparent = false }) {
  const links = [
    { to: "/events", label: "Imprezy", showLivePulse: false },
    ...hasLiveEvent() ? [{ to: "/live", label: "Na żywo", showLivePulse: true }] : []
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "header",
    {
      className: "sticky top-0 z-30 border-b backdrop-blur " + (transparent ? "border-white/10 bg-black/15" : "border-white/10 bg-[#0B110D]/85"),
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            className: "flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-white/15 bg-white/5",
            "aria-label": "Strona główna InO",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: inoLogo, alt: "Logo InO", className: "h-full w-full object-cover" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex items-center gap-1.5", children: links.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: item.to,
            className: "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/75 transition-colors hover:text-white",
            activeProps: { className: "bg-primary/15 text-primary" },
            children: [
              item.showLivePulse ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative flex h-2 w-2 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative inline-flex h-2 w-2 rounded-full bg-red-400" })
              ] }) : null,
              item.label
            ]
          },
          item.to
        )) })
      ] })
    }
  );
}
export {
  Navbar as N
};
