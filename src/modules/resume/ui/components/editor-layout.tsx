import { useState, type RefObject } from "react";

import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { EditorTabs } from "./editor-tabs";
import { MarkdownPreview } from "./markdown-preview";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  markdown: string;
  css: string;
  setMarkdown: (s: string) => void;
  setCss: (s: string) => void;
  iframeRef: RefObject<HTMLIFrameElement | null>;
}

export function EditorLayout({
  title,
  markdown,
  setMarkdown,
  css,
  setCss,
  iframeRef,
}: Props) {
  const [editorFullScreen, setEditorFullScreen] = useState(() => {
    return window.innerWidth < 768;
  });
  return (
    <main className="flex flex-col h-[calc(100vh-55px)]">
      <ResizablePanelGroup direction="horizontal" className="w-full flex-1">
        <ResizablePanel minSize={30} maxSize={70}>
          <EditorTabs
            markdown={markdown}
            css={css}
            setMarkdown={setMarkdown}
            setCss={setCss}
            isEditorFullScreen={editorFullScreen}
            setEditorFullScreen={setEditorFullScreen}
            title={title}
            iframeRef={iframeRef}
          />
        </ResizablePanel>
        {!editorFullScreen && (
          <>
            <ResizableHandle />
            <ResizablePanel minSize={30} maxSize={70}>
              <MarkdownPreview
                title={title}
                markdown={markdown}
                css={css}
                iframeRef={iframeRef}
              />
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>
    </main>
  );
}
