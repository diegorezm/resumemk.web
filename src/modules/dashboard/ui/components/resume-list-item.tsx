import type { Doc } from "@/convex/_generated/dataModel";

import { Link } from "@tanstack/react-router";

import { Hint } from "@/components/hint";

import { Edit, Ellipsis, Eye, TrashIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

type ResumeListItemProps = {
  resume: Doc<"resumes">;
};

export function ResumeListItem({ resume }: ResumeListItemProps) {
  const formatDate = (value: string | number | Date) => {
    const date = new Date(value);
    return date.toLocaleString(undefined, {
      dateStyle: "medium",
    });
  };

  return (
    <li className="flex justify-between items-center border rounded-lg px-4 py-2 bg-accent/50">
      <div className="flex flex-col">
        <Link
          to="/resume/$id"
          params={{
            id: resume._id,
          }}
        >
          {resume.title}
        </Link>
        <span className="text-sm text-muted-foreground">
          {formatDate(resume._creationTime)}
        </span>
      </div>
      <div>
        <DropdownMenu>
          <Hint text="Actions">
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
          </Hint>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link
                to="/resume/$id"
                params={{
                  id: resume._id,
                }}
                className="flex flex-row items-center gap-2"
              >
                <Eye className="size-4" />
                <span className="text-md">View</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="size-4" />
              <span className="text-md">Edit</span>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <TrashIcon className="size-4" />
              <span className="text-md">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </li>
  );
}
