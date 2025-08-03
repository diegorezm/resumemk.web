import { Footer } from "@/components/footer";
import { CreateResumeSection } from "../components/create-resume-section";
import { DashboardHeader } from "../components/dashboard-header";
import { ResumeList } from "../components/resume-list";

export function DashboardView() {
  return (
    <>
      <DashboardHeader />
      <main>
        <CreateResumeSection />
        <ResumeList />
        <Footer />
      </main>
    </>
  );
}
