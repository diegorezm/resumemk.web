import { createFileRoute } from "@tanstack/react-router";
import { ResumeDraftView } from "@/modules/resume/ui/views/resume-draft-view";

export const Route = createFileRoute("/resume/draft")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ResumeDraftView />;
}
