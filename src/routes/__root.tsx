import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import ClerkProvider from "../integrations/clerk/provider.tsx";

import ConvexProvider from "../integrations/convex/provider.tsx";

import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
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
    ],
  }),

  component: () => (
    <RootDocument>
      <ClerkProvider>
        <ConvexProvider>
          <Outlet />
          <TanStackRouterDevtools />
          <TanStackQueryLayout />
        </ConvexProvider>
      </ClerkProvider>
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
