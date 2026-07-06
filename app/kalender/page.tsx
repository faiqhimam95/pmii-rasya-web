import type { Metadata } from "next";
import Calendar from "@/components/Calendar";
import { getContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Kalender Kegiatan | PMII Rayon Fakultas Syariah",
};

export default async function KalenderPage() {
  const content = await getContent();

  return (
    <div className="container-page py-10">
      <h1 className="text-2xl font-bold text-[var(--brand)] sm:text-3xl">Kalender Kegiatan</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Seluruh agenda program kerja Rayon Fakultas Syariah masa khidmat 2026/2027, dirangkum dalam satu
        kalender. Klik tanggal yang bertanda titik untuk melihat detail kegiatannya.
      </p>
      <div className="mt-6">
        <Calendar bidang={content.bidang} />
      </div>
    </div>
  );
}
