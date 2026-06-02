import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowRight, Film, Camera, Palette, Video, Sparkles } from "lucide-react";
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

function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 md:order-1"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brass">
              {t("home.kicker")}
            </p>
            <h1 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              {t("home.title")}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("home.subtitle")}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">{t("brand.tagline")}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/work"
                className="group inline-flex items-center gap-2 rounded-full bg-brass px-6 py-3 text-sm font-semibold text-[var(--surface-deep)] shadow-[var(--shadow-brass)] transition-transform hover:scale-[1.02]"
              >
                {t("home.cta_work")}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/30 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brass hover:text-brass"
              >
                {t("home.cta_contact")}
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
              <Stat number="10+" label={t("home.stats.years")} />
              <Stat number="120+" label={t("home.stats.projects")} />
              <Stat number="40+" label={t("home.stats.clients")} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="order-1 md:order-2"
          >
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] shadow-2xl shadow-black/50 ring-1 ring-brass/20">
              <img
                src={heroImg}
                alt="Ahmad Haddad portrait"
                className="size-full object-cover"
                width={1024}
                height={1280}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="bg-[var(--surface)] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">{t("home.services_title")}</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t("home.services_sub")}</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map(({ key, Icon }) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="group rounded-2xl border border-border bg-[var(--surface-deep)] p-7 transition-all hover:border-brass/50 hover:shadow-[var(--shadow-brass)]"
              >
                <div className="grid size-12 place-items-center rounded-xl bg-brass-soft text-brass transition-colors group-hover:bg-brass group-hover:text-[var(--surface-deep)]">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{t(`services.items.${key}.title`)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`services.items.${key}.desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK PREVIEW */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="text-3xl font-bold md:text-4xl">{t("home.preview_title")}</h2>
            <Link to="/work" className="text-sm font-semibold text-brass hover:underline">
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
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
              >
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
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
    <div>
      <div className="font-display text-3xl font-bold text-brass">{number}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
