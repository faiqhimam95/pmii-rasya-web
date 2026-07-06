"use client";

import type { JadwalRule } from "@/lib/schedule";
import { HARI } from "@/lib/schedule";
import { inputCls, removeBtnCls, addBtnCls } from "./ListEditors";

const WEEK_OPTIONS = [
  { value: 1, label: "Minggu ke-1" },
  { value: 2, label: "Minggu ke-2" },
  { value: 3, label: "Minggu ke-3" },
  { value: 4, label: "Minggu ke-4" },
  { value: -1, label: "Minggu terakhir" },
];

function emptyRule(type: JadwalRule["type"]): JadwalRule {
  if (type === "once") return { type: "once", start: "" };
  if (type === "weekly") return { type: "weekly", dayOfWeek: 1 };
  if (type === "monthlyWeek") return { type: "monthlyWeek", week: 1, dayOfWeek: 1 };
  return { type: "text" };
}

export default function JadwalEditor({
  items,
  onChange,
}: {
  items: JadwalRule[];
  onChange: (items: JadwalRule[]) => void;
}) {
  function updateRule(i: number, rule: JadwalRule) {
    const next = [...items];
    next[i] = rule;
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map((rule, i) => (
        <div key={i} className="flex flex-wrap items-center gap-2 rounded-lg border border-border p-2">
          <select
            value={rule.type}
            onChange={(e) => updateRule(i, emptyRule(e.target.value as JadwalRule["type"]))}
            className={inputCls + " w-auto"}
          >
            <option value="once">Tanggal tetap</option>
            <option value="weekly">Mingguan (hari tertentu)</option>
            <option value="monthlyWeek">Bulanan (minggu ke- + hari)</option>
            <option value="text">Bebas / kondisional (teks saja)</option>
          </select>

          {rule.type === "once" && (
            <>
              <input
                type="date"
                value={rule.start}
                onChange={(e) => updateRule(i, { ...rule, start: e.target.value })}
                className={inputCls + " w-auto"}
              />
              <span className="text-xs text-[var(--muted)]">sampai (opsional)</span>
              <input
                type="date"
                value={rule.end ?? ""}
                onChange={(e) =>
                  updateRule(i, { ...rule, end: e.target.value || undefined })
                }
                className={inputCls + " w-auto"}
              />
            </>
          )}

          {rule.type === "weekly" && (
            <select
              value={rule.dayOfWeek}
              onChange={(e) => updateRule(i, { ...rule, dayOfWeek: Number(e.target.value) })}
              className={inputCls + " w-auto"}
            >
              {HARI.map((h, idx) => (
                <option key={idx} value={idx}>
                  {h}
                </option>
              ))}
            </select>
          )}

          {rule.type === "monthlyWeek" && (
            <>
              <select
                value={rule.week}
                onChange={(e) => updateRule(i, { ...rule, week: Number(e.target.value) })}
                className={inputCls + " w-auto"}
              >
                {WEEK_OPTIONS.map((w) => (
                  <option key={w.value} value={w.value}>
                    {w.label}
                  </option>
                ))}
              </select>
              <select
                value={rule.dayOfWeek}
                onChange={(e) => updateRule(i, { ...rule, dayOfWeek: Number(e.target.value) })}
                className={inputCls + " w-auto"}
              >
                {HARI.map((h, idx) => (
                  <option key={idx} value={idx}>
                    {h}
                  </option>
                ))}
              </select>
            </>
          )}

          {rule.type === "text" && (
            <span className="text-xs text-[var(--muted)]">
              Tidak tampil di kalender/hitung mundur, hanya di daftar teks bebas.
            </span>
          )}

          <button
            type="button"
            className={removeBtnCls}
            onClick={() => onChange(items.filter((_, idx) => idx !== i))}
          >
            Hapus
          </button>
        </div>
      ))}
      <button type="button" className={addBtnCls} onClick={() => onChange([...items, emptyRule("once")])}>
        + Tambah jadwal
      </button>
    </div>
  );
}
