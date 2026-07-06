import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotificationBanner from "@/components/NotificationBanner";
import { getContent } from "@/lib/content-store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PMII Rayon Fakultas Syariah - Komisariat UIN KHAS Jember",
  description:
    "Website resmi PMII Rayon Fakultas Syariah, Komisariat UIN KHAS Jember, masa khidmat 2026/2027. Profil, struktur pengurus, program kerja, dan agenda kegiatan.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const content = await getContent();

  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Navbar bidang={content.bidang} orgSingkatan={content.org.singkatan} />
        <NotificationBanner bidang={content.bidang} />
        <main className="flex-1">{children}</main>
        <Footer org={content.org} />
      </body>
    </html>
  );
}
