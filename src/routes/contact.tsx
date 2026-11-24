import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Linkedin, Youtube, Facebook, Send } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { useSettings } from "@/lib/use-settings";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل — أحمد حدّاد" },
      {
        name: "description",
        content: "تواصل مع أحمد حدّاد لمناقشة تصوير فيلم أو إعلان أو مشروع فوتوغرافي.",
      },
      { property: "og:title", content: "تواصل مع أحمد حدّاد" },
      { property: "og:description", content: "ناقش تفاصيل مشروعك وموعده وموقع التصوير مباشرة." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://ahmadhaddad.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://ahmadhaddad.lovable.app/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const { settings } = useSettings();
  const contact = settings.contact;
  const emailTo = contact.email || "ahmad00haddad@gmail.com";
  const phone = contact.phone || "+962 79 925 6345";
  const city = (isAr ? contact.city_ar : contact.city_en) || t("contact.address");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(
      isAr ? `استفسار عن مشروع من ${form.name}` : `Project enquiry from ${form.name}`,
    );
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <PageHero title={t("contact.title")} subtitle={t("contact.subtitle")} />

      <div dir={isAr ? "rtl" : "ltr"} className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        <div className="grid gap-4 md:grid-cols-5">
          <form onSubmit={onSubmit} className="rounded-sm border border-border bg-surface p-6 md:col-span-3 md:p-8">
            <h2 className="mb-8 text-3xl text-cream">{t("contact.form_title")}</h2>
            <Field label={t("contact.name")}>
              <input
                required
                autoComplete="name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label={t("contact.email")}>
              <input
                required
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className={inputCls}
                dir="ltr"
              />
            </Field>
            <Field label={t("contact.message")}>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                className={`${inputCls} resize-none`}
              />
            </Field>
            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-cinema px-6 py-3 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-cinema-deep"
            >
              <Send className="size-4" />
              {t("contact.send")}
            </button>
          </form>

          <aside className="rounded-sm bg-cinema p-6 text-cream md:col-span-2 md:p-8">
            <h3 className="text-2xl">{t("contact.info_title")}</h3>
            <p className="mt-3 text-sm leading-7 text-cream/85">
              {isAr
                ? "اذكر نوع المشروع وموعد التصوير والمدينة لأتمكن من الرد بتفاصيل واضحة."
                : "Include the project type, shoot date, and city so I can reply with clear next steps."}
            </p>
            <ul className="mt-8 space-y-6">
              <Info icon={<MapPin className="size-4" />} label={t("contact.address_label")}>{city}</Info>
              <Info icon={<Phone className="size-4" />} label={t("contact.phone_label")}>
                <a href={`tel:${phone.replace(/\s+/g, "")}`} dir="ltr" className="hover:underline">{phone}</a>
              </Info>
              <Info icon={<Mail className="size-4" />} label={t("contact.email_label")}>
                <a href={`mailto:${emailTo}`} className="hover:underline">{emailTo}</a>
              </Info>
            </ul>
            <div className="mt-8 flex flex-wrap gap-2 border-t border-cream/20 pt-6">
              {contact.instagram && <SocialIcon href={contact.instagram} label="Instagram"><Instagram className="size-4" /></SocialIcon>}
              {contact.linkedin && <SocialIcon href={contact.linkedin} label="LinkedIn"><Linkedin className="size-4" /></SocialIcon>}
              {contact.youtube && <SocialIcon href={contact.youtube} label="YouTube"><Youtube className="size-4" /></SocialIcon>}
              {contact.facebook && <SocialIcon href={contact.facebook} label="Facebook"><Facebook className="size-4" /></SocialIcon>}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

const inputCls =
  "w-full rounded-sm border border-cream/15 bg-ink px-4 py-3 text-sm text-cream outline-none transition-colors duration-200 focus:border-cinema";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mb-6 block">
      <span className="mb-2 block text-sm text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Info({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-1 shrink-0 text-cream/75">{icon}</span>
      <div>
        <div className="text-sm text-cream/75">{label}</div>
        <div className="mt-1 text-sm">{children}</div>
      </div>
    </li>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid size-9 place-items-center rounded-sm border border-cream/25 text-cream transition-colors duration-200 hover:bg-ink"
    >
      {children}
    </a>
  );
}
