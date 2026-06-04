import { createServerFn } from "@tanstack/react-start";

export const ADMIN_EMAIL = "admin@haddad.app";

// Idempotent: creates the admin user if missing, otherwise resets the password.
// Called from the auth page so login with admin/admin12345 always works.
export const ensureAdminUser = createServerFn({ method: "POST" }).handler(
  async () => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const password = "admin12345";

    // Try to find existing user
    const { data: list, error: listErr } =
      await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 200 });
    if (listErr) throw new Error(listErr.message);

    const existing = list.users.find((u) => u.email === ADMIN_EMAIL);
    if (existing) {
      // Reset password to known value (idempotent bootstrap)
      await supabaseAdmin.auth.admin.updateUserById(existing.id, {
        password,
        email_confirm: true,
      });
      return { ok: true, created: false };
    }

    const { error } = await supabaseAdmin.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password,
      email_confirm: true,
    });
    if (error) throw new Error(error.message);
    return { ok: true, created: true };
  },
);
