import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ClockArrowDown, Filter } from "lucide-react";

import type { Doc } from "@/convex/_generated/dataModel";
import { ResumeListItem } from "./resume-list-item";

type ResumeListProps = {
  resumes: Doc<"resumes">[];
};

export function ResumeList({ resumes }: ResumeListProps) {
  return (
    <section className="px-4 py-10 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Resumes</h2>

      <div className="flex flex-col  md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <Input placeholder="Search resumes..." className="w-full md:w-1/2" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <ClockArrowDown className="size-4" />
              <span className="text-md">Created at</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

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
