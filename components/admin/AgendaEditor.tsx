"use client";

import { useState } from "react";
import type { Agenda } from "@/lib/types";
import { inputCls, removeBtnCls, addBtnCls } from "./ListEditors";
import JadwalEditor from "./JadwalEditor";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function emptyAgenda(): Agenda {
  return {
    id: `agenda-${Date.now()}`,
    nama: "",
    jenis: "",
    waktuText: "",
    jadwal: [],
    sasaran: "",
    tujuan: "",
  };
}

export default function AgendaEditor({
  items,
  onChange,
}: {
  items: Agenda[];
  onChange: (items: Agenda[]) => void;
}) {
  const [openId, setOpenId] = useState<string | null>(null);

  function update(i: number, patch: Partial<Agenda>) {
    const next = [...items];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  }

  return (
    <div className="flex flex-col gap-3">
      {items.map((agenda, i) => {
        const open = openId === agenda.id;
        return (
          <div key={agenda.id} className="rounded-xl border border-border">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : agenda.id)}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className="font-medium">{agenda.nama || "(agenda baru, belum diberi nama)"}</span>
              <span className="text-xs text-[var(--muted)]">{open ? "Tutup ▲" : "Buka ▼"}</span>
            </button>

            {open && (
              <div className="flex flex-col gap-3 border-t border-border p-4">
                <label className="text-sm font-medium">
                  Nama kegiatan
                  <input
                    type="text"
                    value={agenda.nama}
                    onChange={(e) => {
                      const patch: Partial<Agenda> = { nama: e.target.value };
                      if (!agenda.id || agenda.id === slugify(agenda.nama)) {
                        patch.id = slugify(e.target.value) || agenda.id;
                      }
                      update(i, patch);
                    }}
                    className={inputCls + " mt-1"}
                  />
                </label>

                <label className="text-sm font-medium">
                  Jenis (opsional, mis. Formal / Non Formal / Informal)
                  <input
                    type="text"
                    value={agenda.jenis ?? ""}
                    onChange={(e) => update(i, { jenis: e.target.value })}
                    className={inputCls + " mt-1"}
                  />
                </label>

                <label className="text-sm font-medium">
                  Waktu pelaksanaan (teks tampilan, mis. &quot;18 April 2026&quot;)
                  <input
                    type="text"
                    value={agenda.waktuText}
                    onChange={(e) => update(i, { waktuText: e.target.value })}
                    className={inputCls + " mt-1"}
                  />
                </label>

                <label className="text-sm font-medium">
                  Sasaran
                  <input
                    type="text"
                    value={agenda.sasaran}
                    onChange={(e) => update(i, { sasaran: e.target.value })}
                    className={inputCls + " mt-1"}
                  />
                </label>

                <label className="text-sm font-medium">
                  Tujuan
                  <textarea
                    rows={3}
                    value={agenda.tujuan}
                    onChange={(e) => update(i, { tujuan: e.target.value })}
                    className={inputCls + " mt-1"}
                  />
                </label>

                <div>
                  <div className="mb-1 text-sm font-medium">
                    Jadwal (dipakai untuk kalender &amp; hitung mundur)
                  </div>
                  <JadwalEditor
                    items={agenda.jadwal}
                    onChange={(jadwal) => update(i, { jadwal })}
                  />
                </div>

                <button
                  type="button"
                  className={removeBtnCls + " w-fit"}
                  onClick={() => {
                    onChange(items.filter((_, idx) => idx !== i));
                    setOpenId(null);
                  }}
                >
                  Hapus agenda ini
                </button>
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        className={addBtnCls}
        onClick={() => {
          const a = emptyAgenda();
          onChange([...items, a]);
          setOpenId(a.id);
        }}
      >
        + Tambah agenda
      </button>
    </div>
  );
}
