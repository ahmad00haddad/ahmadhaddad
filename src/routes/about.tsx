import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Download, ExternalLink, Loader2, FileText } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ElasticImage } from "@/components/ElasticImage";
import { useSettings } from "@/lib/use-settings";
import type { ReactNode } from "react";

function ImgLoader() {
  return (
    <div className="grid size-full place-items-center bg-ink/40">
      <Loader2 className="size-5 animate-spin text-cream/60" aria-label="Loading" />
    </div>
  );
}

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
  plain?: boolean;
}) {
  return (
    <div className={`relative ${ratio} overflow-hidden rounded-sm bg-surface-deep ${className}`}>
      {loading || !src ? (
        <ImgLoader />
      ) : (
        <img
          src={src}
          alt=""
          className="size-full object-cover"
          loading="lazy"
          style={{ filter: plain ? "none" : "saturate(0.9) sepia(0.16)" }}
        />
      )}
      <div className="grain-layer-soft" style={{ opacity: plain ? 0.16 : 0.28 }} />
    </div>
  );
}

function Paragraphs({ paragraphs, className = "" }: { paragraphs: string[]; className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="whitespace-pre-line">{paragraph}</p>
      ))}
    </div>
  );
}

function Chapter({
  num,
  title,
  paragraphs,
  reverse,
  image,
}: {
  num: string;
  title: string;
  paragraphs: string[];
  reverse?: boolean;
  image: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.3 }}
      className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
    >
      <div className={reverse ? "md:order-2" : ""}>
        <span className="font-display text-4xl text-cinema">{num}</span>
        <h2 className="mt-4 text-3xl leading-tight text-cream md:text-4xl">{title}</h2>
        <Paragraphs paragraphs={paragraphs} className="mt-6 text-base leading-8 text-muted-foreground" />
      </div>
      <div className={reverse ? "md:order-1" : ""}>{image}</div>
    </motion.section>
  );
}

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "نبذة عني — أحمد حدّاد" },
      {
        name: "description",
        content: "دراسة أحمد حدّاد، بدايته في التصوير، واكتشافه للسينما وأسلوب عمله مع الفريق.",
      },
      { property: "og:title", content: "نبذة عن أحمد حدّاد" },
      { property: "og:description", content: "مسيرة مصور سينمائي مستقل من الأردن، وطريقة عمله ورؤيته." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://ahmadhaddad.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://ahmadhaddad.lovable.app/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const { settings, loading: settingsLoading } = useSettings();
  const about = settings.about;
  const [cvMenuOpen, setCvMenuOpen] = useState(false);

  const splitParas = (text?: string) => (text ? text.split(/\n\s*\n/).filter(Boolean) : []);
  const title1 = (isAr ? about.title_ar : about.title_en) || t("about.title");
  const paragraphs1 = splitParas(isAr ? about.body_ar : about.body_en);
  const title2 = (isAr ? about.title2_ar : about.title2_en) || t("about.title2");
  const paragraphs2 = splitParas(isAr ? about.body2_ar : about.body2_en);
  const title3 = (isAr ? about.title3_ar : about.title3_en) || (isAr ? "اكتشافي لعالم السينما" : "Discovering cinema");
  const paragraphs3 = splitParas(isAr ? about.body3_ar : about.body3_en);
  const title4 = (isAr ? about.title4_ar : about.title4_en) || (isAr ? "رؤيتي وطريقة عملي" : "My approach");
  const paragraphs4 = splitParas(isAr ? about.body4_ar : about.body4_en);
  const cvUrl = isAr ? "/cv/Ahmad_Haddad_CV_AR.pdf" : "/cv/Ahmad_Haddad_CV_EN.pdf";
  const cvTitle = (isAr ? about.cv_title_ar : about.cv_title_en) || t("about.cv_title");
  const cvSub = (isAr ? about.cv_sub_ar : about.cv_sub_en) || t("about.cv_sub");
  const studioName = about.studio_name || "Faii House";
  const studioUrl = about.studio_url || "https://faiihouse.lovable.app/";
  const studioDesc = (isAr ? about.studio_desc_ar : about.studio_desc_en) || "";

  return (
    <>
      <PageHero
        title={isAr ? "رحلتي خلف العدسة" : "My journey behind the lens"}
        subtitle={
          isAr
            ? "من دراسة هندسة الحاسوب إلى التصوير السينمائي، ومن العمل الفردي إلى قيادة فريق عندما يتطلبه المشروع."
            : "From computer engineering to cinematography, and from solo shoots to leading a crew when a project requires one."
        }
      />

      <div dir={isAr ? "rtl" : "ltr"} className="bg-ink">
        <div className="mx-auto max-w-6xl space-y-20 px-6 py-16 md:space-y-24 md:px-8 md:py-24">
          <Chapter
            num="01"
            title={title1}
            paragraphs={paragraphs1}
            image={<FilmFrame src={about.image1_url} loading={settingsLoading} ratio="aspect-[4/5]" />}
          />
          <Chapter
            num="02"
            title={title2}
            paragraphs={paragraphs2}
            reverse
            image={<FilmFrame src={about.image2_url} loading={settingsLoading} ratio="aspect-[4/5]" plain />}
          />

          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl border-s-2 border-cinema ps-6 md:ps-8"
          >
            <span className="font-display text-4xl text-cinema">03</span>
            <h2 className="mt-4 text-3xl leading-tight text-cream md:text-4xl">{title3}</h2>
            <Paragraphs paragraphs={paragraphs3} className="mt-6 text-base leading-8 text-muted-foreground" />
          </motion.section>

          <section className="relative overflow-hidden rounded-sm bg-cinema px-6 py-12 text-cream md:px-12 md:py-16">
            <div className="grain-layer-soft" style={{ opacity: 0.24 }} />
            <div className="relative z-[2] max-w-3xl">
              <span className="font-display text-4xl">04</span>
              <h2 className="mt-4 text-3xl leading-tight md:text-5xl">{title4}</h2>
              <Paragraphs paragraphs={paragraphs4} className="mt-6 text-base leading-8 text-cream/90" />
            </div>
          </section>

          <section className="grid items-center gap-8 rounded-sm border border-border bg-surface p-6 md:grid-cols-[1fr_auto] md:p-8">
            <div>
              <h2 className="text-2xl text-cream md:text-3xl">{cvTitle}</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{cvSub}</p>
              <div className="relative mt-6 inline-block">
                <button
                  type="button"
                  onClick={() => setCvMenuOpen((value) => !value)}
                  aria-haspopup="menu"
                  aria-expanded={cvMenuOpen}
                  className="inline-flex items-center gap-2 rounded-sm bg-cinema px-5 py-3 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-cinema-deep"
                >
                  <Download className="size-4" />
                  {t("about.cv_download")}
                </button>
                <AnimatePresence>
                  {cvMenuOpen && (
                    <motion.div
                      role="menu"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.16 }}
                      className="absolute start-0 z-20 mt-2 min-w-48 overflow-hidden rounded-sm border border-border bg-ink shadow-xl"
                    >
                      <a
                        role="menuitem"
                        href="/cv/Ahmad_Haddad_CV_AR.pdf"
                        download="Ahmad_Haddad_CV_AR.pdf"
                        onClick={() => setCvMenuOpen(false)}
                        className="flex items-center justify-between gap-4 px-4 py-3 text-sm text-cream hover:bg-cinema"
                      >
                        <span>العربية</span><span className="text-xs opacity-70">PDF</span>
                      </a>
                      <a
                        role="menuitem"
                        href="/cv/Ahmad_Haddad_CV_EN.pdf"
                        download="Ahmad_Haddad_CV_EN.pdf"
                        onClick={() => setCvMenuOpen(false)}
                        className="flex items-center justify-between gap-4 border-t border-border px-4 py-3 text-sm text-cream hover:bg-cinema"
                      >
                        <span>English</span><span className="text-xs opacity-70">PDF</span>
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            <a
              href={cvUrl}
              target="_blank"
              rel="noreferrer"
              className="group flex h-44 w-36 shrink-0 flex-col items-center justify-center gap-3 rounded-sm border border-paper-foreground/20 bg-paper text-paper-foreground transition-colors duration-200 hover:bg-cream"
              aria-label={isAr ? "فتح السيرة الذاتية" : "Open CV"}
            >
              <FileText className="size-8 text-cinema" />
              <span className="text-sm font-semibold">CV.pdf</span>
              <ExternalLink className="size-4 opacity-60" />
            </a>
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-surface-deep md:aspect-auto">
              {settingsLoading || !about.image3_url ? (
                <ImgLoader />
              ) : (
                <ElasticImage src={about.image3_url} alt={studioName} className="size-full object-cover" loading="lazy" />
              )}
              <div className="grain-layer-soft" style={{ opacity: 0.18 }} />
            </div>
            <div className="flex flex-col items-start justify-center rounded-sm border border-border bg-surface p-6 md:p-8">
              <h3 className="text-2xl text-cream md:text-3xl">{studioName}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{studioDesc}</p>
              <a
                href={studioUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 border-b border-cinema pb-1 text-sm font-semibold text-cinema"
              >
                {isAr ? "تعرّف على الفريق" : "Meet the team"} <ExternalLink className="size-4" />
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
