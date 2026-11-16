import type { FaqGroup } from "@/types/faq";
export const faqGroups: FaqGroup[] = [
  {
    id: "fungsi",
    title: "Produk & fungsi",
    items: [
      {
        question: "Apa itu tactile indicator?",
        answer:
          "Tactile indicator adalah penanda lantai bertekstur yang dapat dirasakan dengan kaki atau tongkat. Pola ini membantu penyandang disabilitas netra mengenali arah dan isyarat peringatan pada jalur.",
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
          "Mulai dari lokasi penggunaan dan kondisi lantainya. Lalu bandingkan ukuran, grade material, dan cara pemasangan tiap model agar sesuai dengan kebutuhan proyek.",
      },
      {
        question: "Apakah ukuran dan warna sudah tersedia?",
        answer:
          "Setiap model punya pilihan ukuran dan finishing yang berbeda. Pilih model di halaman produk untuk melihat detailnya, lalu hubungi kami untuk menanyakan ketersediaan sebelum memesan.",
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
          "Anda bisa melihat detail pemasangan pada model yang dipilih. Untuk pelaksanaannya, cocokkan dengan kondisi lantai, dokumen produk, dan rancangan jalur yang sudah ditinjau tim proyek.",
      },
      {
        question: "Apakah klik WhatsApp langsung mengirim pesan?",
        answer:
          "Tidak. Tautan hanya membuka percakapan dengan teks awal. Anda dapat meninjau pesan sebelum mengirimkannya di WhatsApp.",
      },
    ],
  },
];
