import { useEffect, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { applyDir, LANG_STORAGE_KEY } from "@/i18n";

export function I18nBoundary({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  // After hydration, sync language from localStorage (avoids SSR mismatch)
  useEffect(() => {
    const stored = typeof window !== "undefined"
      ? window.localStorage.getItem(LANG_STORAGE_KEY)
      : null;
    if (stored && stored !== i18n.language) {
      i18n.changeLanguage(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    applyDir(i18n.language);
    if (mounted && typeof window !== "undefined") {
      window.localStorage.setItem(LANG_STORAGE_KEY, i18n.language);
    }
  }, [i18n.language, mounted]);

  // During SSR + first client render, force Arabic markup so hydration matches
  if (!mounted) {
    return <div lang="ar" dir="rtl">{children}</div>;
  }
  return <>{children}</>;
}
