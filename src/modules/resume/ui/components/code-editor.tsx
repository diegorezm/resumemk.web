import { Editor } from "@monaco-editor/react";
import { useCodeEditorConfig } from "../../hooks/use-code-editor-config";

interface Props {
  value: string;
  setValue: (s: string) => void;
  width?: string;
  height?: string;
  language: "markdown" | "css";
}

export function CodeEditor({
  value,
  setValue,
  width = "100%",
  height = "100vh",
  language,
}: Props) {
  const { options } = useCodeEditorConfig();
  return (
    <Editor
      value={value}
      onChange={(e) => setValue(e || "")}
      language={language}
      width={width}
      height={height}
      beforeMount={({ editor }) => {
        fetch("/solarized-light.json")
          .then((e) => e.json())
          .then((theme) => {
            editor.defineTheme("solarized-light", theme);
            editor.setTheme("solarized-light");
          });
      }}
      options={options}
    />
  );
}
