import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Youtube, ExternalLink, Play } from "lucide-react";
import { PageHero } from "@/components/PageHero";
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
    ],
  }),
  component: WorkPage,
});

type Work = {
  id: string;
  title: string;
  title_en?: string | null;
  category: string;
  description: string | null;
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
  const { rows } = useContent<Work>("works");
  const works = rows.length ? rows : FALLBACK;

  const items = tab === "all" ? works : works.filter((w) => w.category === tab);


  const TABS: { key: Tab; label: string }[] = [
    { key: "all", label: "الكل" },
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
            <button
              key={tb.key}
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
            const Wrapper = (props: any) =>
              w.external_url || w.video_url ? (
                <a
                  href={w.external_url || w.video_url!}
                  target="_blank"
                  rel="noreferrer"
                  {...props}
                />
              ) : (
                <div {...props} />
              );
            return (
              <Wrapper
                key={w.id}
                className="group relative aspect-[4/5] overflow-hidden rounded-sm"
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
                <div className="absolute inset-x-0 bottom-0 p-5 text-cream">
                  <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-cinema">
                    {w.category}
                  </span>
                  <h3 className="mt-1 font-arabic text-xl">{isAr ? w.title : (w.title_en || w.title)}</h3>
              </Wrapper>
            );
          })}
        </motion.div>

        {/* social CTAs */}
        <section className="mt-20 grid gap-4 md:grid-cols-2">
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
        </section>
      </div>
    </>
  );
}
