// Microsoft Clarity custom events. Safe no-op when Clarity is not loaded.
type ClarityFn = (...args: unknown[]) => void;

export function track(event: string, tag?: { key: string; value: string }) {
  if (typeof window === "undefined") return;
  const clarity = (window as unknown as { clarity?: ClarityFn }).clarity;
  if (!clarity) return;
  if (tag) clarity("set", tag.key, tag.value);
  clarity("event", event);
}
