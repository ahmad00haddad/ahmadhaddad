import { useEffect, useRef, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Cinematic "film cut" page transition.
 * Plays exactly once per real pathname change (guards against StrictMode
 * double-invocation of effects in development).
 */
export function PageTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [playKey, setPlayKey] = useState(0);
  const lastPathRef = useRef<string | null>(null);

  useEffect(() => {
    // First commit: record path, don't animate.
    if (lastPathRef.current === null) {
      lastPathRef.current = pathname;
      return;
    }
    // Same path (StrictMode re-run or no real navigation): skip.
    if (lastPathRef.current === pathname) return;

    lastPathRef.current = pathname;
    setPlayKey((k) => k + 1);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  if (playKey === 0) return null;

  return (
    <div
      key={playKey}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      <div className="absolute inset-0 bg-[var(--cream)] animate-film-flash" />
      <div className="absolute inset-y-0 -left-1/3 w-1/3 filmstrip-vertical animate-film-sweep" />
    </div>
  );
}
