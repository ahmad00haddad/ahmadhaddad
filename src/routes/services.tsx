import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { useContent } from "@/lib/use-settings";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "الخدمات والأسعار — أحمد حدّاد" },
      {
        name: "description",
        content: "خدمات أحمد حدّاد في تصوير الأفلام والإعلانات والفوتوغراف والتلوين والمونتاج.",
      },
      { property: "og:title", content: "الخدمات والأسعار — أحمد حدّاد" },
      {
        property: "og:description",
        content: "تصوير أفلام وإعلانات، فوتوغراف، تلوين، ومونتاج، مع رابط مباشر لبطاقة الأسعار.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://ahmadhaddad.lovable.app/services" },
    ],
    links: [{ rel: "canonical", href: "https://ahmadhaddad.lovable.app/services" }],
  }),
  component: ServicesPage,
});

type Service = {
  id: string;
  title: string;
  title_en: string | null;
  description: string | null;
  description_en: string | null;
  icon: string;
};

function ServicesPage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const { rows } = useContent<Service>("services");

  return (
    <>
      <PageHero title={t("services.title")} subtitle={t("services.subtitle")} />

      <div dir={isAr ? "rtl" : "ltr"} className="mx-auto max-w-7xl px-6 py-16 md:px-8 md:py-20">
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {isAr ? "لا توجد خدمات منشورة بعد." : "No services have been published yet."}
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {rows.map((service, index) => {
              const title = isAr ? service.title : service.title_en || service.title;
              const description = isAr
                ? service.description
                : service.description_en || service.description;
              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.25, delay: index * 0.04 }}
                  className="rounded-sm border border-border bg-surface p-6 md:p-8"
                >
                  <h3 className="text-2xl text-cream">{title}</h3>
                  {description && (
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{description}</p>
                  )}
                </motion.article>
              );
            })}
          </div>
        )}

        <section className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-label={isAr ? "روابط إضافية" : "Additional links"}>
          <a
            href="https://haddad-rate-card.lovable.app/"
            target="_blank"
            rel="noreferrer"
            className="group rounded-sm bg-cinema p-8 text-cream transition-colors duration-200 hover:bg-cinema-deep"
          >
            <h3 className="text-3xl">{t("services.rate_card_title")}</h3>
            <p className="mt-4 text-sm leading-7 text-cream/90">{t("services.rate_card_sub")}</p>
            <span className="mt-8 inline-flex items-center gap-2 border-b border-cream/60 pb-1 text-sm font-semibold">
              {t("services.rate_card_cta")} <ExternalLink className="size-4" />
            </span>
          </a>
          <a
            href="https://faiihouse.lovable.app/"
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-border bg-surface p-8 transition-colors duration-200 hover:border-cinema/60"
          >
            <h3 className="text-3xl text-cream">{t("services.company_title")}</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{t("services.company_sub")}</p>
            <span className="mt-8 inline-flex items-center gap-2 border-b border-cinema pb-1 text-sm font-semibold text-cinema">
              {t("services.company_cta")} <ExternalLink className="size-4" />
            </span>
          </a>
          <a
            href="https://haddad-rate-card.lovable.app/equipment"
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-border bg-surface p-8 transition-colors duration-200 hover:border-cinema/60"
          >
            <h3 className="text-3xl text-cream">{t("services.equipment_title")}</h3>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{t("services.equipment_sub")}</p>
            <span className="mt-8 inline-flex items-center gap-2 border-b border-cinema pb-1 text-sm font-semibold text-cinema">
              {t("services.equipment_cta")} <ExternalLink className="size-4" />
            </span>
          </a>
        </section>
      </div>
    </>
  );
}
