"use client";

import { useState } from "react";
import Link from "next/link";
import { getUpcoming } from "@/lib/content-helpers";
import { diffHari, labelHariLagi, formatTanggal } from "@/lib/schedule";
import { useNow } from "@/lib/useNow";
import { useLocalStorageValue } from "@/lib/useLocalStorageValue";
import type { Bidang } from "@/lib/types";

const DISMISS_KEY = "rasya-notif-dismissed-until";

export default function NotificationBanner({ bidang }: { bidang: Bidang[] }) {
  const now = useNow();
  const dismissedUntil = useLocalStorageValue(DISMISS_KEY);
  const [manuallyDismissed, setManuallyDismissed] = useState(false);

  if (!now) return null;

  const nearest = getUpcoming(bidang, now)[0];
  if (!nearest) return null;

  const iso = nearest.date.toISOString().slice(0, 10);
  if (manuallyDismissed || dismissedUntil === iso) return null;

  const days = diffHari(nearest.date, now);
  const text = `${labelHariLagi(days)} — ${nearest.agenda.nama} (${nearest.bidang.nama}), ${formatTanggal(iso)}`;

  return (
    <div className="bg-[var(--gold)] text-[var(--brand-dark)]">
      <div className="container-page flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
        <Link href="/agenda" className="flex items-center gap-2 font-medium">
          <span aria-hidden>🔔</span>
          <span>Agenda terdekat: {text}</span>
        </Link>
        <button
          type="button"
          aria-label="Tutup notifikasi"
          className="rounded-full px-2 py-0.5 text-xs font-semibold hover:bg-black/10"
          onClick={() => {
            localStorage.setItem(DISMISS_KEY, iso);
            setManuallyDismissed(true);
          }}
        >
          Tutup ✕
        </button>
      </div>
    </div>
  );
}
