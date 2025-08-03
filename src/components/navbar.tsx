import { Button } from "@/components/ui/button";
import { UserControl } from "@/components/user-control";
import { useAuth } from "@clerk/tanstack-react-start";
import { Link } from "@tanstack/react-router";

export function Navbar() {
  const auth = useAuth();

  return (
    <header className="w-full py-4">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/favicon.ico" alt="ResumeMaker" className="size-10" />
        </Link>
        <div className="flex items-center">
          {auth.isSignedIn ? (
            <UserControl />
          ) : (
            <div className="space-x-2">
              <Link to="/sign-in">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
