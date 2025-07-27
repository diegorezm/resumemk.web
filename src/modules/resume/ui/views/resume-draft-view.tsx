import { useRef } from "react";
import { ResumeTitleDropdown } from "@/modules/resume/ui/components/resume-title-dropdown";
import { EditorLayout } from "@/modules/resume/ui/components/editor-layout";
import { useResumeDraftStore } from "@/store/resume-draft";

export function ResumeDraftView() {
  const { css, markdown, setMarkdown, setCss } = useResumeDraftStore();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const resumeTitle = "draft";

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b px-4 py-2 flex items-center justify-between">
        <ResumeTitleDropdown
          title={resumeTitle}
          markdown={markdown}
          iframeRef={iframeRef}
        />
      </header>

      <EditorLayout
        title={resumeTitle}
        css={css}
        setCss={setCss}
        markdown={markdown}
        setMarkdown={setMarkdown}
        iframeRef={iframeRef}
      />
    </div>
  );
}
