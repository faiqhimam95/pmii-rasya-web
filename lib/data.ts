import type { JadwalRule } from "./schedule";
import { earliestNext } from "./schedule";

export const ORG = {
  namaLengkap:
    "Pergerakan Mahasiswa Islam Indonesia (PMII) Rayon Fakultas Syariah",
  singkatan: "RASYA",
  komisariat: "Komisariat UIN KHAS Jember",
  masaKhidmat: "2026/2027",
  alamat: "Jl. Mataram No. 02, Graha Ulul Albab, Mangli, Kaliwates, Jember, 68136",
  telepon: "081357513091",
  email: "pmiirayonsyariahr@gmail.com",
  instagram: "pmii.rayonsyariah",
  motto: "Taqwa, Intelektual, Profesional",
};

export const VISI =
  "Mewujudkan PMII Rayon Fakultas Syariah sebagai ruang kaderisasi ideologis, intelektual, demi terlahirnya kader yang kritis dan progresif.";

export const MISI = [
  "Mengembangkan sistem kaderisasi yang inklusif, sistematis, berkelanjutan sebagai ruang penguatan ideologi dan nilai-nilai PMII.",
  "Menumbuhkan kesadaran kritis anggota dan kader dalam menjawab tantangan zaman dan dinamika organisasi.",
  "Mendorong kader untuk memiliki jiwa analitis, solutif dan responsif bertindak terhadap isu-isu kebijakan publik yang dinamis.",
  "Mengoptimalkan pola kanalisasi dan segmentasi sebagai ruang pengembangan bakat dan minat kader.",
];

export const SAMBUTAN = {
  jabatan: "Ketua Umum PMII Rayon Fakultas Syariah Komisariat UIN KHAS Jember",
  nama: "Muhammad Yusril Faizi",
  paragraf: [
    "Assalamualaikum Warahmatullahi Wabarakatuh. Bismillahirrahmanirrahim.",
    "Alhamdulillah, puji syukur selalu kita panjatkan kepada Allah SWT atas rahmat dan hidayah-Nya sehingga kita masih diberi kesempatan untuk tetap berjuang di PMII bersama-sama. Sholawat serta salam tidak lupa selalu tercurah-limpahkan kepada junjungan kita, sang revolusioner, Nabi agung Muhammad SAW yang telah menuntun kita dari zaman kegelapan menuju zaman terang benderang, yakni Addinu Al-Islam.",
    "Kami berharap bahwa seluruh bentuk ikhtiar yang sama-sama kita perjuangkan atas nilai-nilai yang telah dirintis oleh mu'assis PMII terus-menerus terawat bersama-sama. Dengan kemampuan yang diusahakan sebisa mungkin, kita mencoba terus-menerus untuk selalu menempa diri, mengembangkan potensi, dan terus-menerus memperbaiki batin kita untuk tetap sejalan dengan garis perjuangan dan nilai-nilai PMII.",
    "PMII Rayon Fakultas Syariah (RASYA) tentunya telah melewati berbagai macam dinamika, tentu semuanya tidak mungkin terlepas dari persoalan-persoalan organisasi, kemahasiswaan, bahkan sampai dengan problem populis maupun elitis. Kami berharap kelembagaan RASYA akan tetap memperjuangkan apa saja yang dinilai benar secara mutlak.",
    "Keorganisasian tidak bisa lepas dari ranah pengkaderan, karena pada hakekatnya PMII adalah organisasi berbasis kaderisasi. Segala ikhtiar kami lakukan demi meningkatkan eksistensi PMII khususnya Rayon Fakultas Syariah dengan menyiapkan kader-kader berkualitas yang mampu menjadi pionir dalam pergerakan Rayon tahun depan, dengan segala upaya memperbaiki secara berkelanjutan.",
    "Rapat kerja kali ini merupakan salah satu mekanisme yang wajib untuk dilaksanakan. Ide-ide, serta gagasan-gagasan yang revolutif dan transformatif sesuai dengan perkembangan zaman, tentu diperlukan di setiap saat. Sehingga pada hari ini, kami segenap pengurus, memaparkan hasil upaya kita untuk didiskusikan dan disepakati bersama pada pelaksanaan rapat kerja kali ini.",
    "Wallahulmuwafiq ila aqwamith thoriq. Wassalamualaikum Warahmatullahi Wabarakatuh.",
  ],
};

export const TUPOKSI_KETUA_UMUM = [
  "Bertanggungjawab penuh dalam organisasi satu periode penuh.",
  "Memimpin, mengatur, dan mengkoordinasikan pelaksanaan kebijakan PMII Rayon Fakultas Syariah Komisariat UIN KHAS Jember.",
  "Melaksanakan kebijakan organisasi, baik internal maupun eksternal organisasi.",
  "Mengambil kebijakan tertentu atas dasar musyawarah mufakat.",
  "Melaksanakan visi, misi, dan amanat PMII Komisariat UIN KHAS Jember, PMII Cabang Jember, dan segala bentuk kebijakan PMII dengan pertimbangan tertentu.",
  "Menyambung silaturahmi di internal maupun eksternal organisasi.",
  "Menandatangani surat-surat ke luar maupun ke dalam organisasi atas nama organisasi.",
  "Mengkoordinir, mengontrol, serta mengadakan evaluasi terhadap seluruh pengurus PMII Rayon Fakultas Syariah.",
  "Mengondisikan proses segenap pengurus dalam satu periode penuh.",
];

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

export const PENGURUS_INTI = {
  ketuaUmum: "Muhammad Yusril Faizi",
  sekretarisUmum: "Agiel Ramsyi A.H",
  bendaharaUmum: "Nadila Sania Sulistia",
};

export const BIDANG: Bidang[] = [
  {
    slug: "sekretaris-umum",
    nama: "Sekretaris Umum",
    pimpinan: [{ jabatan: "Sekretaris Umum", nama: "Agiel Ramsyi A.H" }],
    anggota: [],
    tupoksi: [
      "Mengatur segala agenda kegiatan Rayon Fakultas Syariah.",
      "Melaksanakan pengelolaan administrasi kesekretariatan dan melakukan koordinasi antar pengurus dan antar kelembagaan.",
      "Memimpin dan mencatat hasil rapat.",
      "Menjadi sumber informasi bagi pengurus dan lembaga.",
      "Melakukan pengelolaan inventaris organisasi serta pengadaan kebutuhan kesekretariatan.",
    ],
    agenda: [
      {
        id: "kelas-administrasi",
        nama: "Kelas Administrasi",
        waktuText: "18 April 2026",
        jadwal: [{ type: "once", start: "2026-04-18" }],
        sasaran: "Kader dan anggota Rayon Syariah",
        tujuan:
          "Sebagai wadah kader dan anggota untuk memahami administrasi sesuai dengan pedoman yang ada.",
      },
    ],
  },
  {
    slug: "bendahara-umum",
    nama: "Bendahara Umum",
    pimpinan: [{ jabatan: "Bendahara Umum", nama: "Nadila Sania Sulistia" }],
    anggota: [],
    tupoksi: [
      "Mengelola dan mengatur kegiatan keuangan: menyimpan, mencatat penerimaan dan pengeluaran Rayon Fakultas Syariah.",
      "Mengevaluasi kegiatan berbasis dana bersama para pengurus.",
      "Mengontrol pengeluaran dan pemasukan keuangan Rayon Syariah di seluruh kegiatan rayon.",
    ],
    agenda: [
      {
        id: "tabungan-bersama",
        nama: "Tabungan Bersama",
        waktuText: "1 bulan sekali (Rp 5.000)",
        jadwal: [{ type: "text" }],
        sasaran: "Pengurus",
        tujuan: "Sebagai pemasukan dana kegiatan Rayon Syariah.",
      },
      {
        id: "bumr-kalender",
        nama: "BUMR (Badan Usaha Milik Rayon) - Pembuatan Kalender",
        waktuText: "Februari - Maret",
        jadwal: [{ type: "once", start: "2026-02-01", end: "2026-03-31" }],
        sasaran: "Pengurus, alumni, dan anggota atau kader",
        tujuan: "Sebagai pemasukan kas Rayon Syariah.",
      },
    ],
  },
  {
    slug: "kaderisasi",
    nama: "Bidang Kaderisasi",
    pimpinan: [
      { jabatan: "Ketua Bidang", nama: "Ach Faisol Rafiudin" },
      { jabatan: "Sekretaris Bidang", nama: "Noval Anggara" },
    ],
    anggota: [
      "M Ashad Fiyaumin Nabili",
      "Muhammad Dio Fransisko",
      "Hailal Alfaregi",
      "Ariska Zulfa",
      "Endi Alfian Syah",
      "Moh. Khoirul Amri",
      "Praditia Suryana Wasil",
    ],
    tupoksi: [
      "Mengayomi anggota dan kader.",
      "Memetakan anggota dan kader.",
      "Mendistribusikan (delegasi) anggota dan kader.",
      "Kontroling anggota dan kader.",
    ],
    agenda: [
      {
        id: "tahlilan-serap-aspirasi",
        nama: "Tahlilan dan Serap Aspirasi",
        jenis: "Non Formal",
        waktuText: "Setiap minggu 1 kali; di bulan terakhir, sholawat akbar",
        jadwal: [{ type: "text" }],
        sasaran: "Anggota dan kader PMII Rayon Syariah",
        tujuan:
          "Menanamkan TRI MOTTO PMII dan menampung aspirasi anggota dan kader Rayon Syariah.",
      },
      {
        id: "stratag-medinfo",
        nama: "Stratag Medinfo",
        jenis: "Non Formal",
        waktuText: "Setiap 1 bulan sekali",
        jadwal: [{ type: "text" }],
        sasaran: "Anggota dan kader Rayon Syariah",
        tujuan:
          "Untuk membranding serta mengenalkan PMII di khalayak umum termasuk PMII Rayon Syariah.",
      },
      {
        id: "halal-bihalal",
        nama: "Halal Bihalal dan Serasehan",
        jenis: "Informal",
        waktuText: "17 April 2026",
        jadwal: [{ type: "once", start: "2026-04-17" }],
        sasaran: "Alumni, demisioner, anggota dan kader PMII Rayon Syariah",
        tujuan:
          "Sebagai ruang ta'aruf dan media komunikasi silaturrahmi antara alumni, kader, dan anggota PMII Rayon Syariah.",
      },
      {
        id: "kemah-bhakti-kader",
        nama: "Kemah Bhakti Kader",
        jenis: "Informal",
        waktuText: "18-19 April 2026",
        jadwal: [{ type: "once", start: "2026-04-18", end: "2026-04-19" }],
        sasaran: "Anggota dan kader PMII Rayon Syariah",
        tujuan:
          "Mempererat emosional kader dan anggota Rayon Syariah serta pemahaman materi lanjutan.",
      },
      {
        id: "mapaba",
        nama: "MAPABA",
        jenis: "Formal",
        waktuText: "16-19 Oktober 2025",
        jadwal: [{ type: "once", start: "2025-10-16", end: "2025-10-19" }],
        sasaran: "Calon anggota baru Rayon Syariah",
        tujuan:
          "Rekrutmen anggota baru, sebagai wahana pengenalan PMII dan penanaman nilai (doktrinasi serta idealisme sosial PMII).",
      },
    ],
  },
  {
    slug: "keilmuan",
    nama: "Bidang Keilmuan",
    pimpinan: [
      { jabatan: "Wakil Ketua Bidang II", nama: "Muhammad Andy Najmi R" },
      { jabatan: "Wakil Sekretaris Bidang II", nama: "M. Ilyas Aditya Syahroni" },
    ],
    anggota: [
      "Muhammad Syamsudin",
      "Asri Lailatul Sa'daah",
      "Lukman Hakim",
      "Achmad Fahmi Zainul Arifin",
      "Isbat Ubadillah A",
      "Arif Mustofa Bisri",
      "Moch Fuad Hasan",
    ],
    tupoksi: [
      "Menjaga dan mengembangkan khazanah pengetahuan.",
      "Membuat lingkar studi berbasis literasi.",
    ],
    agenda: [
      {
        id: "jurnalistik-lecture",
        nama: "Jurnalistik Lecture",
        jenis: "Formal",
        waktuText: "15-17 Mei 2026",
        jadwal: [{ type: "once", start: "2026-05-15", end: "2026-05-17" }],
        sasaran: "Anggota dan kader PMII Rayon Syariah",
        tujuan:
          "Menyaring individu yang memiliki minat dan bakat dalam bidang jurnalistik hukum, guna mengembangkan keterampilan menulis, menganalisis, dan melaporkan isu-isu hukum secara objektif serta mendukung penyebaran informasi hukum yang edukatif dan berkualitas.",
      },
      {
        id: "forum-discussion",
        nama: "Forum Discussion Rayon Syariah",
        jenis: "Non Formal",
        waktuText: "Satu bulan sekali, minggu kedua (malam Jumat setelah tahlil)",
        jadwal: [{ type: "monthlyWeek", week: 2, dayOfWeek: 4 }],
        sasaran: "Anggota dan kader PMII Rayon Syariah",
        tujuan:
          "Meningkatkan pemahaman dan keterampilan praktis di bidang hukum, mempersiapkan peserta untuk dunia kerja, mendorong penelitian serta kesadaran hukum, membangun jaringan profesional, dan menanamkan etika serta profesionalisme dalam praktik hukum.",
      },
      {
        id: "wahana-filsafat",
        nama: "Wahana Filsafat",
        jenis: "Non Formal",
        waktuText: "Setiap minggu (Selasa)",
        jadwal: [{ type: "weekly", dayOfWeek: 2 }],
        sasaran: "Anggota dan kader PMII Rayon Syariah",
        tujuan:
          "Membentuk pola pikir anggota dan kader PMII RASYA yang kritis, logis, dan mampu menyingkap berbagai problematika hukum serta merumuskan metode pemecahannya.",
      },
      {
        id: "mars",
        nama: "MARS (Madrasah Aswaja Rayon Syariah)",
        jenis: "Non Formal",
        waktuText: "Satu bulan sekali, minggu terakhir (Selasa)",
        jadwal: [{ type: "monthlyWeek", week: -1, dayOfWeek: 2 }],
        sasaran: "Anggota dan kader PMII Rayon Syariah",
        tujuan:
          "Membentuk dan mengembalikan pola pikir kader sebagai penganut Aswaja, menanamkan Aswaja sebagai manhaj al-fikr.",
      },
    ],
  },
  {
    slug: "advokasi-gerakan",
    nama: "Bidang Advokasi Gerakan (ADVOGER)",
    pimpinan: [
      { jabatan: "Ketua Bidang", nama: "Muhammad Sofyan Hadi" },
      { jabatan: "Sekretaris Bidang", nama: "Muizet Efendi" },
    ],
    anggota: [
      "M. Kamalul Hikmi Aufaqi",
      "Samhedi",
      "Ahmad Lukmanul Hakim",
      "M. Gymnastiar",
      "Dicky Dwi S. H",
      "Ahmad Faishal Rohman",
    ],
    tupoksi: ["Mengawal.", "Mendampingi.", "Menyelesaikan."],
    agenda: [
      {
        id: "pesantren-gerakan",
        nama: "Pesantren Gerakan",
        jenis: "Non Formal",
        waktuText: "1 kali dalam 1 kepengurusan (19-21 Juni 2026)",
        jadwal: [{ type: "once", start: "2026-06-19", end: "2026-06-21" }],
        sasaran: "Anggota dan kader Rayon Fakultas Syariah 2024-2025",
        tujuan:
          "Melahirkan regenerasi baru diskursus advokasi gerakan; menciptakan kader akademis yang berjiwa organisatoris dan kritis.",
      },
      {
        id: "information-center",
        nama: "Information Center",
        jenis: "Informal",
        waktuText: "Kondisional",
        jadwal: [{ type: "text" }],
        sasaran: "Anggota dan kader Rayon Fakultas Syariah 2024-2025",
        tujuan:
          "Upaya advokasi dalam menyelesaikan masalah kader/anggota di wilayah struktural kampus; sosialisasi dan kampanye media saat ada isu; menginformasikan informasi akademik kepada kader dan anggota.",
      },
      {
        id: "kajian-advokasi",
        nama: "Kajian Advokasi",
        jenis: "Non Formal",
        waktuText: "1 bulan sekali (Rabu)",
        jadwal: [{ type: "monthlyWeek", week: 1, dayOfWeek: 3 }],
        sasaran: "Kader dan anggota Rayon Syariah 2024-2025",
        tujuan:
          "Membangun fondasi intelektual kader melalui pendalaman metodologi sebagai pisau analisis pergerakan, dan mentransformasikan pemahaman ideologis ke dalam strategi advokasi yang konkret untuk merespons isu sosial-politik kontemporer.",
      },
    ],
  },
  {
    slug: "psdm",
    nama: "Bidang PSDM",
    pimpinan: [
      { jabatan: "Ketua Bidang", nama: "Syawalluddin J.W." },
      { jabatan: "Sekretaris Bidang", nama: "Handy Hidayat" },
    ],
    anggota: [
      "M. Imron Primadiyanto",
      "Sulaiman Zakaria",
      "Faishol Reza Affandi",
      "M. Angga Syahputra",
      "Agung Kurniawan",
      "Zhainul Arifin",
      "M. Legar Al-Faris",
    ],
    tupoksi: [
      "Pengembangan kapasitas anggota dan kader melalui hardskill dan softskill.",
    ],
    agenda: [
      {
        id: "olahraga",
        nama: "Olahraga (Futsal dan Badminton)",
        waktuText: "1 bulan, masing-masing 1 kali di minggu pertama dan ketiga (Senin)",
        jadwal: [
          { type: "monthlyWeek", week: 1, dayOfWeek: 1 },
          { type: "monthlyWeek", week: 3, dayOfWeek: 1 },
        ],
        sasaran: "Anggota dan kader Rayon Syariah masa khidmat 2026-2027",
        tujuan:
          "Pengembangan kapasitas anggota dan kader melalui peningkatan hardskill dan softskill.",
      },
      {
        id: "pelatihan-seni",
        nama: "Pelatihan Seni (Teater, Musik, Puisi)",
        waktuText: "Setiap minggu",
        jadwal: [{ type: "text" }],
        sasaran: "Anggota dan kader Rayon Syariah masa khidmat 2026-2027",
        tujuan:
          "Pengembangan bakat dan minat anggota serta kader di bidang kesenian melalui kolaborasi dengan Banom ATOS.",
      },
      {
        id: "pelatihan-desain-grafis",
        nama: "Pelatihan Desain Grafis",
        waktuText: "Satu periode 1x, 5 September 2026",
        jadwal: [{ type: "once", start: "2026-09-05" }],
        sasaran: "Anggota dan kader Rayon Syariah masa khidmat 2026-2027",
        tujuan:
          "Pengembangan keterampilan anggota dan kader di bidang multimedia agar mampu berkembang dan beradaptasi sesuai tuntutan zaman.",
      },
      {
        id: "pelatihan-hadroh",
        nama: "Pelatihan Hadroh",
        waktuText: "Setiap minggu",
        jadwal: [{ type: "text" }],
        sasaran: "Anggota dan kader Rayon Syariah masa khidmat 2026-2027",
        tujuan:
          "Mengembangkan bakat/minat anggota dan kader di bidang hadroh sehingga memiliki tim hadroh sendiri.",
      },
    ],
  },
  {
    slug: "kopri",
    nama: "Korps PMII Putri (KOPRI)",
    pimpinan: [
      { jabatan: "Ketua", nama: "Aisyatun Munfathiroh" },
      { jabatan: "Sekretaris", nama: "Rosidata Qurrota A'yun" },
      { jabatan: "Bendahara", nama: "Aulya Hikmah Andina" },
    ],
    anggota: [],
    tupoksi: [
      "Ketua: melaksanakan tugas dan bertanggung jawab kepada Ketua Umum; mengordinir, mengontrol, mengevaluasi dan bertanggung jawab terhadap semua kegiatan Kopri; membuat kebijakan dan mengambil keputusan berdasarkan musyawarah mufakat.",
      "Sekretaris: mengatur administrasi Kopri; mengeluarkan surat delegasi sendiri (SKP, SIG, SKK); mendata serta mengarsipkan surat keluar-masuk; memimpin forum dan menjadi notulen; ikut mengontrol kegiatan; mengevaluasi kegiatan; mengendalikan media sosial Kopri.",
      "Bendahara: mengatur, menyimpan, dan mencatat penerimaan maupun pengeluaran keuangan Kopri; merancang RAB tiap kegiatan berkoordinasi dengan Bendahara Umum; mengkoordinir bidang keuangan dalam setiap kegiatan Kopri.",
    ],
    agenda: [],
  },
  {
    slug: "kopri-kaderisasi",
    nama: "Kopri - Biro Kaderisasi",
    pimpinan: [
      { jabatan: "Ketua Bidang", nama: "Afni Hilalah" },
      { jabatan: "Sekretaris Bidang", nama: "Nasywa Aurafifah" },
    ],
    anggota: [
      "Ulfa Aula Fitri",
      "Nadia Putri Zahra",
      "Hesti Nur Hidayati",
      "Dinda Citra Rahayu",
    ],
    tupoksi: [],
    agenda: [
      {
        id: "sig",
        nama: "SIG (Sekolah Islam Gender)",
        waktuText: "1x dalam satu periode (5-7 Juni 2026)",
        jadwal: [{ type: "once", start: "2026-06-05", end: "2026-06-07" }],
        sasaran: "Kader Kopri Rayon Syariah serta kader putra angkatan 2024-2025",
        tujuan:
          "Memperluas dan memperdalam pemahaman serta kesadaran kader secara setara tanpa kesenjangan gender. Output: terbentuknya sikap saling menghargai antar kader tanpa membedakan gender, serta mampu memahami dan menerapkan nilai-nilai kesetaraan gender dalam kehidupan bermasyarakat.",
      },
      {
        id: "ngops",
        nama: "NGOPS (Ngecamp with Kopri Syariah)",
        waktuText: "1x dalam satu periode (9-10 Mei 2026)",
        jadwal: [{ type: "once", start: "2026-05-09", end: "2026-05-10" }],
        sasaran: "Kader Kopri Rayon Syariah angkatan 2024-2025",
        tujuan:
          "Mempererat hubungan emosional dan kebersamaan pengurus Rayon Syariah dengan kader Kopri. Output: meningkatnya rasa kebersamaan dan kekeluargaan, kenyamanan, serta rasa saling percaya.",
      },
      {
        id: "coffee-catch-up",
        nama: "Coffee Catch-Up",
        waktuText: "1 bulan 1 kali",
        jadwal: [{ type: "text" }],
        sasaran: "Kader Kopri Rayon Syariah",
        tujuan:
          "Mempererat kebersamaan antar anggota, komunikasi yang lebih terbuka, pemahaman terhadap perkembangan dan kendala yang dihadapi, serta tersusunnya solusi dan langkah perbaikan untuk kegiatan selanjutnya.",
      },
    ],
  },
  {
    slug: "kopri-keilmuan",
    nama: "Kopri - Biro Keilmuan",
    pimpinan: [{ jabatan: "Kepala Bidang", nama: "Nahdiyah Insaniyah" }],
    anggota: [
      "Sindi Aprianti",
      "Rizky Ayu Fadilah",
      "Lailatul Khoiriyah",
      "Linda Maharani",
      "Sofiatul Jannah",
    ],
    tupoksi: [],
    agenda: [
      {
        id: "kopsi",
        nama: "KOPSI (Kopri Publik Speaking)",
        waktuText: "Satu bulan 2 kali",
        jadwal: [{ type: "text" }],
        sasaran: "Anggota Rayon Syariah angkatan 2024-2025",
        tujuan:
          "Mengasah public speaking yang baik dan benar di segala bidang (MC, moderator, dan host). Output: meningkatnya kepercayaan diri dan keterampilan anggota berbicara di depan umum, serta terbentuknya kader yang mampu menjalankan peran sebagai MC, moderator, dan host dengan baik.",
      },
      {
        id: "katalis",
        nama: "KATALIS (Kajian Analisis Kritis)",
        waktuText: "2 kali dalam 1 periode (11 Juli & 11 September 2026)",
        jadwal: [
          { type: "once", start: "2026-07-11" },
          { type: "once", start: "2026-09-11" },
        ],
        sasaran: "Anggota Rayon Syariah angkatan 2024-2025",
        tujuan:
          "Menjadi ruang diskusi kader untuk memperluas wawasan dan melatih kepekaan terhadap isu sosial. Output: meningkatnya pemahaman kader terhadap isu yang dibahas, terbentuknya budaya diskusi aktif, serta terjalinnya relasi kolaboratif dengan organisasi mahasiswa lain dan instansi terkait.",
      },
    ],
  },
];

export function getBidang(slug: string): Bidang | undefined {
  return BIDANG.find((b) => b.slug === slug);
}

export function allAgendaWithBidang(): { bidang: Bidang; agenda: Agenda }[] {
  return BIDANG.flatMap((bidang) =>
    bidang.agenda.map((agenda) => ({ bidang, agenda }))
  );
}

export interface UpcomingItem {
  bidang: Bidang;
  agenda: Agenda;
  date: Date;
}

/** Agenda items with a computable next date, soonest first. */
export function getUpcoming(from: Date): UpcomingItem[] {
  const items = allAgendaWithBidang()
    .map(({ bidang, agenda }) => {
      const date = earliestNext(agenda.jadwal, from);
      return date ? { bidang, agenda, date } : null;
    })
    .filter((x): x is UpcomingItem => x !== null);
  items.sort((a, b) => a.date.getTime() - b.date.getTime());
  return items;
}

/** Agenda items whose schedule is too loose to place on a calendar/countdown. */
export function getKegiatanRutin(): { bidang: Bidang; agenda: Agenda }[] {
  return allAgendaWithBidang().filter(({ agenda }) =>
    agenda.jadwal.every((r) => r.type === "text")
  );
}
