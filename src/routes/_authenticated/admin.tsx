import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, LogOut, Save, Pencil, X, Aperture } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "لوحة التحكم — أحمد حدّاد" }] }),
  component: AdminPage,
});

type Work = {
  id: string;
  title: string;
  title_en: string | null;
  category: string;
  description: string | null;
  image_url: string;
  video_url: string | null;
  external_url: string | null;
  sort_order: number;
  published: boolean;
};

const EMPTY: Omit<Work, "id"> = {
  title: "",
  title_en: "",
  category: "films",
  description: "",
  image_url: "",
  video_url: "",
  external_url: "",
  sort_order: 0,
  published: true,
};

function AdminPage() {
  const navigate = useNavigate();
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Work> | null>(null);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("works")
      .select("*")
      .order("sort_order")
      .order("created_at", { ascending: false });
    if (!error) setWorks((data ?? []) as Work[]);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  const save = async () => {
    if (!editing) return;
    const payload = {
      title: editing.title ?? "",
      title_en: editing.title_en || null,
      category: editing.category ?? "films",
      description: editing.description || null,
      image_url: editing.image_url ?? "",
      video_url: editing.video_url || null,
      external_url: editing.external_url || null,
      sort_order: Number(editing.sort_order ?? 0),
      published: !!editing.published,
    };
    if (editing.id) {
      await supabase.from("works").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("works").insert(payload);
    }
    setEditing(null);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("حذف هذا العمل؟")) return;
    await supabase.from("works").delete().eq("id", id);
    load();
  };

  return (
    <div dir="rtl" className="min-h-[calc(100svh-65px)] bg-[var(--ink)]">
      {/* header bar */}
      <header
        className="relative overflow-hidden border-b border-[var(--ink)]/20"
        style={{ backgroundColor: "var(--cinema)" }}
      >
        <div className="grain-layer" />
        <div className="relative z-[2] mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-[var(--cream)]">
          <div className="flex items-center gap-3">
            <Aperture className="size-7" strokeWidth={1.3} />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-90">
                Haddad · Studio
              </div>
              <h1 className="font-display text-2xl font-bold">لوحة التحكم</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="rounded-full border border-[var(--cream)]/40 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-[var(--cream)]/10"
            >
              الموقع
            </Link>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em]"
            >
              <LogOut className="size-3.5" /> خروج
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-3xl font-bold text-[var(--cream)]">
            الأعمال ({works.length})
          </h2>
          <button
            onClick={() => setEditing({ ...EMPTY })}
            className="inline-flex items-center gap-2 rounded-full bg-[var(--cinema)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--cream)] hover:scale-[1.02]"
          >
            <Plus className="size-4" /> عمل جديد
          </button>
        </div>

        {loading ? (
          <div className="text-center text-sm text-muted-foreground">...جاري التحميل</div>
        ) : works.length === 0 ? (
          <div className="rounded-sm border border-dashed border-[var(--cream)]/20 p-12 text-center text-sm text-muted-foreground">
            لا توجد أعمال بعد. اضغط "عمل جديد" لإضافة أول عمل.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {works.map((w) => (
              <article
                key={w.id}
                className="group relative overflow-hidden rounded-sm border border-[var(--cream)]/10 bg-[var(--surface)]"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[var(--ink)]">
                  {w.image_url && (
                    <img
                      src={w.image_url}
                      alt=""
                      className="size-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--cinema)]">
                      {w.category}
                    </span>
                    {!w.published && (
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        مسودة
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-[var(--cream)]">
                    {w.title}
                  </h3>
                  {w.description && (
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {w.description}
                    </p>
                  )}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setEditing(w)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-[var(--ink)] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[var(--cream)] hover:bg-[var(--cinema)]"
                    >
                      <Pencil className="size-3" /> تعديل
                    </button>
                    <button
                      onClick={() => remove(w.id)}
                      className="grid size-9 place-items-center rounded-sm border border-[var(--cream)]/20 text-[var(--cream)] hover:bg-destructive hover:text-destructive-foreground"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Edit modal */}
      {editing && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-6"
          onClick={() => setEditing(null)}
        >
          <div
            dir="rtl"
            className="relative w-full max-w-2xl overflow-hidden rounded-sm border border-[var(--cream)]/10 bg-[var(--surface)]"
            onClick={(e) => e.stopPropagation()}
          >
            <header
              className="flex items-center justify-between px-6 py-4"
              style={{ backgroundColor: "var(--cinema)" }}
            >
              <h3 className="font-display text-xl font-bold text-[var(--cream)]">
                {editing.id ? "تعديل عمل" : "عمل جديد"}
              </h3>
              <button onClick={() => setEditing(null)} className="text-[var(--cream)]">
                <X className="size-5" />
              </button>
            </header>
            <div className="grid gap-4 p-6 md:grid-cols-2">
              <Field label="العنوان (عربي)">
                <input
                  value={editing.title ?? ""}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Title (EN)">
                <input
                  value={editing.title_en ?? ""}
                  onChange={(e) => setEditing({ ...editing, title_en: e.target.value })}
                  className={inputCls}
                  dir="ltr"
                />
              </Field>
              <Field label="الفئة">
                <select
                  value={editing.category ?? "films"}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className={inputCls}
                >
                  <option value="films">أفلام</option>
                  <option value="ads">إعلانات</option>
                  <option value="photo">فوتوغراف</option>
                </select>
              </Field>
              <Field label="الترتيب">
                <input
                  type="number"
                  value={editing.sort_order ?? 0}
                  onChange={(e) =>
                    setEditing({ ...editing, sort_order: Number(e.target.value) })
                  }
                  className={inputCls}
                />
              </Field>
              <Field label="رابط الصورة" full>
                <input
                  value={editing.image_url ?? ""}
                  onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                  className={inputCls}
                  dir="ltr"
                  placeholder="https://..."
                />
              </Field>
              <Field label="رابط الفيديو (YouTube/Vimeo)" full>
                <input
                  value={editing.video_url ?? ""}
                  onChange={(e) => setEditing({ ...editing, video_url: e.target.value })}
                  className={inputCls}
                  dir="ltr"
                  placeholder="https://youtube.com/..."
                />
              </Field>
              <Field label="رابط خارجي (Instagram/إلخ)" full>
                <input
                  value={editing.external_url ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, external_url: e.target.value })
                  }
                  className={inputCls}
                  dir="ltr"
                />
              </Field>
              <Field label="وصف مختصر" full>
                <textarea
                  rows={3}
                  value={editing.description ?? ""}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                  className={inputCls}
                />
              </Field>
              <label className="flex items-center gap-2 text-sm text-[var(--cream)] md:col-span-2">
                <input
                  type="checkbox"
                  checked={!!editing.published}
                  onChange={(e) =>
                    setEditing({ ...editing, published: e.target.checked })
                  }
                />
                منشور (يظهر في الموقع)
              </label>
            </div>
            <footer className="flex items-center justify-end gap-2 border-t border-[var(--cream)]/10 px-6 py-4">
              <button
                onClick={() => setEditing(null)}
                className="rounded-full border border-[var(--cream)]/30 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--cream)]"
              >
                إلغاء
              </button>
              <button
                onClick={save}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--cinema)] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--cream)]"
              >
                <Save className="size-3.5" /> حفظ
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-sm border border-[var(--cream)]/20 bg-[var(--ink)] px-3 py-2 text-sm text-[var(--cream)] outline-none focus:border-[var(--cinema)]";

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
