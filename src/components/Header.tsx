import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
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
  const [isPill, setIsPill] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > 120 && !open) {
      if (latest > previous && latest > 150) {
        setIsPill(true);
      } else if (latest < previous - 15) {
        setIsPill(false);
      }
    } else {
      setIsPill(false);
    }
  });

  return (
    <header className="sticky top-0 z-50 flex justify-center w-full px-2 pt-2 md:pt-4 pointer-events-none">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={`pointer-events-auto flex items-center justify-between overflow-hidden backdrop-blur-md border border-[var(--border)]/40 bg-[var(--surface-deep)]/85 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] ${
          isPill ? "rounded-full px-5 py-2 gap-4" : "rounded-sm px-6 py-4 w-full max-w-7xl gap-6"
        }`}
      >
        <Link
          to="/"
          className="flex items-center gap-3 text-foreground shrink-0"
          onClick={() => setOpen(false)}
        >
          {settings.brand.logo_url && (
            <motion.img
              layout
              src={settings.brand.logo_url}
              alt={isAr ? brandAr : brandEn}
              className={`${isPill ? "h-6 md:h-7" : "h-9 md:h-10"} w-auto transition-all`}
            />
          )}
          <motion.span layout className={`${isPill ? "text-lg md:text-xl" : "text-xl md:text-2xl"} font-black tracking-tight transition-all ${isAr ? "font-arabic" : ""}`}>
            {isAr ? brandAr : brandEn}
          </motion.span>
        </Link>

        <AnimatePresence mode="popLayout">
          {!isPill && (
            <motion.nav
              layout
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.2 }}
              className="hidden items-center gap-7 md:flex whitespace-nowrap"
            >
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
            </motion.nav>
          )}
        </AnimatePresence>

        <button
          className="md:hidden shrink-0"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-2 right-2 top-20 flex flex-col gap-1 rounded-sm border border-border bg-[var(--surface-deep)] px-6 py-4 shadow-2xl md:hidden pointer-events-auto"
          >
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
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
