import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface Feature {
  title: string;
  description: string;
  image: string;
  alt: string;
  reverse?: boolean;
}

const features: Feature[] = [
  {
    title: "Live Markdown Editor",
    description:
      "Write your resume content using Markdown with real-time preview.",
    image: "/live_markdown_editor.png",
    alt: "Live markdown editor showcase",
  },
  {
    title: "Custom CSS Styling",
    description: "Personalize your resumes design with your own CSS styles.",
    image: "/css_editor.png",
    alt: "Live CSS styling",
    reverse: true, // reverse layout for variety
  },
  {
    title: "Export to PDF",
    description: "Instantly export your resume as a clean, print-ready PDF.",
    image: "/export_showcase.png",
    alt: "Export options",
  },
];

export function FeaturesSection() {
  return (
    <section id="about" className="py-24 space-y-16">
      <h2 className="text-3xl font-semibold text-center">
        What can Resume Maker do?
      </h2>

      <div className="space-y-16 ">
        {features.map((feature) => (
          <div
            key={feature.title}
            className={`flex flex-col h-full gap-6  px-4 md:flex-row ${
              feature.reverse ? "md:flex-row-reverse" : ""
            } overflow-hidden`}
          >
            <div className="md:w-1/2 w-full">
              <img
                src={feature.image}
                alt={feature.alt}
                className="w-full  h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 flex flex-col justify-center  space-y-4 text-center md:text-left">
              <h1 className="text-2xl font-semibold">{feature.title}</h1>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
