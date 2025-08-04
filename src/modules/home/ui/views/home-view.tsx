import { useAuth } from "@clerk/tanstack-react-start";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { FeaturesSection } from "../components/features-section";
import { TemplatesSection } from "../components/templates-section";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Trans, useTranslation } from "react-i18next";

export function HomeView() {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <main className="max-w-7xl mx-auto px-4">
      <Navbar />
      <section
        className="w-full h-screen flex flex-col justify-center  items-center text-center space-y-4"
        id="hero"
      >
        <h1 className="text-5xl font-bold">{t("home.hero.heading")}</h1>
        <p className="text-lg text-muted-foreground">
          <Trans
            i18nKey="home.hero.subheading"
            t={t}
            components={{ 1: <strong />, 3: <strong /> }}
          />
        </p>
        <div className="space-x-4">
          <Link to={auth.isSignedIn ? "/dashboard" : "/resume/draft"}>
            <Button size="lg">
              {auth.isSignedIn
                ? t("home.hero.primaryButtonSignedIn")
                : t("home.hero.primaryButtonGuest")}
            </Button>
          </Link>
          <a href="#about">
            <Button variant="outline" size="lg">
              {t("home.hero.secondaryButton")}
            </Button>
          </a>
        </div>
      </section>

      <FeaturesSection />
      <TemplatesSection />

      <section className="py-24 text-center space-y-4">
        <h2 className="text-3xl font-bold">{t("home.cta.heading")}</h2>
        <p className="text-muted-foreground">{t("home.cta.text")}</p>
        <Link to={auth.isSignedIn ? "/dashboard" : "/resume/draft"}>
          <Button size="lg">{t("home.cta.button")}</Button>
        </Link>
      </section>
      <Footer />
    </main>
  );
}
