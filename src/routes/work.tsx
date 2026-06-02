import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Youtube, ExternalLink } from "lucide-react";
import filmSet from "@/assets/film-set.jpg";
import journey from "@/assets/journey.jpg";
import lens from "@/assets/camera-lens.jpg";
import heroImg from "@/assets/ahmad-hero.jpg";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "الأعمال — أحمد حدّاد" },
      { name: "description", content: "أعمال أحمد حدّاد السينمائية: أفلام قصيرة، إعلانات، تصوير فوتوغراف." },
    ],
  }),
  component: WorkPage,
});

// Placeholder gallery using generated cinematic stills until Instagram/YouTube is wired.
const GALLERY = {
  films: [filmSet, journey, heroImg, lens, filmSet, journey],
  ads: [lens, heroImg, filmSet, journey, lens, heroImg],
  photo: [journey, lens, filmSet, heroImg, journey, filmSet],
} as const;

type Tab = keyof typeof GALLERY;

function WorkPage() {
  const { t } = useTranslation();
  const [tab, setTab] = useState<Tab>("films");
  const items = GALLERY[tab];

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <header className="mx-auto max-w-2xl text-center">
        <h1 className="text-4xl font-black md:text-5xl">{t("work.title")}</h1>
        <p className="mt-5 text-muted-foreground">{t("work.subtitle")}</p>
      </header>

      <div className="mt-10 flex justify-center gap-2">
        {(Object.keys(GALLERY) as Tab[]).map((k) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={
              "rounded-full px-5 py-2 text-sm font-semibold transition-colors " +
              (tab === k
                ? "bg-brass text-[var(--surface-deep)]"
                : "border border-border text-muted-foreground hover:text-foreground")
            }
          >
            {t(`work.tabs.${k}`)}
          </button>
        ))}
      </div>

      <motion.div
        key={tab}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((src, i) => (
          <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-2xl">
            <img
              src={src}
              alt=""
              loading="lazy"
              className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        ))}
      </motion.div>

      {/* YouTube + Instagram CTA blocks */}
      <section className="mt-24 grid gap-6 md:grid-cols-2">
        <a
          href="https://www.youtube.com/@ahmad00haddad"
          target="_blank"
          rel="noreferrer"
          className="group block rounded-3xl border border-border bg-[var(--surface-deep)] p-8 transition-all hover:border-brass/60"
        >
          <div className="flex items-center gap-3 text-brass">
            <Youtube className="size-7" />
            <span className="text-xs font-semibold uppercase tracking-widest">YouTube</span>
          </div>
          <h3 className="mt-4 text-2xl font-bold">{t("work.youtube_title")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t("work.youtube_sub")}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brass">
            @ahmad00haddad <ExternalLink className="size-4" />
          </span>
        </a>
        <a
          href="https://www.instagram.com/ahmad00haddad/"
          target="_blank"
          rel="noreferrer"
          className="group block rounded-3xl border border-border bg-[var(--surface-deep)] p-8 transition-all hover:border-brass/60"
        >
          <div className="flex items-center gap-3 text-brass">
            <Instagram className="size-7" />
            <span className="text-xs font-semibold uppercase tracking-widest">Instagram</span>
          </div>
          <h3 className="mt-4 text-2xl font-bold">{t("work.instagram_title")}</h3>
          <p className="mt-2 text-sm text-muted-foreground">{t("work.instagram_sub")}</p>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brass">
            {t("work.instagram_cta")} <ExternalLink className="size-4" />
          </span>
        </a>
      </section>
    </div>
  );
}
