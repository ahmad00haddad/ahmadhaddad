import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Instagram, Youtube, ExternalLink, Play, X, Camera, Loader2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ElasticImage } from "@/components/ElasticImage";
import { useContent } from "@/lib/use-settings";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "الأعمال — أحمد حدّاد" },
      {
        name: "description",
        content: "مختارات فعلية من الأفلام والإعلانات والتصوير الفوتوغرافي لأحمد حدّاد.",
      },
      { property: "og:title", content: "أعمال أحمد حدّاد" },
      { property: "og:description", content: "شاهد الأفلام والإعلانات والصور، وافتح روابط المشاريع الأصلية." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

type Tab = "all" | "films" | "ads" | "photo";
type Equipment = { id: string; work_id: string; name: string; image_url: string; created_at?: string };

function fixGearUrl(url: string) {
  if (!url) return url;
  const cdn = url.match(/^https?:\/\/www\.bhphotovideo\.com\/cdn-cgi\/.*_(\d+_\d+\.jpg)$/);
  if (cdn) return `https://static.bhphoto.com/images/images500x500/${cdn[1]}`;
  return url.replace(/^https?:\/\/www\.bhphotovideo\.com\/images\//, "https://static.bhphoto.com/images/");
}

function WorkPage() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [tab, setTab] = useState<Tab>("all");
  const [openWork, setOpenWork] = useState<Work | null>(null);
  const [gearOpen, setGearOpen] = useState<string | null>(null);
  const [equipment, setEquipment] = useState<Record<string, Equipment[]>>({});
  const { rows: works, loading } = useContent<Work>("works");

  useEffect(() => {
    supabase.from("work_equipment").select("*").then(({ data }) => {
      if (!data) return;
      const rank = (name: string) => {
        const value = name.toLowerCase();
        if (/a7|fx\d|camera|bmpcc|red |alexa|komodo|canon r|zv-/.test(value)) return 0;
        if (/mm|lens|anamorphic|diopter|f\/|t\d/.test(value)) return 1;
        if (/gvm|godox|amaran|aputure|nanlite|light|arri|led/.test(value)) return 2;
        return 3;
      };
      const grouped: Record<string, Equipment[]> = {};
      data.forEach((item: Equipment) => {
        if (!grouped[item.work_id]) grouped[item.work_id] = [];
        grouped[item.work_id].push({ ...item, image_url: fixGearUrl(item.image_url) });
      });
      Object.values(grouped).forEach((list) => {
        list.sort(
          (a, b) =>
            rank(a.name) - rank(b.name) ||
            String(a.created_at ?? "").localeCompare(String(b.created_at ?? "")),
        );
      });
      setEquipment(grouped);
    });
  }, []);

  const items = tab === "all" ? works.filter((work) => work.category !== "photo") : works.filter((work) => work.category === tab);
  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: t("work.tabs.all") },
    { key: "films", label: t("work.tabs.films") },
    { key: "ads", label: t("work.tabs.ads") },
    { key: "photo", label: t("work.tabs.photo") },
  ];

  return (
    <>
      <PageHero title={t("work.title")} subtitle={t("work.subtitle")} />

      <div dir={isAr ? "rtl" : "ltr"} className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label={t("work.title")}>
          {tabs.map((item) => (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={tab === item.key}
              onClick={() => setTab(item.key)}
              className={`rounded-sm border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                tab === item.key
                  ? "border-cinema bg-cinema text-cream"
                  : "border-border text-muted-foreground hover:border-cream/40 hover:text-cream"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid h-72 place-items-center rounded-sm bg-surface-deep">
            <Loader2 className="size-6 animate-spin text-cream/60" aria-label="Loading" />
          </div>
        ) : items.length === 0 ? (
          <p className="border-y border-border py-12 text-sm text-muted-foreground">
            {isAr ? "لا توجد أعمال منشورة في هذا التصنيف." : "No published work in this category yet."}
          </p>
        ) : (
          <motion.div
            key={tab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="grid auto-rows-[260px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[340px] lg:grid-cols-4"
          >
            {items.map((work, index) => {
              const title = isAr ? work.title : work.title_en || work.title;
              const description = isAr ? work.description || "" : work.description_en || work.description || "";
              const hasLetter = !work.external_url && !work.video_url && description.trim().length > 80;
              const externalUrl = work.external_url || work.video_url;
              const bentoClass = index % 7 === 2 ? "sm:col-span-2 lg:col-span-2" : "";

              const content = (
                <>
                  <ElasticImage
                    src={work.image_url}
                    alt={title}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="grain-layer-soft" style={{ opacity: 0.16 }} />
                  <div className="absolute inset-x-0 bottom-0 bg-ink/90 p-4 text-cream">
                    <p className="text-xs text-cream/65">{t(`work.tabs.${work.category}`)}</p>
                    <h3 className="mt-1 text-xl">{title}</h3>
                  </div>
                  {work.video_url && (
                    <span className="absolute left-4 top-4 grid size-10 place-items-center rounded-sm bg-cinema text-cream">
                      <Play className="size-4" aria-hidden="true" />
                    </span>
                  )}
                  {hasLetter && (
                    <span className="absolute right-4 top-4 border-b border-cream/60 bg-ink/75 px-2 py-1 text-xs text-cream">
                      {isAr ? "اقرأ الرسالة" : "Read the letter"}
                    </span>
                  )}
                </>
              );

              return (
                <article key={work.id} className={`group relative overflow-hidden rounded-sm bg-surface-deep ${bentoClass}`}>
                  {externalUrl ? (
                    <a href={externalUrl} target="_blank" rel="noreferrer" className="block size-full" aria-label={title}>{content}</a>
                  ) : hasLetter ? (
                    <button type="button" onClick={() => setOpenWork(work)} className="block size-full text-start" aria-label={`${isAr ? "اقرأ رسالة" : "Read letter"}: ${title}`}>{content}</button>
                  ) : (
                    <div className="size-full">{content}</div>
                  )}

                  {equipment[work.id] && equipment[work.id].length > 0 && (
                    <button
                      type="button"
                      onClick={() => setGearOpen(gearOpen === work.id ? null : work.id)}
                      className="absolute left-4 top-4 z-[3] grid size-9 place-items-center rounded-sm border border-cream/25 bg-ink/80 text-cream transition-colors duration-200 hover:bg-cinema"
                      aria-label={isAr ? `معدات ${title}` : `Gear used for ${title}`}
                      aria-expanded={gearOpen === work.id}
                    >
                      <Camera className="size-4" />
                    </button>
                  )}

                  <AnimatePresence>
                    {gearOpen === work.id && equipment[work.id] && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="absolute inset-x-0 bottom-0 z-[4] bg-paper p-4 text-paper-foreground shadow-2xl"
                      >
                        <div className="mb-3 flex items-center justify-between border-b border-paper-foreground/15 pb-2">
                          <span className="text-sm font-semibold">{isAr ? "المعدات المستخدمة" : "Gear used"}</span>
                          <button
                            type="button"
                            onClick={() => setGearOpen(null)}
                            className="grid size-7 place-items-center rounded-sm hover:bg-paper-foreground/10"
                            aria-label={isAr ? "إغلاق المعدات" : "Close gear"}
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                        <div className="flex gap-4 overflow-x-auto pb-1" style={{ scrollbarWidth: "thin" }}>
                          {equipment[work.id].map((item) => (
                            <div key={item.id} className="group/eq flex w-20 shrink-0 flex-col items-center gap-2">
                              <div className="flex size-16 items-center justify-center">
                                <ElasticImage
                                  src={item.image_url}
                                  alt={item.name}
                                  draggable={false}
                                  onError={(event) => {
                                    event.currentTarget.closest(".group\\/eq")?.setAttribute("hidden", "true");
                                  }}
                                  className="max-h-full max-w-full object-contain mix-blend-darken"
                                />
                              </div>
                              <span className="text-center text-xs leading-5 text-paper-foreground/75">{item.name}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              );
            })}
          </motion.div>
        )}

        <div className="mt-12">
          <a
            href="https://www.behance.net/ahmad00haddad"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm bg-cinema px-6 py-3 text-sm font-semibold text-cream transition-colors duration-200 hover:bg-cinema-deep"
          >
            {isAr ? "عرض المزيد على Behance" : "View more on Behance"}
            <ExternalLink className="size-4" />
          </a>
        </div>

        <section className="mt-16 grid gap-4 border-t border-border pt-8 md:grid-cols-2">
          <a
            href="https://www.youtube.com/@ahmad00haddad"
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-border bg-surface p-6 transition-colors duration-200 hover:border-cinema/60 md:p-8"
          >
            <Youtube className="size-6 text-cinema" />
            <h3 className="mt-4 text-2xl text-cream">{t("work.youtube_title")}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{t("work.youtube_sub")}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cinema">@ahmad00haddad <ExternalLink className="size-4" /></span>
          </a>
          <a
            href="https://www.instagram.com/ahmad00haddad/"
            target="_blank"
            rel="noreferrer"
            className="rounded-sm border border-border bg-surface p-6 transition-colors duration-200 hover:border-cinema/60 md:p-8"
          >
            <Instagram className="size-6 text-cinema" />
            <h3 className="mt-4 text-2xl text-cream">{t("work.instagram_title")}</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">{t("work.instagram_sub")}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cinema">{t("work.instagram_cta")} <ExternalLink className="size-4" /></span>
          </a>
        </section>
      </div>

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
              className="relative z-[2] max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-sm bg-paper text-paper-foreground shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setOpenWork(null)}
                aria-label={isAr ? "إغلاق" : "Close"}
                className={`sticky top-4 z-[5] mt-4 grid size-9 place-items-center rounded-sm bg-paper-foreground/10 hover:bg-paper-foreground/20 ${isAr ? "float-left ml-4" : "float-right mr-4"}`}
              >
                <X className="size-4" />
              </button>
              <div className="relative px-8 py-12 sm:px-12 sm:py-16">
                <div className="grain-layer-soft" style={{ opacity: 0.2 }} />
                <div className="relative z-[2]">
                  <h3 className="text-2xl sm:text-3xl">{isAr ? openWork.title : openWork.title_en || openWork.title}</h3>
                  <div className="my-6 h-px w-16 bg-paper-foreground/30" />
                  <article className="whitespace-pre-line font-arabic-body text-base leading-8">
                    {isAr ? openWork.description || "" : openWork.description_en || openWork.description || ""}
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
