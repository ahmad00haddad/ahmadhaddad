import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Download, ExternalLink, Loader2, FileText } from "lucide-react";
import cvAsset from "@/assets/Ahmad_Haddad_CV.pdf.asset.json";
import { PageHero } from "@/components/PageHero";
import { useSettings } from "@/lib/use-settings";

function ImgLoader() {
  return (
    <div className="grid size-full place-items-center bg-[var(--ink)]/40">
      <Loader2 className="size-5 animate-spin text-[var(--cream)]/60" />
    </div>
  );
}


export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "نبذة عني — أحمد حدّاد" },
      { name: "description", content: "رحلة أحمد حدّاد في عالم التصوير والسينما — من 2014 إلى اليوم." },
      { property: "og:title", content: "نبذة عن أحمد حدّاد" },
      { property: "og:description", content: "مصور سينمائي وصانع أفلام من الأردن." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const { settings } = useSettings();
  const a = settings.about;

  const aboutTitle = (isAr ? a.title_ar : a.title_en) || t("about.title");
  const aboutBody = isAr ? a.body_ar : a.body_en;
  const bodyParas = aboutBody ? aboutBody.split(/\n\s*\n/).filter(Boolean) : null;

  const title2 = (isAr ? a.title2_ar : a.title2_en) || t("about.title2");
  const body2 = isAr ? a.body2_ar : a.body2_en;
  const body2Paras = body2 ? body2.split(/\n\s*\n/).filter(Boolean) : null;

  const img1 = a.image1_url || heroImg;
  const img2 = a.image2_url || journey;
  const img3 = a.image3_url || filmSet;
  const cvUrl = a.cv_url || cvAsset.url;
  const cvTitle = (isAr ? a.cv_title_ar : a.cv_title_en) || t("about.cv_title");
  const cvSub = (isAr ? a.cv_sub_ar : a.cv_sub_en) || t("about.cv_sub");
  const studioName = a.studio_name || "Faii House";
  const studioUrl = a.studio_url || "https://faiihouse.lovable.app/";
  const studioDesc = (isAr ? a.studio_desc_ar : a.studio_desc_en) || "الفريق الإبداعي الذي أقوده للمشاريع الإنتاجية الأكبر.";

  return (
    <>
      <PageHero title={aboutTitle} subtitle="من 2014 إلى اليوم — رحلة في التصوير والسينما" />

      <div dir="rtl" className="mx-auto max-w-7xl px-6 py-20">
        {/* Journey */}
        <section className="grid items-center gap-12 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cinema">— 01 / البداية</span>
            <h2 className="mt-4 font-arabic text-4xl text-cream md:text-5xl">{aboutTitle}</h2>
            {bodyParas ? (
              bodyParas.map((p, i) => (
                <p key={i} className={`${i === 0 ? "mt-6" : "mt-4"} leading-loose text-muted-foreground whitespace-pre-line`}>{p}</p>
              ))
            ) : (
              <>
                <p className="mt-6 leading-loose text-muted-foreground">{t("about.p1")}</p>
                <p className="mt-4 leading-loose text-muted-foreground">{t("about.p2")}</p>
              </>
            )}
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative aspect-square overflow-hidden rounded-sm">
            <img src={img1} alt="" className="size-full object-cover grayscale" loading="lazy" />
            <div className="grain-layer" style={{ opacity: 0.35 }} />
          </motion.div>
        </section>

        {/* Cinema discovery */}
        <section className="mt-28 grid items-center gap-12 md:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative aspect-[4/5] overflow-hidden rounded-sm md:order-2">
            <img src={img2} alt="" className="size-full object-cover" loading="lazy" />
            <div className="grain-layer" style={{ opacity: 0.3 }} />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cinema">— 02 / السينما</span>
            <h2 className="mt-4 font-arabic text-3xl text-cream md:text-4xl">{title2}</h2>
            {body2Paras ? (
              body2Paras.map((p, i) => (
                <p key={i} className={`${i === 0 ? "mt-6" : "mt-4"} leading-loose text-muted-foreground whitespace-pre-line`}>{p}</p>
              ))
            ) : (
              <>
                <p className="mt-6 leading-loose text-muted-foreground">{t("about.p3")}</p>
                <p className="mt-4 leading-loose text-muted-foreground">{t("about.p4")}</p>
                <p className="mt-4 leading-loose text-muted-foreground">{t("about.p5")}</p>
              </>
            )}
          </motion.div>
        </section>

        {/* CV */}
        <section className="relative mt-28 overflow-hidden rounded-sm bg-[var(--cinema)] p-10 md:p-14">
          <div className="grain-layer" />
          <div className="relative z-[2] grid items-center gap-10 text-[var(--cream)] md:grid-cols-5">
            <div className="md:col-span-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-80">— CV</span>
              <h2 className="mt-3 font-arabic text-3xl md:text-4xl">{cvTitle}</h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed opacity-90">{cvSub}</p>
              <a href={cvUrl} download="Ahmad_Haddad_CV.pdf" target="_blank" rel="noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] hover:scale-[1.02]">
                <Download className="size-3.5" />
                {t("about.cv_download")}
              </a>
            </div>
            <div className="md:col-span-2">
              <div className="aspect-[3/4] overflow-hidden rounded-sm border border-[var(--ink)]/30 bg-white">
                <iframe src={`${cvUrl}#toolbar=0&view=FitH`} title="CV preview" className="size-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
            <img src={img3} alt="" className="size-full object-cover" loading="lazy" />
            <div className="grain-layer" style={{ opacity: 0.3 }} />
          </div>
          <div className="flex flex-col justify-center rounded-sm border border-cream/10 bg-[var(--surface)] p-8">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cinema">— Studio</span>
            <h3 className="mt-3 font-arabic text-2xl text-cream">{studioName}</h3>
            <p className="mt-3 text-sm text-muted-foreground">{studioDesc}</p>
            <a href={studioUrl} target="_blank" rel="noreferrer"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-cinema/60 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-cinema hover:bg-cinema hover:text-cream">
              {studioUrl.replace(/^https?:\/\//, "")} <ExternalLink className="size-3.5" />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
