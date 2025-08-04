import { resumeTemplates } from "@/lib/resume-templates";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ResumeDraftStoreState {
  markdown: string;
  css: string;
  wasModified: boolean;
  alertDismissed: boolean;
  dismissAlert: VoidFunction;
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
      alertDismissed: false,
      markdown: initialMarkdown,
      wasModified: false,
      dismissAlert: () => set((state) => ({ ...state, alertDismissed: true })),
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
        set({
          wasModified: false,
          markdown: initialMarkdown,
          css: initialCss,
          alertDismissed: false,
        }),
    }),
    {
      name: "resume-draft-storage",
    },
  ),
);
