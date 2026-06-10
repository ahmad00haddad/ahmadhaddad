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
export type Stats = {
  years: string;
  projects: string;
  clients: string;
};

export type AllSettings = {
  brand: Brand;
  hero: Hero;
  about: About;
  contact: Contact;
  footer: Footer;
  stats: Stats;
};

export const DEFAULTS: AllSettings = {
  brand: { name_ar: "أحمد حدّاد", name_en: "HADDAD", tagline_ar: "سينمائي", tagline_en: "CINEMATOGRAPHER", logo_url: "" },
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
    body_ar: "صانع أفلام ومصور. بدأت رحلتي عام 2014 بدافع شغفٍ بسيط ومخلص: أن ألتقط جمال العالم كما أراه من حولي. لم أكن أعلم حينها أن هذه الهواية ستصبح عالمي ووظيفتي.\n\nفي عام 2016 حدثت تلك اللحظة الفارقة التي غيّرت مجرى طموحي تماماً، حين نُشرت إحدى صوري في مجلة دولية؛ كانت بمثابة تأكيدٍ خفيّ بأنني في الطريق الصحيح، وأعطتني إلهاماً لا ينضب لأرى أبعد من مجرد كادرٍ ثابت.",
    body_en: "Filmmaker and photographer. My journey began in 2014, driven by a simple, sincere passion — to capture the beauty of the world as I see it. I didn't know then that this hobby would become my whole world, and my work.\n\nIn 2016, the turning point arrived: one of my photographs was published in an international magazine. It felt like a quiet confirmation that I was on the right path, and gave me endless inspiration to see beyond a single still frame.",
    title2_ar: "دراستي", title2_en: "My Studies",
    body2_ar: "دراستي لهندسة الحاسوب في جامعة اليرموك (2016 – 2022) لم تكن مجرد مرحلة أكاديمية، بل هي ما شكّل طريقة تفكيري؛ علّمتني المنطق، وكيف تُبنى الأشياء على أساساتٍ راسخة.\n\nهذا المنطق هو ما جعلني أدرك لاحقاً أن القواعد السينمائية وُجدت ليحتمي بها المبتدئ، ولا يكسرها بقوة إلا العارفُ بأصولها.",
    body2_en: "Studying Computer Engineering at Yarmouk University (2016 – 2022) wasn't just an academic chapter — it shaped the way I think. It taught me logic, and how things are built on solid foundations.\n\nThat same logic later helped me understand that the rules of cinema exist as shelter for beginners — and only those who truly know them can break them with intention.",
    title3_ar: "اكتشافي لعالم السينما", title3_en: "Discovering Cinema",
    body3_ar: "في عام 2018 دخلت عالم الفيديوغرافيا والسينما من خلال شركة صغيرة. كانت مرحلة تعلّمٍ حقيقية، استوعبت فيها الأدوات والتقنيات، وأدركت أن التقليد في البداية ليس إلا سُلّماً نصعد عليه حتى نصل في النهاية إلى صوتٍ مستقل وهويةٍ خاصة.",
    body3_en: "In 2018 I stepped into the world of videography and cinema through a small studio. It was a real learning phase — I absorbed the tools and the craft, and I understood that imitation, at first, is only a ladder we climb to eventually reach an independent voice and a personal identity.",
    title4_ar: "رؤيتي وفلسفتي", title4_en: "Vision & Philosophy",
    body4_ar: "اليوم، في زمنٍ امتلأ بالنسخ والتكرار والركض وراء الشهرة السريعة عبر تقنياتٍ بصريّة هوجاء وزوايا بلا معنى، أقف خلف عدستي برؤيةٍ مختلفة.\n\nلا أصنع فيلماً لمجرّد الظهور؛ بل أؤمن أن الفنّ خُلق ليُعبّر عن مشاعرَ حقيقيةٍ تنبع من طين مجتمعنا وقواسمنا المشتركة. هدفي ليس إعادة إنتاج الماضي، بل إعادة توجيه البوصلة لنصنع سينما حديثة، ناضجة، تملك الحرفة التقنية العالية، وتنبض بروحٍ تشبهنا تماماً.",
    body4_en: "Today, in a time crowded with copies and a race for quick fame through reckless visuals and meaningless angles, I stand behind my lens with a different vision.\n\nI don't make films just to be seen. I believe art was made to express real feelings — ones that rise from the soil of our community and our shared experiences. My goal isn't to reproduce the past, but to redirect the compass toward a modern, mature cinema: one with serious technical craft, beating with a soul that looks exactly like us.",
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
  stats: { years: "12+", projects: "175+", clients: "100+" },

};

const SETTINGS_CACHE_KEY = "site_settings_cache_v1";

function readSettingsCache(): AllSettings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(SETTINGS_CACHE_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    const merged = { ...DEFAULTS };
    Object.keys(parsed).forEach((k) => {
      (merged as any)[k] = { ...(DEFAULTS as any)[k], ...parsed[k] };
    });
    return merged;
  } catch {
    return DEFAULTS;
  }
}

function writeSettingsCache(raw: Record<string, any>) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(SETTINGS_CACHE_KEY, JSON.stringify(raw)); } catch {}
}

export function useSettings() {
  const [settings, setSettings] = useState<AllSettings>(() => readSettingsCache());
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const { data } = await supabase.from("site_settings").select("key,value");
    const merged = { ...DEFAULTS };
    const raw: Record<string, any> = {};
    (data ?? []).forEach((r: any) => {
      (merged as any)[r.key] = { ...(DEFAULTS as any)[r.key], ...r.value };
      raw[r.key] = r.value;
    });
    setSettings(merged);
    setLoading(false);
    writeSettingsCache(raw);
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
    const { error } = await supabase.from("site_settings").upsert({ key, value }, { onConflict: "key" });
    if (error) throw error;
    setSettings((s) => {
      const next = { ...s, [key]: value };
      try {
        const raw = JSON.parse((typeof window !== "undefined" && localStorage.getItem(SETTINGS_CACHE_KEY)) || "{}");
        raw[key] = value;
        writeSettingsCache(raw);
      } catch {}
      return next;
    });
  }, []);

  return { settings, loading, save, reload: load };
}

/** Live list of rows from a content table — auto-refreshes via realtime. */
export function useContent<T = any>(
  table: "services" | "works" | "testimonials" | "clients",
  opts: { publishedOnly?: boolean } = { publishedOnly: true },
) {
  const cacheKey = `content_cache_${table}_${opts.publishedOnly ? "pub" : "all"}_v1`;
  const readCache = (): T[] => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(cacheKey);
      return raw ? (JSON.parse(raw) as T[]) : [];
    } catch { return []; }
  };

  const [rows, setRows] = useState<T[]>(() => readCache());
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    let q = supabase.from(table).select("*").order("sort_order").order("created_at", { ascending: false });
    if (opts.publishedOnly) q = q.eq("published", true);
    const { data } = await q;
    const next = (data ?? []) as T[];
    setRows(next);
    setLoading(false);
    if (typeof window !== "undefined") {
      try { localStorage.setItem(cacheKey, JSON.stringify(next)); } catch {}
    }
  }, [table, opts.publishedOnly, cacheKey]);

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
