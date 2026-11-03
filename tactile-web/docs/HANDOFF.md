# Status implementasi dan handoff

## Fase 0 — fondasi proyek

Next.js App Router, React, TypeScript strict, ESLint, konfigurasi environment, struktur modul, dan panduan lokal. Dokumen PRD tetap terpisah dari source. Lockfile menjadi acuan versi terpasang.

## Fase 1 — sistem desain dan shell

Token CSS semantik netral, Bebas Neue untuk display dan Plus Jakarta Sans untuk body. Layout editorial, container 1280px, breakpoint mobile/tablet/desktop, tombol, link, breadcrumb, accordion native, header/footer. Dialog menu menggunakan `showModal`: fokus modal browser native, Escape, close/backdrop, fokus kembali ke tombol pemicu. Komponen React native digunakan agar tidak perlu lifecycle JavaScript Preline. CSS terpusat dipilih untuk token/pola visual tahap awal, tanpa dependensi Tailwind/Preline yang belum diperlukan.

WhatsApp menggunakan konfigurasi terpusat dan validasi nomor. Status belum dikonfigurasi terlihat serta tidak membuat URL dummy. Tidak ada logo/foto/sertifikat/testimoni perusahaan rekaan.

## Fase 2 — beranda

Hero, edukasi tactile, fungsi guiding/warning, status data material, empat langkah pemilihan, pengantar profil, pintu masuk panduan, FAQ, CTA akhir. Material aktif dan produk pilihan belum diisi: tidak menampilkan inventaris palsu. Ilustrasi CSS adalah diagram pola, diberi label bukan foto produk. Ganti dengan foto resmi setelah tersedia; pertahankan ukuran/aspect ratio dan alt faktual.

## Fase 3 — Tentang Kami

Narasi editorial, status profil draft, fokus informasi, alur komunikasi kebutuhan, status lokasi/kontak. Data perusahaan dan bukti proyek menunggu persetujuan. Karena itu acceptance terkait identitas faktual dan kontak aktif **belum dapat disign-off**.

## Melanjutkan fase 4

1. Siapkan tipe `Product`, fixture produk aktif, dan aset berizin.
2. Ganti route status `/produk` dengan folder `app/produk/page.tsx`; route statis mengungguli route dinamis. Hapus key status saat implementasi selesai.
3. Tambahkan filter search params fungsi/material dan state kosong, baru kategori/detail.
4. Gunakan konfigurasi serta komponen global; hindari menyalin shell ke halaman baru.

## Checklist manual untuk review

- Ukuran 320, 375, 390, 768, 1024, 1440px: tanpa overflow, heading dan CTA terbaca.
- Keyboard: skip link, Tab, buka menu Enter/Space, Escape, fokus kembali; accordion native.
- Direct-load `/`, `/tentang-kami`, `/produk`, `/panduan`, `/faq`, `/kontak`, dan URL tak dikenal.
- Verifikasi nomor approved di lingkungan uji sebelum aktivasi CTA.
- Audit font/foto resmi dan performa setelah aset final tersedia.

Implementasi ini belum termasuk file Figma, konten yang disetujui klien, atau hasil pengukuran Core Web Vitals.


## Pembaruan fase 04–06

Katalog dan kategori kini telah diimplementasikan. Instruksi “Melanjutkan fase 4” di atas adalah catatan historis fase 0–3. Status terkini dan alur memasukkan inventaris resmi ada di [PHASE_04_06.md](PHASE_04_06.md).


## Pembaruan fase 07–09

Detail produk telah menggantikan ringkasan, panduan dan FAQ memiliki route aktual. Status terkini ada pada [PHASE_07_09.md](PHASE_07_09.md). Catatan fase sebelumnya tetap disimpan sebagai riwayat implementasi.


## Handoff fase 0–12

Dokumen final terkini: [RELEASE_HANDOFF.md](RELEASE_HANDOFF.md). Bagian fase sebelumnya di dokumen ini dipertahankan sebagai catatan historis.
