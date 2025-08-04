import { resumeTemplates } from "@/lib/resume-templates";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ResumeDraftStoreState {
  markdown: string;
  css: string;
  wasModified: boolean;
  setMarkdown: (s: string) => void;
  setCss: (s: string) => void;
  resetModified: () => void;
}

const initialMarkdown = resumeTemplates[0].markdown;
const initialCss = resumeTemplates[0].css;

export const useResumeDraftStore = create<ResumeDraftStoreState>()(
  persist(
    (set) => ({
      css: initialCss,
      markdown: initialMarkdown,
      wasModified: false,
      setMarkdown: (m) =>
        set((state) => ({
          markdown: m,
          wasModified: m !== initialMarkdown || state.css !== initialCss,
        })),
      setCss: (c) =>
        set((state) => ({
          css: c,
          wasModified: state.markdown !== initialMarkdown || c !== initialCss,
        })),
      resetModified: () =>
        set({ wasModified: false, markdown: initialMarkdown, css: initialCss }),
    }),
    {
      name: "resume-draft-storage",
    },
  ),
);
