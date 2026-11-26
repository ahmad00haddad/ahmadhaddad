import { supabase } from "@/integrations/supabase/client";

// Visitor analytics: logs to Supabase (site_events) and Microsoft Clarity.
// Safe no-op on the server, for the owner (localStorage no_track), and on admin pages.
type ClarityFn = (...args: unknown[]) => void;
type Meta = { title?: string; workId?: string };

function visitorId(): string {
  let id = localStorage.getItem("visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("visitor_id", id);
  }
  return id;
}

export function track(event: string, meta: Meta = {}) {
  if (typeof window === "undefined") return;
  const path = window.location.pathname;
  if (/^\/(admin|auth)/.test(path) || localStorage.getItem("no_track")) return;

  const clarity = (window as unknown as { clarity?: ClarityFn }).clarity;
  if (clarity) {
    if (meta.title) clarity("set", event, meta.title);
    clarity("event", meta.title ? `${event}: ${meta.title}` : event);
  }

  let referrer: string | null = null;
  if (event === "page_view" && !sessionStorage.getItem("seen_ref")) {
    sessionStorage.setItem("seen_ref", "1");
    try {
      referrer = document.referrer ? new URL(document.referrer).hostname : "direct";
    } catch {
      referrer = "direct";
    }
  }

  // The query builder is lazy: it only sends when .then() is called.
  (supabase as any).from("site_events").insert({
    event,
    path,
    work_id: meta.workId ?? null,
    title: meta.title ?? null,
    visitor_id: visitorId(),
    referrer,
    device: window.innerWidth < 768 ? "mobile" : "desktop",
  }).then(
    () => undefined,
    () => undefined,
  );
}
