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
  portrait_url: string;
  strip_images?: string[];
};
export type About = {
  title_ar: string; title_en: string;
  body_ar: string; body_en: string;
};
export type Contact = {
  email: string; phone: string;
  city_ar: string; city_en: string;
  instagram: string; youtube: string; vimeo: string; linkedin: string;
  facebook?: string;
};
export type Footer = { copyright_ar: string; copyright_en: string };

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
    portrait_url: "", strip_images: [],
  },
  about: { title_ar: "عن أحمد", title_en: "About Ahmad", body_ar: "", body_en: "" },
  contact: { email: "", phone: "", city_ar: "", city_en: "", instagram: "", youtube: "", vimeo: "", linkedin: "", facebook: "" },
  footer: { copyright_ar: "© أحمد حدّاد", copyright_en: "© Ahmad Haddad" },
};

export function useSettings() {
  const [settings, setSettings] = useState<AllSettings>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("site_settings").select("key,value");
    const merged = { ...DEFAULTS };
    (data ?? []).forEach((r: any) => {
      (merged as any)[r.key] = { ...(DEFAULTS as any)[r.key], ...r.value };
    });
    setSettings(merged);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = useCallback(async (key: keyof AllSettings, value: any) => {
    await supabase.from("site_settings").upsert({ key, value }, { onConflict: "key" });
    setSettings((s) => ({ ...s, [key]: value }));
  }, []);

  return { settings, loading, save, reload: load };
}

export async function uploadMedia(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "bin";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("media").upload(path, file, { upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}
