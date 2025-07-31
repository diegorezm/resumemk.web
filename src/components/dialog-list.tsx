import { DeleteResumeDialog } from "@/modules/resume/ui/components/delete-resume-dialog";
import { EditResumeDialog } from "@/modules/resume/ui/components/edit-resume-dialog";

export function DialogList() {
  return (
    <>
      <DeleteResumeDialog />
      <EditResumeDialog />
    </>
  );
}
