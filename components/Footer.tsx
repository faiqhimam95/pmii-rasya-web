import Link from "next/link";
import { ORG } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-[var(--brand-dark)] text-white/80">
      <div className="container-page grid gap-8 py-10 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-bold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--gold)] text-[10px] font-extrabold text-[var(--brand-dark)]">
              PMII
            </span>
            Rayon Fakultas Syariah
          </div>
          <p className="mt-3 text-sm">
            {ORG.komisariat} &middot; Masa Khidmat {ORG.masaKhidmat}
          </p>
          <p className="mt-2 text-xs italic text-[var(--gold)]">{ORG.motto}</p>
        </div>

        <div className="text-sm">
          <div className="font-semibold text-white">Kontak</div>
          <p className="mt-3">{ORG.alamat}</p>
          <p className="mt-2">Telp/WA: {ORG.telepon}</p>
          <p>Email: {ORG.email}</p>
          <p>Instagram: @{ORG.instagram}</p>
        </div>

        <div className="text-sm">
          <div className="font-semibold text-white">Tautan Cepat</div>
          <ul className="mt-3 space-y-1.5">
            <li><Link className="hover:text-white" href="/pengurus">Struktur Pengurus</Link></li>
            <li><Link className="hover:text-white" href="/program-kerja">Program Kerja</Link></li>
            <li><Link className="hover:text-white" href="/kalender">Kalender Kegiatan</Link></li>
            <li><Link className="hover:text-white" href="/agenda">Agenda Terbaru</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} PMII Rayon Fakultas Syariah, Komisariat UIN KHAS Jember.
      </div>
    </footer>
  );
}
