"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { allAgendaWithBidang, getKegiatanRutin } from "@/lib/content-helpers";
import { occurrencesInMonth, HARI, BULAN } from "@/lib/schedule";
import type { Bidang } from "@/lib/types";

interface DayEvent {
  bidangNama: string;
  bidangSlug: string;
  agendaNama: string;
  agendaId: string;
  waktuText: string;
}

export default function Calendar({ bidang }: { bidang: Bidang[] }) {
  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const isCurrentMonth = year === today.getFullYear() && month === today.getMonth();

  const eventsByDay = useMemo(() => {
    const map = new Map<number, DayEvent[]>();
    for (const { bidang: b, agenda } of allAgendaWithBidang(bidang)) {
      for (const rule of agenda.jadwal) {
        for (const d of occurrencesInMonth(rule, year, month)) {
          const day = d.getDate();
          const list = map.get(day) ?? [];
          list.push({
            bidangNama: b.nama,
            bidangSlug: b.slug,
            agendaNama: agenda.nama,
            agendaId: agenda.id,
            waktuText: agenda.waktuText,
          });
          map.set(day, list);
        }
      }
    }
    return map;
  }, [bidang, year, month]);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstWeekday = new Date(year, month, 1).getDay();
  const cells: (number | null)[] = [
    ...Array(firstWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const kegiatanRutin = getKegiatanRutin(bidang);

  return (
    <div>
      <div className="flex items-center justify-between gap-3 rounded-xl border border-border bg-[var(--card)] p-4">
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          className="rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-[var(--background)]"
        >
          ← Sebelumnya
        </button>
        <div className="text-center">
          <div className="text-lg font-bold text-[var(--brand)]">
            {BULAN[month]} {year}
          </div>
          {!isCurrentMonth && (
            <button
              type="button"
              onClick={() => setCursor(new Date(today.getFullYear(), today.getMonth(), 1))}
              className="text-xs text-[var(--muted)] underline underline-offset-2"
            >
              kembali ke bulan ini
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          className="rounded-md border border-border px-3 py-1.5 text-sm font-medium hover:bg-[var(--background)]"
        >
          Berikutnya →
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1.5 text-center text-xs font-semibold text-[var(--muted)]">
        {HARI.map((h) => (
          <div key={h} className="py-1">
            {h.slice(0, 3)}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1.5">
        {cells.map((day, i) => {
          if (day === null) return <div key={i} className="aspect-square" />;
          const events = eventsByDay.get(day) ?? [];
          const isToday = isCurrentMonth && day === today.getDate();
          const isSelected = selectedDay === day;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`flex aspect-square flex-col items-center justify-start rounded-lg border p-1 text-left transition-colors sm:p-1.5 ${
                isSelected
                  ? "border-[var(--brand)] bg-[var(--brand)]/10"
                  : "border-border hover:bg-[var(--background)]"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-xs sm:h-6 sm:w-6 sm:text-sm ${
                  isToday ? "bg-[var(--gold)] font-bold text-[var(--brand-dark)]" : ""
                }`}
              >
                {day}
              </span>
              {events.length > 0 && (
                <span className="mt-0.5 flex flex-wrap justify-center gap-0.5">
                  {events.slice(0, 3).map((_, idx) => (
                    <span key={idx} className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-[var(--card)] p-4">
        <h3 className="font-semibold text-[var(--brand)]">
          {selectedDay
            ? `Agenda tanggal ${selectedDay} ${BULAN[month]} ${year}`
            : "Pilih tanggal untuk melihat agenda"}
        </h3>
        <div className="mt-3 flex flex-col gap-2">
          {selectedDay && (eventsByDay.get(selectedDay) ?? []).length === 0 && (
            <p className="text-sm text-[var(--muted)]">Tidak ada agenda terjadwal pada tanggal ini.</p>
          )}
          {selectedDay &&
            (eventsByDay.get(selectedDay) ?? []).map((e, idx) => (
              <Link
                key={idx}
                href={`/program-kerja/${e.bidangSlug}#${e.agendaId}`}
                className="rounded-lg border border-border p-3 hover:border-[var(--brand)]"
              >
                <div className="font-medium">{e.agendaNama}</div>
                <div className="text-xs text-[var(--muted)]">
                  {e.bidangNama} &middot; {e.waktuText}
                </div>
              </Link>
            ))}
        </div>
      </div>

      {kegiatanRutin.length > 0 && (
        <div className="mt-6 rounded-xl border border-border bg-[var(--card)] p-4">
          <h3 className="font-semibold text-[var(--brand)]">Kegiatan Rutin / Kondisional Lainnya</h3>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Jadwalnya berkala tanpa tanggal tetap, sehingga tidak ditampilkan di kalender di atas.
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {kegiatanRutin.map(({ bidang, agenda }) => (
              <li key={agenda.id} className="rounded-lg border border-border p-3 text-sm">
                <div className="font-medium">{agenda.nama}</div>
                <div className="text-xs text-[var(--muted)]">
                  {bidang.nama} &middot; {agenda.waktuText}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
