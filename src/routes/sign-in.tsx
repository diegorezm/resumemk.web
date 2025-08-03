import { Navbar } from "@/components/navbar";
import { SignIn } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center justify-center px-4  max-w-5xl mx-auto">
        <SignIn
          signUpUrl={"/sign-up"}
          routing={"hash"}
          forceRedirectUrl={"/"}
        />
      </main>
    </>
  );
}
