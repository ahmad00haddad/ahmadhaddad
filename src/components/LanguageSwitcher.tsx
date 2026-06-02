import { useTranslation } from "react-i18next";
import { applyDir } from "@/i18n";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const toggle = () => {
    const next = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(next);
    applyDir(next);
  };
  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-2 rounded-full border border-brass/40 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brass transition-colors hover:bg-brass hover:text-[var(--surface-deep)]"
      aria-label="Switch language"
    >
      <Globe className="size-3.5" />
      {t("lang.switch")}
    </button>
  );
}
