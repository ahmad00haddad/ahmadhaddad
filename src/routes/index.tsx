import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion, useInView, animate, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Film,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Loader2,
  Play,
  X,
} from "lucide-react";
import { useSettings, useContent } from "@/lib/use-settings";
import { Magnetic } from "@/components/MagneticButton";


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
  description?: string | null;
  description_en?: string | null;
  image_url: string;
  video_url?: string | null;
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
      { property: "og:title", content: "أحمد حدّاد — مصور سينمائي وصانع أفلام" },
      { property: "og:description", content: "أعمال سينمائية، إعلانات، تصوير فوتوغراف، وتلوين سينمائي." },
      { property: "og:url", content: "https://ahmadhaddad.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://ahmadhaddad.lovable.app/" }],
  }),
  component: HomePage,
});

function HomePage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const { settings, loading: settingsLoading } = useSettings();
  const { rows: worksRows, loading: worksLoading } = useContent<WorkRow>("works");
  const { rows: clientsRows } = useContent<{ id: string; name: string; logo_url: string; url?: string | null }>("clients");
  const [openWork, setOpenWork] = useState<WorkRow | null>(null);

  const previewWorks = worksRows.slice(0, 3);
  const portrait = settings.hero.portrait_url;
  const strip = [0, 1, 2].map((i) => settings.hero.strip_images?.[i] || "");
  const brandTag = isAr
    ? `${settings.brand.name_ar} · ${settings.brand.tagline_ar}`
    : "HADDAD · CINEMATOGRAPHER";
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
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--cream)]">
                {brandTag}
              </span>
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
                className="relative mx-auto aspect-square w-full max-w-[340px] md:max-w-[420px] lg:max-w-[480px]"
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
              <Magnetic strength={0.12} radius={80}>
                <Link
                  to="/contact"
                  className="inline-block rounded-full bg-[var(--ink)] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--cream)] transition-transform hover:scale-105"
                >
                  {t("home.capture_now")}
                </Link>
              </Magnetic>
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
                <Magnetic key={i} strength={0.15} radius={60}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="grid size-8 place-items-center rounded-full bg-[var(--ink)] text-[var(--cream)] transition-transform hover:scale-110"
                  >
                    <Icon className="size-3.5" />
                  </a>
                </Magnetic>
              ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ============ STATS STRIP ============ */}
      <section className="border-y border-[var(--cream)]/10 bg-[var(--ink)] py-12 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, staggerChildren: 0.15 }}
          className="mx-auto grid max-w-6xl grid-cols-3 gap-6 px-6"
        >
          <Stat number={settings.stats.years} label={t("home.stats.years")} />
          <Stat number={settings.stats.projects} label={t("home.stats.projects")} />
          <Stat number={settings.stats.clients} label={t("home.stats.clients")} />
        </motion.div>
      </section>


      {/* ============ WORK PREVIEW ============ */}
      <section className="bg-[var(--ink)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="mb-10 flex items-end justify-between"
          >
            <h2 className="text-3xl font-bold text-cream md:text-5xl">
              {t("home.preview_title")}
            </h2>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-cinema hover:text-cream story-link"
            >
              {t("home.preview_cta")} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
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
                  const desc = isAr ? (w.description || "") : (w.description_en || w.description || "");
                  const hasLetter = !w.external_url && !w.video_url && desc.trim().length > 80;
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
                      {hasLetter && (
                        <div className="absolute right-3 top-3 z-[2] rounded-full border border-cream/30 bg-[var(--ink)]/70 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.25em] text-cream opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                          {isAr ? "اقرأ الرسالة" : "Read the letter"}
                        </div>
                      )}
                      {title && (
                        <div className="absolute inset-x-0 bottom-0 p-4 text-cream opacity-0 translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
                          <div className="text-sm font-bold">{title}</div>
                        </div>
                      )}
                    </motion.div>
                  );
                  return w.external_url ? (
                    <a key={w.id} href={w.external_url} target="_blank" rel="noreferrer">{card}</a>
                  ) : hasLetter ? (
                    <button key={w.id} type="button" onClick={() => setOpenWork(w)} className="text-right">{card}</button>
                  ) : (
                    <div key={w.id}>{card}</div>
                  );
                })}
          </div>

        </div>
      </section>

      {/* ============ TRUSTED BY — marquee logos ============ */}
      {clientsRows.length > 0 && (
        <section className="relative overflow-hidden border-t border-[var(--cream)]/10 bg-[var(--ink)] py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-12 max-w-3xl px-6 text-center"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[var(--cinema)]">
              — {t("home.trusted_eyebrow")} —
            </span>
            <h2
              className={
                isAr
                  ? "font-arabic mt-4 text-4xl font-bold text-[var(--cream)] md:text-5xl"
                  : "font-display mt-4 text-4xl font-bold text-[var(--cream)] md:text-5xl"
              }
            >
              {t("home.trusted_title")}
            </h2>
            <p className={`mt-3 text-sm text-[var(--cream)]/60 ${isAr ? "font-arabic" : ""}`}>
              {t("home.trusted_sub")}
            </p>
          </motion.div>

          <div
            dir="ltr"
            className="marquee-pause group relative"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div
              className="marquee-track flex items-center gap-16 px-8"
              style={{ "--marquee-duration": `${Math.max(30, clientsRows.length * 6)}s` } as React.CSSProperties}
            >
              {[...clientsRows, ...clientsRows, ...clientsRows].map((c, i) => {
                const img = (
                  <img
                    src={c.logo_url}
                    alt={c.name}
                    width={180}
                    height={80}
                    decoding="async"
                    className="h-full w-full object-contain opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0"
                  />
                );
                return (
                  <div
                    key={`${c.id}-${i}`}
                    className="flex h-16 w-[180px] shrink-0 items-center justify-center md:h-20 md:w-[220px]"
                  >
                    {c.url ? (
                      <a href={c.url} target="_blank" rel="noreferrer" className="block h-full w-full">
                        {img}
                      </a>
                    ) : (
                      img
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

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

function Stat({ number, label }: { number: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  // Parse prefix (e.g. "+"), numeric portion, and suffix (e.g. "+", "K")
  const match = number.match(/^(\D*)(\d+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseInt(match[2], 10) : 0;
  const suffix = match?.[3] ?? "";

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || !target) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="font-display text-4xl font-bold text-cinema md:text-5xl tabular-nums">
        {match ? `${prefix}${display}${suffix}` : number}
      </div>
      <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </div>
    </motion.div>
  );
}
