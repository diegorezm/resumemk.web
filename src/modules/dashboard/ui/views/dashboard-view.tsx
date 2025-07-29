import { api } from "@/convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

import { CreateResumeSection } from "../components/create-resume-section";
import { DashboardHeader } from "../components/dashboard-header";
import { ResumeList } from "../components/resume-list";

export function DashboardView() {
  const { data } = useSuspenseQuery(convexQuery(api.resumes.getMyResumes, {}));

  return (
    <>
      <DashboardHeader />
      <main>
        <CreateResumeSection />
        {data && <ResumeList resumes={data} />}
      </main>
    </>
  );
}
