"use client";

import type { SiteContent } from "@/lib/types";
import { StringListEditor, inputCls } from "./ListEditors";

export default function OrgEditor({
  content,
  onChange,
}: {
  content: SiteContent;
  onChange: (content: SiteContent) => void;
}) {
  const { org, sambutan, pengurusInti, mabinra } = content;

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h3 className="mb-2 font-semibold text-[var(--brand)]">Identitas Organisasi</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              ["namaLengkap", "Nama lengkap"],
              ["singkatan", "Singkatan (dipakai di navbar)"],
              ["komisariat", "Komisariat"],
              ["masaKhidmat", "Masa khidmat"],
              ["alamat", "Alamat sekretariat"],
              ["telepon", "Telepon / WhatsApp"],
              ["email", "Email"],
              ["instagram", "Instagram (tanpa @)"],
              ["motto", "Motto"],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="text-sm font-medium">
              {label}
              <input
                type="text"
                value={org[key]}
                onChange={(e) => onChange({ ...content, org: { ...org, [key]: e.target.value } })}
                className={inputCls + " mt-1"}
              />
            </label>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-[var(--brand)]">Visi</h3>
        <textarea
          rows={3}
          value={content.visi}
          onChange={(e) => onChange({ ...content, visi: e.target.value })}
          className={inputCls}
        />
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-[var(--brand)]">Misi</h3>
        <StringListEditor
          items={content.misi}
          onChange={(misi) => onChange({ ...content, misi })}
          multiline
        />
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-[var(--brand)]">Majelis Pembina Harian (MABINRA)</h3>
        <StringListEditor
          items={mabinra}
          onChange={(mabinra) => onChange({ ...content, mabinra })}
          placeholder="Nama anggota MABINRA"
        />
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-[var(--brand)]">Badan Pengurus Harian (BPH)</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-sm font-medium">
            Ketua Umum
            <input
              type="text"
              value={pengurusInti.ketuaUmum}
              onChange={(e) =>
                onChange({
                  ...content,
                  pengurusInti: { ...pengurusInti, ketuaUmum: e.target.value },
                })
              }
              className={inputCls + " mt-1"}
            />
          </label>
          <label className="text-sm font-medium">
            Sekretaris Umum
            <input
              type="text"
              value={pengurusInti.sekretarisUmum}
              onChange={(e) =>
                onChange({
                  ...content,
                  pengurusInti: { ...pengurusInti, sekretarisUmum: e.target.value },
                })
              }
              className={inputCls + " mt-1"}
            />
          </label>
          <label className="text-sm font-medium">
            Bendahara Umum
            <input
              type="text"
              value={pengurusInti.bendaharaUmum}
              onChange={(e) =>
                onChange({
                  ...content,
                  pengurusInti: { ...pengurusInti, bendaharaUmum: e.target.value },
                })
              }
              className={inputCls + " mt-1"}
            />
          </label>
        </div>
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-[var(--brand)]">Tugas Pokok dan Fungsi Ketua Umum</h3>
        <StringListEditor
          items={content.tupoksiKetuaUmum}
          onChange={(tupoksiKetuaUmum) => onChange({ ...content, tupoksiKetuaUmum })}
          multiline
        />
      </section>

      <section>
        <h3 className="mb-2 font-semibold text-[var(--brand)]">Sambutan Ketua Umum</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-medium">
            Nama
            <input
              type="text"
              value={sambutan.nama}
              onChange={(e) => onChange({ ...content, sambutan: { ...sambutan, nama: e.target.value } })}
              className={inputCls + " mt-1"}
            />
          </label>
          <label className="text-sm font-medium">
            Jabatan
            <input
              type="text"
              value={sambutan.jabatan}
              onChange={(e) =>
                onChange({ ...content, sambutan: { ...sambutan, jabatan: e.target.value } })
              }
              className={inputCls + " mt-1"}
            />
          </label>
        </div>
        <div className="mt-3">
          <div className="mb-1 text-sm font-medium">Isi sambutan (per paragraf)</div>
          <StringListEditor
            items={sambutan.paragraf}
            onChange={(paragraf) => onChange({ ...content, sambutan: { ...sambutan, paragraf } })}
            multiline
          />
        </div>
      </section>
    </div>
  );
}
