import type { Metadata } from "next";
import { getContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Kontak | PMII Rayon Fakultas Syariah",
};

export default async function KontakPage() {
  const { org: ORG } = await getContent();

  return (
    <div className="container-page py-10">
      <h1 className="text-2xl font-bold text-[var(--brand)] sm:text-3xl">Kontak</h1>
      <p className="mt-2 max-w-2xl text-[var(--muted)]">
        Hubungi kami untuk informasi lebih lanjut seputar PMII Rayon Fakultas Syariah, Komisariat UIN
        KHAS Jember.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-[var(--card)] p-5">
          <div className="text-sm font-semibold text-[var(--muted)]">Sekretariat</div>
          <p className="mt-1">{ORG.alamat}</p>
        </div>
        <div className="rounded-xl border border-border bg-[var(--card)] p-5">
          <div className="text-sm font-semibold text-[var(--muted)]">Telepon / WhatsApp</div>
          <p className="mt-1">{ORG.telepon}</p>
        </div>
        <div className="rounded-xl border border-border bg-[var(--card)] p-5">
          <div className="text-sm font-semibold text-[var(--muted)]">Email</div>
          <p className="mt-1">{ORG.email}</p>
        </div>
        <div className="rounded-xl border border-border bg-[var(--card)] p-5">
          <div className="text-sm font-semibold text-[var(--muted)]">Instagram</div>
          <p className="mt-1">@{ORG.instagram}</p>
        </div>
      </div>
    </div>
  );
}
