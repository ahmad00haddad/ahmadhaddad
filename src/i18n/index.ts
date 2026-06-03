import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./ar.json";
import en from "./en.json";

export const SUPPORTED_LANGS = ["ar", "en"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];
export const LANG_STORAGE_KEY = "haddad-lang";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      ar: { translation: ar },
      en: { translation: en },
    },
    lng: "ar",
    fallbackLng: "ar",
    supportedLngs: ["ar", "en"],
    interpolation: { escapeValue: false },
  });
}

export function applyDir(lang: string) {
  if (typeof document === "undefined") return;
  const dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", dir);
  document.documentElement.setAttribute("lang", lang);
}

export default i18n;
