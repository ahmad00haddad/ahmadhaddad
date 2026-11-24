import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
  X,
  Youtube,
} from "lucide-react";
import { useSettings, useContent } from "@/lib/use-settings";
import { ElasticImage } from "@/components/ElasticImage";

type ClientRow = {
  id: string;
  name: string;
  logo_url: string;
  url?: string | null;
};

type WorkRow = {
  id: string;
  title: string;
  title_en?: string | null;
  category: string;
  description?: string | null;
  description_en?: string | null;
  image_url: string;
  video_url?: string | null;
  external_url?: string | null;
};

function LogoItem({ client }: { client: ClientRow }) {
  const image = (
    <ElasticImage
      src={client.logo_url}
      alt={client.name}
      width={180}
      height={80}
      decoding="async"
      className="h-full w-full object-contain opacity-60 grayscale transition-opacity duration-200 hover:opacity-100"
    />
  );

  return (
    <div className="flex h-16 w-40 shrink-0 items-center justify-center md:h-20 md:w-48">
      {client.url ? (
        <a
          href={client.url}
          target="_blank"
          rel="noreferrer"
          aria-label={client.name}
          className="block h-full w-full"
        >
          {image}
        </a>
      ) : (
        image
      )}
    </div>
  );
}

function ImgLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`grid size-full place-items-center bg-ink/40 ${className}`}>
      <Loader2 className="size-5 animate-spin text-cream/60" aria-label="Loading" />
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "أحمد حدّاد — مصور سينمائي وصانع أفلام" },
      {
        name: "description",
        content:
          "أحمد حدّاد، مصور سينمائي مستقل من الأردن. تصوير أفلام وإعلانات، فوتوغراف، وتلوين سينمائي.",
      },
      { property: "og:title", content: "أحمد حدّاد — مصور سينمائي وصانع أفلام" },
      {
        property: "og:description",
        content: "تصوير أفلام وإعلانات، فوتوغراف، وتلوين سينمائي من الأردن.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
  const { rows: clientsRows } = useContent<ClientRow>("clients");
  const [openWork, setOpenWork] = useState<WorkRow | null>(null);

  const previewWorks = worksRows.filter((work) => work.category !== "photo").slice(0, 3);
  const portrait = settings.hero.portrait_url;
  const strip = [0, 1, 2].map((index) => settings.hero.strip_images?.[index] || "");
  const heroTitle =
    (isAr ? settings.hero.title_ar : settings.hero.title_en) ||
    `${t("home.hero_title_a")} ${t("home.hero_title_b")}`;
  const heroSubtitle =
    (isAr ? settings.hero.subtitle_ar : settings.hero.subtitle_en) || t("home.hero_tagline");
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  const socials = [
    { Icon: Linkedin, href: "https://www.linkedin.com/in/ahmad00haddad/", label: "LinkedIn" },
    { Icon: Instagram, href: "https://www.instagram.com/ahmad00haddad/", label: "Instagram" },
    { Icon: Facebook, href: "https://www.facebook.com/ahmad00haddad/", label: "Facebook" },
    { Icon: Youtube, href: "https://www.youtube.com/@ahmad00haddad", label: "YouTube" },
  ];

  return (
    <>
      <section className="border-b border-border bg-ink p-4 md:p-8">
        <div className="mx-auto grid max-w-[1600px] overflow-hidden rounded-sm bg-cinema lg:min-h-[calc(100svh-112px)] lg:grid-cols-2 xl:grid-cols-[minmax(0,0.9fr)_minmax(360px,0.9fr)_220px]">
          <div
            dir={isAr ? "rtl" : "ltr"}
            className="flex flex-col items-start justify-center px-6 py-16 text-cream md:px-12 md:py-20 xl:px-16"
          >
            <p className="mb-6 text-base text-cream/80 md:text-lg">
              {isAr ? "أحمد حدّاد — مصوّر سينمائي مستقل" : "Ahmad Haddad — freelance cinematographer"}
            </p>
            <h1
              className={`max-w-3xl text-[clamp(3rem,7vw,6.75rem)] leading-[0.95] tracking-tight ${
                isAr ? "font-arabic" : "font-display"
              }`}
            >
              {heroTitle}
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-cream/90 md:text-lg">
              {heroSubtitle}
            </p>
            <Link
              to="/work"
              className="mt-10 inline-flex items-center gap-3 rounded-sm bg-ink px-6 py-3 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-surface-deep focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
            >
              {t("home.cta_work")}
              <Arrow className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="relative min-h-[440px] overflow-hidden border-y border-ink/20 bg-ink lg:min-h-[620px] lg:border-y-0 lg:border-x">
            {settingsLoading || !portrait ? (
              <ImgLoader />
            ) : (
              <>
                <img
                  src={portrait}
                  alt={isAr ? "أحمد حدّاد" : "Ahmad Haddad"}
                  className="absolute inset-0 size-full object-cover object-center"
                  fetchPriority="high"
                />
                <div className="grain-layer-soft" style={{ opacity: 0.24 }} />
              </>
            )}
          </div>

          <aside className="filmstrip-vertical hidden flex-col p-4 xl:flex" aria-label={t("home.preview_title")}>
            <div className="flex min-h-0 flex-1 flex-col gap-0">
              {strip.map((src, index) => (
                <div key={index} className="flex min-h-0 flex-1 flex-col">
                  <div className="sprocket-row shrink-0" />
                  <div className="relative min-h-0 flex-1 overflow-hidden bg-ink">
                    {settingsLoading || !src ? (
                      <ImgLoader />
                    ) : (
                      <>
                        <ElasticImage
                          src={src}
                          alt=""
                          loading="lazy"
                          className="absolute inset-0 size-full object-cover object-center"
                        />
                        <div className="grain-layer-soft" style={{ opacity: 0.2 }} />
                      </>
                    )}
                  </div>
                  {index === strip.length - 1 && <div className="sprocket-row shrink-0" />}
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-ink/20 pt-4 text-ink">
              <p className="text-sm font-semibold">{t("home.contact_for")}</p>
              <div className="mt-3 flex gap-2">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="grid size-8 place-items-center rounded-sm bg-ink text-cream transition-colors duration-200 hover:bg-surface"
                  >
                    <Icon className="size-3.5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl text-cream md:text-5xl">{t("home.preview_title")}</h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                {isAr
                  ? "مختارات من الأفلام والإعلانات التي صوّرتها وعملت على صورتها النهائية."
                  : "Selected films and commercials I shot and helped bring to their final image."}
              </p>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 border-b border-cinema pb-1 text-sm font-semibold text-cream transition-colors duration-200 hover:text-cinema"
            >
              {t("home.preview_cta")} <Arrow className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
            {worksLoading ? (
              [0, 1, 2].map((index) => (
                <div key={index} className="aspect-[4/5] overflow-hidden rounded-sm bg-surface-deep">
                  <ImgLoader />
                </div>
              ))
            ) : previewWorks.length === 0 ? (
              <p className="col-span-full text-sm text-muted-foreground">
                {isAr ? "لا توجد أعمال منشورة بعد." : "No published works yet."}
              </p>
            ) : (
              previewWorks.map((work) => {
                const title = (isAr ? work.title : work.title_en || work.title) || "";
                const description = isAr
                  ? work.description || ""
                  : work.description_en || work.description || "";
                const hasLetter =
                  !work.external_url && !work.video_url && description.trim().length > 80;
                const category = t(`work.tabs.${work.category}`);

                const card = (
                  <article className="group">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface-deep">
                      <ElasticImage
                        src={work.image_url}
                        alt={title}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="grain-layer-soft" style={{ opacity: 0.16 }} />
                      {hasLetter && (
                        <span className="absolute right-4 top-4 border-b border-cream/60 bg-ink/70 px-2 py-1 text-xs text-cream">
                          {isAr ? "اقرأ الرسالة" : "Read the letter"}
                        </span>
                      )}
                    </div>
                    <div className="border-b border-border py-4">
                      <p className="text-xs text-muted-foreground">{category}</p>
                      <h3 className="mt-1 text-lg text-cream">{title}</h3>
                    </div>
                  </article>
                );

                return work.external_url ? (
                  <a key={work.id} href={work.external_url} target="_blank" rel="noreferrer">
                    {card}
                  </a>
                ) : hasLetter ? (
                  <button
                    key={work.id}
                    type="button"
                    onClick={() => setOpenWork(work)}
                    className="text-start"
                    aria-label={`${isAr ? "اقرأ رسالة" : "Read letter"}: ${title}`}
                  >
                    {card}
                  </button>
                ) : (
                  <div key={work.id}>{card}</div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {clientsRows.length > 0 && (
        <section className="overflow-hidden border-t border-border bg-ink py-16 md:py-20">
          <div className="mx-auto mb-8 grid max-w-7xl gap-4 px-6 md:grid-cols-2 md:items-end md:px-8">
            <h2 className="text-3xl text-cream md:text-4xl">{t("home.trusted_title")}</h2>
            <p className="max-w-md text-sm leading-7 text-muted-foreground md:justify-self-end">
              {t("home.trusted_sub")}
            </p>
          </div>
          <div
            dir="ltr"
            className="marquee-pause relative"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div
              className="marquee-track flex items-center gap-4 px-4"
              style={
                {
                  "--marquee-duration": `${Math.max(12, clientsRows.length * 2)}s`,
                } as React.CSSProperties
              }
            >
              {[...clientsRows, ...clientsRows, ...clientsRows].map((client, index) => (
                <LogoItem key={`${client.id}-${index}`} client={client} />
              ))}
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
            transition={{ duration: 0.18 }}
            onClick={() => setOpenWork(null)}
            role="dialog"
            aria-modal="true"
            aria-label={isAr ? openWork.title : openWork.title_en || openWork.title}
          >
            <div className="absolute inset-0 bg-ink/90" />
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
              dir={isAr ? "rtl" : "ltr"}
              className="relative z-[2] max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-paper-foreground/15 bg-paper text-paper-foreground shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setOpenWork(null)}
                aria-label={isAr ? "إغلاق" : "Close"}
                className={`sticky top-4 z-[5] grid size-9 place-items-center rounded-sm bg-paper-foreground/10 text-paper-foreground transition-colors duration-200 hover:bg-paper-foreground/20 ${
                  isAr ? "float-left ml-4" : "float-right mr-4"
                } mt-4`}
              >
                <X className="size-4" />
              </button>
              <div className="relative px-8 py-12 sm:px-12 sm:py-16">
                <div className="grain-layer-soft" style={{ opacity: 0.2 }} />
                <div className="relative z-[2]">
                  <h3 className="text-2xl sm:text-3xl">
                    {isAr ? openWork.title : openWork.title_en || openWork.title}
                  </h3>
                  <div className="my-6 h-px w-16 bg-paper-foreground/30" />
                  <article className="whitespace-pre-line font-arabic-body text-base leading-8">
                    {isAr
                      ? openWork.description || ""
                      : openWork.description_en || openWork.description || ""}
                  </article>
                  <p className="mt-10 border-t border-paper-foreground/20 pt-4 text-sm text-paper-foreground/70">
                    {isAr ? "أحمد حدّاد" : "Ahmad Haddad"}
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
