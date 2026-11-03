import type { FunctionCategoryView } from "@/types/product";
export const functionCategories: FunctionCategoryView[] = [
  {
    slug: "guiding-block",
    functionType: "guiding",
    title: "Guiding Block (Ubin Pemandu)",
    definition:
      "Guiding block menggunakan pola garis memanjang untuk membantu pengguna mengenali arah perjalanan melalui tekstur permukaan. Pola ini dapat dirasakan dengan kaki atau tongkat. Dalam perencanaan jalur, pola arah perlu dibaca sebagai bagian dari susunan yang utuh, bukan elemen dekoratif yang berdiri sendiri. Pilihan material, ukuran, dan cara pemasangan harus diperiksa berdasarkan kebutuhan area serta spesifikasi produk yang telah dikonfirmasi. Halaman ini memperkenalkan fungsi dasarnya; keputusan penempatan tetap memerlukan peninjauan desain jalur proyek.",
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
      "Warning block menggunakan pola titik yang memberi isyarat kewaspadaan atau perubahan kondisi pada suatu jalur. Tekstur titik membedakannya dari guiding block yang memakai garis memanjang. Penggunaan pola peringatan perlu mempertimbangkan konteks ruang, kesinambungan jalur, dan kondisi yang ingin diinformasikan kepada pengguna. Material maupun ukuran tidak dapat dipilih hanya dari tampilan pola. Konfirmasikan spesifikasi produk dan tinjau rancangan area sebelum menentukan kebutuhan. Penjelasan ini merupakan pengantar fungsi, bukan panduan pemasangan teknis atau pernyataan kepatuhan terhadap standar tertentu.",
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
