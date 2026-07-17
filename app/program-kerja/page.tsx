import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Program Kerja | PMII Rayon Fakultas Syariah",
};

const KNOWN_GROUPS: { title: string; slugs: string[] }[] = [
  { title: "Badan Pengurus Harian (BPH)", slugs: ["sekretaris-umum", "bendahara-umum"] },
  { title: "Bidang", slugs: ["kaderisasi", "keilmuan", "advokasi-gerakan", "psdm"] },
  { title: "Korps PMII Putri (Kopri)", slugs: ["kopri", "kopri-kaderisasi", "kopri-keilmuan"] },
];

export default async function ProgramKerjaIndexPage() {
  const content = await getContent();
  const { bidang: BIDANG } = content;

  const knownSlugs = new Set(KNOWN_GROUPS.flatMap((g) => g.slugs));
  const lainnya = BIDANG.filter((b) => !knownSlugs.has(b.slug));
  const groups = lainnya.length > 0
    ? [...KNOWN_GROUPS, { title: "Lainnya", slugs: lainnya.map((b) => b.slug) }]
    : KNOWN_GROUPS;

  return (
    <div className="container-page py-10">
      <h1 className="text-2xl font-bold text-[var(--brand)] sm:text-3xl">Program Kerja</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Rencana kerja hasil Rapat Kerja (Raker) PMII Rayon Fakultas Syariah masa khidmat 2026/2027, disusun
        per bidang. Pilih salah satu untuk melihat rincian tugas pokok, fungsi, dan agendanya.
      </p>

      {groups.map((group) => (
        <div key={group.title} className="mt-8">
          <h2 className="text-lg font-bold text-[var(--brand)]">{group.title}</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.slugs.map((slug) => {
              const bidang = BIDANG.find((b) => b.slug === slug);
              if (!bidang) return null;
              return (
                <Link
                  key={slug}
                  href={`/program-kerja/${slug}`}
                  className="rounded-xl border border-border bg-[var(--card)] p-5 transition-colors hover:border-[var(--brand)]"
                >
                  <div className="font-semibold text-[var(--brand)]">{bidang.nama}</div>
                  <p className="mt-2 text-sm text-[var(--muted)]">
                    {bidang.pimpinan.map((p) => p.nama).join(" & ") || "—"}
                  </p>
                  <p className="mt-2 text-xs text-[var(--muted)]">
                    {bidang.agenda.length} agenda kegiatan
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
