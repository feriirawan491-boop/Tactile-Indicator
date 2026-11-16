# Audit kode sebelum build — 16 November 2026

Status: audit selesai, build belum dijalankan. Belum direkomendasikan melewati pemeriksaan rilis sebelum temuan prioritas sedang ditangani.

Lingkup: source Next.js/React/TypeScript, routing dan redirect produk, katalog dan filter, inquiry WhatsApp, metadata SEO/schema, locale ID/EN, gambar, CSS responsif, aksesibilitas dasar, dependensi produksi, dan skrip QA. Audit ini tidak mengubah source aplikasi atau dependensi.

## Hasil pemeriksaan

| Pemeriksaan | Hasil |
| --- | --- |
| ESLint | Lolos |
| TypeScript (`next typegen` + `tsc --noEmit`) | Lolos; tidak melakukan build |
| Unit test yang tersedia | 28/28 lolos |
| npm audit dependensi produksi | 0 kerentanan dilaporkan registry pada waktu pemeriksaan |
| Pemeriksaan HTTP independen | 46 rute: 44 halaman valid HTTP 200, 2 rute tidak valid HTTP 404 |
| H1 pada 44 halaman valid | Masing-masing satu H1 |
| WhatsApp pada halaman yang diperiksa | Semua tujuan 6282214922270 |
| Skrip smoke asli | Gagal karena ekspektasi nomor WhatsApp lama |
| Skrip smoke i18n asli | Gagal karena ekspektasi nomor WhatsApp lama; assertion headline juga masih lama |
| Pemeriksaan lanjutan dengan salinan sementara di /tmp | 43 pemeriksaan smoke + 36 pemeriksaan bilingual lolos setelah ekspektasi nomor/headline disesuaikan di salinan sementara saja |

Laporan pemeriksaan HTTP tersimpan di `/tmp/tactile-http-audit.json`. Hasil salinan skrip tersimpan di `/private/tmp/docs/qa/latest-smoke.json` dan `/private/tmp/docs/qa/latest-i18n-smoke.json`. Skrip asli belum diubah; hasil salinan tidak berarti skrip asli sudah lolos.

## Temuan

### 1. Sedang — skrip smoke tidak mengikuti konfigurasi yang sekarang

Lokasi: `scripts/smoke.mjs:67`, `scripts/smoke-i18n.mjs:68` dan `:105`.

Skrip mengharapkan nomor 6281222952857, sedangkan konfigurasi dan HTML menggunakan nomor yang sudah diminta pengguna: 6282214922270. Skrip i18n juga mengharapkan headline `PERMUKAAN KECIL.` yang sudah diganti. Keduanya menghentikan pemeriksaan lebih lanjut walau tujuan WhatsApp yang tampil benar.

Tindakan: selaraskan ekspektasi dengan konfigurasi terbaru dan pastikan pemeriksaan konten menguji kontrak yang memang ingin dipertahankan. Perbarui dokumentasi aktif `docs/MULTILINGUAL.md`; dokumen audit historis tetap diberi konteks tanggalnya.

### 2. Sedang — Model 08 natural diberi label Hitam

Lokasi: `src/data/core-products.ts:99-105`.

Label menggunakan `finishes.length` untuk menambahkan kata Hitam. Akibatnya model dengan finishing natural ikut diberi label Hitam. Reproduksi: Model 08 memiliki `finishes: ["natural"]`, tetapi labelnya `Model 08 · 304 / 316L / 316 · Hitam`. Label model tampil di pilihan varian dan dapat masuk ke pesan inquiry.

Tindakan: tambahkan label Hitam hanya jika `finishes.includes("black")`; tampilkan natural secara terpisah bila diperlukan. Tambahkan regresi untuk model natural.

### 3. Sedang — pencarian versi Inggris tidak mencakup nama Inggris

Lokasi: `src/lib/catalog.ts:59-62`.

Indeks pencarian hanya berisi nama/deskripsi Indonesia dan material. `englishName` tidak disertakan. Reproduksi langsung pada katalog: pencarian `pineapple` dan `grooved` menghasilkan 0 produk, sedangkan `nanas` menghasilkan 3 dan `alur` menghasilkan 1. Pengunjung Inggris tidak menemukan istilah yang muncul di nama produk bahasa Inggris.

Tindakan: sertakan `englishName` dan istilah relevan dari model ke teks pencarian; uji kedua bahasa dengan filter gabungan.

### 4. Sedang — caption foto kategori tidak sesuai dengan jenis aset

Lokasi: `src/components/product/CategoryPage.tsx:60-65` dan `:163-165`.

Halaman fungsi/material menggunakan foto model lokal dari katalog, tetapi caption selalu menyebut ilustrasi AI. Jenis gambar tidak ditentukan dari `imageKind` atau asal aset. Ini membuat informasi foto produk bertentangan dengan galeri detail.

Tindakan: buat caption sesuai jenis aset: foto referensi, foto produk yang disetujui, ilustrasi, atau diagram.

### 5. Rendah — status gagal gambar menetap saat berganti model

Lokasi: `src/components/product/ProductImage.tsx:10-20`.

Komponen menyimpan `failed` sebagai boolean tanpa mengaitkannya dengan `image.src`. Jika satu foto model gagal dimuat, mengganti model pada komponen yang sama tetap menampilkan fallback walaupun URL foto berikutnya valid. Temuan dari alur state source; simulasi browser belum dijalankan.

Tindakan: simpan URL gambar yang gagal atau reset komponen dengan key URL; uji kegagalan satu gambar lalu pindah ke gambar valid.

### 6. Rendah — dialog menu mobile belum memiliki nama aksesibel

Lokasi: `src/components/layout/SiteHeader.tsx:70-77`.

`dialog.mobile-nav` tidak memiliki `aria-label` atau `aria-labelledby`. Label pada nav di dalamnya tidak memberi nama pada dialog. Dialog filter sudah memiliki aria-label.

Tindakan: hubungkan dialog dengan judul MENU NAVIGASI melalui aria-labelledby.

### 7. Rendah — tata bahasa Inggris untuk satu model

Lokasi: `src/data/core-products.ts:132` dan `src/i18n/en.json`.

Fragmen terjemahan menghasilkan `Explore 1 models` pada kategori spiral dan ulir. Terjemahan memakai substitusi fragmen dan tidak memilih bentuk singular/plural.

Tindakan: format jumlah dengan singular/plural, atau gunakan kalimat tanpa jumlah jika tidak diperlukan.

## Keputusan konten dan konfigurasi sebelum publikasi

- Artikel masih `approved: false`, sehingga metadata detail artikel noindex dan artikel tidak masuk sitemap produksi. Ini sesuai implementasi saat ini; perlu keputusan editorial jika artikel ingin ditargetkan ke pencarian. Jangan mengaktifkan approval secara otomatis saat audit.
- Badge draft artikel pada `src/app/panduan/[slug]/page.tsx:51` tidak dikondisikan oleh preview/approval. Bahkan jika artikel nanti disetujui, badge tetap muncul. Badge identitas perusahaan di halaman kontak juga tampil selama company.approved false. Tentukan informasi yang layak tampil ke pengunjung sebelum publikasi.
- Preview lokal memakai noindex dan sitemap kosong sesuai konfigurasi. Audit dev ini tidak membuktikan metadata/robots produksi sudah benar; pemeriksaan produksi dilakukan setelah build diizinkan.
- Jika `NEXT_PUBLIC_CATALOG_DEMO=false`, approvedProducts dan approvedMaterials masih kosong. Mengubah flag ini akan mengosongkan katalog. Jangan mengubah flag deployment tanpa menyiapkan data inventaris.
- Folder gambar `public/images/products/ablinox-cropped/` dan komponen SelectionIllustration masih untracked saat audit. Pastikan ikut disertakan saat menyimpan perubahan untuk deployment; source sudah merujuk ke folder baru.

## Batas pemeriksaan

Tidak menjalankan `next build`, `npm run build`, `npm run check` (karena memicu build), server produksi, atau deployment. Tidak mengubah paket dan tidak mengirim pesan WhatsApp.

Tidak tersedia browser otomasi pada sesi ini. Layout mobile, keyboard/focus dialog, screenshot pada viewport 320/375/390/768 px, interaksi pemilihan model, serta Core Web Vitals belum diverifikasi secara visual. Pemeriksaan HTTP tidak mengeksekusi JavaScript browser dan bukan pengganti pemeriksaan tersebut. Audit dependensi hanya mencakup advisory yang dilaporkan npm untuk paket produksi pada waktu pemeriksaan.

Setelah temuan diperbaiki: ulangi tes terkait dan lint/typecheck; cek tampilan dan interaksi mobile; kemudian tunggu instruksi pengguna untuk build dan pemeriksaan produksi.
