import type { JadwalRule } from "./schedule";

export interface OrgInfo {
  namaLengkap: string;
  singkatan: string;
  komisariat: string;
  masaKhidmat: string;
  alamat: string;
  telepon: string;
  email: string;
  instagram: string;
  motto: string;
}

export interface Sambutan {
  jabatan: string;
  nama: string;
  paragraf: string[];
}

export interface PengurusInti {
  ketuaUmum: string;
  sekretarisUmum: string;
  bendaharaUmum: string;
}

export interface Agenda {
  id: string;
  nama: string;
  jenis?: string;
  waktuText: string;
  jadwal: JadwalRule[];
  sasaran: string;
  tujuan: string;
}

export interface Bidang {
  slug: string;
  nama: string;
  pimpinan: { jabatan: string; nama: string }[];
  anggota: string[];
  tupoksi: string[];
  agenda: Agenda[];
}

export interface SiteContent {
  org: OrgInfo;
  visi: string;
  misi: string[];
  sambutan: Sambutan;
  tupoksiKetuaUmum: string[];
  mabinra: string[];
  pengurusInti: PengurusInti;
  bidang: Bidang[];
}
