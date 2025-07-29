import { getAuth } from "@clerk/tanstack-react-start/server";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { getWebRequest } from "@tanstack/react-start/server";
import { createServerFn } from "@tanstack/react-start";
import { Outlet } from "@tanstack/react-router";
import { SignIn } from "@clerk/tanstack-react-start";

const fetchClerkAuth = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await getAuth(getWebRequest()!);

  return {
    userId,
  };
});

export const Route = createFileRoute("/_authed")({
  component: () => <Outlet />,
  loader: async () => {
    const { userId } = await fetchClerkAuth();
    console.log({ userId });
    if (!userId) {
      throw redirect({
        to: "/sign-in",
      });
    }
    return { userId };
  },
  errorComponent: ({ error }) => {
    if (error.message === "Not authenticated") {
      return (
        <div className="flex items-center justify-center p-12">
          <SignIn routing="hash" forceRedirectUrl={window.location.href} />
        </div>
      );
    }
    throw error;
  },
});
