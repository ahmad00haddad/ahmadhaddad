import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Youtube, Facebook, Mail } from "lucide-react";
import { useSettings, useContent } from "@/lib/use-settings";

export function Footer() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const { settings } = useSettings();
  const { rows: clients } = useContent<any>("clients");
  const c = settings.contact;
  const brand = isAr ? (settings.brand.name_ar || "حدّاد") : (settings.brand.name_en || "Haddad");
  const copyright = (isAr ? settings.footer.copyright_ar : settings.footer.copyright_en) || t("footer.rights");

  const socials = [
    { href: c.instagram, label: "Instagram", Icon: Instagram },
    { href: c.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: c.youtube, label: "YouTube", Icon: Youtube },
    { href: c.facebook, label: "Facebook", Icon: Facebook },
  ].filter((s) => s.href);

  return (
    <footer className="mt-16 border-t border-border bg-[var(--surface-deep)]">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 md:grid-cols-3 md:py-10">
        <div>
          <h3 className="font-arabic text-lg font-black md:text-xl">{brand}</h3>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground whitespace-pre-line md:text-sm">{(isAr ? settings.footer.blurb_ar : settings.footer.blurb_en) || t("footer.blurb")}</p>
          {((isAr ? settings.footer.blurb2_ar : settings.footer.blurb2_en) || t("footer.blurb2")) && (
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground whitespace-pre-line md:text-sm">{(isAr ? settings.footer.blurb2_ar : settings.footer.blurb2_en) || t("footer.blurb2")}</p>
          )}
        </div>

        <div>
          <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brass">
            {t("nav.home")}
          </h4>
          <ul className="space-y-1 text-xs text-muted-foreground md:text-sm">
            <li><Link to="/" className="hover:text-foreground">{t("nav.home")}</Link></li>
            <li><Link to="/about" className="hover:text-foreground">{t("nav.about")}</Link></li>
            <li><Link to="/work" className="hover:text-foreground">{t("nav.work")}</Link></li>
            <li><Link to="/services" className="hover:text-foreground">{t("nav.services")}</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brass">
            {t("contact.info_title")}
          </h4>
          <ul className="space-y-1 text-xs text-muted-foreground md:text-sm">
            {(isAr ? c.city_ar : c.city_en) && <li>{isAr ? c.city_ar : c.city_en}</li>}
            {c.phone && <li dir="ltr">{c.phone}</li>}
            {c.email && (
              <li>
                <a href={`mailto:${c.email}`} className="hover:text-brass">{c.email}</a>
              </li>
            )}
          </ul>
          {socials.length > 0 && (
            <div className="mt-3 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brass hover:text-brass"
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-border py-3 text-center text-[10px] text-muted-foreground md:text-xs">
        {copyright}
      </div>
    </footer>
  );
}
