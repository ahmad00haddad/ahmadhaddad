import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Linkedin, Youtube, Facebook, Send } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Magnetic } from "@/components/MagneticButton";
import { useSettings } from "@/lib/use-settings";

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

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`رسالة من ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`,
    );
    window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <PageHero title={t("contact.title")} subtitle={t("contact.subtitle")} />

      <div dir="rtl" className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-5">
          <form
            onSubmit={onSubmit}
            className="rounded-sm border border-cream/10 bg-[var(--surface)] p-8 md:col-span-3"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cinema">
              — Message
            </span>
            <h2 className="mt-2 mb-6 font-arabic text-3xl text-cream">
              ابعت رسالة
            </h2>
            <Field label={t("contact.name")}>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputCls}
              />
            </Field>
            <Field label={t("contact.email")}>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputCls}
                dir="ltr"
              />
            </Field>
            <Field label={t("contact.message")}>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`${inputCls} resize-none`}
              />
            </Field>
            <Magnetic strength={0.12} radius={90}>
              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cinema px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-cream transition-transform hover:scale-[1.01]"
              >
                <Send className="size-3.5" />
                {t("contact.send")}
              </button>
            </Magnetic>
          </form>

          <aside className="md:col-span-2">
            <div className="relative overflow-hidden rounded-sm bg-[var(--cinema)] p-8 text-[var(--cream)]">
              <div className="grain-layer" />
              <div className="relative z-[2]">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-80">
                  — Info
                </span>
                <h3 className="mt-2 font-arabic text-2xl">
                  {t("contact.info_title")}
                </h3>
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
                    <SocialIcon href={c.instagram} label="Instagram"><Instagram className="size-4" /></SocialIcon>
                  )}
                  {c.linkedin && (
                    <SocialIcon href={c.linkedin} label="LinkedIn"><Linkedin className="size-4" /></SocialIcon>
                  )}
                  {c.youtube && (
                    <SocialIcon href={c.youtube} label="YouTube"><Youtube className="size-4" /></SocialIcon>
                  )}
                  {c.facebook && (
                    <SocialIcon href={c.facebook} label="Facebook"><Facebook className="size-4" /></SocialIcon>
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

const inputCls =
  "w-full rounded-sm border border-cream/15 bg-[var(--ink)] px-4 py-3 text-sm text-cream outline-none transition-colors focus:border-cinema";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mb-5 block">
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
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
        <div className="text-[10px] font-bold uppercase tracking-[0.25em] opacity-80">
          {label}
        </div>
        <div className="mt-0.5 text-sm">{children}</div>
      </div>
    </li>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Magnetic strength={0.15} radius={60}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        className="grid size-9 place-items-center rounded-full bg-[var(--ink)] text-[var(--cream)] transition-transform hover:scale-110"
      >
        {children}
      </a>
    </Magnetic>
  );
}
