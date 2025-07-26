import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { CodeEditor } from "@/modules/resume/ui/components/code-editor";
import { MarkdownPreview } from "@/modules/resume/ui/components/markdown-preview";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ChevronDownIcon, ChevronLeft, Download } from "lucide-react";
import { useRef, useState } from "react";

export const Route = createFileRoute("/resume/draft")({
  component: RouteComponent,
});

function RouteComponent() {
  const [activeTab, setActiveTab] = useState<"markdown" | "css">("markdown");
  const [markdown, setMarkdown] = useState("");
  const [css, setCss] = useState("");
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  function downloadHTML() {
    // const html = getPreviewHTML();
    // if (!html) return;
    // const blob = new Blob([html], { type: "text/html" });
    // const url = URL.createObjectURL(blob);
    //
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = "resume.html";
    // a.click();
    //
    // URL.revokeObjectURL(url);
  }

  function downloadMarkdown() {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.html";
    a.click();

    URL.revokeObjectURL(url);
  }

  function downloadPDF() {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;
    const printWindow = window.open("", "_blank", "width=800,height=1000");
    if (!printWindow) return;
    const html = doc.documentElement.innerHTML;

    printWindow.document.open();
    printWindow.document.writeln(html);
    printWindow.document.close();

    // Wait for content to load before printing
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b px-4 py-2 flex items-center justify-between">
        <div className="flex gap-4 items-center">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ChevronLeft />
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"default"}>
                Resume
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Download className="size-4 mr-2" />
                    Download
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem onClick={downloadPDF}>
                        PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={downloadHTML}>
                        HTML
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={downloadMarkdown}>
                        Markdown
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex flex-col h-[calc(100vh-55px)]">
        <ResizablePanelGroup direction="horizontal" className="w-full flex-1">
          <ResizablePanel minSize={20} maxSize={80}>
            <div className="border-b px-2 h-10 flex items-center gap-2 bg-muted/50">
              {["markdown", "css"].map((tab) => (
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
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel minSize={40} maxSize={60}>
            <MarkdownPreview
              markdown={markdown}
              css={css}
              iframeRef={iframeRef}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
