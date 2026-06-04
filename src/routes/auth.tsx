import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Aperture, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ADMIN_EMAIL, ensureAdminUser } from "@/lib/admin.functions";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [{ title: "تسجيل دخول الأدمن — أحمد حدّاد" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const bootstrap = useServerFn(ensureAdminUser);
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already signed in, go to admin
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const email = username === "admin" ? ADMIN_EMAIL : username;
      let res = await supabase.auth.signInWithPassword({ email, password });
      if (res.error && username === "admin") {
        // Bootstrap admin on first run, then retry
        await bootstrap();
        res = await supabase.auth.signInWithPassword({ email, password });
      }
      if (res.error) throw res.error;
      navigate({ to: "/admin", replace: true });
    } catch (err: any) {
      setError(err?.message ?? "فشل تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="ltr"
      className="relative grid min-h-[calc(100svh-65px)] place-items-center bg-[var(--ink)] p-6"
    >
      <div className="absolute inset-0 opacity-60">
        <div className="grain-layer-soft" />
      </div>
      <div
        className="relative z-[2] w-full max-w-md overflow-hidden rounded-sm"
        style={{ backgroundColor: "var(--cinema)" }}
      >
        <div className="grain-layer" />
        <div className="relative z-[2] p-8 text-[var(--cream)]">
          <div className="mb-8 flex items-center gap-3">
            <Aperture className="size-9" strokeWidth={1.3} />
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.3em]">
                Haddad · Studio
              </div>
              <div className="font-display text-2xl font-bold tracking-tight">
                ADMIN ACCESS
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] opacity-80">
                Username
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full rounded-sm border border-[var(--cream)]/30 bg-[var(--ink)]/30 px-4 py-3 text-sm text-[var(--cream)] outline-none focus:border-[var(--cream)]"
              />
            </div>
            <div>
              <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] opacity-80">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-sm border border-[var(--cream)]/30 bg-[var(--ink)]/30 px-4 py-3 text-sm text-[var(--cream)] outline-none focus:border-[var(--cream)]"
              />
            </div>

            {error && (
              <div className="rounded-sm bg-[var(--ink)]/40 px-3 py-2 text-xs text-[var(--cream)]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--ink)] px-6 py-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--cream)] transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              <Lock className="size-3.5" />
              {loading ? "..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-[10px] uppercase tracking-[0.2em] opacity-70">
            admin / admin12345
          </p>
        </div>
      </div>
    </div>
  );
}
