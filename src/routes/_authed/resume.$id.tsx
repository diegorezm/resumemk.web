import type { Id } from "@/convex/_generated/dataModel";
import { ResumeView } from "@/modules/resume/ui/views/resume-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed/resume/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <ResumeView resumeId={id as Id<"resumes">} />;
}
