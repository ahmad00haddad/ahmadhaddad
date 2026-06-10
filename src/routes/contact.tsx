import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Linkedin, Youtube, Facebook, Send } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { useSettings } from "@/lib/use-settings";
import { MagneticButton } from "@/components/MagneticButton";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل — أحمد حدّاد" },
      {
        name: "description",
        content: "تواصل مع أحمد حدّاد للتعاون في المشاريع السينمائية والتصوير.",
      },
      { property: "og:title", content: "تواصل مع أحمد حدّاد" },
      { property: "og:description", content: "للتعاون والمشاريع الإنتاجية." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const { settings } = useSettings();
  const c = settings.contact;
  const emailTo = c.email || "ahmad00haddad@gmail.com";
  const phone = c.phone || "+962 79 925 6345";
  const city = (isAr ? c.city_ar : c.city_en) || t("contact.address");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const today = new Date().toLocaleDateString(isAr ? "ar-EG" : "en-GB");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`رسالة من ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <PageHero title={t("contact.title")} subtitle={t("contact.subtitle")} />

      <div dir={isAr ? "rtl" : "ltr"} className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-5">
          {/* === Slate Clapperboard form === */}
          <form onSubmit={onSubmit} className="clapper md:col-span-3">
            {/* Diagonal striped clapper bar */}
            <div className="clapper__sticks">
              <span className="clapper__hinge" style={{ left: 14 }} />
              <span className="clapper__hinge" style={{ right: 14 }} />
            </div>

            <div className="clapper__board">
              <div className="mb-4 flex items-center justify-between text-cream/70">
                <span className="font-display text-[10px] tracking-[0.3em]">
                  PROD · HADDAD CINEMATOGRAPHY
                </span>
                <span className="font-display text-[10px] tracking-[0.3em]">
                  ROLL 01 · SCENE 12 · TAKE 03
                </span>
              </div>

              <ClapperField label={isAr ? "الاسم" : "Name"}>
                <input
                  required
                  className="clapper__input"
                  placeholder={isAr ? "اكتب اسمك..." : "Your full name..."}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </ClapperField>

              <ClapperField label={isAr ? "البريد" : "E-mail"}>
                <input
                  required
                  type="email"
                  dir="ltr"
                  className="clapper__input"
                  placeholder="you@studio.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </ClapperField>

              <ClapperField label={isAr ? "المشهد" : "Scene"}>
                <textarea
                  required
                  rows={5}
                  className="clapper__textarea"
                  placeholder={isAr ? "اكتب رسالتك هنا..." : "Write your scene / message..."}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </ClapperField>

              <div className="clapper__meta">
                <span><span className="dot" />REC</span>
                <span>DATE · {today}</span>
                <span>DIR · A. HADDAD</span>
                <span>FMT · 35MM</span>
              </div>

              <div className="mt-6 flex justify-end">
                <MagneticButton
                  type="submit"
                  className="rounded-full bg-cinema px-8 py-3 text-xs font-bold uppercase tracking-[0.3em] text-cream shadow-[0_10px_30px_-10px_rgba(183,37,52,0.7)] hover:bg-cinema/90"
                >
                  <Send className="size-3.5" />
                  {t("contact.send")}
                </MagneticButton>
              </div>
            </div>
          </form>

          {/* === Info aside === */}
          <aside className="md:col-span-2">
            <div className="relative overflow-hidden rounded-sm bg-[var(--cinema)] p-8 text-[var(--cream)]">
              <div className="grain-layer" />
              <div className="relative z-[2]">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-80">
                  — Info
                </span>
                <h3 className="mt-2 font-arabic text-2xl">{t("contact.info_title")}</h3>
                <ul className="mt-6 space-y-5">
                  <Info icon={<MapPin className="size-4" />} label={t("contact.address_label")}>
                    {city}
                  </Info>
                  <Info icon={<Phone className="size-4" />} label={t("contact.phone_label")}>
                    <a href={`tel:${phone.replace(/\s+/g, "")}`} dir="ltr" className="hover:opacity-80">
                      {phone}
                    </a>
                  </Info>
                  <Info icon={<Mail className="size-4" />} label={t("contact.email_label")}>
                    <a href={`mailto:${emailTo}`} className="hover:opacity-80">
                      {emailTo}
                    </a>
                  </Info>
                </ul>

                <div className="mt-8 flex flex-wrap gap-2 border-t border-[var(--cream)]/20 pt-6">
                  {c.instagram && (
                    <MagneticSocial href={c.instagram} label="Instagram"><Instagram className="size-4" /></MagneticSocial>
                  )}
                  {c.linkedin && (
                    <MagneticSocial href={c.linkedin} label="LinkedIn"><Linkedin className="size-4" /></MagneticSocial>
                  )}
                  {c.youtube && (
                    <MagneticSocial href={c.youtube} label="YouTube"><Youtube className="size-4" /></MagneticSocial>
                  )}
                  {c.facebook && (
                    <MagneticSocial href={c.facebook} label="Facebook"><Facebook className="size-4" /></MagneticSocial>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function ClapperField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="clapper__field">
      <div className="clapper__label">{label}</div>
      <div>{children}</div>
    </div>
  );
}

function Info({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-sm bg-[var(--ink)] text-[var(--cream)]">
        {icon}
      </span>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-80">{label}</div>
        <div className="mt-0.5 text-sm">{children}</div>
      </div>
    </li>
  );
}

function MagneticSocial({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={label}>
      <MagneticButton
        type="button"
        strength={0.5}
        className="size-10 rounded-full bg-[var(--ink)] text-[var(--cream)]"
      >
        {children}
      </MagneticButton>
    </a>
  );
}
