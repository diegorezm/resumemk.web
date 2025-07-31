import { create } from "zustand";

interface IUseOpenDeleteResumeDialog {
    resumeId: string | null;
    isOpen: boolean;
    onOpen: (r: string) => void;
    onClose: VoidFunction;
}

export const useOpenDeleteResumeDialog = create<IUseOpenDeleteResumeDialog>(
    (set) => ({
        resumeId: null,
        isOpen: false,
        onOpen: (r) => set({ isOpen: true, resumeId: r }),
        onClose: () => set({ isOpen: false, resumeId: null }),
    }),
);
