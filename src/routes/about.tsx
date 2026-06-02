import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import heroImg from "@/assets/ahmad-hero.jpg";
import journey from "@/assets/journey.jpg";
import filmSet from "@/assets/film-set.jpg";
import cvAsset from "@/assets/Ahmad_Haddad_CV.pdf.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "نبذة عني — أحمد حدّاد" },
      { name: "description", content: "رحلة أحمد حدّاد في عالم التصوير والسينما — من 2014 إلى اليوم." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      {/* Journey */}
      <section className="grid items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-black md:text-5xl">{t("about.title")}</h1>
          <p className="mt-6 leading-loose text-muted-foreground">{t("about.p1")}</p>
          <p className="mt-4 leading-loose text-muted-foreground">{t("about.p2")}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="aspect-square overflow-hidden rounded-[2rem] ring-1 ring-brass/20"
        >
          <img src={heroImg} alt="" className="size-full object-cover" loading="lazy" width={1024} height={1024} />
        </motion.div>
      </section>

      {/* Cinema discovery */}
      <section className="mt-24 grid items-center gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/5] overflow-hidden rounded-[2rem]"
        >
          <img src={journey} alt="" className="size-full object-cover" loading="lazy" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold md:text-4xl">{t("about.title2")}</h2>
          <p className="mt-6 leading-loose text-muted-foreground">{t("about.p3")}</p>
          <p className="mt-4 leading-loose text-muted-foreground">{t("about.p4")}</p>
          <p className="mt-4 leading-loose text-muted-foreground">{t("about.p5")}</p>
        </motion.div>
      </section>

      {/* CV */}
      <section className="mt-24 rounded-[2rem] border border-border bg-[var(--surface-deep)] p-10 md:p-14">
        <div className="grid items-center gap-10 md:grid-cols-5">
          <div className="md:col-span-3">
            <h2 className="text-3xl font-bold md:text-4xl">{t("about.cv_title")}</h2>
            <p className="mt-4 max-w-xl text-muted-foreground">{t("about.cv_sub")}</p>
            <a
              href={cvAsset.url}
              download="Ahmad_Haddad_CV.pdf"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-semibold text-[var(--surface-deep)] shadow-[var(--shadow-brass)] transition-transform hover:scale-[1.02]"
            >
              <Download className="size-4" />
              {t("about.cv_download")}
            </a>
          </div>
          <div className="md:col-span-2">
            <div className="aspect-[3/4] overflow-hidden rounded-xl border border-border bg-white">
              <iframe
                src={`${cvAsset.url}#toolbar=0&view=FitH`}
                title="CV preview"
                className="size-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24 grid gap-4 md:grid-cols-2">
        <img src={filmSet} alt="" className="aspect-[4/3] w-full rounded-2xl object-cover" loading="lazy" />
        <div className="flex flex-col justify-center rounded-2xl border border-border bg-[var(--surface)] p-8">
          <h3 className="text-2xl font-bold">Faii House</h3>
          <p className="mt-3 text-muted-foreground">
            الفريق الإبداعي الذي أقوده للمشاريع الإنتاجية الأكبر — Cinematography by intention.
          </p>
          <a
            href="https://faiihouse.lovable.app/"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-brass/40 px-5 py-2.5 text-sm font-semibold text-brass hover:bg-brass hover:text-[var(--surface-deep)]"
          >
            faiihouse.lovable.app →
          </a>
        </div>
      </section>
    </div>
  );
}
