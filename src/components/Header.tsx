import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useSettings } from "@/lib/use-settings";

const navItems = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/work", key: "nav.work" },
  { to: "/services", key: "nav.services" },
  { to: "/contact", key: "nav.contact" },
] as const;

export function Header() {
  const { t, i18n } = useTranslation();
  const { settings } = useSettings();
  const isAr = i18n.language === "ar";
  const brandAr = settings.brand.name_ar || "أحمد حدّاد";
  const brandEn = settings.brand.name_en || "Haddad";
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[var(--surface-deep)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link
          to="/"
          className="font-arabic text-2xl font-black tracking-tight text-foreground"
          onClick={() => setOpen(false)}
        >
          {isAr ? brandAr : brandEn}
          <span className="ms-2 text-sm font-normal text-muted-foreground">{isAr ? brandEn : brandAr}</span>
        </Link>


        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-brass"
              activeProps={{ className: "text-brass" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {t(item.key)}
            </Link>
          ))}
          <LanguageSwitcher />
        </nav>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border bg-[var(--surface-deep)] px-6 py-4 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-3 text-base text-muted-foreground hover:bg-white/5 hover:text-brass"
              activeProps={{ className: "text-brass" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="px-3 pt-2">
            <LanguageSwitcher />
          </div>
        </nav>
      )}
    </header>
  );
}
