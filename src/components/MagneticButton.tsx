import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  strength?: number;
  as?: "button";
};

/**
 * MagneticButton — follows cursor on hover with smooth spring-back.
 * Disabled on touch / reduced-motion devices.
 */
export const MagneticButton = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, strength = 0.35, children, ...rest }, ref) => {
    const innerRef = React.useRef<HTMLButtonElement | null>(null);
    const contentRef = React.useRef<HTMLSpanElement | null>(null);

    React.useImperativeHandle(ref, () => innerRef.current as HTMLButtonElement);

    React.useEffect(() => {
      const el = innerRef.current;
      const content = contentRef.current;
      if (!el || !content) return;
      if (typeof window === "undefined") return;
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      const isTouch = window.matchMedia("(hover: none)").matches;
      if (mql.matches || isTouch) return;

      let raf = 0;
      let tx = 0, ty = 0, cx = 0, cy = 0;

      const tick = () => {
        cx += (tx - cx) * 0.18;
        cy += (ty - cy) * 0.18;
        el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
        content.style.transform = `translate3d(${cx * 0.5}px, ${cy * 0.5}px, 0)`;
        if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
          raf = requestAnimationFrame(tick);
        } else {
          raf = 0;
        }
      };

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        tx = mx * strength;
        ty = my * strength;
        if (!raf) raf = requestAnimationFrame(tick);
      };
      const onLeave = () => {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(tick);
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);
      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
        if (raf) cancelAnimationFrame(raf);
        el.style.transform = "";
        content.style.transform = "";
      };
    }, [strength]);

    return (
      <button
        ref={innerRef}
        className={cn("magnetic-btn", className)}
        {...rest}
      >
        <span ref={contentRef} className="magnetic-btn__inner inline-flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    );
  },
);
MagneticButton.displayName = "MagneticButton";
