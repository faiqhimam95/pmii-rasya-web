"use client";

import { useNow } from "@/lib/useNow";
import { diffHari, labelHariLagi } from "@/lib/schedule";

export default function Countdown({ target }: { target: Date }) {
  const now = useNow();
  if (!now) return null;

  const label = labelHariLagi(diffHari(target, now));
  const isSoon = label === "Hari ini" || label === "Besok";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
        isSoon
          ? "bg-[var(--gold)] text-[var(--brand-dark)]"
          : "bg-[var(--brand)]/10 text-[var(--brand)]"
      }`}
    >
      {label}
    </span>
  );
}
