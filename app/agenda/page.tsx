import type { Metadata } from "next";
import { getContent } from "@/lib/content-store";
import { getKegiatanRutin } from "@/lib/content-helpers";
import UpcomingList from "@/components/UpcomingList";

export const metadata: Metadata = {
  title: "Agenda Terbaru | PMII Rayon Fakultas Syariah",
};

export default async function AgendaPage() {
  const content = await getContent();
  const kegiatanRutin = getKegiatanRutin(content.bidang);

  return (
    <div className="container-page py-10">
      <h1 className="text-2xl font-bold text-[var(--brand)] sm:text-3xl">Agenda Terbaru</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Daftar agenda kegiatan terdekat dari seluruh bidang, diurutkan dari yang paling cepat
        dilaksanakan, lengkap dengan hitung mundur harinya.
      </p>

      <div className="mt-6">
        <UpcomingList bidang={content.bidang} />
      </div>

      {kegiatanRutin.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold text-[var(--brand)]">Kegiatan Rutin / Kondisional</h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Kegiatan berikut dilaksanakan secara berkala tanpa tanggal tetap, sehingga tidak masuk hitung
            mundur di atas.
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {kegiatanRutin.map(({ bidang, agenda }) => (
              <li key={agenda.id} className="rounded-lg border border-border bg-[var(--card)] p-3 text-sm">
                <div className="font-medium">{agenda.nama}</div>
                <div className="text-xs text-[var(--muted)]">
                  {bidang.nama} &middot; {agenda.waktuText}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
