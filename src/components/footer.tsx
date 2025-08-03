import { Link } from "@tanstack/react-router";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@clerk/tanstack-react-start";

export function Footer() {
  const auth = useAuth();
  return (
    <footer className="mt-24 px-6 md:px-12 py-12 bg-muted/40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <img src="/favicon.ico" alt="ResumeMaker" className="size-9" />
          <p className="text-muted-foreground text-sm mt-2">
            Create stunning resumes with Markdown & CSS.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Navigation</h3>
          <ul className="space-y-1 text-muted-foreground text-sm">
            <li>
              <Link to="/">Home</Link>
            </li>
            {auth.isSignedIn ? (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/sign-up">SignIn</Link>
                </li>
                <li>
                  <Link to="/sign-in">SignUp</Link>
                </li>
              </>
            )}
            <li>
              <a href="/#about">About</a>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Connect</h3>
          <ul className="space-y-1 text-muted-foreground text-sm">
            <li>
              <a
                href="https://github.com/diegorezm/resumemk.web"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/diegorezm/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Copyright */}
      <p className="text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ResumeMaker. All rights reserved.
      </p>
    </footer>
  );
}
