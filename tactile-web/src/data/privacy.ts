// Factual implementation notes only; replace with client-approved policy before publication.
export const privacyDraft = {
  updated: "2026-11-03",
  sections: [
    {
      id: "pengelola",
      title: "Identitas pengelola",
      paragraphs: [
        "Identitas badan usaha dan kontak penanggung jawab belum dikonfirmasi. Nama Tactile Indicator pada pratinjau ini merupakan identitas tampilan sementara.",
      ],
    },
    {
      id: "fitur-website",
      title: "Data pada fitur website",
      paragraphs: [
        "Frontend ini tidak menyediakan akun pengguna, pembayaran, formulir kontak, atau penyimpanan lead. Filter katalog, kata kunci pencarian, dan mode contoh tersimpan pada URL halaman. Hindari memasukkan informasi pribadi ke kolom pencarian karena URL dapat tersimpan pada riwayat browser.",
        "Pilihan varian dan gambar aktif dipakai sebagai state antarmuka. Source aplikasi tidak memasang analitik, cookie pelacakan, atau menyimpan preferensi ke localStorage. Catatan ini tidak mencakup kebijakan logging penyedia hosting yang belum dipilih.",
      ],
    },
    {
      id: "layanan-eksternal",
      title: "Layanan dan tautan eksternal",
      paragraphs: [
        "Font dimuat dari Google Fonts melalui stylesheet eksternal. Browser dapat melakukan permintaan jaringan ke layanan tersebut. Jika penggunaan font pihak ketiga tidak disetujui, developer perlu beralih ke aset font lokal berizin.",
        "Tautan WhatsApp yang sudah diaktifkan membuka layanan WhatsApp dengan teks awal berisi konteks konsultasi. Pesan tidak dikirim otomatis. Tautan email membuka aplikasi email. Artikel juga memiliki tautan rujukan ke situs eksternal. Penggunaan layanan tersebut mengikuti kebijakan masing-masing penyedia.",
      ],
    },
    {
      id: "status-dokumen",
      title: "Status dokumen dan kontak",
      paragraphs: [
        "Halaman ini adalah ringkasan implementasi untuk review, bukan kebijakan privasi final yang telah disetujui. Naskah resmi, identitas pengelola, kontak, dan ketentuan layanan pihak ketiga perlu disediakan atau disetujui klien sebelum publikasi.",
        "Informasi kontak yang telah dikonfirmasi akan tersedia pada halaman Kontak.",
      ],
    },
  ],
};
