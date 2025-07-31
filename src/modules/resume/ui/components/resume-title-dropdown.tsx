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
import { useOpenEditResumeDialog } from "../../hooks/use-open-edit-resume-dialog";
import { useOpenDeleteResumeDialog } from "../../hooks/use-open-delete-resume-dialog";

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
