import type { Doc } from "@/convex/_generated/dataModel";

import { Link, useNavigate } from "@tanstack/react-router";

import { Hint } from "@/components/hint";

import { BookCopy, Edit, Ellipsis, Eye, TrashIcon } from "lucide-react";

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useOpenDeleteResumeDialog } from "@/modules/resume/hooks/use-open-delete-resume-dialog";
import { useOpenEditResumeDialog } from "@/modules/resume/hooks/use-open-edit-resume-dialog";
import { useCreateResume } from "@/modules/resume/queries/use-create-resume";

type ResumeListItemProps = {
	resume: Doc<"resumes">;
};

function formatDate(value: string | number | Date) {
	const date = new Date(value);
	return date.toLocaleString(undefined, {
		dateStyle: "medium",
	});
}

export function ResumeListItem({ resume }: ResumeListItemProps) {
	const { onOpen: onOpenDeleteResumeDialog } = useOpenDeleteResumeDialog();
	const { onOpen: onOpenEditResumeDialog } = useOpenEditResumeDialog();

	const { mutateAsync: duplicateResume, isPending: duplicatePending } =
		useCreateResume();

	const navigate = useNavigate();

	return (
		<li className="flex justify-between items-center border rounded-lg px-4 py-2 bg-accent/50">
			<div className="flex flex-col">
				<Link
					to="/resume/$id"
					className="hover:underline"
					params={{
						id: resume._id,
					}}
				>
					{resume.title}
				</Link>
				<span className="text-sm text-muted-foreground">
					{formatDate(resume._creationTime)}
				</span>
			</div>
			<div>
				<DropdownMenu>
					<Hint text="Actions">
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="icon">
								<Ellipsis />
							</Button>
						</DropdownMenuTrigger>
					</Hint>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<Link
								to="/resume/$id"
								params={{
									id: resume._id,
								}}
								className="flex flex-row items-center gap-2 w-full"
							>
								<Eye className="size-4" />
								<span className="text-md">View</span>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={async () => {
								const r = await duplicateResume({
									css: resume.css,
									markdown: resume.markdown,
									title: `${resume.title} (Copy)`,
								});
								navigate({
									to: "/resume/$id",
									params: {
										id: r,
									},
								});
							}}
							disabled={duplicatePending}
						>
							<BookCopy className="size-4" />
							<span className="text-md">Duplicate</span>
						</DropdownMenuItem>

						<DropdownMenuItem
							onClick={() => {
								onOpenEditResumeDialog(resume._id);
							}}
						>
							<Edit className="size-4" />
							<span className="text-md">Edit</span>
						</DropdownMenuItem>

						<DropdownMenuItem
							onClick={() => {
								onOpenDeleteResumeDialog(resume._id);
							}}
						>
							<TrashIcon className="size-4" />
							<span className="text-md">Delete</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</li>
	);
}
