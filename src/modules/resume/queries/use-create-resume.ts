import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import type { Doc, Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";

export function useCreateResume() {
    const mutationFn = useConvexMutation(
        api.resumes.createResume,
    ).withOptimisticUpdate((localStorage, args) => {
        const id = `optimistic-${Math.random().toString(36).slice(2)}`;

        const newResume: Doc<"resumes"> = {
            _id: id as Id<"resumes">,
            _creationTime: Date.now(),
            createdBy: "",
            ...args,
        };

        const existing =
            localStorage.getQuery(api.resumes.getMyResumes, {}) ?? [];
        localStorage.setQuery(api.resumes.getMyResumes, {}, [
            ...existing,
            newResume,
        ]);
    });

    return useMutation({ mutationFn });
}
