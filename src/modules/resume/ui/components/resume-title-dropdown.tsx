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
import { Link } from "@tanstack/react-router";
import {
  ChevronDownIcon,
  ChevronLeft,
  Download,
  Edit,
  TrashIcon,
} from "lucide-react";

import type { RefObject } from "react";
import { useOpenDeleteResumeDialog } from "../../hooks/use-open-delete-resume-dialog";
import { useOpenEditResumeDialog } from "../../hooks/use-open-edit-resume-dialog";

interface Props {
  title: string;
  markdown: string;
  iframeRef: RefObject<HTMLIFrameElement | null>;
  resumeId?: string;
  isDraft?: boolean;
}

export function ResumeTitleDropdown({
  title,
  markdown,
  iframeRef,
  isDraft = false,
  resumeId,
}: Props) {
  const { onOpen: onOpenEditDialog } = useOpenEditResumeDialog();
  const { onOpen: onOpenDeleteDialog } = useOpenDeleteResumeDialog();

  function downloadHTML() {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc) return;

    const html = doc.documentElement.innerHTML;
    if (!html) return;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.html`;
    a.click();

    URL.revokeObjectURL(url);
  }

  function downloadMarkdown() {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.md`;
    a.click();

    URL.revokeObjectURL(url);
  }

  async function downloadPDF() {
    if (typeof window === "undefined") return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    const iframeWindow = iframe.contentWindow;
    if (
      iframeWindow &&
      iframeWindow.downloadPdf !== undefined &&
      typeof iframeWindow.downloadPdf === "function"
    ) {
      iframeWindow.downloadPdf();
    } else {
      console.warn("downloadPdf function not available in iframe yet.");
    }
  }

  return (
    <div className="flex gap-4 items-center justify-center">
      <Link to="/dashboard">
        <Button variant="outline" size="sm">
          <ChevronLeft className="size-4" />
        </Button>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"default"} size="sm">
            {title}
            <ChevronDownIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!isDraft && (
            <>
              <DropdownMenuItem
                onClick={() => onOpenEditDialog(resumeId ?? "")}
              >
                <Edit className="size-4" />
                <span className="text-md">Edit</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  onOpenDeleteDialog(resumeId ?? "");
                }}
              >
                <TrashIcon className="size-4" />
                <span className="text-md">Delete</span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Download className="size-4 mr-2" />
                Download
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={downloadPDF}>PDF</DropdownMenuItem>
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
  );
}
