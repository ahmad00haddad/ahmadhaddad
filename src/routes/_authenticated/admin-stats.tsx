import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Loader2, BarChart3, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin-stats")({
  head: () => ({ meta: [{ title: "إحصائيات الزوار — أحمد حدّاد" }] }),
  component: StatsPage,
});

type Ev = {
  created_at: string;
  event: string;
  path: string | null;
  work_id: string | null;
  title: string | null;
  visitor_id: string | null;
  referrer: string | null;
  device: string | null;
};

const PAGE_NAMES: Record<string, string> = {
  "/": "الرئيسية",
  "/work": "الأعمال",
  "/about": "نبذة عني",
  "/services": "الخدمات والأسعار",
  "/contact": "تواصل",
};

function tally<T>(rows: T[], key: (row: T) => string | null | undefined) {
  const map = new Map<string, number>();
  rows.forEach((row) => {
    const k = key(row);
    if (k) map.set(k, (map.get(k) ?? 0) + 1);
  });
  return [...map.entries()].sort((a, b) => b[1] - a[1]);
}

function Card({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-sm border border-[var(--cream)]/15 bg-[var(--cream)]/5 p-5">
      <div className="text-xs text-[var(--cream)]/60">{label}</div>
      <div className="mt-2 font-display text-4xl font-bold text-[var(--cream)]">{value}</div>
    </div>
  );
}

function Table({ title, rows }: { title: string; rows: [string, number][] }) {
  const max = rows[0]?.[1] ?? 1;
  return (
    <section className="rounded-sm border border-[var(--cream)]/15 bg-[var(--cream)]/5 p-5">
      <h2 className="mb-4 text-sm font-bold text-[var(--cream)]">{title}</h2>
      {rows.length === 0 ? (
        <p className="text-xs text-[var(--cream)]/50">لا توجد بيانات بعد.</p>
      ) : (
        <ul className="space-y-2">
          {rows.slice(0, 10).map(([name, count]) => (
            <li key={name} className="relative overflow-hidden rounded-sm bg-[var(--cream)]/5 px-3 py-2 text-xs text-[var(--cream)]">
              <span
                className="absolute inset-y-0 start-0 bg-[var(--cinema)]/40"
                style={{ width: `${(count / max) * 100}%` }}
              />
              <span className="relative flex justify-between gap-4">
                <span className="truncate">{name}</span>
                <span className="font-bold">{count}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

const EVENT_LABEL: Record<string, string> = {
  letter_open: "قرأ رسالة",
  share: "شارك",
  shared_link_visit: "دخل من رابط مشارك إلى",
};

function Contacts({ rows }: { rows: Ev[] }) {
  const submits = rows.filter((e) => e.event === "contact_submit" && e.visitor_id);
  if (submits.length === 0) {
    return (
      <section className="rounded-sm border border-[var(--cream)]/15 bg-[var(--cream)]/5 p-5">
        <h2 className="mb-4 text-sm font-bold text-[var(--cream)]">من تواصل معك وماذا شاهد قبل ذلك</h2>
        <p className="text-xs text-[var(--cream)]/50">لا توجد رسائل تواصل بعد.</p>
      </section>
    );
  }
  return (
    <section className="rounded-sm border border-[var(--cream)]/15 bg-[var(--cream)]/5 p-5">
      <h2 className="mb-4 text-sm font-bold text-[var(--cream)]">من تواصل معك وماذا شاهد قبل ذلك</h2>
      <ul className="space-y-4">
        {submits.map((sub) => {
          const journey = rows
            .filter((e) => e.visitor_id === sub.visitor_id && e.created_at <= sub.created_at)
            .sort((a, b) => a.created_at.localeCompare(b.created_at));
          const source = journey.find((e) => e.referrer)?.referrer;
          const pages = [...new Set(journey.filter((e) => e.event === "page_view").map((e) => (e.path ? PAGE_NAMES[e.path] ?? e.path : "")))].filter(Boolean);
          const actions = journey.filter((e) => EVENT_LABEL[e.event] && e.title);
          return (
            <li key={sub.created_at + sub.visitor_id} className="rounded-sm bg-[var(--cream)]/5 p-4 text-xs text-[var(--cream)]">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-base font-bold">{sub.title || "بدون اسم"}</span>
                <span className="text-[var(--cream)]/50">{new Date(sub.created_at).toLocaleString("ar")}</span>
              </div>
              <div className="mt-2 space-y-1 text-[var(--cream)]/80">
                <div>دخل من: {source === "direct" ? "رابط مباشر" : source || "غير معروف"} · {sub.device === "mobile" ? "موبايل" : "كمبيوتر"}</div>
                <div>الصفحات: {pages.join(" ← ") || "—"}</div>
                {actions.length > 0 && (
                  <div>
                    {actions.map((a, i) => (
                      <div key={i}>• {EVENT_LABEL[a.event]}: {a.title}</div>
                    ))}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function StatsPage() {
  const [days, setDays] = useState(30);
  const [rows, setRows] = useState<Ev[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // The owner's own visits should not be counted.
    localStorage.setItem("no_track", "1");
  }, []);

  useEffect(() => {
    setRows(null);
    setError(null);
    const since = new Date(Date.now() - days * 86400000).toISOString();
    (supabase as any)
      .from("site_events")
      .select("created_at,event,path,work_id,title,visitor_id,referrer,device")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(20000)
      .then(({ data, error: err }: { data: Ev[] | null; error: { message: string } | null }) => {
        if (err) setError(err.message);
        else setRows(data ?? []);
      });
  }, [days]);

  const stats = useMemo(() => {
    const r = rows ?? [];
    const views = r.filter((e) => e.event === "page_view");
    const opens = r.filter((e) => e.event === "letter_open");
    const shares = r.filter((e) => e.event === "share");
    const arrivals = r.filter((e) => e.event === "shared_link_visit");
    return {
      views: views.length,
      visitors: new Set(r.map((e) => e.visitor_id).filter(Boolean)).size,
      opens: opens.length,
      shares: shares.length,
      arrivals: arrivals.length,
      pages: tally(views, (e) => (e.path ? PAGE_NAMES[e.path] ?? e.path : null)),
      letters: tally(opens, (e) => e.title),
      shared: tally(shares, (e) => e.title),
      sharedVisits: tally(arrivals, (e) => e.title),
      referrers: tally(r, (e) => e.referrer),
      devices: tally(views, (e) => (e.device === "mobile" ? "موبايل" : e.device === "desktop" ? "كمبيوتر" : null)),
      daily: tally(views, (e) => e.created_at.slice(0, 10)).sort((a, b) => b[0].localeCompare(a[0])),
    };
  }, [rows]);

  return (
    <div dir="rtl" className="min-h-[calc(100svh-65px)] bg-[var(--ink)]">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-[var(--cream)]">
            <BarChart3 className="size-7 text-[var(--cinema)]" />
            <h1 className="font-display text-2xl font-bold">إحصائيات الزوار</h1>
          </div>
          <div className="flex items-center gap-2">
            {[7, 30, 90].map((d) => (
              <button
                key={d}
                onClick={() => setDays(d)}
                className={`rounded-sm px-4 py-2 text-xs font-bold ${
                  days === d
                    ? "bg-[var(--cinema)] text-[var(--cream)]"
                    : "border border-[var(--cream)]/15 text-[var(--cream)]/70 hover:border-[var(--cinema)]"
                }`}
              >
                آخر {d} يوم
              </button>
            ))}
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 rounded-sm border border-[var(--cream)]/15 px-4 py-2 text-xs font-bold text-[var(--cream)]/70 hover:border-[var(--cinema)]"
            >
              لوحة التحكم <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>

        {error ? (
          <p className="rounded-sm border border-[var(--cinema)]/50 p-4 text-sm text-[var(--cream)]">
            تعذّر تحميل البيانات: {error}
          </p>
        ) : rows === null ? (
          <div className="grid h-60 place-items-center">
            <Loader2 className="size-6 animate-spin text-[var(--cream)]/60" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              <Card label="زوار (أجهزة مختلفة)" value={stats.visitors} />
              <Card label="مشاهدات الصفحات" value={stats.views} />
              <Card label="رسائل فُتحت" value={stats.opens} />
              <Card label="مرات المشاركة" value={stats.shares} />
              <Card label="دخول من رابط مشارك" value={stats.arrivals} />
            </div>
            <Contacts rows={rows} />
            <div className="grid gap-4 md:grid-cols-2">
              <Table title="الرسائل الأكثر قراءة" rows={stats.letters} />
              <Table title="الأعمال الأكثر مشاركة" rows={stats.shared} />
              <Table title="دخلوا من رابط مشارك إلى" rows={stats.sharedVisits} />
              <Table title="الصفحات الأكثر زيارة" rows={stats.pages} />
              <Table title="من أين جاؤوا" rows={stats.referrers} />
              <Table title="الجهاز" rows={stats.devices} />
              <Table title="المشاهدات يوميًا" rows={stats.daily} />
            </div>
            <p className="text-xs text-[var(--cream)]/40">
              زياراتك أنت لا تُحتسب بعد فتح هذه الصفحة من هذا المتصفح.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
