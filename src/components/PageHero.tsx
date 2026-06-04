import { type ReactNode } from "react";
import { Aperture } from "lucide-react";

/**
 * Cinematic page header — red canvas with grain, matching the hero on /.
 */
export function PageHero({
  kicker,
  title,
  subtitle,
  children,
}: {
  kicker?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section dir="rtl" className="bg-[var(--ink)] p-3 md:p-4">
      <div
        className="relative overflow-hidden rounded-sm"
        style={{ backgroundColor: "var(--cinema)" }}
      >
        <div className="grain-layer" />
        <div className="relative z-[2] px-6 py-16 md:px-12 md:py-24 text-[var(--cream)]">
          <div className="mb-6 flex items-center gap-3">
            <Aperture className="size-8" strokeWidth={1.3} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">
              {kicker ?? "Haddad · Studio"}
            </span>
          </div>
          <h1 className="font-arabic text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-sm leading-relaxed opacity-90 md:text-base">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
