import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import heroImg from "@/assets/ahmad-hero.jpg";
import journey from "@/assets/journey.jpg";
import filmSet from "@/assets/film-set.jpg";
import cvAsset from "@/assets/Ahmad_Haddad_CV.pdf.asset.json";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "نبذة عني — أحمد حدّاد" },
      {
        name: "description",
        content: "رحلة أحمد حدّاد في عالم التصوير والسينما — من 2014 إلى اليوم.",
      },
      { property: "og:title", content: "نبذة عن أحمد حدّاد" },
      { property: "og:description", content: "مصور سينمائي وصانع أفلام من الأردن." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        title={t("about.title")}
        subtitle="من 2014 إلى اليوم — رحلة في التصوير والسينما"
      />

      <div dir="rtl" className="mx-auto max-w-7xl px-6 py-20">
        {/* Journey */}
        <section className="grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cinema">
              — 01 / البداية
            </span>
            <h2 className="mt-4 font-arabic text-4xl text-cream md:text-5xl">
              {t("about.title")}
            </h2>
            <p className="mt-6 leading-loose text-muted-foreground">{t("about.p1")}</p>
            <p className="mt-4 leading-loose text-muted-foreground">{t("about.p2")}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-square overflow-hidden rounded-sm"
          >
            <img
              src={heroImg}
              alt=""
              className="size-full object-cover grayscale"
              loading="lazy"
            />
            <div className="grain-layer" style={{ opacity: 0.35 }} />
          </motion.div>
        </section>

        {/* Cinema discovery */}
        <section className="mt-28 grid items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] overflow-hidden rounded-sm md:order-2"
          >
            <img
              src={journey}
              alt=""
              className="size-full object-cover"
              loading="lazy"
            />
            <div className="grain-layer" style={{ opacity: 0.3 }} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cinema">
              — 02 / السينما
            </span>
            <h2 className="mt-4 font-arabic text-3xl text-cream md:text-4xl">
              {t("about.title2")}
            </h2>
            <p className="mt-6 leading-loose text-muted-foreground">{t("about.p3")}</p>
            <p className="mt-4 leading-loose text-muted-foreground">{t("about.p4")}</p>
            <p className="mt-4 leading-loose text-muted-foreground">{t("about.p5")}</p>
          </motion.div>
        </section>

        {/* CV */}
        <section className="relative mt-28 overflow-hidden rounded-sm bg-[var(--cinema)] p-10 md:p-14">
          <div className="grain-layer" />
          <div className="relative z-[2] grid items-center gap-10 text-[var(--cream)] md:grid-cols-5">
            <div className="md:col-span-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-80">
                — CV
              </span>
              <h2 className="mt-3 font-arabic text-3xl md:text-4xl">
                {t("about.cv_title")}
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed opacity-90">
                {t("about.cv_sub")}
              </p>
              <a
                href={cvAsset.url}
                download="Ahmad_Haddad_CV.pdf"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] hover:scale-[1.02]"
              >
                <Download className="size-3.5" />
                {t("about.cv_download")}
              </a>
            </div>
            <div className="md:col-span-2">
              <div className="aspect-[3/4] overflow-hidden rounded-sm border border-[var(--ink)]/30 bg-white">
                <iframe
                  src={`${cvAsset.url}#toolbar=0&view=FitH`}
                  title="CV preview"
                  className="size-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <img src={filmSet} alt="" className="size-full object-cover" loading="lazy" />
            <div className="grain-layer" style={{ opacity: 0.3 }} />
          </div>
          <div className="flex flex-col justify-center rounded-sm border border-cream/10 bg-[var(--surface)] p-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cinema">
              — Studio
            </span>
            <h3 className="mt-3 font-arabic text-2xl text-cream">Faii House</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              الفريق الإبداعي الذي أقوده للمشاريع الإنتاجية الأكبر.
            </p>
            <a
              href="https://faiihouse.lovable.app/"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-cinema/60 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-cinema hover:bg-cinema hover:text-cream"
            >
              faiihouse.lovable.app <ExternalLink className="size-3.5" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
