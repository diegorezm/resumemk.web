import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "@/convex/_generated/api";

export function useDeleteResume() {
  const mutationFn = useConvexMutation(
    api.resumes.deleteResume,
  ).withOptimisticUpdate((localStorage, args) => {
    const existing = localStorage.getQuery(api.resumes.getMyResumes, {}) ?? [];
    const newList = existing.filter((r) => r._id !== args.id);
    localStorage.setQuery(api.resumes.getResume, { id: args.id }, undefined);
    localStorage.setQuery(api.resumes.getMyResumes, {}, newList);
  });

  return useMutation({ mutationFn });
}
