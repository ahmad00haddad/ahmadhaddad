import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Cinematic "film cut" page transition.
 * On every pathname change: a quick white flash (~90ms) + a cream sprocket
 * strip sweeping across the screen, like a frame change in a projector.
 */
export function PageTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [playKey, setPlayKey] = useState(0);
  const [firstMount, setFirstMount] = useState(true);

  useEffect(() => {
    if (firstMount) {
      setFirstMount(false);
      return;
    }
    setPlayKey((k) => k + 1);
    // jump scroll to top instantly so the cut feels clean
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  if (firstMount) return null;

  return (
    <div
      key={playKey}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
    >
      {/* white flash */}
      <div className="absolute inset-0 bg-[var(--cream)] animate-film-flash" />
      {/* sprocket sweep */}
      <div className="absolute inset-y-0 -left-1/3 w-1/3 filmstrip-vertical animate-film-sweep" />
    </div>
  );
}
