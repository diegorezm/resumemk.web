import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "@clerk/tanstack-react-start";
import { Navbar } from "@/components/navbar";

export const Route = createFileRoute("/sign-up")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="px-4">
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4  max-w-5xl mx-auto">
        <SignUp
          signInUrl={"/sign-in"}
          routing={"hash"}
          forceRedirectUrl={"/"}
        />
      </main>
    </div>
  );
}
