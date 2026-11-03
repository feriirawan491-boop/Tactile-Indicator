# Implementasi fase 04–06

## Fase 04 — katalog

Route `/produk` memakai filter single-select fungsi/material dan pencarian nama/deskripsi. Form GET menyimpan state pada URL dan mendukung direct load, back/forward, serta berbagi tautan tanpa state terpisah yang rentan race. Filter lintas kelompok memakai AND. Query tidak valid diabaikan; parameter berulang menggunakan nilai pertama. Search dibatasi 100 karakter. Filter diterapkan saat tombol ditekan, tidak otomatis pada setiap perubahan.

Desktop memakai sidebar dan grid 3 kolom, tablet 2 kolom, mobile satu kolom dan dialog filter native. Dialog menangani modal focus, Escape, backdrop, dan pengembalian fokus. Chips dapat dihapus satu per satu dan reset mempertahankan mode contoh bila aktif. Filter penggunaan tidak muncul karena belum tersedia data penggunaan yang terverifikasi. Dataset kecil tidak membutuhkan pagination.

ProductCard memiliki rasio gambar tetap serta fallback jika gambar kosong/gagal. Tautan kartu membuka ringkasan minimal pada `/produk/[slug]`; galeri, varian, dan spesifikasi penuh tetap fase 07. Error boundary menyediakan retry. Boundary `loading.tsx` tidak ditempatkan di induk produk agar slug tidak valid dapat mengembalikan status HTTP 404 sebelum streaming dimulai.

## Fase 05 — kategori fungsi

- `/produk/fungsi/guiding-block`
- `/produk/fungsi/warning-block`

Keduanya memakai template yang sama, definisi/FAQ/metadata berbeda, diagram garis/titik berlabel, ciri fisik, kegunaan, pertimbangan memilih, material relevan, dan produk yang disaring berdasarkan fungsi. CTA WhatsApp menerima pesan kontekstual, tetap nonaktif sampai nomor disetujui.

## Fase 06 — kategori material

Route `/produk/material/[slug]` hanya tersedia jika material mempunyai produk pada dataset terpilih. Mode resmi membutuhkan material dan produk berstatus approved. Slug tak dikenal atau material tanpa produk aktif mendapat 404. Spesifikasi yang kosong tidak dirender sebagai tabel atau angka perkiraan. Belum ada foto/spesifikasi material resmi; tidak menggunakan foto material rekaan.

## Pemisahan resmi dan contoh

- `src/data/catalog.ts`: `approvedProducts` dan `approvedMaterials` masih kosong, menunggu klien.
- `src/data/fixtures/products.ts`: 5 kartu contoh, 3 material; semuanya `approved: false`, tanpa foto atau angka spesifikasi.
- Mode contoh hanya aktif lewat `?demo=1`; ada tombol eksplisit di katalog dan banner jelas. Parameter ini diteruskan ke kategori material serta ringkasan kartu.
- Contoh: `/produk?demo=1`, `/produk/material/beton?demo=1`.
- `/produk/material/beton` tanpa mode contoh tetap 404, karena tidak ada konfirmasi bahwa material dijual.
- Seluruh website masih `noindex`. Konten edukasi dan fixture belum merupakan sign-off klien.

## Menambah data resmi

1. Masukkan material dan produk yang sudah disetujui ke koleksi approved; set `approved: true`.
2. Pastikan `materialSlug` produk cocok dengan slug material, dan slug produk unik.
3. Isi gambar hanya dari aset yang berizin. Gunakan aset lokal di public; konfigurasi remote image diperlukan bila menggunakan domain eksternal.
4. Isi spesifikasi material hanya jika faktual dan berlaku untuk kategori tersebut.
5. Uji `npm test`, lint, build, dan respons route setelah perubahan data.
6. Implementasikan detail produk fase 07 di route ringkasan yang sudah ada.

## Modul

- `src/types/product.ts`: kontrak katalog/kategori.
- `src/lib/catalog.ts`: normalisasi, filtering, dan pembentukan URL.
- `src/components/product/`: filters, cards, image fallback, grid/empty, category templates, diagram, banner contoh.
- `src/data/function-categories.ts`: konten kategori fungsi.
- `tests/catalog.test.mjs`: tes perilaku filter dan URL.

## Batas QA

Pemeriksaan otomatis mencakup filter, search, URL encoding, query invalid/berulang, no-result, pemisahan fixture, HTTP route, klasifikasi kartu, tautan ringkasan, dan status 404. Keyboard, history browser, fallback gambar nyata, serta viewport 320–1440px tetap memerlukan QA browser langsung. Tidak ada klaim pengukuran Lighthouse.
