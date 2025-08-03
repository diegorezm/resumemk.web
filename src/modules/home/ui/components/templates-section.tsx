const templates = [
  {
    title: "Professional",
    image: "/simple_resume_showcase.png",
  },
  {
    title: "Soft Gray",
    image: "/default_pdf_showcase.png",
  },
  {
    title: "Fancy",
    image: "fancy_preview.png",
  },
] as const;

export function TemplatesSection() {
  return (
    <section className="py-24 space-y-10">
      <h2 className="text-3xl font-semibold text-center">
        Beautiful Templates
      </h2>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto">
        Choose from curated templates or create your own. Our layouts are
        designed for readability and elegance.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {templates.map((t) => {
          return (
            <div
              className="border rounded-xl p-4 shadow-sm text-center flex flex-col items-center justify-center gap-2 bg-muted text-muted-foreground"
              key={t.title}
            >
              <img
                src={t.image}
                alt={t.title}
                className="w-full h-[450px] rounded-md"
              />
              <p className="font-medium text-lg">{t.title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
