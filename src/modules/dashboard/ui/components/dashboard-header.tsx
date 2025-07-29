import { Button } from "@/components/ui/button";
import { UserControl } from "@/components/user-control";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="px-4 py-2 flex justify-between items-center border-b border-border">
      <div>
        <Link to="/">
          <Button variant="outline" size="icon">
            <ChevronLeft />
          </Button>
        </Link>
      </div>
      <div>
        <UserControl showName />
      </div>
    </header>
  );
}
