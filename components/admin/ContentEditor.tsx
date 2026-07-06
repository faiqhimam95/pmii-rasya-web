"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Bidang, SiteContent } from "@/lib/types";
import OrgEditor from "./OrgEditor";
import BidangEditor from "./BidangEditor";

function emptyBidang(n: number): Bidang {
  return {
    slug: `bidang-baru-${n}`,
    nama: "Bidang Baru",
    pimpinan: [],
    anggota: [],
    tupoksi: [],
    agenda: [],
  };
}

export default function ContentEditor({
  token,
  initialContent,
}: {
  token: string;
  initialContent: SiteContent;
}) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [activeTab, setActiveTab] = useState<string>("organisasi");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  function updateBidang(slug: string, updater: (b: Bidang) => Bidang) {
    setContent((prev) => ({
      ...prev,
      bidang: prev.bidang.map((b) => (b.slug === slug ? updater(b) : b)),
    }));
  }

  function deleteBidang(slug: string) {
    setContent((prev) => ({ ...prev, bidang: prev.bidang.filter((b) => b.slug !== slug) }));
    setActiveTab("organisasi");
  }

  function addBidang() {
    const b = emptyBidang(content.bidang.length + 1);
    setContent((prev) => ({ ...prev, bidang: [...prev.bidang, b] }));
    setActiveTab(b.slug);
  }

  async function handleSave() {
    setStatus("saving");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, content }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? "Gagal menyimpan.");
        setStatus("error");
        return;
      }
      setStatus("saved");
      router.refresh();
      setTimeout(() => setStatus((s) => (s === "saved" ? "idle" : s)), 3000);
    } catch {
      setErrorMsg("Terjadi kesalahan jaringan.");
      setStatus("error");
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push(`/admin/${token}`);
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-40 border-b border-border bg-[var(--brand-dark)] text-white">
        <div className="container-page flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold">
            <Image src="/logo.svg" alt="Lambang PMII" width={32} height={32} className="h-8 w-8 object-contain" />
            Kelola Konten Website
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="rounded-md border border-white/30 px-3 py-1.5 text-xs font-medium hover:bg-white/10"
            >
              Lihat Situs ↗
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md border border-white/30 px-3 py-1.5 text-xs font-medium hover:bg-white/10"
            >
              Keluar
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={status === "saving"}
              className="rounded-md bg-[var(--gold)] px-4 py-1.5 text-xs font-semibold text-[var(--brand-dark)] hover:brightness-95 disabled:opacity-60"
            >
              {status === "saving" ? "Menyimpan..." : status === "saved" ? "Tersimpan ✓" : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </header>

      {errorMsg && (
        <div className="bg-red-50 px-4 py-2 text-center text-sm text-red-700">{errorMsg}</div>
      )}

      <div className="container-page py-6">
        <div className="flex flex-wrap gap-2 border-b border-border pb-3">
          <button
            type="button"
            onClick={() => setActiveTab("organisasi")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${
              activeTab === "organisasi"
                ? "bg-[var(--brand)] text-white"
                : "border border-border hover:bg-[var(--card)]"
            }`}
          >
            Organisasi
          </button>
          {content.bidang.map((b) => (
            <button
              key={b.slug}
              type="button"
              onClick={() => setActiveTab(b.slug)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                activeTab === b.slug
                  ? "bg-[var(--brand)] text-white"
                  : "border border-border hover:bg-[var(--card)]"
              }`}
            >
              {b.nama || "(tanpa nama)"}
            </button>
          ))}
          <button
            type="button"
            onClick={addBidang}
            className="rounded-md border border-dashed border-border px-3 py-1.5 text-sm font-medium text-[var(--brand)] hover:bg-[var(--brand)]/5"
          >
            + Tambah Bidang
          </button>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-[var(--card)] p-6">
          {activeTab === "organisasi" ? (
            <OrgEditor content={content} onChange={setContent} />
          ) : (
            (() => {
              const bidang = content.bidang.find((b) => b.slug === activeTab);
              if (!bidang) return null;
              return (
                <BidangEditor
                  bidang={bidang}
                  onChange={(next) => updateBidang(bidang.slug, () => next)}
                  onDelete={() => deleteBidang(bidang.slug)}
                />
              );
            })()
          )}
        </div>
      </div>
    </div>
  );
}
