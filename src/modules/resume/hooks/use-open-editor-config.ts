import { create } from "zustand";

interface IUseOpenEditEditorConfigDialog {
    isOpen: boolean;
    onOpen: VoidFunction;
    onClose: VoidFunction;
}

export const useOpenEditEditorConfigDialog =
    create<IUseOpenEditEditorConfigDialog>((set) => ({
        isOpen: false,
        onOpen: () => set({ isOpen: true }),
        onClose: () => set({ isOpen: false }),
    }));
