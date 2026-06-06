import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSettings, type AllSettings } from "@/lib/use-settings";
import { MediaUploader } from "@/components/MediaUploader";
import { toast } from "sonner";
import {
  Plus, Trash2, LogOut, Save, Pencil, X, Aperture,
  Settings, Image as ImageIcon, FileText, Briefcase,
  MessageSquare, Building2, Phone, Film, Loader2,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "لوحة التحكم — أحمد حدّاد" }] }),
  component: AdminPage,
});

type TabKey =
  | "general" | "hero" | "about" | "stats" | "services"
  | "works" | "testimonials" | "clients" | "contact";

const TABS: { key: TabKey; label: string; Icon: any }[] = [
  { key: "general", label: "العام", Icon: Settings },
  { key: "hero", label: "الهيرو", Icon: ImageIcon },
  { key: "about", label: "حول", Icon: FileText },
  { key: "stats", label: "الأرقام", Icon: Briefcase },
  { key: "services", label: "الخدمات", Icon: Film },
  { key: "works", label: "الأعمال", Icon: Briefcase },
  { key: "testimonials", label: "الآراء", Icon: MessageSquare },
  { key: "clients", label: "العملاء", Icon: Building2 },
  { key: "contact", label: "التواصل", Icon: Phone },
];

function AdminPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>("general");

  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  return (
    <div dir="rtl" className="min-h-[calc(100svh-65px)] bg-[var(--ink)]">
      <header className="relative overflow-hidden border-b border-[var(--ink)]/20" style={{ backgroundColor: "var(--cinema)" }}>
        <div className="grain-layer" />
        <div className="relative z-[2] mx-auto flex max-w-7xl items-center justify-between px-6 py-5 text-[var(--cream)]">
          <div className="flex items-center gap-3">
            <Aperture className="size-7" strokeWidth={1.3} />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-90">Haddad · CMS</div>
              <h1 className="font-display text-2xl font-bold">لوحة التحكم الشاملة</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/" className="rounded-full border border-[var(--cream)]/40 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-[var(--cream)]/10">الموقع</Link>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.25em]">
              <LogOut className="size-3.5" /> خروج
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Tabs */}
        <nav className="mb-8 flex flex-wrap gap-2 border-b border-[var(--cream)]/10 pb-3">
          {TABS.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`inline-flex items-center gap-2 rounded-sm px-4 py-2 text-xs font-bold transition-all ${
                tab === key
                  ? "bg-[var(--cinema)] text-[var(--cream)]"
                  : "border border-[var(--cream)]/15 text-[var(--cream)]/70 hover:border-[var(--cinema)] hover:text-[var(--cream)]"
              }`}
            >
              <Icon className="size-3.5" /> {label}
            </button>
          ))}
        </nav>

        {tab === "general" && <SettingsForm sectionKey="brand" title="الهوية والعلامة" />}
        {tab === "hero" && <SettingsForm sectionKey="hero" title="قسم الهيرو الرئيسي" />}
        {tab === "about" && <SettingsForm sectionKey="about" title="صفحة حول" />}
        {tab === "stats" && <SettingsForm sectionKey="stats" title="أرقام الإنجازات (الصفحة الرئيسية)" />}
        {tab === "contact" && <ContactTab />}
        {tab === "services" && <ServicesTab />}
        {tab === "works" && <WorksTab />}
        {tab === "testimonials" && <TestimonialsTab />}
        {tab === "clients" && <ClientsTab />}
      </div>
    </div>
  );
}

/* ============================================================
   Generic settings form (brand, hero, about)
   ============================================================ */
function SettingsForm({ sectionKey, title }: { sectionKey: keyof AllSettings; title: string }) {
  const { settings, loading, save } = useSettings();
  const [draft, setDraft] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (!loading) setDraft(settings[sectionKey]);
  }, [loading, settings, sectionKey]);

  if (loading || !draft) return <Loading />;

  const update = (k: string, v: any) => setDraft({ ...draft, [k]: v });

  const handleSave = async () => {
    setSaving(true);
    try {
      await save(sectionKey, draft);
      toast.success("تم الحفظ بنجاح");
    } catch (e: any) {
      toast.error("حدث خطأ أثناء الحفظ: " + (e.message || "غير معروف"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Section title={title} onSave={handleSave} saving={saving} ok={ok}>
      <div className="grid gap-4 md:grid-cols-2">
        {Object.keys(draft).map((field) => {
          if (field === "strip_images") {
            return <StripImagesField key={field} value={draft[field] || []} onChange={(v) => update(field, v)} />;
          }
          const isUrl = field.endsWith("_url");
          const isLong = field.startsWith("body") || field.startsWith("subtitle");
          if (isUrl) {
            const isPdf = field === "cv_url" || field.endsWith("_pdf_url");
            return (
              <div key={field} className="md:col-span-2">
                <MediaUploader
                  label={labelize(field)}
                  value={draft[field] || ""}
                  onChange={(v) => update(field, v)}
                  accept={isPdf ? "application/pdf,.pdf" : "image/*"}
                />
              </div>
            );
          }
          return (
            <Field key={field} label={labelize(field)} full={isLong}>
              {isLong ? (
                <textarea rows={4} value={draft[field] || ""} onChange={(e) => update(field, e.target.value)} className={inputCls} />
              ) : (
                <input value={draft[field] || ""} onChange={(e) => update(field, e.target.value)} className={inputCls} dir={field.endsWith("_en") ? "ltr" : "rtl"} />
              )}
            </Field>
          );
        })}
      </div>
    </Section>
  );
}

function StripImagesField({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="md:col-span-2">
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        صور الشريط السينمائي (3 صور)
      </span>
      <div className="grid gap-3 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <MediaUploader
            key={i}
            label={`صورة ${i + 1}`}
            value={value[i] || ""}
            onChange={(v) => {
              const next = [...value]; next[i] = v; onChange(next);
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Contact tab (uses both contact + footer)
   ============================================================ */
function ContactTab() {
  return (
    <div className="space-y-8">
      <SettingsForm sectionKey="contact" title="معلومات التواصل والروابط الاجتماعية" />
      <SettingsForm sectionKey="footer" title="تذييل الموقع (Footer)" />
    </div>
  );
}

/* ============================================================
   CRUD tabs: services, works, testimonials, clients
   ============================================================ */
type CrudConfig = {
  table: "services" | "works" | "testimonials" | "clients";
  title: string;
  fields: { key: string; label: string; type: "text" | "textarea" | "media" | "number" | "bool" | "select"; options?: string[]; dir?: "ltr" | "rtl" }[];
  display: (r: any) => { title: string; sub?: string; image?: string; tag?: string };
};

function ServicesTab() {
  return (
    <CrudList
      cfg={{
        table: "services",
        title: "الخدمات",
        fields: [
          { key: "title", label: "العنوان (عربي)", type: "text", dir: "rtl" },
          { key: "title_en", label: "Title (EN)", type: "text", dir: "ltr" },
          { key: "icon", label: "الأيقونة (Lucide name)", type: "select", options: ["Film", "Camera", "Palette", "Video", "Sparkles", "Aperture", "Briefcase"] },
          { key: "sort_order", label: "الترتيب", type: "number" },
          { key: "description", label: "الوصف (عربي)", type: "textarea", dir: "rtl" },
          { key: "description_en", label: "Description (EN)", type: "textarea", dir: "ltr" },
          { key: "published", label: "منشور", type: "bool" },
        ],
        display: (r) => ({ title: r.title, sub: r.description, tag: r.icon }),
      }}
    />
  );
}

function WorksTab() {
  return (
    <CrudList
      cfg={{
        table: "works",
        title: "الأعمال (أفلام / إعلانات / صور)",
        fields: [
          { key: "title", label: "العنوان (عربي)", type: "text", dir: "rtl" },
          { key: "title_en", label: "Title (EN)", type: "text", dir: "ltr" },
          { key: "category", label: "الفئة", type: "select", options: ["films", "ads", "photo"] },
          { key: "image_url", label: "صورة الغلاف", type: "media" },
          { key: "video_url", label: "رابط الفيديو (YouTube/Vimeo)", type: "text", dir: "ltr" },
          { key: "external_url", label: "رابط خارجي", type: "text", dir: "ltr" },
          { key: "sort_order", label: "الترتيب", type: "number" },
          { key: "description", label: "الرسالة / النص الأدبي (عربي) — يظهر عند النقر على الصورة", type: "textarea", dir: "rtl" },
          { key: "description_en", label: "Literary text (EN) — shown on image click", type: "textarea", dir: "ltr" },
          { key: "published", label: "منشور", type: "bool" },
        ],
        display: (r) => ({ title: r.title, sub: r.description, image: r.image_url, tag: r.category }),
      }}
    />
  );
}

function TestimonialsTab() {
  return (
    <CrudList
      cfg={{
        table: "testimonials",
        title: "آراء العملاء",
        fields: [
          { key: "name", label: "الاسم", type: "text", dir: "rtl" },
          { key: "role", label: "المسمى / الشركة", type: "text", dir: "rtl" },
          { key: "avatar_url", label: "الصورة", type: "media" },
          { key: "quote", label: "الاقتباس (عربي)", type: "textarea", dir: "rtl" },
          { key: "quote_en", label: "Quote (EN)", type: "textarea", dir: "ltr" },
          { key: "sort_order", label: "الترتيب", type: "number" },
          { key: "published", label: "منشور", type: "bool" },
        ],
        display: (r) => ({ title: r.name, sub: r.quote, image: r.avatar_url, tag: r.role }),
      }}
    />
  );
}

function ClientsTab() {
  return (
    <CrudList
      cfg={{
        table: "clients",
        title: "العملاء والشركاء (شعارات)",
        fields: [
          { key: "name", label: "الاسم", type: "text", dir: "rtl" },
          { key: "logo_url", label: "الشعار", type: "media" },
          { key: "url", label: "الموقع الإلكتروني", type: "text", dir: "ltr" },
          { key: "sort_order", label: "الترتيب", type: "number" },
          { key: "published", label: "منشور", type: "bool" },
        ],
        display: (r) => ({ title: r.name, image: r.logo_url, sub: r.url }),
      }}
    />
  );
}

function CrudList({ cfg }: { cfg: CrudConfig }) {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase.from(cfg.table).select("*").order("sort_order").order("created_at", { ascending: false });
    setRows(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, [cfg.table]);

  // Required NOT NULL columns per table — must be filled before insert/update
  const REQUIRED: Record<string, { key: string; label: string }[]> = {
    works: [
      { key: "title", label: "العنوان" },
      { key: "image_url", label: "صورة الغلاف" },
      { key: "category", label: "الفئة" },
    ],
    services: [
      { key: "title", label: "العنوان" },
      { key: "icon", label: "الأيقونة" },
    ],
    testimonials: [
      { key: "name", label: "الاسم" },
      { key: "quote", label: "الاقتباس" },
    ],
    clients: [
      { key: "name", label: "الاسم" },
      { key: "logo_url", label: "الشعار" },
    ],
  };

  const empty = () => {
    const e: any = { published: true, sort_order: 0 };
    cfg.fields.forEach((f) => {
      if (f.key in e) return;
      if (f.type === "bool") e[f.key] = true;
      else if (f.type === "number") e[f.key] = 0;
      else if (f.type === "select") e[f.key] = f.options?.[0] ?? "";
      else e[f.key] = "";
    });
    return e;
  };

  const save = async () => {
    if (!editing) return;

    // Validate required fields first
    const required = REQUIRED[cfg.table] ?? [];
    for (const r of required) {
      const v = editing[r.key];
      if (v === undefined || v === null || String(v).trim() === "") {
        toast.error(`الحقل مطلوب: ${r.label}`);
        return;
      }
    }

    const payload: any = { ...editing };
    const requiredKeys = new Set(required.map((r) => r.key));
    cfg.fields.forEach((f) => {
      if (f.type === "number") {
        payload[f.key] = Number(payload[f.key] || 0);
      } else if (payload[f.key] === "" && !requiredKeys.has(f.key)) {
        payload[f.key] = null;
      }
    });

    try {
      if (editing.id) {
        const { error } = await supabase.from(cfg.table).update(payload).eq("id", editing.id);
        if (error) throw error;
        toast.success("تم التحديث بنجاح");
      } else {
        delete payload.id;
        const { error } = await supabase.from(cfg.table).insert(payload);
        if (error) throw error;
        toast.success("تمت الإضافة بنجاح");
      }
      setEditing(null);
      load();
    } catch (e: any) {
      console.error("Save error:", e);
      toast.error("حدث خطأ أثناء الحفظ: " + (e?.message || "غير معروف"));
    }
  };

  const remove = async (id: string) => {
    if (!confirm("حذف هذا العنصر؟")) return;
    const { error } = await supabase.from(cfg.table).delete().eq("id", id);
    if (error) {
      toast.error("حدث خطأ أثناء الحذف: " + error.message);
      return;
    }
    toast.success("تم الحذف بنجاح");
    load();
  };

  if (loading) return <Loading />;

  return (
    <Section
      title={`${cfg.title} (${rows.length})`}
      action={
        <button onClick={() => setEditing(empty())} className="inline-flex items-center gap-2 rounded-full bg-[var(--cinema)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--cream)] hover:scale-[1.02]">
          <Plus className="size-4" /> جديد
        </button>
      }
    >
      {rows.length === 0 ? (
        <div className="rounded-sm border border-dashed border-[var(--cream)]/20 p-12 text-center text-sm text-muted-foreground">
          لا توجد عناصر بعد.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rows.map((r) => {
            const d = cfg.display(r);
            return (
              <article key={r.id} className="overflow-hidden rounded-sm border border-[var(--cream)]/10 bg-[var(--surface)]">
                {d.image && (
                  <div className="aspect-[4/3] overflow-hidden bg-[var(--ink)]">
                    <img src={d.image} alt="" className="size-full object-cover" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    {d.tag && <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--cinema)]">{d.tag}</span>}
                    {!r.published && <span className="text-[10px] uppercase text-muted-foreground">مسودة</span>}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-[var(--cream)]">{d.title}</h3>
                  {d.sub && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{d.sub}</p>}
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => setEditing(r)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-sm bg-[var(--ink)] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[var(--cream)] hover:bg-[var(--cinema)]">
                      <Pencil className="size-3" /> تعديل
                    </button>
                    <button onClick={() => remove(r.id)} className="grid size-9 place-items-center rounded-sm border border-[var(--cream)]/20 text-[var(--cream)] hover:bg-destructive">
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/80 p-6" onClick={() => setEditing(null)}>
          <div dir="rtl" className="my-8 w-full max-w-2xl overflow-hidden rounded-sm border border-[var(--cream)]/10 bg-[var(--surface)]" onClick={(e) => e.stopPropagation()}>
            <header className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: "var(--cinema)" }}>
              <h3 className="font-display text-xl font-bold text-[var(--cream)]">{editing.id ? "تعديل" : "جديد"}</h3>
              <button onClick={() => setEditing(null)} className="text-[var(--cream)]"><X className="size-5" /></button>
            </header>
            <div className="grid gap-4 p-6 md:grid-cols-2">
              {cfg.fields.map((f) => {
                const full = f.type === "textarea" || f.type === "media";
                return (
                  <div key={f.key} className={full ? "md:col-span-2" : ""}>
                    {f.type === "media" ? (
                      <MediaUploader label={f.label} value={editing[f.key] || ""} onChange={(v) => setEditing({ ...editing, [f.key]: v })} />
                    ) : f.type === "bool" ? (
                      <label className="flex items-center gap-2 text-sm text-[var(--cream)]">
                        <input type="checkbox" checked={!!editing[f.key]} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.checked })} />
                        {f.label}
                      </label>
                    ) : (
                      <Field label={f.label}>
                        {f.type === "textarea" ? (
                          <textarea rows={4} value={editing[f.key] ?? ""} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })} className={inputCls} dir={f.dir} />
                        ) : f.type === "select" ? (
                          <select value={editing[f.key] ?? ""} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })} className={inputCls}>
                            {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                          </select>
                        ) : (
                          <input type={f.type === "number" ? "number" : "text"} value={editing[f.key] ?? ""} onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })} className={inputCls} dir={f.dir} />
                        )}
                      </Field>
                    )}
                  </div>
                );
              })}
            </div>
            <footer className="flex items-center justify-end gap-2 border-t border-[var(--cream)]/10 px-6 py-4">
              <button onClick={() => setEditing(null)} className="rounded-full border border-[var(--cream)]/30 px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--cream)]">إلغاء</button>
              <button onClick={save} className="inline-flex items-center gap-2 rounded-full bg-[var(--cinema)] px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--cream)]">
                <Save className="size-3.5" /> حفظ
              </button>
            </footer>
          </div>
        </div>
      )}
    </Section>
  );
}

/* ============================================================
   UI helpers
   ============================================================ */
function Section({
  title, children, action, onSave, saving, ok,
}: {
  title: string; children: React.ReactNode;
  action?: React.ReactNode;
  onSave?: () => void; saving?: boolean; ok?: boolean;
}) {
  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-[var(--cream)] md:text-3xl">{title}</h2>
        <div className="flex items-center gap-3">
          {ok && <span className="text-xs text-emerald-400">✓ تم الحفظ</span>}
          {action}
          {onSave && (
            <button onClick={onSave} disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-[var(--cinema)] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--cream)] hover:scale-[1.02] disabled:opacity-50">
              {saving ? <Loader2 className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
              حفظ التغييرات
            </button>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? "md:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Loading() {
  return (
    <div className="grid place-items-center py-20 text-[var(--cream)]/60">
      <Loader2 className="size-6 animate-spin" />
    </div>
  );
}

const inputCls =
  "w-full rounded-sm border border-[var(--cream)]/20 bg-[var(--ink)] px-3 py-2 text-sm text-[var(--cream)] outline-none focus:border-[var(--cinema)]";

function labelize(key: string) {
  const map: Record<string, string> = {
    name_ar: "الاسم (عربي)", name_en: "Name (EN)",
    tagline_ar: "الشعار (عربي)", tagline_en: "Tagline (EN)",
    logo_url: "اللوجو",
    eyebrow_ar: "النص العلوي (عربي)", eyebrow_en: "Eyebrow (EN)",
    title_ar: "العنوان (عربي)", title_en: "Title (EN)",
    subtitle_ar: "العنوان الفرعي (عربي)", subtitle_en: "Subtitle (EN)",
    big_a_ar: "جملة بارزة - الجزء الأول (عربي) مثل: نلتقط", big_a_en: "Big statement — line 1 (EN)",
    big_b_ar: "جملة بارزة - الجزء الثاني (عربي) مثل: __الاستثنائي", big_b_en: "Big statement — line 2 (EN)",
    portrait_url: "الصورة الشخصية في الهيرو",
    body_ar: "النص (عربي)", body_en: "Body (EN)",
    email: "البريد الإلكتروني", phone: "الهاتف",
    city_ar: "المدينة (عربي)", city_en: "City (EN)",
    instagram: "Instagram", youtube: "YouTube", vimeo: "Vimeo", linkedin: "LinkedIn", facebook: "Facebook",
    copyright_ar: "حقوق النشر (عربي)", copyright_en: "Copyright (EN)",
    blurb_ar: "نص الفوتر (عربي)", blurb_en: "Footer text (EN)",
    blurb2_ar: "نص الفوتر الثاني (عربي)", blurb2_en: "Footer text 2 (EN)",
    title2_ar: "العنوان الثاني (عربي)", title2_en: "Title 2 (EN)",
    body2_ar: "النص الثاني (عربي)", body2_en: "Body 2 (EN)",
    image1_url: "صورة 1 (عن أحمد)", image2_url: "صورة 2 (السينما)", image3_url: "صورة 3 (الاستوديو)",
    cv_url: "ملف السيرة الذاتية (PDF)",
    cv_title_ar: "عنوان قسم السيرة (عربي)", cv_title_en: "CV section title (EN)",
    cv_sub_ar: "وصف قسم السيرة (عربي)", cv_sub_en: "CV section subtitle (EN)",
    studio_name: "اسم الاستوديو", studio_url: "رابط الاستوديو",
    studio_desc_ar: "وصف الاستوديو (عربي)", studio_desc_en: "Studio description (EN)",
    years: "سنوات الخبرة (مثل: +12)", projects: "عدد المشاريع (مثل: +175)", clients: "عدد العملاء (مثل: +100)",
  };
  return map[key] || key;
}
