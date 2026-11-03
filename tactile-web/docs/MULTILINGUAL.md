# Bahasa Indonesia / English

Versi Bahasa Indonesia mempertahankan URL lama. Versi Inggris tersedia pada `/en` dan `/en/...`, misalnya `/en/produk` dan `/en/faq`. Slug produk/artikel tetap sama agar identitas data dan tautan konsisten; tidak menduplikasi dataset atau tampilan halaman.

## Pengalaman pengguna

- Pengalih ID/EN tersedia di header dan dialog menu mobile.
- Beralih bahasa membuka halaman padanannya, mempertahankan query filter/search dan hash bila pengguna mengklik langsung.
- Internal links dan form GET memakai prefix locale aktif. Filter values tetap berupa identifier data yang sama, sedangkan label diterjemahkan.
- Bahasa tersimpan pada URL, tanpa cookie atau localStorage baru. Membuka `/` berarti Indonesia; `/en` berarti Inggris.
- WhatsApp tetap 6281222952857. Pesan awal menyesuaikan bahasa, termasuk enquiry produk/varian, dan URL produk menggunakan bahasa aktif. Tidak ada pesan dikirim otomatis.
- `html lang`, title, description, canonical, serta alternate hreflang ID/EN menyesuaikan halaman. Noindex pratinjau tetap berlaku.

## Struktur implementasi

- `src/i18n/en.json`: kamus Inggris, dengan teks sumber Indonesia sebagai key.
- `src/i18n/core.ts`: penerjemahan teks, fragmen kalimat dinamis, serta helper URL. Penerjemahan fragmen memakai word boundaries dan melindungi URL agar tidak mengubah slug atau link enquiry.
- `src/i18n/server.ts`: membaca locale request di Server Components.
- `src/i18n/client.tsx`: provider/hook locale untuk menu, filter, galeri, dan selector varian.
- `src/components/layout/LanguageSwitcher.tsx`: native links untuk pergantian locale.
- `src/app/en/`: route entry tipis yang re-export implementasi halaman utama. Tidak ada salinan konten halaman.
- `src/proxy.ts`: menentukan locale berdasarkan prefix dan menangani validasi slug/404 di kedua bahasa.
- `src/lib/seo.ts`: metadata terjemahan dan alternate URLs.

Penerjemahan terjadi saat server render untuk konten publik, bukan mengubah DOM setelah halaman dimuat. Karena locale dibaca dari headers, halaman HTML kini dirender per request. Server Components tetap menjadi default; komponen interaktif membaca provider yang sama saat SSR dan hydration.

## Menambah konten

1. Tambahkan copy Indonesia pada data/komponen yang sesuai.
2. Tambahkan key/value Inggris ke en.json. Key menggunakan whitespace yang dinormalisasi; paragraf lengkap lebih diutamakan daripada substitusi kata.
3. Render teks dengan `tr(value)` atau `t(value)` dari helper server/hook client. Gunakan helper `href` untuk navigasi internal.
4. Jangan menerjemahkan className, ID, slug, filter value, SKU, atau nama brand. Nama produk yang sudah Inggris tetap dipertahankan.
5. Untuk route baru, tambahkan entry re-export pada app/en dengan default serta generateMetadata yang sama.
6. Jalankan check dan dua smoke suites. Tinjau copy EN yang lebih panjang pada mobile sebelum sign-off.

Root-layout emergency fallback tetap dapat menggunakan locale default saat provider tidak tersedia. Error route biasa dan 404 memakai locale request. Tidak ada klaim QA browser/screen reader menyeluruh pada sesi ini.

## Verifikasi

```sh
npm run check
# Dengan build produksi berjalan pada port 3001:
BASE_URL=http://127.0.0.1:3001 npm run test:smoke
BASE_URL=http://127.0.0.1:3001 npm run test:i18n
```

Hasil 3 November 2026:

- Lint, TypeScript strict, dan build: lulus.
- 18 unit tests: lulus.
- 47 pemeriksaan URL Indonesia dan 42 bilingual/English: lulus.
- Versi Inggris diuji untuk lang=en, single H1, canonical, alternate language links, link/filter yang tidak bocor ke locale lain, 12 detail produk, artikel, FAQ, kontak, privasi, dan 404.
- Query filter dipertahankan oleh link pengalih bahasa; form English mengarah ke `/en/produk`.
- Pesan WhatsApp English diawali Hello, memakai nomor yang benar, dan URL tidak berubah akibat penerjemahan.

Laporan mesin: `docs/qa/latest-smoke.json` dan `docs/qa/latest-i18n-smoke.json`. Pemeriksaan visual reflow English, keyboard, dan screen reader secara langsung tetap perlu review browser. Terjemahan tidak menggantikan persetujuan konten/privasi klien.
