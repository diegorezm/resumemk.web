import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { DefaultCatchBoundary } from "@/components/default-catch-boundary.tsx";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";
import { Providers } from "@/components/providers.tsx";
import { DialogList } from "@/components/dialog-list";
import { Toaster } from "@/components/ui/sonner";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Resumemk",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
    ],
  }),

  component: () => (
    <RootDocument>
      <Providers>
        <Outlet />
        <Toaster />
        <DialogList />
        <TanStackRouterDevtools />
      </Providers>
    </RootDocument>
  ),
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="relative">
        <div className="absolute inset-0 -z-10 w-full h-full bg-background bg-[radial-gradient(var(--muted),transparent_1px)] [background-size:16px_16px]" />
        {children}

        <Scripts />
      </body>
    </html>
  );
}
