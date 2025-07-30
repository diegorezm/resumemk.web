import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/tanstack-react-start";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  ssr: true,
});

function App() {
  const auth = useAuth();

  return (
    <main className="text-center max-w-5xl mx-auto px-4">
      <section className="h-screen w-full space-y-6 flex flex-col justify-center items-center">
        <h1 className="text-5xl font-semibold">Welcome to Resume Maker!</h1>
        <p className="text-lg">
          Create your resume with only{" "}
          <span className="font-semibold">Markdown</span> and{" "}
          <span className="font-semibold">CSS</span>
        </p>
        <div className="space-x-4">
          {/* TODO: Send user to /dashboard if he is authenticated */}
          <Link to={auth.isSignedIn ? "/dashboard" : "/resume/draft"}>
            <Button size="lg">Get started!</Button>
          </Link>
          <a href="/">
            <Button variant="outline" size="lg">
              Knowm more!
            </Button>
          </a>
        </div>
      </section>
    </main>
  );
}
