import { Editor } from "@monaco-editor/react";

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
      options={{
        minimap: {
          enabled: false,
        },
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
      }}
    />
  );
}
