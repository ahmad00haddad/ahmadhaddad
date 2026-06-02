import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Film, Camera, Palette, Video, Sparkles, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "الخدمات — أحمد حدّاد" },
      { name: "description", content: "خدمات الإنتاج السينمائي والتصوير من أحمد حدّاد." },
    ],
  }),
  component: ServicesPage,
});

const SERVICES = [
  { key: "shorts", Icon: Film },
  { key: "ads", Icon: Sparkles },
  { key: "color", Icon: Palette },
  { key: "photo", Icon: Camera },
  { key: "edit", Icon: Video },
] as const;

function ServicesPage() {
  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-black md:text-5xl">{t("services.title")}</h1>
        <p className="mt-5 text-muted-foreground">{t("services.subtitle")}</p>
      </header>

      <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ key, Icon }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="group rounded-2xl border border-border bg-[var(--surface-deep)] p-7 transition-all hover:border-brass/60 hover:shadow-[var(--shadow-brass)]"
          >
            <div className="grid size-12 place-items-center rounded-xl bg-brass-soft text-brass transition-colors group-hover:bg-brass group-hover:text-[var(--surface-deep)]">
              <Icon className="size-6" />
            </div>
            <h3 className="mt-5 text-xl font-bold">{t(`services.items.${key}.title`)}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t(`services.items.${key}.desc`)}
            </p>
          </motion.div>
        ))}
      </div>

      {/* External links */}
      <section className="mt-20 grid gap-5 md:grid-cols-2">
        <a
          href="https://haddad-rate-card.lovable.app/"
          target="_blank"
          rel="noreferrer"
          className="group block rounded-3xl border border-brass/40 bg-gradient-to-br from-[var(--surface-deep)] to-[var(--surface)] p-10 transition-all hover:scale-[1.01]"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-brass">
            Rate Card
          </span>
          <h3 className="mt-3 text-3xl font-bold">{t("services.rate_card_title")}</h3>
          <p className="mt-3 text-muted-foreground">{t("services.rate_card_sub")}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brass">
            {t("services.rate_card_cta")} <ExternalLink className="size-4" />
          </span>
        </a>
        <a
          href="https://faiihouse.lovable.app/"
          target="_blank"
          rel="noreferrer"
          className="group block rounded-3xl border border-border bg-[var(--surface-deep)] p-10 transition-all hover:border-brass/60"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-brass">Studio</span>
          <h3 className="mt-3 text-3xl font-bold">{t("services.company_title")}</h3>
          <p className="mt-3 text-muted-foreground">{t("services.company_sub")}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brass">
            {t("services.company_cta")} <ExternalLink className="size-4" />
          </span>
        </a>
      </section>
    </div>
  );
}
