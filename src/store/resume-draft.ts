import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ResumeDraftStoreState {
  markdown: string;
  css: string;
  setMarkdown: (s: string) => void;
  setCss: (s: string) => void;
}

export const useResumeDraftStore = create<ResumeDraftStoreState>()(
  persist(
    (set) => ({
      css: "",
      markdown: "",
      setMarkdown: (m) => set({ markdown: m }),
      setCss: (c) => set({ css: c }),
    }),
    {
      name: "resume-draft-storage",
    },
  ),
);
