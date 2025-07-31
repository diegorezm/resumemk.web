import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useOpenEditResumeDialog } from "../../hooks/use-open-edit-resume-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { useUpdateResume } from "../../queries/use-update-resume";
import { useState, useEffect } from "react";

export function EditResumeDialog() {
  const { onClose, isOpen, resumeId } = useOpenEditResumeDialog();
  const { mutateAsync: updateResume, isPending: isUpdatePending } =
    useUpdateResume();

  const { isLoading: isLoadingData, data } = useQuery({
    enabled: !!resumeId,
    ...convexQuery(api.resumes.getResume, {
      id: resumeId! as Id<"resumes">,
    }),
  });

  const [title, setTitle] = useState("");

  useEffect(() => {
    if (data?.title) {
      setTitle(data.title);
    }
  }, [data]);

  async function handleEditResume(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!resumeId) return;

    await updateResume({
      id: resumeId as Id<"resumes">,
      title,
    });

    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleEditResume} className="space-y-6">
          <DialogHeader>
            <DialogTitle>Edit Resume</DialogTitle>
            <DialogDescription>
              Change the title of your resume.
            </DialogDescription>
          </DialogHeader>

          <div className="flex gap-2">
            <Input
              placeholder="Title..."
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoadingData || isUpdatePending}
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={isUpdatePending}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isUpdatePending}>
              {isUpdatePending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
