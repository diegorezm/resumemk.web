import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { editor } from "monaco-editor";

type EditorProps = editor.IStandaloneEditorConstructionOptions;

interface ICodeEditorConfig {
    options: EditorProps;
    setOptions: (e: EditorProps) => void;
}

export const useCodeEditorConfig = create<ICodeEditorConfig>()(
    persist(
        (set, get) => ({
            options: {
                minimap: { enabled: false },
                lineNumbers: "off",
                glyphMargin: false,
                folding: false,
                lineDecorationsWidth: 10,
                lineNumbersMinChars: 2,
                scrollBeyondLastLine: false,
                renderLineHighlight: "none",
                overviewRulerLanes: 0,
                scrollbar: {
                    vertical: "auto",
                    horizontal: "auto",
                    handleMouseWheel: true,
                },
                guides: {
                    indentation: true,
                },
                contextmenu: false,
                smoothScrolling: true,
                wordWrap: "on",
                fontSize: 16,
                fontLigatures: true,
                padding: {
                    top: 10,
                    bottom: 10,
                },
            },
            setOptions: (newOptions) => {
                const current = get().options;
                set({ options: { ...current, ...newOptions } });
            },
        }),
        {
            name: "code-editor-config",
        },
    ),
);
