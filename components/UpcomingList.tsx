"use client";

import Link from "next/link";
import { getUpcoming } from "@/lib/content-helpers";
import { formatTanggal } from "@/lib/schedule";
import { useNow } from "@/lib/useNow";
import type { Bidang } from "@/lib/types";
import Countdown from "./Countdown";

export default function UpcomingList({ bidang, limit }: { bidang: Bidang[]; limit?: number }) {
  const now = useNow();

  if (!now) {
    return (
      <div className="flex flex-col gap-2">
        {Array.from({ length: limit ?? 3 }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg border border-border bg-[var(--background)]" />
        ))}
      </div>
    );
  }

  const all = getUpcoming(bidang, now);
  const items = limit ? all.slice(0, limit) : all;

  if (items.length === 0) {
    return <p className="text-sm text-[var(--muted)]">Belum ada agenda terjadwal.</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <Link
          key={item.agenda.id}
          href={`/program-kerja/${item.bidang.slug}#${item.agenda.id}`}
          className="flex items-center justify-between gap-3 rounded-lg border border-border bg-[var(--card)] p-3 transition-colors hover:border-[var(--brand)]"
        >
          <div>
            <div className="font-medium">{item.agenda.nama}</div>
            <div className="text-xs text-[var(--muted)]">
              {item.bidang.nama} &middot; {formatTanggal(item.date.toISOString().slice(0, 10))}
            </div>
          </div>
          <Countdown target={item.date} />
        </Link>
      ))}
    </div>
  );
}
