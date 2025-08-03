import {
  Outlet,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";

import { DefaultCatchBoundary } from "@/components/default-catch-boundary.tsx";

import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";
import { Providers } from "@/components/providers.tsx";
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
      {
        name: "description",
        content:
          "Create your resume for free with Resumemk using Markdown. Build professional resumes quickly and effortlessly.",
      },
      {
        name: "author",
        content: "Diego Rezende",
      },
      {
        name: "keywords",
        content:
          "resume builder, Markdown resume, free resume maker, professional resume generator, Resumemk, create resume online",
      },
      {
        property: "og:title",
        content: "Resumemk - Your resume with markdown!",
      },
      {
        property: "og:description",
        content:
          "Create your resume for free with Resumemk using Markdown. Build professional resumes quickly and effortlessly.",
      },
      {
        property: "og:url",
        content: "https://resumemk.xyz",
      },
      {
        property: "og:image",
        content: "https://resumemk.xyz/og.png",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Resumemk - Your resume with markdown!",
      },
      {
        name: "twitter:description",
        content:
          "Create your resume for free with Resumemk using Markdown. Build professional resumes quickly and effortlessly.",
      },
      {
        name: "twitter:image",
        content: "https://resumemk.xyz/og.png",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "author",
        href: "https://diegorezm.xyz/",
      },
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap",
      },
    ],
  }),
  component: () => (
    <RootDocument>
      <Providers>
        <Outlet />
        <Toaster />
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
