import { useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { applyDir } from "@/i18n";

export function I18nBoundary({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  useEffect(() => {
    applyDir(i18n.language);
  }, [i18n.language]);
  return <>{children}</>;
}
