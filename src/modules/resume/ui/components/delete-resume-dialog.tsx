import { Button } from "@/components/ui/button";
import { useOpenDeleteResumeDialog } from "../../hooks/use-open-delete-resume-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteResume } from "../../queries/use-delete-resume";
import type { Id } from "@/convex/_generated/dataModel";
import { useNavigate } from "@tanstack/react-router";
import { useLocation } from "@tanstack/react-router";

export function DeleteResumeDialog() {
  const { onClose, isOpen, resumeId } = useOpenDeleteResumeDialog();
  const navigation = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const {
    mutateAsync: deleteResume,
    isPending: deletePending,
    error,
    isError,
  } = useDeleteResume();

  async function handleDeleteResume() {
    if (resumeId === null) return;
    await deleteResume({
      id: resumeId as Id<"resumes">,
    }).then(() => {
      onClose();
      if (pathname.startsWith("/resume/")) {
        navigation({
          to: "/dashboard",
        });
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This resume will be deleted forever, there is no way to recover it.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            variant={"destructive"}
            disabled={deletePending}
            onClick={handleDeleteResume}
          >
            Delete
          </Button>
        </DialogFooter>
        {isError && (
          <p className="text-sm text-muted-foreground">{error.message}</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
