import { ResumeListItem } from "./resume-list-item";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { Loader } from "@/components/loader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ClockArrowDown, ClockArrowUp } from "lucide-react";

export function ResumeList() {
  const [search, setSearch] = useState<string | null>(null);
  const [orderBy, setOrderBy] = useState<"desc" | "asc">("desc");

  const { data: resumes, isLoading } = useQuery(
    convexQuery(api.resumes.getMyResumes, {
      search: search ?? undefined,
      orderBy,
    }),
  );

  return (
    <section className="px-4 py-10 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Your Resumes</h2>
      <div className="flex flex-col md:flex-row gap-2 justify-between mb-4">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search..."
            onChange={(e) =>
              setSearch(e.target.value === "" ? null : e.target.value)
            }
          />
        </div>
        <div>
          <Button
            variant="outline"
            onClick={() => setOrderBy(orderBy === "desc" ? "asc" : "desc")}
          >
            {orderBy === "desc" ? <ClockArrowDown /> : <ClockArrowUp />}
            <span>Sort</span>
          </Button>
        </div>
      </div>
      {isLoading && <Loader />}

      {resumes?.length === 0 && (
        <p className="text-md text-center text-muted-foreground">
          No resume found! :(
        </p>
      )}

      <ul className="space-y-4">
        {resumes?.map((resume) => (
          <ResumeListItem resume={resume} key={resume._id} />
        ))}
      </ul>
    </section>
  );
}
