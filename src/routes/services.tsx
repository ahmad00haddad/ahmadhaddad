import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Film, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { useContent } from "@/lib/use-settings";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "الخدمات والأسعار — أحمد حدّاد" },
      { name: "description", content: "خدمات الإنتاج السينمائي والتصوير والأسعار من أحمد حدّاد." },
      { property: "og:title", content: "الخدمات والأسعار" },
      { property: "og:description", content: "أفلام، إعلانات، تلوين، تصوير، ومونتاج." },
      { property: "og:url", content: "https://ahmadhaddad.lovable.app/services" },
    ],
    links: [{ rel: "canonical", href: "https://ahmadhaddad.lovable.app/services" }],
  }),
  component: ServicesPage,
});

type Service = {
  id: string; title: string; title_en: string | null;
  description: string | null; description_en: string | null; icon: string;
};

function ServicesPage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const { rows } = useContent<Service>("services");

  return (
    <>
      <PageHero title={t("services.title")} subtitle={t("services.subtitle")} />

      <div dir="rtl" className="mx-auto max-w-7xl px-6 py-20">
        {rows.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">لا توجد خدمات منشورة بعد. أضفها من لوحة التحكم.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rows.map((s, i) => {
              const Icon = (Icons as any)[s.icon] || Film;
              const title = isAr ? s.title : (s.title_en || s.title);
              const desc = isAr ? s.description : (s.description_en || s.description);
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-sm border border-cream/10 bg-[var(--surface)] p-7 transition-all hover:border-cinema/60"
                >
                  <div className="grid size-12 place-items-center rounded-sm bg-cinema/15 text-cinema transition-colors group-hover:bg-cinema group-hover:text-cream">
                    <Icon className="size-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 font-arabic text-2xl text-cream">{title}</h3>
                  {desc && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>}
                  <span className="absolute -left-3 -bottom-4 font-display text-7xl font-bold text-cinema/10">
                    0{i + 1}
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}

        <section className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <a
            href="https://haddad-rate-card.lovable.app/"
            target="_blank"
            rel="noreferrer"
            className="group relative block overflow-hidden rounded-sm bg-[var(--cinema)] p-10 transition-transform hover:scale-[1.01]"
          >
            <div className="grain-layer" />
            <div className="relative z-[2] text-[var(--cream)]">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-80">Rate Card</span>
              <h3 className="mt-3 font-arabic text-3xl">{t("services.rate_card_title")}</h3>
              <p className="mt-3 text-sm opacity-90">{t("services.rate_card_sub")}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]">
                {t("services.rate_card_cta")} <ExternalLink className="size-3.5" />
              </span>
            </div>
          </a>
          <a
            href="https://faiihouse.lovable.app/"
            target="_blank"
            rel="noreferrer"
            className="group block rounded-sm border border-cream/10 bg-[var(--surface)] p-10 transition-all hover:border-cinema/60"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cinema">Studio</span>
            <h3 className="mt-3 font-arabic text-3xl text-cream">{t("services.company_title")}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{t("services.company_sub")}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cinema">
              {t("services.company_cta")} <ExternalLink className="size-3.5" />
            </span>
          </a>
          <a
            href="https://haddad-rate-card.lovable.app/equipment"
            target="_blank"
            rel="noreferrer"
            className="group relative block overflow-hidden rounded-sm border border-cream/10 bg-[var(--surface)] p-10 transition-all hover:border-cinema/60"
          >
            <div className="grain-layer" />
            <div className="relative z-[2]">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cinema">Gear</span>
              <h3 className="mt-3 font-arabic text-3xl text-cream">{t("services.equipment_title")}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{t("services.equipment_sub")}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cinema">
                {t("services.equipment_cta")} <ExternalLink className="size-3.5" />
              </span>
            </div>
          </a>
        </section>
      </div>
    </>
  );
}
