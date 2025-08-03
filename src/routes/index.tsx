import { HomeView } from "@/modules/home/ui/views/home-view";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  ssr: true,
});

function App() {
  return <HomeView />;
}
