import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Film,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Aperture,
  Loader2,
} from "lucide-react";
import { useSettings, useContent } from "@/lib/use-settings";


function ImgLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`grid size-full place-items-center bg-[var(--ink)]/40 ${className}`}>
      <Loader2 className="size-5 animate-spin text-[var(--cream)]/60" />
    </div>
  );
}

type WorkRow = {
  id: string;
  title: string;
  title_en?: string | null;
  image_url: string;
  external_url?: string | null;
};

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

function HomePage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const { settings, loading: settingsLoading } = useSettings();
  const { rows: worksRows, loading: worksLoading } = useContent<WorkRow>("works");

  const previewWorks = worksRows.slice(0, 3);
  const portrait = settings.hero.portrait_url;
  const strip = [0, 1, 2].map((i) => settings.hero.strip_images?.[i] || "");
  const brandTag = isAr
    ? settings.brand.tagline_ar || t("home.brand_tag")
    : settings.brand.tagline_en || t("home.brand_tag");
  const heroTitle = (isAr ? settings.hero.title_ar : settings.hero.title_en)
    || `${t("home.hero_title_a")} ${t("home.hero_title_b")}`;
  const heroSubtitle = (isAr ? settings.hero.subtitle_ar : settings.hero.subtitle_en)
    || t("home.hero_tagline");

  return (
    <>
      {/* ============ CINEMATIC HERO — fits viewport exactly ============ */}
      <section
        dir="ltr"
        className="bg-[var(--ink)] p-3 md:p-4 lg:[height:calc(100svh-65px)]"
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
                  {brandTag}
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
                  {heroTitle}
                </h1>
                <p className="mt-5 max-w-md text-xs leading-relaxed text-[var(--cream)]/90 md:text-sm">
                  {heroSubtitle}
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
                  {settingsLoading ? (
                    <ImgLoader />
                  ) : portrait ? (
                    <>
                      <img
                        src={portrait}
                        alt=""
                        loading="lazy"
                        className="size-full object-cover grayscale-[0.4]"
                      />
                      <div className="absolute inset-0 bg-[var(--cinema)]/45 mix-blend-multiply" />
                      <div className="grain-layer" style={{ opacity: 0.5 }} />
                    </>
                  ) : (
                    <ImgLoader />
                  )}
                </div>
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
              {(isAr ? settings.hero.big_a_ar : settings.hero.big_a_en) || t("home.hero_big_a")}
              <br />
              <span className="opacity-95">{(isAr ? settings.hero.big_b_ar : settings.hero.big_b_en) || t("home.hero_big_b")}</span>
            </motion.h2>
          </div>

          {/* ============ RIGHT: real 35mm filmstrip ============ */}
          <aside className="relative z-[2] hidden h-full flex-col filmstrip-vertical p-3 lg:flex">
            {/* top: capture now */}
            <div className="mb-3 flex items-center justify-between px-3">
              <Link
                to="/contact"
                className="rounded-full bg-[var(--ink)] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--cream)] transition-transform hover:scale-105"
              >
                {t("home.capture_now")}
              </Link>
            </div>

            {/* 3 stacked frames, uniform sizing */}
            <div className="flex min-h-0 flex-1 flex-col px-3">
              {strip.map((src: string, i: number) => (
                <div key={i} className="flex min-h-0 flex-1 flex-col">
                  <div className="sprocket-row shrink-0" />
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * i }}
                    className="relative min-h-0 flex-1 overflow-hidden rounded-[2px] bg-[var(--ink)]"
                  >
                    {settingsLoading ? (
                      <ImgLoader />
                    ) : src ? (
                      <>
                        <img
                          src={src}
                          alt=""
                          loading="lazy"
                          className="absolute inset-0 size-full object-cover object-center"
                        />
                        <div className="grain-layer" style={{ opacity: 0.4 }} />
                      </>
                    ) : (
                      <ImgLoader />
                    )}
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
          <Stat number={settings.stats.years} label={t("home.stats.years")} />
          <Stat number={settings.stats.projects} label={t("home.stats.projects")} />
          <Stat number={settings.stats.clients} label={t("home.stats.clients")} />
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
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {worksLoading
              ? [0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="aspect-[4/5] overflow-hidden rounded-sm bg-[var(--surface-deep)]"
                  >
                    <ImgLoader />
                  </div>
                ))
              : previewWorks.length === 0
              ? (
                <p className="col-span-full text-center text-sm text-muted-foreground">
                  {isAr ? "لا توجد أعمال منشورة بعد." : "No published works yet."}
                </p>
              )
              : previewWorks.map((w: WorkRow, i: number) => {
                  const title = (isAr ? w.title : w.title_en || w.title) || "";
                  const card = (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="group relative aspect-[4/5] overflow-hidden rounded-sm bg-[var(--surface-deep)]"
                    >
                      <img
                        src={w.image_url}
                        alt={title}
                        loading="lazy"
                        className="size-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cinema/90 via-cinema/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                      {title && (
                        <div className="absolute inset-x-0 bottom-0 p-4 text-cream opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                          <div className="text-sm font-bold">{title}</div>
                        </div>
                      )}
                    </motion.div>
                  );
                  return w.external_url ? (
                    <a key={w.id} href={w.external_url} target="_blank" rel="noreferrer">{card}</a>
                  ) : (
                    <div key={w.id}>{card}</div>
                  );
                })}
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
