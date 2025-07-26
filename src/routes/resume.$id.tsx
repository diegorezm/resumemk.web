import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/resume/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return <div>{id}!</div>;
}
