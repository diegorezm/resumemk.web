import { useState } from "react";
import { CodeEditor } from "./code-editor";
import { cn } from "@/lib/utils";
import { Expand, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MarkdownPreview } from "./markdown-preview";

interface Props {
  markdown: string;
  setMarkdown: (s: string) => void;
  css: string;
  setCss: (s: string) => void;
  isEditorFullScreen: boolean;
  setEditorFullScreen: (b: boolean) => void;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  title?: string;
}

// A lot of deps huh
export function EditorTabs({
  markdown,
  setMarkdown,
  css,
  setCss,
  isEditorFullScreen,
  setEditorFullScreen,
  title = "Preview",
  iframeRef,
}: Props) {
  const [activeTab, setActiveTab] = useState<"markdown" | "css" | "preview">(
    "markdown",
  );

  const tabs = isEditorFullScreen
    ? ["markdown", "css", "preview"]
    : ["markdown", "css"];

  return (
    <>
      <header className="flex justify-between items-center border-b px-2 h-10 bg-muted/50">
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab as "markdown" | "css")}
              className={cn(
                "text-sm px-3 py-1 rounded",
                activeTab === tab
                  ? "bg-background font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
        <Button
          type="button"
          onClick={() => {
            setEditorFullScreen(!isEditorFullScreen);
            if (activeTab === "preview") {
              setActiveTab("markdown");
            }
          }}
          variant={"ghost"}
          size="icon"
        >
          {isEditorFullScreen ? <Minimize /> : <Expand />}
        </Button>
      </header>
      {activeTab === "preview" ? (
        <MarkdownPreview
          title={title}
          markdown={markdown}
          css={css}
          iframeRef={iframeRef}
        />
      ) : (
        <CodeEditor
          value={activeTab === "markdown" ? markdown : css}
          setValue={(val) => {
            if (activeTab === "markdown") setMarkdown(val);
            else setCss(val);
          }}
          width="100%"
          height="100%"
          language={activeTab === "markdown" ? "markdown" : "css"}
        />
      )}
    </>
  );
}
