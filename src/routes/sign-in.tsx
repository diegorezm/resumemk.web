import { Navbar } from "@/components/navbar";
import { SignIn } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="px-4">
      <Navbar />
      <main className="min-h-screen flex items-center justify-center  max-w-5xl mx-auto">
        <SignIn
          signUpUrl={"/sign-up"}
          routing={"hash"}
          forceRedirectUrl={"/"}
        />
      </main>
    </div>
  );
}
