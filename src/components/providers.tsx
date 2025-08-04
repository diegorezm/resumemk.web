import type { ReactNode } from "react";

import { useAuth } from "@clerk/tanstack-react-start";
import { ClerkProvider } from "@clerk/tanstack-react-start";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexQueryClient } from "@convex-dev/react-query";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env.local file");
}

const CONVEX_URL = import.meta.env.VITE_CONVEX_URL;

if (!CONVEX_URL) {
  throw new Error("missing envar CONVEX_URL");
}

export const convexQueryClient = new ConvexQueryClient(CONVEX_URL);

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryKeyHashFn: convexQueryClient.hashFn(),
      queryFn: convexQueryClient.queryFn(),
    },
  },
  queryCache: new QueryCache({
    onError: (e) => {
      if (e instanceof ConvexError) {
        toast(e.data.message, {
          position: "bottom-right",
        });
      } else {
        toast("Something went wrong.", {
          position: "bottom-right",
        });
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (e) => {
      if (e instanceof ConvexError) {
        toast(e.data.message, {
          position: "bottom-right",
        });
      } else {
        toast("Something went wrong.", {
          position: "bottom-right",
        });
      }
    },
  }),
});

convexQueryClient.connect(queryClient);

export function getContext() {
  return {
    queryClient: convexQueryClient.queryClient,
  };
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <I18nextProvider i18n={i18n}>
      <ClerkProvider
        publishableKey={PUBLISHABLE_KEY}
        signInFallbackRedirectUrl={"/"}
        signUpFallbackRedirectUrl={"/"}
      >
        <ConvexProviderWithClerk
          client={convexQueryClient.convexClient}
          useAuth={useAuth}
        >
          <QueryClientProvider client={convexQueryClient.queryClient}>
            {children}
          </QueryClientProvider>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </I18nextProvider>
  );
}
