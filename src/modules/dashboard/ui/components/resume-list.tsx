import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import type { Doc } from "@/convex/_generated/dataModel";
import { ResumeListItem } from "./resume-list-item";

type ResumeListProps = {
  resumes: Doc<"resumes">[];
};

export function ResumeList({ resumes }: ResumeListProps) {
  return (
    <section className="px-4 py-10 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Resumes</h2>
      {resumes.length === 0 && (
        <p className="text-md text-center text-muted-foreground">
          No resume found! :(
        </p>
      )}

      <ul className="space-y-4">
        {resumes.map((resume) => (
          <ResumeListItem resume={resume} key={resume._id} />
        ))}
      </ul>
    </section>
  );
}
