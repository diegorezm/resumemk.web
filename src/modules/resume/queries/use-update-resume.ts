import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import type { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

export function useUpdateResume() {
  const mutationFn = useConvexMutation(
    api.resumes.updateResume,
  ).withOptimisticUpdate((localStorage, args) => {
    const currentResume = localStorage.getQuery(api.resumes.getResume, {
      id: args.id,
    });
    if (!currentResume) return;

    const updatedResume: Doc<"resumes"> = {
      _id: args.id,
      _creationTime: Date.now(),
      createdBy: currentResume.createdBy,
      css: args.css ?? currentResume.css,
      markdown: args.markdown ?? currentResume.markdown,
      title: args.title ?? currentResume.title,
    };
    localStorage.setQuery(
      api.resumes.getResume,
      { id: args.id },
      updatedResume,
    );

    const existing = localStorage.getQuery(api.resumes.getMyResumes, {}) ?? [];

    const newList = existing.map((resume) =>
      resume._id === args.id ? updatedResume : resume,
    );

    localStorage.setQuery(api.resumes.getMyResumes, {}, newList);
  });

  return useMutation({ mutationFn });
}
