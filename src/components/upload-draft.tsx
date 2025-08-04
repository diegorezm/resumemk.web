import { useCreateResume } from "@/modules/resume/queries/use-create-resume";
import { useResumeDraftStore } from "@/store/resume-draft";
import { useAuth } from "@clerk/tanstack-react-start";
import { useCallback, useEffect, useRef } from "react";

export function UploadDraftOnSignup() {
  const { isSignedIn } = useAuth();
  const { markdown, css, wasModified, resetModified } = useResumeDraftStore();
  const { mutateAsync } = useCreateResume();
  const hasUploaded = useRef(false);

  const maybeUploadDraft = useCallback(async () => {
    if (hasUploaded.current) return;
    hasUploaded.current = true;

    if (!isSignedIn || !wasModified) return;

    try {
      await mutateAsync({
        title: "Untitled draft",
        markdown,
        css,
      });
      resetModified();
    } catch (error) {
      console.error(error);
    }
  }, [isSignedIn, wasModified, markdown, css, mutateAsync, resetModified]);

  useEffect(() => {
    maybeUploadDraft();
  }, [maybeUploadDraft]);

  return null;
}
