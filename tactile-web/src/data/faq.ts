import type { FaqGroup } from "@/types/faq";
export const faqGroups: FaqGroup[] = [
  {
    id: "fungsi",
    title: "Produk & fungsi",
    items: [
      {
        question: "Apa itu tactile indicator?",
        answer:
          "Permukaan berpola yang menghadirkan informasi taktil sebagai bagian dari orientasi sebuah jalur.",
        link: {
          label: "Baca pengantar tactile indicator",
          href: "/panduan/apa-itu-tactile-indicator",
        },
      },
      {
        question: "Apa perbedaan guiding dan warning?",
        answer:
          "Dalam katalog ini, guiding memakai pola garis sebagai petunjuk arah. Warning memakai pola titik sebagai isyarat kewaspadaan. Penempatan tetap perlu ditinjau sesuai rancangan area.",
        link: {
          label: "Bandingkan guiding dan warning",
          href: "/panduan/perbedaan-guiding-dan-warning",
        },
      },
    ],
  },
  {
    id: "pemilihan",
    title: "Material & varian",
    items: [
      {
        question: "Bagaimana memilih material?",
        answer:
          "Siapkan konteks lokasi dan kondisi permukaan, lalu periksa data produk resmi. Nama material saja belum cukup untuk menentukan kesesuaiannya.",
      },
      {
        question: "Apakah ukuran dan warna sudah tersedia?",
        answer:
          "Ukuran dan finishing berbeda menurut model. Pilih model pada halaman produk untuk membaca data sumber, lalu konfirmasikan ketersediaan dan spesifikasi pesanan.",
        link: { label: "Buka katalog", href: "/produk" },
      },
    ],
  },
  {
    id: "persiapan",
    title: "Persiapan konsultasi",
    items: [
      {
        question: "Apa yang perlu disiapkan sebelum meminta penawaran?",
        answer:
          "Siapkan nama produk bila sudah ada, lokasi penggunaan, foto atau denah, perkiraan kebutuhan, dan spesifikasi proyek yang dapat dibagikan.",
        link: {
          label: "Lihat checklist pemilihan",
          href: "/panduan/checklist-memilih-tactile-indicator",
        },
      },
      {
        question: "Apakah website menentukan metode pemasangan?",
        answer:
          "Metode pemasangan tidak diasumsikan. Gunakan dokumen produk dan rancangan proyek yang sudah ditinjau sebelum menentukan pelaksanaan.",
      },
      {
        question: "Apakah klik WhatsApp langsung mengirim pesan?",
        answer:
          "Tidak. Tautan hanya membuka percakapan dengan teks awal. Anda dapat meninjau pesan sebelum mengirimkannya di WhatsApp.",
      },
    ],
  },
];
