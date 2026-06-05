import { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { uploadMedia } from "@/lib/use-settings";

export function MediaUploader({
  value,
  onChange,
  label = "صورة",
  accept = "image/*",
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const handle = async (f: File | undefined) => {
    if (!f) return;
    setErr(null); setBusy(true);
    try { onChange(await uploadMedia(f)); }
    catch (e: any) { setErr(e.message || "فشل الرفع"); }
    finally { setBusy(false); }
  };

  return (
    <div>
      <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <div className="flex items-stretch gap-2">
        <div className="relative grid h-24 w-32 shrink-0 place-items-center overflow-hidden rounded-sm border border-[var(--cream)]/15 bg-[var(--ink)]">
          {value ? (
            <>
              <img src={value} alt="" className="size-full object-cover" />
              <button
                type="button"
                onClick={() => onChange("")}
                className="absolute right-1 top-1 grid size-6 place-items-center rounded-full bg-black/70 text-white hover:bg-destructive"
              >
                <X className="size-3" />
              </button>
            </>
          ) : (
            <ImageIcon className="size-6 text-[var(--cream)]/30" />
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <input
            ref={ref}
            type="file"
            accept={accept}
            className="hidden"
            onChange={(e) => handle(e.target.files?.[0])}
          />
          <button
            type="button"
            onClick={() => ref.current?.click()}
            disabled={busy}
            className="inline-flex items-center justify-center gap-2 rounded-sm border border-[var(--cream)]/20 bg-[var(--ink)] px-3 py-2 text-xs font-bold uppercase tracking-wider text-[var(--cream)] hover:bg-[var(--cinema)] disabled:opacity-50"
          >
            {busy ? <Loader2 className="size-3.5 animate-spin" /> : <Upload className="size-3.5" />}
            {busy ? "جاري الرفع..." : "رفع ملف"}
          </button>
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            dir="ltr"
            placeholder="أو الصق رابط URL"
            className="rounded-sm border border-[var(--cream)]/20 bg-[var(--ink)] px-2 py-1.5 text-xs text-[var(--cream)] outline-none focus:border-[var(--cinema)]"
          />
          {err && <p className="text-[10px] text-destructive">{err}</p>}
        </div>
      </div>
    </div>
  );
}
