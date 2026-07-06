"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BIDANG } from "@/lib/data";

const MENU: { label: string; href: string; children?: { label: string; href: string }[] }[] = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Struktur Pengurus", href: "/pengurus" },
  {
    label: "Program Kerja",
    href: "/program-kerja",
    children: [
      { label: "Semua Bidang", href: "/program-kerja" },
      ...BIDANG.map((b) => ({ label: b.nama, href: `/program-kerja/${b.slug}` })),
    ],
  },
  { label: "Kalender Kegiatan", href: "/kalender" },
  { label: "Agenda Terbaru", href: "/agenda" },
  { label: "Kontak", href: "/kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-[var(--brand-dark)] text-white">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-wide">
          <Image
            src="/logo.svg"
            alt="Lambang PMII"
            width={40}
            height={40}
            className="h-9 w-9 object-contain"
            priority
          />
          <span className="leading-tight">
            <span className="block text-sm font-semibold sm:text-base">RASYA</span>
            <span className="block text-[10px] font-normal text-white/70 sm:text-xs">
              Rayon Fakultas Syariah
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {MENU.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 ${
                    isActive(item.href) ? "bg-white/10 text-[var(--gold)]" : "text-white"
                  }`}
                >
                  {item.label}
                  <svg width="10" height="10" viewBox="0 0 10 10" className="mt-px">
                    <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                </Link>
                {openDropdown === item.href && (
                  <div className="absolute left-0 top-full w-64 rounded-lg border border-border bg-[var(--card)] p-2 shadow-xl">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--background)]"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 ${
                  isActive(item.href) ? "bg-white/10 text-[var(--gold)]" : "text-white"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <button
          type="button"
          aria-label="Buka menu"
          className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-white/10 bg-[var(--brand-dark)] lg:hidden">
          <div className="container-page flex flex-col gap-1 py-3">
            {MENU.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block rounded-md px-3 py-2 text-sm font-medium ${
                    isActive(item.href) ? "bg-white/10 text-[var(--gold)]" : "text-white"
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-3 flex flex-col border-l border-white/10 pl-3">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-md px-3 py-1.5 text-xs text-white/80 hover:text-white"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
