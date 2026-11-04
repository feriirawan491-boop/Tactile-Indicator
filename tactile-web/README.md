# Tactile Indicator

Frontend katalog tactile indicator berbahasa Indonesia/Inggris dengan inquiry WhatsApp. Menggunakan Next.js App Router, TypeScript dan komponen React. Tidak ada checkout, CMS, akun pelanggan atau penyimpanan lead.

## Menjalankan

Gunakan Node.js 22.18+ dan npm.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Buka http://localhost:3000. Build produksi: `npm run build`, lalu `npm start`. Development memakai `.next-local`, build produksi memakai `.next` agar compiler terpisah.

## Kondisi terbaru — 4 November 2026

37 listing ABLinox disusun menjadi 9 keluarga produk dengan 37 model. Nama Indonesia/Inggris tersedia; setiap model mempertahankan spesifikasi, foto referensi dan URL sumber. Model, grade serta finishing dapat dibawa ke pesan WhatsApp. Seluruh URL listing lama dialihkan ke keluarga dan model yang sesuai. Katalog ini masih referensi pemasok, bukan pernyataan approval inventaris atau stok lokal.

Lihat [laporan implementasi audit](docs/AUDIT_IMPLEMENTATION_2026-11-04.md) untuk pemetaan model, perubahan, hasil QA dan kebutuhan konten. Dokumen fase/handoff sebelumnya adalah riwayat implementasi.

## Konfigurasi

- `NEXT_PUBLIC_SITE_URL`: origin HTTPS publik untuk canonical, sitemap, preview sosial dan URL WhatsApp. Default production `https://tactile-indicator.vercel.app`; localhost ditolak di production.
- `NEXT_PUBLIC_WHATSAPP_NUMBER`: nomor internasional tanpa `+`; `NEXT_PUBLIC_WHATSAPP_APPROVED=true` mengaktifkan link yang valid.
- `NEXT_PUBLIC_CATALOG_DEMO=true`: katalog referensi. `false` memakai inventaris approved di `src/data/catalog.ts`, yang saat ini masih kosong. Override URL hanya tersedia pada preview; URL publik tidak memakai flag demo.
- `SITE_INDEXABLE=false`: menahan indexing production. Development/Vercel preview selalu noindex. Artikel belum disetujui dan privasi draft tetap noindex terlepas dari environment.
- `NEXT_PUBLIC_COMPANY_*`: identitas, alamat, email dan jam operasional yang telah diverifikasi; set `NEXT_PUBLIC_COMPANY_APPROVED=true` hanya setelah review. Organization schema ditampilkan jika legal name dan approval tersedia.

Perubahan environment memerlukan restart/build ulang. Google Fonts disajikan lokal melalui next/font. Foto produk referensi tersimpan lokal; tautan sumber membuka pemasok hanya ketika dipilih. Preview sosial dibuat sebagai PNG 1200×630 di `/share`.

## Pemeriksaan

```sh
npm run check
# Server produksi terpisah untuk QA:
npm run start -- --port 3104
# Di terminal lain:
BASE_URL=http://127.0.0.1:3104 npm run test:smoke
BASE_URL=http://127.0.0.1:3104 npm run test:i18n
BASE_URL=http://127.0.0.1:3104 npm run test:audit
```

Smoke test default menguji indexing production. Untuk server development/preview gunakan `EXPECT_NOINDEX=true` pada test:smoke. Pengujian HTTP dibatasi ke localhost. Bukti tersimpan di `docs/qa/`.

## Peta source

- `src/app/`: route publik ID dan `/en`, metadata, sitemap, robots dan gambar sosial.
- `src/data/core-products.ts`: keluarga/model dan migrasi slug.
- `src/data/references/ablinox/products.json`: arsip sumber 37 listing.
- `src/config/`: origin, identitas, kontak dan pengaturan katalog.
- `src/components/`: layout, katalog, filter, galeri, tabel, inquiry dan konten.
- `src/lib/`: filter/URL, SEO, pagination dan builder WhatsApp.
- `src/i18n/`: kamus ID/EN; slug yang sama dipertahankan di bawah `/en`.
- `public/images/products/ablinox/`: foto referensi pemasok, tanpa menghapus watermark.
- `docs/`: audit, hasil verifikasi dan riwayat fase.

Identitas usaha, approval produk, sertifikasi, ketentuan pemesanan, portofolio dan kebijakan privasi final masih memerlukan data pemilik. Tidak mengarang klaim atau mengganti status persetujuan data hanya karena tampilan sudah diperbaiki.
