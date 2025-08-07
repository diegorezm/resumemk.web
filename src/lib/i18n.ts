import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { getWebRequest } from "@tanstack/react-start/server";

import enUS from "@/locales/en-us/translations.json";
import ptBR from "@/locales/pt-br/translations.json";
import { createServerFn } from "@tanstack/react-start";

const resources = {
	en: { translation: enUS },
	pt: { translation: ptBR },
} as const;

type SupportedLocale = keyof typeof resources;

const supportedLocales = Object.keys(resources) as SupportedLocale[];

type Locale = (typeof supportedLocales)[number];

const defaultLocale: Locale = "en";

const getLocale = createServerFn({ method: "GET", response: "data" }).handler(
	async () => {
		const request = getWebRequest();
		if (!request) {
			return {};
		}
		const header = request.headers.get("Accept-Language");
		const languages = header?.split(",") ?? [];

		return (
			supportedLocales.find((lang) => languages.includes(lang)) ?? defaultLocale
		);
	},
);

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: defaultLocale,
		supportedLngs: supportedLocales,
		debug: import.meta.env.DEV,

		detection: {
			order: ["localStorage", "navigator"],
			lookupLocalStorage: "i18nextLng",
			caches: ["localStorage"],
		},

		interpolation: {
			escapeValue: false,
		},

		saveMissing: true,
		saveMissingTo: "current",
		resources,
	});

export { getLocale, supportedLocales };
export default i18n;
