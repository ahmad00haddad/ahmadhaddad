import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Check, ExternalLink, Play } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Magnetic } from "@/components/MagneticButton";
import { getWorkById } from "@/lib/works.functions";

export const Route = createFileRoute("/work/$id")({
  head: ({ params }) => ({
    meta: [
      { title: "عمل — أحمد حدّاد" },
      {
        name: "description",
        content: "عمل من أعمال أحمد حدّاد السينمائية.",
      },
      { property: "og:title", content: "عمل — أحمد حدّاد" },
      { property: "og:description", content: "اطّلع على هذا العمل والاقتباس المرافق له." },
      { property: "og:url", content: `https://ahmadhaddad.lovable.app/work/${params.id}` },
    ],
    links: [{ rel: "canonical", href: `https://ahmadhaddad.lovable.app/work/${params.id}` }],
  }),
  loader: async ({ params }) => {
    const work = await getWorkById({ data: { id: params.id } });
    if (!work) throw notFound();
    return { work };
  },
  component: WorkDetailPage,
});

function WorkDetailPage() {
  const { work } = Route.useLoaderData();
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const [copied, setCopied] = useState(false);

  const title = isAr ? work.title : (work.title_en || work.title);
  const desc = isAr ? (work.description || "") : (work.description_en || work.description || "");
  const hasLetter = desc.trim().length > 80;
  const shareUrl = `https://ahmadhaddad.lovable.app/work/${work.id}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <>
      <PageHero title={title} subtitle={work.category} />

      <div dir={isAr ? "rtl" : "ltr"} className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-6">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-cream"
          >
            <ArrowLeft className="size-4" />
            {t("work.back_to_work")}
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/5] overflow-hidden rounded-sm"
          >
            {work.video_url ? (
              <a
                href={work.video_url}
                target="_blank"
                rel="noreferrer"
                className="group relative block size-full"
              >
                <img
                  src={work.image_url}
                  alt={title}
                  loading="eager"
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 grid place-items-center bg-ink/30">
                  <span className="grid size-16 place-items-center rounded-full bg-cinema text-cream shadow-lg transition-transform group-hover:scale-110">
                    <Play className="size-6" />
                  </span>
                </div>
              </a>
            ) : work.external_url ? (
              <a
                href={work.external_url}
                target="_blank"
                rel="noreferrer"
                className="group relative block size-full"
              >
                <img
                  src={work.image_url}
                  alt={title}
                  loading="eager"
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 grid place-items-center bg-ink/30 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="grid size-14 place-items-center rounded-full bg-cinema text-cream">
                    <ExternalLink className="size-5" />
                  </span>
                </div>
              </a>
            ) : (
              <img
                src={work.image_url}
                alt={title}
                loading="eager"
                className="size-full object-cover"
              />
            )}
            <div className="grain-layer" style={{ opacity: 0.25 }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cinema">
                {work.category}
              </span>
              <h1 className="mt-2 font-arabic text-3xl text-cream sm:text-4xl">
                {title}
              </h1>

              {hasLetter ? (
                <div
                  className={`mt-8 rounded-sm border border-cream/10 bg-[#f3ecdc] p-6 text-[#2a1f12] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)] sm:p-8 ${
                    isAr ? "text-right" : "text-left"
                  }`}
                >
                  <div className="grain-layer pointer-events-none absolute inset-0" style={{ opacity: 0.35, mixBlendMode: "multiply" }} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#7a5a30]">
                    {t("work.letter")}
                  </span>
                  <article
                    className={`relative z-[2] mt-4 whitespace-pre-line text-[15px] leading-[2] sm:text-[16px] sm:leading-[2.05] ${
                      isAr ? "font-arabic-body" : "font-serif"
                    }`}
                    style={{ textWrap: "pretty" as any }}
                  >
                    {desc}
                  </article>
                </div>
              ) : desc.trim() ? (
                <p className={`mt-6 text-sm leading-relaxed text-muted-foreground ${isAr ? "font-arabic-body text-right" : "font-serif text-left"}`}>
                  {desc}
                </p>
              ) : null}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic strength={0.1} radius={70}>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-cream/5"
                >
                  {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  {copied ? t("work.copied") : t("work.copy_link")}
                </button>
              </Magnetic>
              {work.external_url && (
                <Magnetic strength={0.1} radius={70}>
                  <a
                    href={work.external_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-cinema px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-cream transition-transform hover:scale-[1.03]"
                  >
                    {t("work.view_project")}
                    <ExternalLink className="size-3.5" />
                  </a>
                </Magnetic>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
