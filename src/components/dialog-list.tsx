import { DeleteResumeDialog } from "@/modules/resume/ui/components/delete-resume-dialog";
import { EditEditorConfigDialog } from "@/modules/resume/ui/components/edit-editor-config";
import { EditResumeDialog } from "@/modules/resume/ui/components/edit-resume-dialog";

export function DialogList() {
  return (
    <>
      <DeleteResumeDialog />
      <EditResumeDialog />
      <EditEditorConfigDialog />
    </>
  );
}
