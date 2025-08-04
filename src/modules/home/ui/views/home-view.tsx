import { useAuth } from "@clerk/tanstack-react-start";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { FeaturesSection } from "../components/features-section";
import { TemplatesSection } from "../components/templates-section";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function HomeView() {
  const auth = useAuth();

  return (
    <main className="max-w-7xl mx-auto px-4">
      <Navbar />
      <section
        className="h-[520px] md:h-[600px] lg:h-[880px] w-full flex flex-col mt-52 md:mt-64 lg:justify-center lg:mt-0 items-center text-center space-y-4"
        id="hero"
      >
        <h1 className="text-5xl font-bold">Welcome to Resume Maker!</h1>
        <p className="text-lg text-muted-foreground">
          Build professional resumes using <strong>Markdown</strong> and{" "}
          <strong>CSS</strong> no design skills required.
        </p>
        <div className="space-x-4">
          <Link to={auth.isSignedIn ? "/dashboard" : "/resume/draft"}>
            <Button size="lg">
              {auth.isSignedIn ? "Dashboard" : "Get started!"}
            </Button>
          </Link>
          <a href="#about">
            <Button variant="outline" size="lg">
              Learn more
            </Button>
          </a>
        </div>
      </section>

      <FeaturesSection />
      <TemplatesSection />

      <section className="py-24 text-center space-y-4">
        <h2 className="text-3xl font-bold">Ready to build your resume?</h2>
        <p className="text-muted-foreground">
          Start now it's free and requires no signup.
        </p>
        <Link to={auth.isSignedIn ? "/dashboard" : "/resume/draft"}>
          <Button size="lg">Start writing</Button>
        </Link>
      </section>
      <Footer />
    </main>
  );
}
