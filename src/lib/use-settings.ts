import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export type Brand = {
  name_ar: string; name_en: string;
  tagline_ar: string; tagline_en: string;
  logo_url: string;
};
export type Hero = {
  eyebrow_ar: string; eyebrow_en: string;
  title_ar: string; title_en: string;
  subtitle_ar: string; subtitle_en: string;
  big_a_ar: string; big_a_en: string;
  big_b_ar: string; big_b_en: string;
  portrait_url: string;
  strip_images?: string[];
};
export type About = {
  title_ar: string; title_en: string;
  body_ar: string; body_en: string;
  title2_ar: string; title2_en: string;
  body2_ar: string; body2_en: string;
  title3_ar: string; title3_en: string;
  body3_ar: string; body3_en: string;
  title4_ar: string; title4_en: string;
  body4_ar: string; body4_en: string;
  image1_url: string; image2_url: string; image3_url: string;
  cv_url: string;
  cv_title_ar: string; cv_title_en: string;
  cv_sub_ar: string; cv_sub_en: string;
  studio_name: string; studio_url: string;
  studio_desc_ar: string; studio_desc_en: string;
};
export type Contact = {
  email: string; phone: string;
  city_ar: string; city_en: string;
  instagram: string; youtube: string; vimeo: string; linkedin: string;
  facebook?: string;
};
export type Footer = {
  copyright_ar: string; copyright_en: string;
  blurb_ar: string; blurb_en: string;
  blurb2_ar: string; blurb2_en: string;
};

export type AllSettings = {
  brand: Brand;
  hero: Hero;
  about: About;
  contact: Contact;
  footer: Footer;
};

export const DEFAULTS: AllSettings = {
  brand: { name_ar: "أحمد حدّاد", name_en: "Ahmad Haddad", tagline_ar: "استوديو", tagline_en: "Studio", logo_url: "" },
  hero: {
    eyebrow_ar: "إطار وَ تركيز", eyebrow_en: "Frame & Focus",
    title_ar: "حكاياتٌ تُروى بالضوء", title_en: "Stories Told in Light",
    subtitle_ar: "مخرج ومصوّر سينمائي.", subtitle_en: "Director & cinematographer.",
    big_a_ar: "نلتقط", big_a_en: "We capture",
    big_b_ar: "__الاستثنائي", big_b_en: "__the extraordinary",
    portrait_url: "", strip_images: [],
  },
  about: {
    title_ar: "عن أحمد", title_en: "About Ahmad",
    body_ar: "", body_en: "",
    title2_ar: "اكتشافي لعالم السينما", title2_en: "Discovering Cinema",
    body2_ar: "", body2_en: "",
    image1_url: "", image2_url: "", image3_url: "",
    cv_url: "",
    cv_title_ar: "تعرّف عليّ عن قرب", cv_title_en: "Get to know me",
    cv_sub_ar: "حمّل سيرتي الذاتية لتطّلع على مسيرتي المهنية.", cv_sub_en: "Download my CV to see my career and skills.",
    studio_name: "Faii House", studio_url: "https://faiihouse.lovable.app/",
    studio_desc_ar: "الفريق الإبداعي الذي أقوده للمشاريع الإنتاجية الأكبر.",
    studio_desc_en: "The creative team I lead for larger productions.",
  },
  contact: { email: "", phone: "", city_ar: "", city_en: "", instagram: "", youtube: "", vimeo: "", linkedin: "", facebook: "" },
  footer: {
    copyright_ar: "© أحمد حدّاد", copyright_en: "© Ahmad Haddad",
    blurb_ar: "أتمنى أن تكونوا قد استمتعتم بمشاهدة أعمالي.",
    blurb_en: "Hope you enjoyed exploring my work.",
    blurb2_ar: "إذا كان لديكم أي استفسارات لا تترددوا في الاتصال.",
    blurb2_en: "For any inquiries please get in touch.",
  },
};

export function useSettings() {
  const [settings, setSettings] = useState<AllSettings>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data } = await supabase.from("site_settings").select("key,value");
    const merged = { ...DEFAULTS };
    (data ?? []).forEach((r: any) => {
      (merged as any)[r.key] = { ...(DEFAULTS as any)[r.key], ...r.value };
    });
    setSettings(merged);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
    const ch = supabase
      .channel(`site_settings-live-${Math.random().toString(36).slice(2)}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "site_settings" }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [load]);

  const save = useCallback(async (key: keyof AllSettings, value: any) => {
    await supabase.from("site_settings").upsert({ key, value }, { onConflict: "key" });
    setSettings((s) => ({ ...s, [key]: value }));
  }, []);

  return { settings, loading, save, reload: load };
}

/** Live list of rows from a content table — auto-refreshes via realtime. */
export function useContent<T = any>(
  table: "services" | "works" | "testimonials" | "clients",
  opts: { publishedOnly?: boolean } = { publishedOnly: true },
) {
  const [rows, setRows] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    let q = supabase.from(table).select("*").order("sort_order").order("created_at", { ascending: false });
    if (opts.publishedOnly) q = q.eq("published", true);
    const { data } = await q;
    setRows((data ?? []) as T[]);
    setLoading(false);
  }, [table, opts.publishedOnly]);

  useEffect(() => {
    load();
    const ch = supabase
      .channel(`${table}-live-${Math.random().toString(36).slice(2)}`)
      .on("postgres_changes", { event: "*", schema: "public", table }, () => load())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [table, load]);

  return { rows, loading, reload: load };
}

export async function uploadMedia(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "bin";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, { upsert: false });
  if (error) throw error;
  // Bucket is private — generate a long-lived signed URL (~100 years).
  const { data, error: signErr } = await supabase.storage
    .from("media")
    .createSignedUrl(path, 60 * 60 * 24 * 365 * 100);
  if (signErr || !data?.signedUrl) throw signErr ?? new Error("Failed to sign URL");
  return data.signedUrl;
}
