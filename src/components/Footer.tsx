import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Youtube, Facebook } from "lucide-react";
import { useSettings } from "@/lib/use-settings";

export function Footer() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const { settings } = useSettings();
  const contact = settings.contact;
  const brand = isAr
    ? settings.brand.name_ar || "أحمد حدّاد"
    : settings.brand.name_en || "Ahmad Haddad";
  const copyright =
    (isAr ? settings.footer.copyright_ar : settings.footer.copyright_en) || t("footer.rights");

  const socials = [
    { href: contact.instagram, label: "Instagram", Icon: Instagram },
    { href: contact.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: contact.youtube, label: "YouTube", Icon: Youtube },
    { href: contact.facebook, label: "Facebook", Icon: Facebook },
  ].filter((social) => social.href);

  return (
    <footer className="border-t border-border bg-surface-deep">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-8 md:grid-cols-3 md:px-8">
        <div>
          <h3 className="text-xl">{brand}</h3>
          <p className="mt-3 max-w-sm whitespace-pre-line text-sm leading-7 text-muted-foreground">
            {(isAr ? settings.footer.blurb_ar : settings.footer.blurb_en) || t("footer.blurb")}
          </p>
        </div>

        <nav aria-label={isAr ? "روابط أساسية" : "Main links"}>
          <h4 className="mb-3 text-sm font-semibold text-cream">
            {isAr ? "الصفحات" : "Pages"}
          </h4>
          <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground md:grid-cols-1">
            <li><Link to="/" className="hover:text-foreground">{t("nav.home")}</Link></li>
            <li><Link to="/about" className="hover:text-foreground">{t("nav.about")}</Link></li>
            <li><Link to="/work" className="hover:text-foreground">{t("nav.work")}</Link></li>
            <li><Link to="/services" className="hover:text-foreground">{t("nav.services")}</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">{t("nav.contact")}</Link></li>
          </ul>
        </nav>

        <div>
          <h4 className="mb-3 text-sm font-semibold text-cream">{t("contact.info_title")}</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {(isAr ? contact.city_ar : contact.city_en) && (
              <li>{isAr ? contact.city_ar : contact.city_en}</li>
            )}
            {contact.phone && <li dir="ltr">{contact.phone}</li>}
            {contact.email && (
              <li><a href={`mailto:${contact.email}`} className="hover:text-brass">{contact.email}</a></li>
            )}
          </ul>
          {socials.length > 0 && (
            <div className="mt-4 flex gap-2">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-8 place-items-center rounded-sm border border-border text-muted-foreground transition-colors duration-200 hover:border-brass hover:text-brass"
                >
                  <Icon className="size-3.5" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-border px-6 py-4 text-xs text-muted-foreground md:px-8">
        <div className="mx-auto max-w-7xl">{copyright}</div>
      </div>
    </footer>
  );
}
