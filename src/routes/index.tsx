import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowLeft,
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
} from "lucide-react";
import heroImg from "@/assets/ahmad-hero.jpg";
import filmSet from "@/assets/film-set.jpg";
import journey from "@/assets/journey.jpg";
import lens from "@/assets/camera-lens.jpg";

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

const STRIP = [
  { src: heroImg, label: "PORTRAIT" },
  { src: filmSet, label: "FILM SET" },
  { src: lens, label: "MACRO" },
];

function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      {/* ============ CINEMATIC HERO ============ */}
      <section
        dir="ltr"
        className="relative isolate min-h-[88vh] overflow-hidden bg-[var(--ink)] px-3 py-3 md:px-5 md:py-5"
      >
        <div
          className="relative grid min-h-[calc(88vh-2rem)] grid-cols-1 overflow-hidden rounded-sm lg:grid-cols-[1fr_320px]"
          style={{ background: "var(--cinema)" }}
        >
          {/* grain texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60 mix-blend-overlay"
            style={{ backgroundImage: "var(--grain)" }}
          />

          {/* LEFT — main canvas */}
          <div className="relative flex flex-col justify-between p-6 md:p-12">
            {/* Top nav row */}
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-3 text-[var(--cream)]">
                <Aperture className="size-8" strokeWidth={1.4} />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
                  Haddad · Studio
                </span>
              </div>
              <div className="hidden items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--cream)]/90 md:flex">
                <span>It's all about</span>
                <span className="h-px w-24 bg-[var(--cream)]/40" />
                <Link to="/services" className="hover:text-[var(--cream)]">
                  Production
                </Link>
                <Link to="/work" className="hover:text-[var(--cream)]">
                  Portfolio
                </Link>
              </div>
            </div>

            {/* Center: huge display text */}
            <div className="relative mt-10 grid grid-cols-1 items-center gap-8 md:mt-0 md:grid-cols-[1.1fr_1fr]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[var(--cream)]"
              >
                {/* Arabic giant title */}
                <h1
                  dir="rtl"
                  className="font-arabic text-[clamp(3.2rem,9vw,8rem)] leading-[0.95] tracking-tight"
                >
                  إطار
                  <br />
                  وَ تركيز
                </h1>
                <p
                  dir="rtl"
                  className="mt-6 max-w-md text-sm leading-relaxed text-[var(--cream)]/90 md:text-base"
                >
                  ستوديو مستقل متخصص بالتصوير السينمائي الفاخر، يلتقط
                  اللحظات الصادقة ويصنع من الفكرة قصةً على الشاشة.
                </p>
              </motion.div>

              {/* Decorative aperture mark */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
                animate={{ opacity: 0.9, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative hidden aspect-square w-full max-w-[420px] place-self-end md:block"
              >
                <div className="absolute inset-0 rounded-full border-[14px] border-[var(--ink)]/15" />
                <div className="absolute inset-6 rounded-full border-2 border-dashed border-[var(--ink)]/30" />
                <div className="absolute inset-14 overflow-hidden rounded-full ring-2 ring-[var(--ink)]/30">
                  <img
                    src={journey}
                    alt=""
                    className="size-full object-cover opacity-90 grayscale"
                  />
                  <div className="absolute inset-0 bg-[var(--cinema)] mix-blend-multiply" />
                </div>
                <Aperture
                  className="absolute inset-0 m-auto size-16 text-[var(--ink)]/40"
                  strokeWidth={1}
                />
              </motion.div>
            </div>

            {/* Bottom: huge bilingual statement */}
            <div className="mt-10 md:mt-0">
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="font-display text-[clamp(2.6rem,8.5vw,7.5rem)] font-bold leading-[0.9] tracking-tight text-[var(--cream)]"
              >
                WE CAPTURE
                <br />
                <span className="opacity-90">__THE EXTRAORDINARY</span>
              </motion.h2>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/work"
                  className="group inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--cream)] transition-transform hover:scale-[1.03]"
                >
                  {t("home.cta_work")}
                  <ArrowLeft className="size-4 -rotate-180 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--cream)]/60 px-6 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--cream)] transition-colors hover:bg-[var(--cream)] hover:text-[var(--ink)]"
                >
                  {t("home.cta_contact")}
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT — cream filmstrip column */}
          <aside
            className="relative hidden flex-col bg-[var(--cream)] p-4 lg:flex"
            style={{
              backgroundImage:
                "radial-gradient(circle at 12px 14px, var(--cinema) 3px, transparent 4px), radial-gradient(circle at calc(100% - 12px) 14px, var(--cinema) 3px, transparent 4px)",
              backgroundSize: "100% 28px",
              backgroundRepeat: "repeat-y",
            }}
          >
            {/* Capture Now pill */}
            <div className="mb-4 flex items-center justify-between px-2">
              <Link
                to="/contact"
                className="rounded-full bg-[var(--ink)] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--cream)]"
              >
                Capture Now
              </Link>
              <div className="grid size-9 place-items-center rounded-full border border-[var(--ink)]/30">
                <div className="flex flex-col gap-1">
                  <span className="block h-[2px] w-3 bg-[var(--ink)]" />
                  <span className="block h-[2px] w-3 bg-[var(--ink)]" />
                </div>
              </div>
            </div>

            {/* Stacked photo frames */}
            <div className="flex flex-1 flex-col gap-4 px-2">
              {STRIP.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * i }}
                  className="relative aspect-[4/5] flex-1 overflow-hidden rounded-sm"
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    className="size-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 rounded-sm bg-[var(--ink)]/70 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[var(--cream)]">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Footer of strip — contact */}
            <div className="mt-4 border-t border-[var(--ink)]/15 px-2 pt-3">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-sm border border-[var(--ink)]/40 text-[var(--ink)]">
                  <Film className="size-3.5" />
                </span>
                <div className="leading-tight">
                  <div className="text-sm font-bold text-[var(--ink)]">
                    Contact for
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--ink)]/70">
                    Collaboration +
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
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
      <section className="border-y border-[var(--cream)]/10 bg-[var(--ink)] py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-6 px-6">
          <Stat number="10+" label={t("home.stats.years")} />
          <Stat number="120+" label={t("home.stats.projects")} />
          <Stat number="40+" label={t("home.stats.clients")} />
        </div>
      </section>

      {/* ============ SERVICES PREVIEW ============ */}
      <section className="bg-[var(--surface-deep)] py-24">
        <div className="mx-auto max-w-7xl px-6">
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
              className="text-xs font-bold uppercase tracking-[0.2em] text-cinema hover:text-cream"
            >
              {t("home.preview_cta")} →
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
