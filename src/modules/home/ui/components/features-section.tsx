import { useTranslation } from "react-i18next";

export function FeaturesSection() {
  const { t } = useTranslation();

  const features = t("home.features.items", { returnObjects: true }) as {
    title: string;
    description: string;
    alt: string;
  }[];

  return (
    <section id="about" className="py-24 space-y-16">
      <h2 className="text-3xl font-semibold text-center">
        {t("home.features.title")}
      </h2>

      <div className="space-y-16 ">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className={`flex flex-col h-full gap-6 px-4 md:flex-row ${
              i % 2 !== 0 ? "md:flex-row-reverse" : ""
            } overflow-hidden`}
          >
            <div className="md:w-1/2 w-full">
              <img
                src={
                  i === 0
                    ? "/live_markdown_editor.png"
                    : i === 1
                      ? "/css_editor.png"
                      : "/export_showcase.png"
                }
                alt={feature.alt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center space-y-4 text-center md:text-left">
              <h1 className="text-2xl font-semibold">{feature.title}</h1>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
