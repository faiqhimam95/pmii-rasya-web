import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content-store";
import type { Bidang } from "@/lib/types";

export const metadata: Metadata = {
  title: "Struktur Pengurus | PMII Rayon Fakultas Syariah",
};

function PersonCard({ jabatan, nama }: { jabatan?: string; nama: string }) {
  return (
    <div className="rounded-xl border border-border bg-[var(--card)] p-4 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand)]/10 text-lg font-bold text-[var(--brand)]">
        {nama
          .split(" ")
          .map((w) => w[0])
          .slice(0, 2)
          .join("")}
      </div>
      <div className="mt-3 font-semibold">{nama}</div>
      {jabatan && <div className="text-xs text-[var(--muted)]">{jabatan}</div>}
    </div>
  );
}

function BidangCard({ bidang }: { bidang: Bidang }) {
  return (
    <div className="rounded-xl border border-border bg-[var(--card)] p-5">
      <div className="font-bold text-[var(--brand)]">{bidang.nama}</div>
      <ul className="mt-3 space-y-1 text-sm">
        {bidang.pimpinan.map((p, i) => (
          <li key={i}>
            <span className="text-[var(--muted)]">{p.jabatan}:</span> {p.nama}
          </li>
        ))}
      </ul>
      {bidang.anggota.length > 0 && (
        <div className="mt-3 text-sm">
          <span className="text-[var(--muted)]">Anggota:</span>{" "}
          {bidang.anggota.join(", ")}
        </div>
      )}
      <Link
        href={`/program-kerja/${bidang.slug}`}
        className="mt-3 inline-block text-sm font-medium text-[var(--brand)] hover:underline"
      >
        Lihat program kerja →
      </Link>
    </div>
  );
}

export default async function PengurusPage() {
  const content = await getContent();
  const { bidang: BIDANG, pengurusInti: PENGURUS_INTI, mabinra: MABINRA } = content;

  const bidangUtama = BIDANG.filter((b) =>
    ["kaderisasi", "keilmuan", "advokasi-gerakan", "psdm"].includes(b.slug)
  );
  const kopriInti = BIDANG.find((b) => b.slug === "kopri")!;
  const kopriBiro = BIDANG.filter((b) => b.slug.startsWith("kopri-"));

  return (
    <div className="container-page py-10">
      <h1 className="text-2xl font-bold text-[var(--brand)] sm:text-3xl">Struktur Pengurus</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Susunan pengurus PMII Rayon Fakultas Syariah, Komisariat UIN KHAS Jember, masa khidmat 2026/2027.
      </p>

      <h2 className="mt-8 text-lg font-bold text-[var(--brand)]">Majelis Pembina Rayon (MABINRA)</h2>
      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {MABINRA.map((nama) => (
          <PersonCard key={nama} nama={nama} />
        ))}
      </div>

      <h2 className="mt-10 text-lg font-bold text-[var(--brand)]">Badan Pengurus Harian (BPH)</h2>
      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <PersonCard jabatan="Ketua Umum" nama={PENGURUS_INTI.ketuaUmum} />
        <PersonCard jabatan="Sekretaris Umum" nama={PENGURUS_INTI.sekretarisUmum} />
        <PersonCard jabatan="Bendahara Umum" nama={PENGURUS_INTI.bendaharaUmum} />
      </div>

      <h2 className="mt-10 text-lg font-bold text-[var(--brand)]">Bidang-Bidang</h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2">
        {bidangUtama.map((b) => (
          <BidangCard key={b.slug} bidang={b} />
        ))}
      </div>

      <h2 className="mt-10 text-lg font-bold text-[var(--brand)]">Korps PMII Putri (Kopri)</h2>
      <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {kopriInti.pimpinan.map((p) => (
          <PersonCard key={p.jabatan} jabatan={p.jabatan} nama={p.nama} />
        ))}
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {kopriBiro.map((b) => (
          <BidangCard key={b.slug} bidang={b} />
        ))}
      </div>
    </div>
  );
}
