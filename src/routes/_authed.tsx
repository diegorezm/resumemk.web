import { createFileRoute, redirect } from "@tanstack/react-router";
import { Outlet } from "@tanstack/react-router";
import { SignIn } from "@clerk/tanstack-react-start";
import { fetchClerkAuth } from "@/lib/auth";
import { DialogList } from "@/components/dialog-list";

export const Route = createFileRoute("/_authed")({
  component: RouteComponent,
  loader: async () => {
    const { userId } = await fetchClerkAuth();
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

function RouteComponent() {
  return (
    <>
      <Outlet />
      <DialogList />
    </>
  );
}
