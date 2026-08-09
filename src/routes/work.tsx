import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram, Youtube, ExternalLink, Play, X } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Magnetic } from "@/components/MagneticButton";
import { useContent } from "@/lib/use-settings";
import filmSet from "@/assets/film-set.jpg";
import journey from "@/assets/journey.jpg";
import lens from "@/assets/camera-lens.jpg";
import heroImg from "@/assets/ahmad-hero.jpg";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "الأعمال — أحمد حدّاد" },
      {
        name: "description",
        content: "أعمال أحمد حدّاد السينمائية: أفلام قصيرة، إعلانات، تصوير فوتوغراف.",
      },
      { property: "og:title", content: "أعمال أحمد حدّاد" },
      { property: "og:description", content: "مختارات من الأفلام والإعلانات والتصوير." },
      { property: "og:url", content: "https://ahmadhaddad.lovable.app/work" },
    ],
    links: [{ rel: "canonical", href: "https://ahmadhaddad.lovable.app/work" }],
  }),
  component: WorkPage,
});

type Work = {
  id: string;
  title: string;
  title_en?: string | null;
  category: string;
  description: string | null;
  description_en?: string | null;
  image_url: string;
  video_url: string | null;
  external_url: string | null;
};

const FALLBACK: Work[] = [
  { id: "1", title: "لقطة سينمائية", category: "films", description: null, image_url: filmSet, video_url: null, external_url: null },
  { id: "2", title: "رحلة", category: "films", description: null, image_url: journey, video_url: null, external_url: null },
  { id: "3", title: "العدسة", category: "photo", description: null, image_url: lens, video_url: null, external_url: null },
  { id: "4", title: "بورتريه", category: "photo", description: null, image_url: heroImg, video_url: null, external_url: null },
  { id: "5", title: "خلف الكواليس", category: "ads", description: null, image_url: filmSet, video_url: null, external_url: null },
  { id: "6", title: "ضوء", category: "ads", description: null, image_url: lens, video_url: null, external_url: null },
];

type Tab = "all" | "films" | "ads" | "photo";

function WorkPage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [tab, setTab] = useState<Tab>("all");
  const [openWork, setOpenWork] = useState<Work | null>(null);
  const { rows } = useContent<Work>("works");
  const works = rows.length ? rows : FALLBACK;

  const items = tab === "all" ? works.filter((w) => w.category !== "photo") : works.filter((w) => w.category === tab);


  const TABS: { key: Tab; label: string }[] = [
    { key: "all", label: t("work.tabs.all") },
    { key: "films", label: t("work.tabs.films") },
    { key: "ads", label: t("work.tabs.ads") },
    { key: "photo", label: t("work.tabs.photo") },
  ];

  return (
    <>
      <PageHero title={t("work.title")} subtitle={t("work.subtitle")} />

      <div dir="rtl" className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {TABS.map((tb) => (
            <Magnetic key={tb.key} strength={0.1} radius={70}>
              <button
                onClick={() => setTab(tb.key)}
                className={
                  "rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors " +
                  (tab === tb.key
                    ? "bg-cinema text-cream"
                    : "border border-cream/15 text-muted-foreground hover:text-cream")
                }
              >
                {tb.label}
              </button>
            </Magnetic>
          ))}
        </div>

        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((w) => {
            const desc = isAr ? (w.description || "") : (w.description_en || w.description || "");
            const hasLetter = !w.external_url && !w.video_url && desc.trim().length > 80;
            const Wrapper = (props: any) =>
              w.external_url || w.video_url ? (
                <a
                  href={w.external_url || w.video_url!}
                  target="_blank"
                  rel="noreferrer"
                  {...props}
                />
              ) : hasLetter ? (
                <button type="button" onClick={() => setOpenWork(w)} {...props} />
              ) : (
                <div {...props} />
              );
            return (
              <Wrapper
                key={w.id}
                className="group relative aspect-[4/5] overflow-hidden rounded-sm text-right"
              >
                <img
                  src={w.image_url}
                  alt={w.title}
                  loading="lazy"
                  className="size-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="grain-layer" style={{ opacity: 0.3 }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/30 to-transparent opacity-80" />
                {w.video_url && (
                  <div className="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="grid size-14 place-items-center rounded-full bg-cinema text-cream">
                      <Play className="size-5" />
                    </span>
                  </div>
                )}
                {hasLetter && (
                  <div className="absolute right-3 top-3 z-[2] rounded-full border border-cream/30 bg-[var(--ink)]/70 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-cream opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    {isAr ? "اقرأ الرسالة" : "Read the letter"}
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cinema">
                    {w.category}
                  </span>
                  <h3 className="mt-1 font-arabic text-xl">{isAr ? w.title : (w.title_en || w.title)}</h3>
                </div>
              </Wrapper>
            );
          })}
        </motion.div>

        <div className="mt-14 flex justify-center">
          <Magnetic strength={0.12} radius={90}>
            <a
              href="https://www.behance.net/ahmad00haddad"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--cinema)] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.25em] text-[var(--cream)] transition-transform hover:scale-[1.03]"
            >
              {isAr ? "عرض المزيد على Behance" : "View more on Behance"}
              <ExternalLink className="size-3.5" />
            </a>
          </Magnetic>
        </div>


        {/* social CTAs */}
        <section className="mt-20 grid gap-4 md:grid-cols-2">
          <Magnetic strength={0.08} radius={120}>
            <a
              href="https://www.youtube.com/@ahmad00haddad"
              target="_blank"
              rel="noreferrer"
              className="group block rounded-sm border border-cream/10 bg-[var(--surface)] p-8 transition-all hover:border-cinema/60"
            >
              <div className="flex items-center gap-3 text-cinema">
                <Youtube className="size-7" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                  YouTube
                </span>
              </div>
              <h3 className="mt-4 font-arabic text-2xl text-cream">
                {t("work.youtube_title")}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{t("work.youtube_sub")}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cinema">
                @ahmad00haddad <ExternalLink className="size-3.5" />
              </span>
            </a>
          </Magnetic>
          <Magnetic strength={0.08} radius={120}>
            <a
              href="https://www.instagram.com/ahmad00haddad/"
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden rounded-sm bg-[var(--cinema)] p-8 transition-transform hover:scale-[1.01]"
            >
              <div className="grain-layer" />
              <div className="relative z-[2] text-[var(--cream)]">
                <div className="flex items-center gap-3">
                  <Instagram className="size-7" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                    Instagram
                  </span>
                </div>
                <h3 className="mt-4 font-arabic text-2xl">
                  {t("work.instagram_title")}
                </h3>
                <p className="mt-2 text-sm opacity-90">{t("work.instagram_sub")}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em]">
                  {t("work.instagram_cta")} <ExternalLink className="size-3.5" />
                </span>
              </div>
            </a>
          </Magnetic>
        </section>
      </div>

      <AnimatePresence>
        {openWork && (
          <motion.div
            className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenWork(null)}
          >
            <div className="absolute inset-0 bg-[var(--ink)]/85 backdrop-blur-sm" />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
              dir={isAr ? "rtl" : "ltr"}
              className="relative z-[2] max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-[var(--cream)]/15 bg-[#f3ecdc] text-[#2a1f12] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 10%, rgba(120,80,40,0.08), transparent 50%), radial-gradient(circle at 80% 90%, rgba(80,40,20,0.10), transparent 55%)",
              }}
            >
              <button
                type="button"
                onClick={() => setOpenWork(null)}
                aria-label="close"
                className={`sticky top-3 z-[5] grid size-9 place-items-center rounded-full bg-[#2a1f12]/15 text-[#2a1f12] backdrop-blur-sm transition-colors hover:bg-[#2a1f12]/30 ${isAr ? "float-left ml-3" : "float-right mr-3"}`}
                style={{ marginTop: "0.75rem" }}
              >
                <X className="size-4" />
              </button>
              <div className="relative px-7 py-10 sm:px-12 sm:py-14">
                <div className="grain-layer pointer-events-none absolute inset-0" style={{ opacity: 0.35, mixBlendMode: "multiply" }} />
                <div className="mb-6 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#7a5a30]">
                    {isAr ? "رسالة" : "A Letter"}
                  </span>
                  <div className="mx-auto mt-3 h-px w-16 bg-[#7a5a30]/40" />
                  <h3 className={`mt-4 text-2xl sm:text-3xl ${isAr ? "font-arabic" : "font-serif italic"}`}>
                    {isAr ? openWork.title : (openWork.title_en || openWork.title)}
                  </h3>
                </div>
                <article
                  className={`whitespace-pre-line text-[15px] leading-[2] sm:text-[16px] sm:leading-[2.05] ${isAr ? "font-arabic-body text-right" : "font-serif text-left"}`}
                  style={{ textWrap: "pretty" as any }}
                >
                  {isAr
                    ? (openWork.description || "")
                    : (openWork.description_en || openWork.description || "")}
                </article>
                <div className="mt-10 text-center">
                  <div className="mx-auto h-px w-12 bg-[#7a5a30]/40" />
                  <p className={`mt-4 text-[11px] uppercase tracking-[0.35em] text-[#7a5a30] ${isAr ? "font-arabic" : ""}`}>
                    — {isAr ? "أحمد حدّاد" : "Ahmad Haddad"}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
