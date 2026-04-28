import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black/45 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-white">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-white">Chyba się pogubiłeś</h2>
        <p className="mt-2 text-sm text-muted-forest">
          Ścieżka której szukasz nie istnieje, następnym razem użyj kompasu!
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Strona główna
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Impreza na Orientację — Biegi na orientację" },
      {
        name: "description",
        content:
          "Tradycyjna nawigacja, cyfrowe wyniki. Wybierz trasę, śledź wyniki na żywo i ruszaj w las.",
      },
      { name: "author", content: "Impreza na Orientację" },
      { property: "og:title", content: "Impreza na Orientację — Biegi na orientację" },
      {
        property: "og:description",
        content: "Tradycyjna nawigacja, cyfrowe wyniki. Wybierz trasę i ruszaj w las.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Impreza na Orientację — Biegi na orientację" },
      {
        name: "twitter:description",
        content:
          "Tradycyjna nawigacja, cyfrowe wyniki. Wybierz trasę, śledź wyniki na żywo i ruszaj w las.",
      },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/zQy26wnPkVOevkYS3VQMavfKKKm1/social-images/social-1777377912875-ino_lampion.webp",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/zQy26wnPkVOevkYS3VQMavfKKKm1/social-images/social-1777377912875-ino_lampion.webp",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className="dark">
      <head>
        <HeadContent />
      </head>
      <body className="text-white antialiased">
        {children}
        <Toaster />
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
