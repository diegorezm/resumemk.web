import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@clerk/tanstack-react-start";

export const Route = createFileRoute("/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-2 max-w-5xl mx-auto">
      <SignUp signInUrl={"/sign-in"} routing={"hash"} forceRedirectUrl={"/"} />
    </main>
  );
}
