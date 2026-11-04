# Implementasi audit Tactile Indicator — 4 November 2026

Acuan: `../audit-website-tactile-indicator.md`. Perubahan diterapkan pada source lokal `tactile-web`; belum dideploy ke Vercel. Catatan ini menggantikan status implementasi lama pada dokumen fase/handoff untuk bagian yang diubah di sini.

## Perbaikan yang diterapkan

| Area audit | Implementasi |
|---|---|
| Canonical dan WhatsApp localhost | Satu origin di `src/config/site.ts`. Production menolak localhost/non-HTTPS. Default publik `https://tactile-indicator.vercel.app`; dapat diganti dengan `NEXT_PUBLIC_SITE_URL`. |
| Robots/indexing | Production publik index/follow; development dan Vercel preview noindex/follow. `SITE_INDEXABLE=false` dapat menahan indexing production. Artikel belum disetujui dan privasi draft tetap noindex, di luar sitemap. |
| URL demo | Link publik tidak meneruskan `demo=1`; request lama dibersihkan melalui 301. Production mengabaikan override demo dari URL. |
| Label development | Label fase/brand sementara dan banner review generik hanya tampil di preview. Status draft artikel dan kebijakan privasi tetap jujur karena review konten belum selesai. |
| SEO berbagi | Open Graph, Twitter summary_large_image, canonical absolut, hreflang id/en/x-default. `/share?title=...` menghasilkan PNG 1200×630 untuk judul halaman. |
| Sitemap/robots | `/sitemap.xml` mencakup route canonical ID/EN yang dapat diindeks; tanpa parameter/filter, slug lama, tanggal perubahan fiktif, atau halaman draft. `/robots.txt` dapat dibaca crawler agar meta noindex preview dapat diproses. |
| Data terstruktur | WebSite, Product, BreadcrumbList, FAQPage, Article. Organization hanya ketika identitas badan usaha benar-benar diisi dan disetujui di konfigurasi. Tidak ada Offer, harga, rating, review, author atau tanggal artikel fiktif. Validitas markup tidak menjamin rich result. |
| Katalog duplikatif | 37 listing disusun menjadi 9 keluarga produk, masing-masing tetap menyimpan pilihan model sumber. Ini pengelompokan penelusuran, bukan pernyataan bahwa model secara teknis identik. |
| Nama dan bahasa | Nama pendek Indonesia dan padanan Inggris, metadata unik per keluarga. Slug ID yang sudah dipakai tetap dipertahankan di bawah `/en` sebagai kebijakan route agar tautan tidak berganti tanpa kebutuhan. |
| Migrasi slug | 37 slug lama × 2 bahasa → 74 redirect 301 menuju keluarga dan `?model=model-XX`. Canonical keluarga tidak memasukkan query model. |
| Filter | Fungsi, bentuk, grade 304/316/316L, finishing hitam/natural sesuai data sumber, serta urutan A–Z/Z–A. Grade dan finishing harus cocok pada model yang sama. Tidak membuat opsi kuningan tanpa data. |
| Detail dan inquiry | Pemilihan model, grade, dan finishing yang tercantum pada model sumber ikut dalam pesan WhatsApp. Perubahan model menghapus pilihan grade/finishing sebelumnya. CTA footer detail menyertakan nama dan URL produk. |
| Spesifikasi | Parameter sumber dipertahankan per model. Tabel tiap model juga tersedia sebagai HTML server dalam details/summary, sehingga tidak bergantung pada JavaScript. Nilai dimensi tidak digabung lintas model. |
| Foto | 37 foto utama dari dataset sumber disimpan lokal di `public/images/products/ablinox/model-XX.webp`, dengan label referensi pemasok dan tautan sumber model. Logo/watermark tidak dihapus. Foto adalah referensi sumber, belum approval inventaris bisnis pengguna. Arsip JSON tetap menyimpan URL CDN asal. |
| Loading gambar | Overlay loading yang membutuhkan onLoad JavaScript dihapus. HTML memuat gambar Next.js, fallback error tetap berfungsi; gambar utama detail dipreload. Lazy loading kartu tetap aktif. |
| Font | Bebas Neue dan Plus Jakarta Sans disajikan melalui next/font, tanpa request Google Fonts dari browser. Token font didefinisikan pada body agar scope CSS variable benar. |
| UX/copy | Spasi link fungsi/material, format dimensi tertentu, marker material, FAQ mode contoh, metadata kontak, dan konsistensi tagline EN diperbaiki. Produk terkait mendahulukan bentuk/fungsi serupa. CTA penutup kontak dihilangkan untuk mengurangi pengulangan. |
| Identitas | Field konfigurasi untuk nama usaha, legal name, alamat, email dan jam layanan tersedia. Tidak diisi dengan data yang dikarang. |
| Privasi teknis | Informasi font lokal, aset foto lokal, parameter URL, WhatsApp dan kemungkinan log hosting diperbarui. Dokumen tetap draft, bukan kebijakan hukum final. |

## Pemetaan katalog

Nomor di bawah adalah ID referensi dari arsip ABLinox, bukan SKU resmi bisnis.

| Keluarga | ID sumber |
|---|---|
| Pelat Tactile Stainless Steel | 1, 25, 35, 36 |
| Tactile Stud & Strip Stainless Steel | 2, 3, 13, 30, 34 |
| Tactile Stud & Strip Pola Nanas | 10, 20 |
| Tactile Stud Pola Nanas Stainless Steel | 4, 5, 6, 18, 19, 21, 29 |
| Tactile Stud Stainless Steel | 7, 8, 9, 12, 14, 15, 17, 22, 24, 26, 31, 32, 33 |
| Tactile Stud Alur Stainless Steel | 11, 16 |
| Tactile Stud Spiral Stainless Steel | 23 |
| Tactile Strip Pola Nanas Stainless Steel | 27, 28 |
| Tactile Stud Ulir / Thread Stainless Steel | 37 |

Data sumber tidak dianggap telah diverifikasi teknis. Contohnya model 37 memakai nama stud tetapi tabel ukuran mencantumkan dimensi memanjang; deskripsi tidak menyimpulkan sistem pengikat dari kata Thread. Bentuk, dimensi, grade dan finishing harus dikonfirmasi per pesanan. Pengelompokan dan nomor model hanya memudahkan review.

## Verifikasi

- `npm run check`: lint tanpa warning, typecheck, 28 tes otomatis, dan build produksi berhasil.
- HTTP crawl: 43 pemeriksaan Indonesia dan 36 pemeriksaan bilingual berhasil, termasuk 404.
- `node --experimental-strip-types scripts/audit-release.mjs`: 74 redirect, 26 halaman metadata/schema, robots, sitemap, PNG sosial dan kebijakan index draft berhasil.
- Chrome/Playwright: beranda, katalog, detail, FAQ, dan detail EN diperiksa pada lebar 320/375/768/1024/1440; tidak ada overflow horizontal.
- axe-core: 0 pelanggaran terdeteksi pada lima halaman yang diperiksa (WCAG 2 A/AA, 2.1 AA, 2.2 AA). Ini bukan sertifikasi aksesibilitas penuh.
- Keyboard: dialog menu/filter, Escape dan pengembalian fokus berhasil.
- Inquiry: pilihan model/grade/finishing masuk pesan; berpindah model menghapus pilihan lama; URL publik tidak localhost.
- JavaScript dinonaktifkan: foto katalog dan spesifikasi model tetap tersedia; details/summary dapat dibuka.
- Tidak ada browser pageerror saat pengujian.

Bukti ada di `docs/qa/latest-smoke.json`, `docs/qa/latest-i18n-smoke.json`, `docs/qa/audit-2026-11-04/browser-report.json` dan `release-report.json`. Browser QA memakai Playwright/axe sementara di luar dependensi proyek; tidak ada dependensi aplikasi baru.

## Pekerjaan yang memerlukan data atau review berikutnya

1. Identitas PT/CV, alamat, email domain, jam operasional, portofolio, logo klien, testimoni dan izin penggunaan aset untuk publikasi.
2. Approval hubungan katalog referensi terhadap produk yang benar-benar dijual. Lengkapi gambar teknik/datasheet, dimensi yang belum ada, metode pemasangan, hasil uji, MOQ, lead time, sampel dan garansi dari dokumen resmi.
3. Review artikel oleh penanggung jawab aksesibilitas, termasuk sumber Indonesia/ISO terbaru, penulis serta tanggal publikasi. Artikel tetap draft/noindex; belum menambahkan klaim kepatuhan hukum/standar.
4. Kebijakan privasi final, pengendali data, kontak privasi, dasar pemrosesan, masa simpan log dan review kewajiban UU PDP oleh penanggung jawab hukum. Tidak menganggap perubahan teknis sebagai persetujuan kebijakan.
5. Form RFQ/upload denah membutuhkan scope penyimpanan/backend dan kebijakan privasi tersendiri; belum dibuat.
6. Audit screen reader nyata (VoiceOver/NVDA/TalkBack), uji pengguna, Lighthouse/PageSpeed dan Core Web Vitals pada deployment final. Tidak mengklaim skor atau data lapangan yang belum diukur.
7. Deploy dan validasi ulang pada domain tujuan; perubahan lokal belum mengubah situs Vercel yang sedang tayang.
