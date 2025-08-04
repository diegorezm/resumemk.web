import { type ResumeTemplate, resumeTemplates } from "@/lib/resume-templates";
import { useCreateResume } from "@/modules/resume/queries/use-create-resume";
import { useNavigate } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import type { ReactNode } from "react";

export function CreateResumeSection() {
  return (
    <section className="bg-muted">
      <div className="text-muted-foreground px-4 py-2 space-y-4 max-w-5xl mx-auto">
        <h1 className="text-lg font-medium">New resume</h1>
        <ul className="flex gap-4 overflow-x-auto">
          <TemplateListItem
            template={{
              markdown: "",
              css: "",
              title: "Blank",
            }}
          >
            <div className="w-[220px] h-[300px] bg-white flex items-center justify-center">
              <PlusIcon className="size-10" />
            </div>
          </TemplateListItem>
          {resumeTemplates.map((t) => (
            <TemplateListItem key={t.title} template={t} />
          ))}
        </ul>
      </div>
    </section>
  );
}

type TemplateListItemProps = {
  template: ResumeTemplate;
  children?: ReactNode;
};

function TemplateListItem({ template, children }: TemplateListItemProps) {
  const { mutateAsync, isPending } = useCreateResume();
  const navigate = useNavigate();

  async function handleCreate() {
    await mutateAsync(
      {
        title: template.title,
        css: template.css,
        markdown: template.markdown,
      },
      {
        onSuccess: (id) => {
          navigate({
            to: "/resume/$id",
            params: {
              id,
            },
          });
        },
      },
    );
  }

  return (
    <li className="hover:bg-accent/50 hover:cursor-pointer min-w-[220px]">
      <button
        type={"button"}
        className="border-2 border-border rounded hover:border-primary disabled:opacity-60"
        disabled={isPending}
        onClick={handleCreate}
      >
        {template.image && (
          <img
            src={template.image}
            alt="Default template"
            className="w-[220px] h-[300px]"
          />
        )}
        {children}
      </button>
      <h2 className="text-lg font-semibold">{template.title}</h2>
      {template.description && (
        <p className="text-sm font-normal">{template.description}</p>
      )}
    </li>
  );
}
