import { createServerFn } from "@tanstack/react-start";
import type { Database } from "@/integrations/supabase/types";

type WorkRow = Database["public"]["Tables"]["works"]["Row"];

export const getWorkById = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data }): Promise<WorkRow | null> => {
    const { createClient } = await import("@supabase/supabase-js");
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
    const supabasePublic = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
      auth: { persistSession: false },
      global: {
        fetch: (input, init) => {
          const h = new Headers(init?.headers);
          if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
            h.delete("Authorization");
          }
          h.set("apikey", key);
          return fetch(input, { ...init, headers: h });
        },
      },
    });

    const { data: row, error } = await supabasePublic
      .from("works")
      .select("*")
      .eq("id", data.id)
      .eq("published", true)
      .single();

    if (error || !row) return null;
    return row;
  });
