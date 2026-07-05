import type { Metadata } from "next";
import { MISI, ORG, SAMBUTAN, TUPOKSI_KETUA_UMUM, VISI } from "@/lib/data";

export const metadata: Metadata = {
  title: "Profil | PMII Rayon Fakultas Syariah",
};

export default function ProfilPage() {
  return (
    <div className="container-page py-10">
      <h1 className="text-2xl font-bold text-[var(--brand)] sm:text-3xl">Profil Organisasi</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        {ORG.namaLengkap}, {ORG.komisariat}, masa khidmat {ORG.masaKhidmat}.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-[var(--card)] p-6">
          <h2 className="text-lg font-bold text-[var(--brand)]">Visi</h2>
          <p className="mt-3 leading-relaxed">{VISI}</p>
        </div>
        <div className="rounded-xl border border-border bg-[var(--card)] p-6">
          <h2 className="text-lg font-bold text-[var(--brand)]">Misi</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed">
            {MISI.map((m, i) => (
              <li key={i}>{m}</li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-[var(--card)] p-6">
        <h2 className="text-lg font-bold text-[var(--brand)]">
          Tugas Pokok dan Fungsi Ketua Umum
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 leading-relaxed">
          {TUPOKSI_KETUA_UMUM.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ol>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-[var(--card)] p-6">
        <h2 className="text-lg font-bold text-[var(--brand)]">
          Sambutan Ketua Umum
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          {SAMBUTAN.nama} &mdash; {SAMBUTAN.jabatan}
        </p>
        <div className="mt-4 flex flex-col gap-3 leading-relaxed">
          {SAMBUTAN.paragraf.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
