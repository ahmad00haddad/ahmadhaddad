import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin, Youtube, Facebook, Mail } from "lucide-react";

const SOCIALS = [
  { href: "https://www.instagram.com/ahmad00haddad/", label: "Instagram", Icon: Instagram },
  { href: "https://www.linkedin.com/in/ahmad00haddad/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://www.youtube.com/@ahmad00haddad", label: "YouTube", Icon: Youtube },
  { href: "https://www.facebook.com/ahmad00haddad/", label: "Facebook", Icon: Facebook },
  { href: "https://behance.com/ahmad00haddad", label: "Behance", Icon: Mail },
];

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="mt-24 border-t border-border bg-[var(--surface-deep)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <h3 className="font-arabic text-2xl font-black">حدّاد</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t("footer.blurb")}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("footer.blurb2")}</p>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brass">
            {t("nav.home")}
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">{t("nav.home")}</Link></li>
            <li><Link to="/about" className="hover:text-foreground">{t("nav.about")}</Link></li>
            <li><Link to="/work" className="hover:text-foreground">{t("nav.work")}</Link></li>
            <li><Link to="/services" className="hover:text-foreground">{t("nav.services")}</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-brass">
            {t("contact.info_title")}
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>{t("contact.address")}</li>
            <li dir="ltr">+962 79 925 6345</li>
            <li>
              <a href="mailto:ahmad00haddad@gmail.com" className="hover:text-brass">
                ahmad00haddad@gmail.com
              </a>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brass hover:text-brass"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        {t("footer.rights")}
      </div>
    </footer>
  );
}
