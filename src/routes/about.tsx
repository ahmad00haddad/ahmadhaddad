import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Download, ExternalLink, Loader2, FileText, Film } from "lucide-react";
import cvAsset from "@/assets/Ahmad_Haddad_CV.pdf.asset.json";
import { PageHero } from "@/components/PageHero";
import { useSettings } from "@/lib/use-settings";
import type { ReactNode } from "react";

function ImgLoader() {
  return (
    <div className="grid size-full place-items-center bg-[var(--ink)]/40">
      <Loader2 className="size-5 animate-spin text-[var(--cream)]/60" />
    </div>
  );
}

/* A vintage frame with sprocket-hole edges, sepia tint and grain — like a 35mm cell. */
function FilmFrame({
  src,
  loading,
  ratio = "aspect-square",
  className = "",
  plain = false,
}: {
  src?: string;
  loading?: boolean;
  ratio?: string;
  className?: string;
  /** when true, render the image with its true colors (no sepia, no sprocket holes, no vignette) — only a light grain overlay. */
  plain?: boolean;
}) {
  return (
    <div className={`relative ${ratio} overflow-hidden rounded-[2px] bg-[var(--ink)]/40 ${className}`}>
      {!plain && (
        <>
          {/* sprocket holes top/bottom */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[3] flex h-3 items-center justify-between gap-1 bg-[#0a0908]/90 px-1.5">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="h-1.5 w-2 rounded-[1px] bg-[var(--cream)]/80" />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] flex h-3 items-center justify-between gap-1 bg-[#0a0908]/90 px-1.5">
            {Array.from({ length: 14 }).map((_, i) => (
              <span key={i} className="h-1.5 w-2 rounded-[1px] bg-[var(--cream)]/80" />
            ))}
          </div>
        </>
      )}
      {loading || !src ? (
        <ImgLoader />
      ) : (
        <img
          src={src}
          alt=""
          className="size-full object-cover"
          loading="lazy"
          style={plain ? undefined : { filter: "sepia(0.35) contrast(1.05) saturate(0.85)" }}
        />
      )}
      <div className="grain-layer" style={{ opacity: plain ? 0.25 : 0.45 }} />
      {!plain && (
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{ boxShadow: "inset 0 0 80px 20px rgba(10,9,8,0.55)" }}
        />
      )}
    </div>
  );
}

function Chapter({
  num,
  label,
  title,
  paras,
  reverse,
  imageSlot,
}: {
  num: string;
  label: string;
  title: string;
  paras: string[];
  reverse?: boolean;
  imageSlot: ReactNode;
}) {
  return (
    <section className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className={reverse ? "md:order-2" : ""}
      >
        <div className="flex items-baseline gap-3 text-cinema">
          <span className="font-display text-5xl italic md:text-6xl">{num}</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.35em]">— {label}</span>
        </div>
        <h2 className="mt-3 font-arabic text-3xl leading-tight text-cream md:text-4xl">{title}</h2>
        <div className="mt-5 space-y-4 text-[15px] leading-loose text-muted-foreground">
          {paras.map((p, i) => (
            <p key={i} className="whitespace-pre-line">
              {p}
            </p>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-2 text-cream/30">
          <span className="h-px w-12 bg-current" />
          <Film className="size-3.5" />
          <span className="h-px w-24 bg-current" />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className={reverse ? "md:order-1" : ""}
      >
        {imageSlot}
      </motion.div>
    </section>
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
  const { settings, loading: settingsLoading } = useSettings();
  const a = settings.about;

  const splitParas = (s?: string) => (s ? s.split(/\n\s*\n/).filter(Boolean) : []);

  const title1 = (isAr ? a.title_ar : a.title_en) || t("about.title");
  const paras1 = splitParas(isAr ? a.body_ar : a.body_en);
  const title2 = (isAr ? a.title2_ar : a.title2_en) || t("about.title2");
  const paras2 = splitParas(isAr ? a.body2_ar : a.body2_en);
  const title3 = (isAr ? a.title3_ar : a.title3_en) || "اكتشافي لعالم السينما";
  const paras3 = splitParas(isAr ? a.body3_ar : a.body3_en);
  const title4 = (isAr ? a.title4_ar : a.title4_en) || "رؤيتي وفلسفتي";
  const paras4 = splitParas(isAr ? a.body4_ar : a.body4_en);

  const img1 = a.image1_url;
  const img2 = a.image2_url;
  const img3 = a.image3_url;
  const cvUrl = a.cv_url || cvAsset.url;
  const cvTitle = (isAr ? a.cv_title_ar : a.cv_title_en) || t("about.cv_title");
  const cvSub = (isAr ? a.cv_sub_ar : a.cv_sub_en) || t("about.cv_sub");
  const studioName = a.studio_name || "Faii House";
  const studioUrl = a.studio_url || "https://faiihouse.lovable.app/";
  const studioDesc = (isAr ? a.studio_desc_ar : a.studio_desc_en) || "";

  return (
    <>
      <PageHero
        kicker="Ahmad · Cinematographer"
        title={isAr ? "رحلتي خلف العدسة" : "My Journey Behind the Lens"}
        subtitle={isAr ? "أربعة فصول من الشغف، الدراسة، السينما والرؤية — من 2014 إلى اليوم." : "Four chapters of passion, study, cinema and vision — from 2014 to today."}
      />

      <div dir="rtl" className="relative bg-[var(--ink)]">
        {/* faint vertical film-strip rail decoration */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-2 hidden w-3 md:block"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, var(--cream) 0 6px, transparent 6px 18px)",
            opacity: 0.06,
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-2 hidden w-3 md:block"
          style={{
            backgroundImage:
              "repeating-linear-gradient(to bottom, var(--cream) 0 6px, transparent 6px 18px)",
            opacity: 0.06,
          }}
        />

        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24 space-y-24 md:space-y-32">
          <Chapter
            num="01"
            label={isAr ? "البداية" : "The Beginning"}
            title={title1}
            paras={paras1}
            imageSlot={<FilmFrame src={img1} loading={settingsLoading} ratio="aspect-[4/5]" />}
          />

          <Chapter
            num="02"
            label={isAr ? "الدراسة" : "Studies"}
            title={title2}
            paras={paras2}
            reverse
            imageSlot={<FilmFrame src={img2} loading={settingsLoading} ratio="aspect-[4/5]" plain />}
          />

          {/* Cinema — text-only chapter, no photo (image3 belongs to the team/studio block) */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-3 flex items-center justify-center gap-3 text-cream/40">
              <span className="h-px w-12 bg-current" />
              <Film className="size-3.5" />
              <span className="h-px w-12 bg-current" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-cream/60">— 03 / {isAr ? "السينما" : "Cinema"}</span>
            <h2 className="mt-3 font-arabic text-3xl leading-tight text-cream md:text-4xl">{title3}</h2>
            <div className="mt-5 space-y-4 text-[15px] leading-loose text-muted-foreground">
              {paras3.map((p, i) => (
                <p key={i} className="whitespace-pre-line">{p}</p>
              ))}
            </div>
          </motion.section>


          {/* Vision pull-quote, full width on cinema red */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-sm bg-[var(--cinema)] px-6 py-14 md:px-14 md:py-20"
          >
            <div className="grain-layer" style={{ opacity: 0.5 }} />
            <div
              className="pointer-events-none absolute inset-0"
              style={{ boxShadow: "inset 0 0 120px 30px rgba(10,9,8,0.45)" }}
            />
            <div className="relative z-[2] mx-auto max-w-3xl text-center text-[var(--cream)]">
              <div className="mb-4 flex items-center justify-center gap-2 opacity-80">
                <span className="h-px w-10 bg-current" />
                <span className="font-display text-5xl italic">04</span>
                <span className="h-px w-10 bg-current" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-80">— {isAr ? "رؤيتي" : "Vision"}</span>
              <h2 className="mt-3 font-arabic text-3xl leading-tight md:text-5xl">{title4}</h2>
              <div className="mx-auto mt-6 max-w-2xl space-y-4 text-[15px] leading-loose opacity-95 md:text-base">
                {paras4.map((p, i) => (
                  <p key={i} className="whitespace-pre-line">{p}</p>
                ))}
              </div>
            </div>
          </motion.section>

          {/* CV — compact vintage card */}
          <section className="grid items-center gap-6 rounded-sm border border-cream/10 bg-[var(--surface)] p-6 md:grid-cols-[1fr_auto] md:p-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cinema">— {isAr ? "CV / السيرة الذاتية" : "Curriculum Vitae"}</span>
              <h2 className="mt-2 font-arabic text-2xl text-cream md:text-3xl">{cvTitle}</h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{cvSub}</p>
              <a
                href={cvUrl}
                download="Ahmad_Haddad_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--cinema)] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--cream)] hover:scale-[1.02]"
              >
                <Download className="size-3.5" />
                {t("about.cv_download")}
              </a>
            </div>
            <a
              href={cvUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative block h-44 w-32 shrink-0 overflow-hidden rounded-sm border border-[var(--ink)]/30 bg-white md:h-52 md:w-40"
            >
              <object data={cvUrl} type="application/pdf" className="size-full pointer-events-none">
                <div className="grid size-full place-items-center bg-[var(--ink)]/10 text-[var(--ink)]">
                  <div className="flex flex-col items-center gap-1">
                    <FileText className="size-8" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em]">PDF</span>
                  </div>
                </div>
              </object>
              <div className="absolute inset-0 grid place-items-center bg-[var(--ink)]/0 opacity-0 transition-all group-hover:bg-[var(--ink)]/40 group-hover:opacity-100">
                <ExternalLink className="size-5 text-[var(--cream)]" />
              </div>
            </a>
          </section>

          {/* Studio / Team — photo of the creative team */}
          <section className="grid gap-6 md:grid-cols-2 md:items-stretch">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[var(--ink)]/40 md:aspect-auto">
              {settingsLoading || !img3 ? (
                <ImgLoader />
              ) : (
                <img src={img3} alt="" className="size-full object-cover" loading="lazy" />
              )}
              <div className="grain-layer" style={{ opacity: 0.25 }} />
            </div>
            <div className="flex flex-col justify-center rounded-sm border border-cream/10 bg-[var(--surface)] p-6 md:p-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cinema">— Studio / {isAr ? "الفريق" : "Team"}</span>
              <h3 className="mt-2 font-arabic text-2xl text-cream md:text-3xl">{studioName}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{studioDesc}</p>
              <a
                href={studioUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-cinema/60 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-cinema hover:bg-cinema hover:text-cream"
              >
                {studioUrl.replace(/^https?:\/\//, "")} <ExternalLink className="size-3.5" />
              </a>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
