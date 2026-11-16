import type { FunctionCategoryView } from "@/types/product";
export const functionCategories: FunctionCategoryView[] = [
  {
    slug: "guiding-block",
    functionType: "guiding",
    title: "Guiding Block (Ubin Pemandu)",
    definition:
      "Guiding block adalah penanda lantai berpola garis memanjang yang membantu penyandang disabilitas netra mengikuti arah jalur melalui kaki atau tongkat. Pilih bentuk pelat atau strip sesuai rancangan area Anda. Perhatikan kesinambungan jalur, ukuran, dan kondisi lantai, lalu cocokkan cara pemasangannya dengan spesifikasi proyek.",
    characteristics:
      "Pola garis memanjang yang berulang, berbeda secara tekstur dari pola titik pada warning block.",
    usage: "Memberi petunjuk arah di sepanjang jalur yang direncanakan.",
    selection:
      "Saat kebutuhan utamanya adalah orientasi arah. Tinjau kesinambungan jalur dan kondisi area sebelum menentukan produk.",
    faq: [
      {
        question: "Apakah guiding sama dengan warning?",
        answer:
          "Tidak. Guiding berpola garis untuk petunjuk arah, sedangkan warning berpola titik untuk isyarat kewaspadaan.",
      },
      {
        question: "Bagaimana menentukan arah pemasangannya?",
        answer:
          "Susunan dan orientasi perlu mengikuti rancangan jalur serta spesifikasi proyek yang ditinjau oleh pihak berkompeten.",
      },
    ],
  },
  {
    slug: "warning-block",
    functionType: "warning",
    title: "Warning Block (Ubin Peringatan)",
    definition:
      "Warning block adalah penanda lantai berpola titik yang mengingatkan pengguna agar lebih waspada terhadap perubahan kondisi jalur. Berbeda dari guiding block yang menunjukkan arah, pola ini memberi isyarat perhatian. Jelajahi pilihan pelat atau stud bulat, lalu sesuaikan penempatan, ukuran, dan cara pemasangannya dengan rancangan aksesibilitas proyek.",
    characteristics:
      "Pola titik berulang sebagai pembeda taktil dari pola garis guiding block.",
    usage:
      "Memberi isyarat agar pengguna lebih waspada terhadap perubahan kondisi pada jalur.",
    selection:
      "Saat diperlukan isyarat kewaspadaan. Lokasi dan susunannya harus mengikuti peninjauan kebutuhan area.",
    faq: [
      {
        question: "Apakah warning menunjukkan arah?",
        answer:
          "Peran utamanya adalah isyarat kewaspadaan. Untuk petunjuk arah, kenali fungsi guiding block berpola garis.",
      },
      {
        question: "Apakah warning bisa ditempatkan di semua lokasi?",
        answer:
          "Penempatan tidak boleh diasumsikan sama untuk setiap lokasi. Periksa konteks area dan desain jalur proyek terlebih dahulu.",
      },
    ],
  },
];
