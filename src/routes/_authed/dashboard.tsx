import { createFileRoute } from "@tanstack/react-router";
import { DashboardView } from "@/modules/dashboard/ui/views/dashboard-view";

export const Route = createFileRoute("/_authed/dashboard")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Resumemk | Dashboard" }],
  }),
});

function RouteComponent() {
  return <DashboardView />;
}
