import { createFileRoute } from "@tanstack/react-router";
import { DashboardView } from "@/modules/dashboard/ui/views/dashboard-view";

export const Route = createFileRoute("/_authed/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return <DashboardView />;
}
