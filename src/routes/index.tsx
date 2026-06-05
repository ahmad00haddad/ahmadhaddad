import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Film,
  Camera,
  Palette,
  Video,
  Sparkles,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Aperture,
  Menu,
} from "lucide-react";
import heroImg from "@/assets/ahmad-hero.jpg";
import filmSet from "@/assets/film-set.jpg";
import journey from "@/assets/journey.jpg";
import lens from "@/assets/camera-lens.jpg";
import { useSettings } from "@/lib/use-settings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "أحمد حدّاد — مصور سينمائي وصانع أفلام" },
      {
        name: "description",
        content:
          "أحمد حدّاد، مصور سينمائي وصانع أفلام من الأردن. أفلام قصيرة، إعلانات سينمائية، تصوير فوتوغراف، وتلوين.",
      },
    ],
  }),
  component: HomePage,
});

const SERVICES = [
  { key: "shorts", Icon: Film },
  { key: "ads", Icon: Sparkles },
  { key: "color", Icon: Palette },
  { key: "photo", Icon: Camera },
  { key: "edit", Icon: Video },
] as const;

const FALLBACK_STRIP = [heroImg, filmSet, lens];

function HomePage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const { settings } = useSettings();
  const portrait = settings.hero.portrait_url || journey;
  const strip = [0, 1, 2].map(
    (i) => settings.hero.strip_images?.[i] || FALLBACK_STRIP[i],
  );
  const brandTag = isAr
    ? settings.brand.tagline_ar || t("home.brand_tag")
    : settings.brand.tagline_en || t("home.brand_tag");

  return (
    <>
      {/* ============ CINEMATIC HERO — fits viewport exactly ============ */}
      <section
        dir="ltr"
        className="bg-[var(--ink)] p-3 md:p-4"
        style={{ height: "calc(100svh - 65px)" }}
      >
        <div
          className="relative grid h-full grid-cols-1 overflow-hidden rounded-sm lg:grid-cols-[1fr_300px]"
          style={{ backgroundColor: "var(--cinema)" }}
        >
          {/* Heavy grain overlay */}
          <div className="grain-layer" />

          {/* ============ LEFT: red canvas ============ */}
          <div className="relative z-[2] flex flex-col justify-between p-5 md:p-10">
            {/* top nav row */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-[var(--cream)]">
                <Aperture className="size-9" strokeWidth={1.3} />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                  {t("home.brand_tag")}
                </span>
              </div>
              <div className="hidden items-center gap-5 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--cream)]/90 md:flex">
                <span>{t("home.hero_top_label")}</span>
                <span className="h-px w-20 bg-[var(--cream)]/40" />
                <Link to="/services" className="hover:opacity-70">
                  {t("home.hero_nav_a")}
                </Link>
                <Link to="/work" className="hover:opacity-70">
                  {t("home.hero_nav_b")}
                </Link>
              </div>
            </div>

            {/* middle: title left + aperture right */}
            <div className="grid flex-1 grid-cols-1 items-center gap-6 py-6 md:grid-cols-[1.05fr_1fr]">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[var(--cream)]"
                dir={isAr ? "rtl" : "ltr"}
              >
                <h1
                  className={
                    isAr
                      ? "font-arabic text-[clamp(3rem,8vw,7rem)] leading-[0.95] tracking-tight"
                      : "font-display text-[clamp(3rem,8vw,7rem)] font-bold leading-[0.9] tracking-tight"
                  }
                >
                  {t("home.hero_title_a")}
                  <br />
                  {t("home.hero_title_b")}
                </h1>
                <p className="mt-5 max-w-md text-xs leading-relaxed text-[var(--cream)]/90 md:text-sm">
                  {t("home.hero_tagline")}
                </p>
              </motion.div>

              {/* aperture / lens disc with portrait inside */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative mx-auto aspect-square w-full max-w-[340px] md:max-w-[380px]"
              >
                <div className="absolute inset-0 rounded-full border-[10px] border-[var(--ink)]/15" />
                <div className="absolute inset-4 rounded-full border border-dashed border-[var(--ink)]/35" />
                <div className="absolute inset-10 overflow-hidden rounded-full ring-2 ring-[var(--ink)]/35">
                  <img
                    src={journey}
                    alt=""
                    className="size-full object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-[var(--cinema)] mix-blend-multiply" />
                  <div className="grain-layer" style={{ opacity: 0.7 }} />
                </div>
                <Aperture
                  className="absolute inset-0 m-auto size-12 text-[var(--ink)]/40"
                  strokeWidth={0.9}
                />
              </motion.div>
            </div>

            {/* bottom huge statement */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              dir={isAr ? "rtl" : "ltr"}
              className={
                isAr
                  ? "font-arabic text-[clamp(2.4rem,7.5vw,6.5rem)] leading-[0.95] text-[var(--cream)]"
                  : "font-display text-[clamp(2.2rem,7vw,6rem)] font-bold leading-[0.88] tracking-tight text-[var(--cream)]"
              }
            >
              {t("home.hero_big_a")}
              <br />
              <span className="opacity-95">{t("home.hero_big_b")}</span>
            </motion.h2>
          </div>

          {/* ============ RIGHT: real 35mm filmstrip ============ */}
          <aside className="relative z-[2] hidden h-full flex-col filmstrip-vertical p-3 lg:flex">
            {/* top: capture now + menu */}
            <div className="mb-3 flex items-center justify-between px-3">
              <Link
                to="/contact"
                className="rounded-full bg-[var(--ink)] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--cream)] transition-transform hover:scale-105"
              >
                {t("home.capture_now")}
              </Link>
              <button
                aria-label="menu"
                className="grid size-9 place-items-center rounded-full border border-[var(--ink)]/30 text-[var(--ink)]"
              >
                <Menu className="size-4" />
              </button>
            </div>

            {/* 3 stacked frames, no scroll */}
            <div className="flex min-h-0 flex-1 flex-col px-3">
              {strip.map((src: string, i: number) => (
                <div key={i} className="flex min-h-0 flex-1 flex-col">
                  <div className="sprocket-row shrink-0" />
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * i }}
                    className="relative min-h-0 flex-1 overflow-hidden rounded-[2px]"
                  >
                    <img src={src} alt="" className="size-full object-cover" />
                    <div className="grain-layer" style={{ opacity: 0.4 }} />
                  </motion.div>
                  {i === strip.length - 1 && <div className="sprocket-row shrink-0" />}
                </div>
              ))}
            </div>

            {/* footer: contact + socials */}
            <div className="mt-3 border-t border-[var(--ink)]/15 px-3 pt-3">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-sm border border-[var(--ink)]/40 text-[var(--ink)]">
                  <Film className="size-3.5" />
                </span>
                <div className="leading-tight">
                  <div className="text-[13px] font-bold text-[var(--ink)]">
                    {t("home.contact_for")}
                  </div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.25em] text-[var(--ink)]/70">
                    {t("home.collab")}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2">
                {[
                  { Icon: Linkedin, href: "https://www.linkedin.com/in/ahmad00haddad/" },
                  { Icon: Instagram, href: "https://www.instagram.com/ahmad00haddad/" },
                  { Icon: Facebook, href: "https://www.facebook.com/ahmad00haddad/" },
                  { Icon: Youtube, href: "https://www.youtube.com/@ahmad00haddad" },
                ].map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="grid size-8 place-items-center rounded-full bg-[var(--ink)] text-[var(--cream)] transition-transform hover:scale-110"
                  >
                    <Icon className="size-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ============ STATS STRIP ============ */}
      <section className="border-y border-[var(--cream)]/10 bg-[var(--ink)] py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-6 px-6">
          <Stat number="10+" label={t("home.stats.years")} />
          <Stat number="120+" label={t("home.stats.projects")} />
          <Stat number="40+" label={t("home.stats.clients")} />
        </div>
      </section>

      {/* ============ SERVICES PREVIEW ============ */}
      <section className="relative bg-[var(--surface-deep)] py-24">
        <div className="grain-layer-soft" />
        <div className="relative z-[2] mx-auto max-w-7xl px-6">
          <div className="mb-14 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-cinema">
                — {t("home.services_title")}
              </p>
              <h2 className="mt-3 text-3xl font-bold text-cream md:text-5xl">
                {t("home.services_title")}
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              {t("home.services_sub")}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ key, Icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-sm border border-cream/10 bg-[var(--ink)] p-7 transition-all hover:border-cinema/60"
              >
                <div className="grid size-12 place-items-center rounded-sm bg-cinema/15 text-cinema transition-colors group-hover:bg-cinema group-hover:text-cream">
                  <Icon className="size-6" strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-cream">
                  {t(`services.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`services.items.${key}.desc`)}
                </p>
                <span className="absolute -right-4 -bottom-4 font-display text-7xl font-bold text-cinema/10">
                  0{i + 1}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WORK PREVIEW ============ */}
      <section className="bg-[var(--ink)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-3xl font-bold text-cream md:text-5xl">
              {t("home.preview_title")}
            </h2>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cinema hover:text-cream"
            >
              {t("home.preview_cta")} <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[filmSet, journey, lens].map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-sm"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cinema/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-4xl font-bold text-cinema md:text-5xl">
        {number}
      </div>
      <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
