import type { Article } from "@/types/article";
const source = {
  title: "Active Travel England — Tactile paving",
  url: "https://www.activetravelengland.gov.uk/planning-active-places/tactile-paving",
};
const dft = {
  title:
    "Department for Transport — Inclusive mobility: using tactile paving surfaces",
  url: "https://www.gov.uk/government/publications/inclusive-mobility-using-tactile-paving-surfaces",
};
export const articles: Article[] = [
  {
    slug: "apa-itu-tactile-indicator",
    title: "Apa itu tactile indicator?",
    summary:
      "Kenali fungsi tactile indicator, pola garis dan titik, serta perannya dalam membantu pengguna membaca jalur.",
    topic: "Dasar",
    featured: true,
    approved: false,
    sources: [source, dft],
    relatedLinks: [
      { label: "Kenali guiding block", href: "/produk/fungsi/guiding-block" },
      { label: "Kenali warning block", href: "/produk/fungsi/warning-block" },
    ],
    sections: [
      {
        id: "informasi-melalui-tekstur",
        title: "Informasi melalui tekstur",
        paragraphs: [
          "Tactile paving menghadirkan informasi yang dapat dirasakan dengan kaki atau tongkat. Tekstur menjadi salah satu cara bagi pengguna dengan hambatan penglihatan untuk membaca lingkungan.",
          "Sumber Active Travel England menjelaskan bahwa permukaan tactile memiliki beberapa jenis dan tujuan. Karena itu, pola tidak semestinya dipilih hanya sebagai dekorasi.",
        ],
      },
      {
        id: "bagian-dari-jalur",
        title: "Bagian dari rancangan jalur",
        paragraphs: [
          "Konsistensi penggunaan dan perawatan merupakan bagian dari rancangan ruang. Jalur perlu dipahami sebagai satu kesatuan bersama kondisi permukaan di sekitarnya.",
          "Artikel ini adalah pengantar. Rujukan Inggris membantu memahami prinsip umum dan bukan pernyataan kepatuhan terhadap aturan Indonesia.",
        ],
      },
    ],
  },
  {
    slug: "perbedaan-guiding-dan-warning",
    title: "Guiding dan warning: dua pola, dua peran.",
    summary:
      "Bedakan petunjuk arah dan isyarat kewaspadaan sebelum memilih produk.",
    topic: "Fungsi",
    approved: false,
    sources: [source, dft],
    relatedLinks: [
      {
        label: "Kategori guiding / pola garis",
        href: "/produk/fungsi/guiding-block",
      },
      {
        label: "Kategori warning / pola titik",
        href: "/produk/fungsi/warning-block",
      },
    ],
    sections: [
      {
        id: "fungsi-sebelum-tampilan",
        title: "Fungsi sebelum tampilan",
        paragraphs: [
          "Pada katalog ini, istilah guiding merujuk pada pola garis untuk petunjuk arah dan warning pada pola titik untuk isyarat kewaspadaan. Pengelompokan ini membantu penelusuran produk.",
          "Panduan resmi Inggris membedakan lebih banyak jenis tactile paving. Istilah ringkas dalam katalog tidak menggantikan klasifikasi teknis yang berlaku pada proyek.",
        ],
      },
      {
        id: "meninjau-penempatan",
        title: "Meninjau penempatan",
        paragraphs: [
          "Tujuan pola harus dibaca bersama konteks jalur. Jangan menyimpulkan lokasi, dimensi, atau susunan pemasangan hanya dari nama kategori.",
          "Tinjau desain dan spesifikasi bersama pihak yang menangani perencanaan aksesibilitas sebelum memesan.",
        ],
      },
    ],
  },
  {
    slug: "checklist-memilih-tactile-indicator",
    title: "Checklist memilih tactile indicator untuk proyek.",
    summary:
      "Bingung memilih tactile indicator? Siapkan informasi area, ukuran, dan kebutuhan pemasangan dengan checklist sederhana ini.",
    topic: "Pemilihan",
    approved: false,
    sources: [],
    relatedLinks: [
      { label: "Jelajahi katalog", href: "/produk" },
      { label: "Baca pertanyaan umum", href: "/faq" },
    ],
    sections: [
      {
        id: "siapkan-konteks",
        title: "Kenali kebutuhan area Anda",
        paragraphs: [
          "Gunakan daftar ini sebagai persiapan diskusi kebutuhan, bukan instruksi teknis pemasangan.",
        ],
        items: [
          "Catat lokasi dan tujuan jalur.",
          "Siapkan foto, denah, atau gambaran permukaan dasar.",
          "Pisahkan kebutuhan petunjuk arah dan peringatan.",
        ],
      },
      {
        id: "konfirmasi-produk",
        title: "Konfirmasi data produk",
        paragraphs: [
          "Minta informasi yang dapat diperiksa sebelum menentukan produk. Jangan menganggap semua varian atau material memiliki spesifikasi sama.",
        ],
        items: [
          "Periksa ukuran, varian, dan metode pemasangan pada dokumen resmi.",
          "Konfirmasikan kebutuhan jumlah dan jadwal pembahasan.",
          "Tanyakan harga, pengiriman, serta kebijakan yang berlaku langsung kepada kontak resmi.",
        ],
      },
    ],
  },
];
