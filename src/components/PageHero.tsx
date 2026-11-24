import { type ReactNode } from "react";
import { useTranslation } from "react-i18next";

/** A direct editorial page header with the same cinematic grain as the homepage. */
export function PageHero({
  title,
  subtitle,
  children,
}: {
  kicker?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <section dir={isAr ? "rtl" : "ltr"} className="bg-ink p-4 md:p-8">
      <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-sm bg-cinema">
        <div className="grain-layer-soft" style={{ opacity: 0.24 }} />
        <div className="relative z-[2] px-6 py-16 text-cream md:px-12 md:py-20">
          <h1 className="max-w-5xl text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.98] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-base leading-8 text-cream/90 md:text-lg">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
