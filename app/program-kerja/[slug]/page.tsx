import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BIDANG, getBidang } from "@/lib/data";

export function generateStaticParams() {
  return BIDANG.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bidang = getBidang(slug);
  return { title: bidang ? `${bidang.nama} | Program Kerja` : "Program Kerja" };
}

export default async function ProgramKerjaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bidang = getBidang(slug);
  if (!bidang) notFound();

  return (
    <div className="container-page py-10">
      <Link href="/program-kerja" className="text-sm font-medium text-[var(--brand)] hover:underline">
        ← Semua Program Kerja
      </Link>
      <h1 className="mt-2 text-2xl font-bold text-[var(--brand)] sm:text-3xl">{bidang.nama}</h1>

      {bidang.pimpinan.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {bidang.pimpinan.map((p, i) => (
            <span
              key={i}
              className="rounded-full border border-border bg-[var(--card)] px-3 py-1 text-sm"
            >
              <span className="text-[var(--muted)]">{p.jabatan}:</span> {p.nama}
            </span>
          ))}
        </div>
      )}

      {bidang.anggota.length > 0 && (
        <p className="mt-3 text-sm text-[var(--muted)]">
          <span className="font-medium text-[var(--foreground)]">Anggota:</span>{" "}
          {bidang.anggota.join(", ")}
        </p>
      )}

      {bidang.tupoksi.length > 0 && (
        <div className="mt-6 rounded-xl border border-border bg-[var(--card)] p-5">
          <h2 className="font-bold text-[var(--brand)]">Tugas Pokok dan Fungsi</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
            {bidang.tupoksi.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-lg font-bold text-[var(--brand)]">Agenda Kegiatan</h2>
        {bidang.agenda.length === 0 ? (
          <p className="mt-2 text-sm text-[var(--muted)]">Belum ada agenda tercatat untuk bidang ini.</p>
        ) : (
          <div className="mt-3 flex flex-col gap-4">
            {bidang.agenda.map((agenda) => (
              <div
                key={agenda.id}
                id={agenda.id}
                className="scroll-mt-24 rounded-xl border border-border bg-[var(--card)] p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{agenda.nama}</h3>
                  {agenda.jenis && (
                    <span className="rounded-full bg-[var(--brand)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--brand)]">
                      {agenda.jenis}
                    </span>
                  )}
                </div>
                <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-[var(--muted)]">Waktu Pelaksanaan</dt>
                    <dd>{agenda.waktuText}</dd>
                  </div>
                  <div>
                    <dt className="text-[var(--muted)]">Sasaran</dt>
                    <dd>{agenda.sasaran}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-[var(--muted)]">Tujuan</dt>
                    <dd className="leading-relaxed">{agenda.tujuan}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
