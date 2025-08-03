import { api } from "@/convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { EditorLayout } from "../components/editor-layout";
import { ResumeTitleDropdown } from "../components/resume-title-dropdown";
import type { Id } from "@/convex/_generated/dataModel";
import { useUpdateResume } from "../../queries/use-update-resume";
import { UserControl } from "@/components/user-control";

type Props = {
  resumeId: Id<"resumes">;
};

export function ResumeView({ resumeId }: Props) {
  const { data } = useSuspenseQuery(
    convexQuery(api.resumes.getResume, { id: resumeId }),
  );

  const { mutateAsync: updateResume } = useUpdateResume();

  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  async function setMarkdown(m: string) {
    await updateResume({ id: resumeId, markdown: m });
  }

  async function setCss(css: string) {
    await updateResume({ id: resumeId, css });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b px-4 py-2 flex items-center justify-between">
        <ResumeTitleDropdown
          title={data.title}
          markdown={data.markdown}
          iframeRef={iframeRef}
          resumeId={data._id}
        />
        <UserControl />
      </header>

      <EditorLayout
        title={data.title}
        css={data.css}
        setCss={setCss}
        markdown={data.markdown}
        setMarkdown={setMarkdown}
        iframeRef={iframeRef}
      />
    </div>
  );
}
