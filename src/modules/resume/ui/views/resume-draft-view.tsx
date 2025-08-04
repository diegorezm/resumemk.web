import { useRef } from "react";
import { ResumeTitleDropdown } from "@/modules/resume/ui/components/resume-title-dropdown";
import { EditorLayout } from "@/modules/resume/ui/components/editor-layout";
import { useResumeDraftStore } from "@/store/resume-draft";
import { SignInButton } from "@clerk/tanstack-react-start";
import { Button } from "@/components/ui/button";
import { LogIn, X } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useTranslation } from "react-i18next";

export function ResumeDraftView() {
  const { css, markdown, setMarkdown, setCss, alertDismissed, dismissAlert } =
    useResumeDraftStore();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const resumeTitle = "draft";

  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b px-4 py-2 flex items-center justify-between">
        <ResumeTitleDropdown
          title={resumeTitle}
          markdown={markdown}
          iframeRef={iframeRef}
          isDraft
        />
        <SignInButton mode="modal">
          <Button variant="outline" className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            {t("navbar.signIn")}
          </Button>
        </SignInButton>
      </header>

      {!alertDismissed && (
        <Alert className="flex my-2 mx-auto w-1/2 gap-2" variant="default">
          <div>
            <Button variant="ghost" size="sm" onClick={dismissAlert}>
              <X className="size-4" />
            </Button>
          </div>
          <div>
            <AlertTitle>{t("draft.alertTitle")}</AlertTitle>
            <AlertDescription>{t("draft.alertDescription")}</AlertDescription>
          </div>
        </Alert>
      )}

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
