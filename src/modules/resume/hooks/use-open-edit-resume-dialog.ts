import { create } from "zustand";

interface IUseOpenEditResumeDialog {
    resumeId: string | null;
    isOpen: boolean;
    onOpen: (r: string) => void;
    onClose: VoidFunction;
}

export const useOpenEditResumeDialog = create<IUseOpenEditResumeDialog>(
    (set) => ({
        resumeId: null,
        isOpen: false,
        onOpen: (r) => set((prev) => ({ ...prev, isOpen: true, resumeId: r })),
        onClose: () =>
            set((prev) => ({ ...prev, isOpen: false, resumeId: null })),
    }),
);
