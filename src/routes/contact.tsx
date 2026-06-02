import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Linkedin, Youtube, Facebook } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل — أحمد حدّاد" },
      { name: "description", content: "تواصل مع أحمد حدّاد للتعاون في المشاريع السينمائية والتصوير." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`رسالة من ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:ahmad00haddad@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-black md:text-5xl">{t("contact.title")}</h1>
        <p className="mt-5 text-muted-foreground">{t("contact.subtitle")}</p>
      </header>

      <div className="mt-14 grid gap-10 md:grid-cols-5">
        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-border bg-[var(--surface-deep)] p-8 md:col-span-3"
        >
          <Field label={t("contact.name")}>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-brass"
            />
          </Field>
          <Field label={t("contact.email")}>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-brass"
              dir="ltr"
            />
          </Field>
          <Field label={t("contact.message")}>
            <textarea
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full resize-none rounded-lg border border-border bg-transparent px-4 py-3 text-sm outline-none transition-colors focus:border-brass"
            />
          </Field>
          <button
            type="submit"
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-semibold text-[var(--surface-deep)] shadow-[var(--shadow-brass)] transition-transform hover:scale-[1.01]"
          >
            {t("contact.send")}
          </button>
        </form>

        <aside className="md:col-span-2">
          <div className="rounded-3xl border border-border bg-[var(--surface)] p-8">
            <h3 className="text-lg font-bold">{t("contact.info_title")}</h3>
            <ul className="mt-6 space-y-5">
              <Info icon={<MapPin className="size-4" />} label={t("contact.address_label")}>
                {t("contact.address")}
              </Info>
              <Info icon={<Phone className="size-4" />} label={t("contact.phone_label")}>
                <a href="tel:+962799256345" dir="ltr" className="hover:text-brass">
                  +962 79 925 6345
                </a>
              </Info>
              <Info icon={<Mail className="size-4" />} label={t("contact.email_label")}>
                <a href="mailto:ahmad00haddad@gmail.com" className="hover:text-brass">
                  ahmad00haddad@gmail.com
                </a>
              </Info>
            </ul>

            <div className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6">
              <SocialIcon href="https://www.instagram.com/ahmad00haddad/" label="Instagram">
                <Instagram className="size-4" />
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com/in/ahmad00haddad/" label="LinkedIn">
                <Linkedin className="size-4" />
              </SocialIcon>
              <SocialIcon href="https://www.youtube.com/@ahmad00haddad" label="YouTube">
                <Youtube className="size-4" />
              </SocialIcon>
              <SocialIcon href="https://www.facebook.com/ahmad00haddad/" label="Facebook">
                <Facebook className="size-4" />
              </SocialIcon>
              <SocialIcon href="https://behance.com/ahmad00haddad" label="Behance">
                <span className="text-xs font-bold">Bē</span>
              </SocialIcon>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="mb-5 block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brass-soft text-brass">
        {icon}
      </span>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
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
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brass hover:text-brass"
    >
      {children}
    </a>
  );
}
