import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ResumeDraftView } from "@/modules/resume/ui/views/resume-draft-view";
import { useAuth } from "@clerk/tanstack-react-start";

export const Route = createFileRoute("/resume/draft")({
  component: RouteComponent,
  ssr: false,
});

function RouteComponent() {
  const auth = useAuth();
  const navigate = useNavigate();
  if (auth.isSignedIn) {
    navigate({
      to: "/dashboard",
    });
  }
  return <ResumeDraftView />;
}
