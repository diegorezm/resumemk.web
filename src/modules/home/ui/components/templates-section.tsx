import { useTranslation } from "react-i18next";

const templateKeys = ["Professional", "Soft Gray", "Fancy"] as const;

const templates = [
  {
    key: "Professional",
    image: "/simple_resume_showcase.png",
  },
  {
    key: "Soft Gray",
    image: "/default_pdf_showcase.png",
  },
  {
    key: "Fancy",
    image: "fancy_preview.png",
  },
] as const;

export function TemplatesSection() {
  const { t } = useTranslation();

  return (
    <section className="py-24 space-y-10">
      <h2 className="text-3xl font-semibold text-center">
        {t("home.templates.title")}
      </h2>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto">
        {t("home.templates.description")}
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {templates.map((tItem) => (
          <div
            className="border rounded-xl p-4 shadow-sm text-center flex flex-col items-center justify-center gap-2 bg-muted text-muted-foreground"
            key={tItem.key}
          >
            <img
              src={tItem.image}
              alt={tItem.key}
              className="w-full h-[450px] rounded-md"
            />
            <p className="font-medium text-lg">
              {t(
                `home.templates.items.${templateKeys.indexOf(tItem.key)}.title`,
              )}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
