import { useResumeDraftStore } from "@/store/resume-draft";
import { useCreateResume } from "@/modules/resume/queries/use-create-resume";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/tanstack-react-start";

export function UnsavedDraftItem() {
  const { isSignedIn } = useAuth();
  const { markdown, css, wasModified, resetModified } = useResumeDraftStore();
  const { mutateAsync, isPending } = useCreateResume();

  if (!wasModified || !isSignedIn) return null;

  const handleSaveDraft = async () => {
    try {
      await mutateAsync({
        title: "Untitled draft",
        markdown,
        css,
      });
      resetModified();
    } catch (err) {
      console.error("Failed to create resume from draft", err);
    }
  };

  return (
    <li className="flex justify-between items-center border-dashed border-2  bg-accent text-accent-foreground rounded-lg px-4 py-2">
      <div className="flex flex-col">
        <span className="font-medium">You have an unsaved draft</span>
        <span className="text-sm text-muted-foreground">
          Click to convert it into a real resume
        </span>
      </div>
      <div>
        <Button
          variant="default"
          onClick={handleSaveDraft}
          disabled={isPending}
        >
          Save Draft
        </Button>
      </div>
    </li>
  );
}
