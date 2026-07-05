import Link from "next/link";
import { BIDANG, ORG, VISI, SAMBUTAN } from "@/lib/data";
import UpcomingList from "@/components/UpcomingList";

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-b from-[var(--brand-dark)] to-[var(--brand)] text-white">
        <div className="container-page grid gap-8 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
              {ORG.komisariat} &middot; Masa Khidmat {ORG.masaKhidmat}
            </p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              {ORG.namaLengkap}
            </h1>
            <p className="mt-4 max-w-xl text-white/80">{VISI}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/program-kerja"
                className="rounded-lg bg-[var(--gold)] px-5 py-2.5 text-sm font-semibold text-[var(--brand-dark)] hover:brightness-95"
              >
                Lihat Program Kerja
              </Link>
              <Link
                href="/pengurus"
                className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold hover:bg-white/10"
              >
                Struktur Pengurus
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur">
            <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--gold)]">
              🔔 Agenda Terdekat
            </h2>
            <div className="mt-3">
              <UpcomingList limit={4} />
            </div>
            <Link href="/agenda" className="mt-3 inline-block text-sm font-medium text-[var(--gold)] hover:underline">
              Lihat semua agenda →
            </Link>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { href: "/pengurus", title: "Struktur Pengurus", desc: "Kenali pengurus inti, bidang, dan Kopri masa khidmat 2026/2027." },
          { href: "/program-kerja", title: "Program Kerja", desc: `${BIDANG.length} bidang dengan agenda kegiatan satu periode penuh.` },
          { href: "/kalender", title: "Kalender Kegiatan", desc: "Seluruh jadwal kegiatan dalam satu tampilan kalender bulanan." },
          { href: "/agenda", title: "Agenda Terbaru", desc: "Daftar agenda terdekat lengkap dengan hitung mundur harinya." },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-xl border border-border bg-[var(--card)] p-5 transition-colors hover:border-[var(--brand)]"
          >
            <div className="font-semibold text-[var(--brand)]">{c.title}</div>
            <p className="mt-2 text-sm text-[var(--muted)]">{c.desc}</p>
          </Link>
        ))}
      </section>

      <section className="container-page grid gap-8 pb-16 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-[var(--card)] p-6">
          <h2 className="text-xl font-bold text-[var(--brand)]">Visi</h2>
          <p className="mt-2 text-sm leading-relaxed">{VISI}</p>
          <Link href="/profil" className="mt-4 inline-block text-sm font-medium text-[var(--brand)] hover:underline">
            Selengkapnya tentang visi & misi →
          </Link>
        </div>

        <div className="rounded-xl border border-border bg-[var(--card)] p-6">
          <h2 className="text-xl font-bold text-[var(--brand)]">Sambutan Ketua Umum</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            &ldquo;{SAMBUTAN.paragraf[1]}&rdquo;
          </p>
          <p className="mt-3 text-sm font-semibold">— {SAMBUTAN.nama}, {SAMBUTAN.jabatan}</p>
          <Link href="/profil" className="mt-4 inline-block text-sm font-medium text-[var(--brand)] hover:underline">
            Baca sambutan lengkap →
          </Link>
        </div>
      </section>
    </div>
  );
}
