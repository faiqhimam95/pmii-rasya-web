"use client";

import type { Bidang } from "@/lib/types";
import { StringListEditor, PimpinanListEditor, inputCls, removeBtnCls } from "./ListEditors";
import AgendaEditor from "./AgendaEditor";

export default function BidangEditor({
  bidang,
  onChange,
  onDelete,
}: {
  bidang: Bidang;
  onChange: (bidang: Bidang) => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Nama bidang
          <input
            type="text"
            value={bidang.nama}
            onChange={(e) => onChange({ ...bidang, nama: e.target.value })}
            className={inputCls + " mt-1"}
          />
        </label>
        <label className="text-sm font-medium">
          Slug URL (huruf kecil, pakai tanda &quot;-&quot;)
          <input
            type="text"
            value={bidang.slug}
            onChange={(e) => onChange({ ...bidang, slug: e.target.value })}
            className={inputCls + " mt-1"}
          />
        </label>
      </div>

      <section>
        <h3 className="mb-2 font-semibold text-[var(--brand)]">Pimpinan Bidang</h3>
        <PimpinanListEditor
          items={bidang.pimpinan}
          onChange={(pimpinan) => onChange({ ...bidang, pimpinan })}
        />
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-[var(--brand)]">Anggota</h3>
        <StringListEditor
          items={bidang.anggota}
          onChange={(anggota) => onChange({ ...bidang, anggota })}
          placeholder="Nama anggota"
        />
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-[var(--brand)]">Tugas Pokok dan Fungsi</h3>
        <StringListEditor
          items={bidang.tupoksi}
          onChange={(tupoksi) => onChange({ ...bidang, tupoksi })}
          placeholder="Uraian tupoksi"
          multiline
        />
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-[var(--brand)]">Agenda Kegiatan</h3>
        <AgendaEditor
          items={bidang.agenda}
          onChange={(agenda) => onChange({ ...bidang, agenda })}
        />
      </section>

      <button
        type="button"
        className={removeBtnCls + " w-fit"}
        onClick={() => {
          if (confirm(`Hapus bidang "${bidang.nama}" beserta seluruh agendanya?`)) onDelete();
        }}
      >
        Hapus bidang ini
      </button>
    </div>
  );
}
