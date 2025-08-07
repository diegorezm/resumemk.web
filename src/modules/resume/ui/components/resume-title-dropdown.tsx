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

import { useState, type RefObject } from "react";
import { useOpenDeleteResumeDialog } from "../../hooks/use-open-delete-resume-dialog";
import { useOpenEditResumeDialog } from "../../hooks/use-open-edit-resume-dialog";
import { toast } from "sonner";

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
	const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

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

		const doc = iframe.contentDocument || iframe.contentWindow?.document;
		if (!doc) return;

		const html = doc.documentElement.innerHTML;
		if (!html) return;

		const toastId = toast.loading("Generating your pdf... ");

		setIsGeneratingPdf(true);
		try {
			const response = await fetch("/generate/pdf", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ html }),
			});

			if (!response.ok) {
				throw new Error("Something went wrong!");
			}
			const blob = await response.blob();
			const url = window.URL.createObjectURL(blob);

			const a = document.createElement("a");
			a.href = url;
			a.download = `${title}.pdf`;
			document.body.appendChild(a);
			a.click();
			a.remove();

			window.URL.revokeObjectURL(url);
			toast.success("PDF generated and downloaded!", { id: toastId });
		} catch (error) {
			let errorMessage = "Something went wrong while generating the PDF.";
			if (error instanceof Error) {
				errorMessage = `Failed to generate PDF: ${error.message}`;
			}
			toast.error(errorMessage, { id: toastId });
		} finally {
			setIsGeneratingPdf(false);
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
									<DropdownMenuItem
										onClick={downloadPDF}
										disabled={isGeneratingPdf}
									>
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
	);
}
