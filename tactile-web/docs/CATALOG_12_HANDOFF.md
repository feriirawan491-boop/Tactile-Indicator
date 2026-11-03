# Katalog 12 listing dan visual mandiri

3 November 2026. Mengikuti daftar 12 produk yang diberikan pengguna; bukan seluruh katalog empat halaman. Tidak membuat halaman 2–4 atau mengarang listing tambahan.

## Tampilan

- Semua 12 nama disimpan sebagai listing terpisah dengan URL unik.
- Kelompok bentuk: 1 tiles/pelat, 8 studs/titik, 3 studs & strips.
- Filter bentuk baru memakai query `bentuk=tiles|studs|studs-strips`.
- Listing campuran dan tiles masuk fungsi guiding maupun warning sesuai komponen yang dipilih; delapan listing studs masuk warning. Nama “guide stud” tidak otomatis dianggap batang guiding.
- Katalog tetap merupakan pratinjau sampai status produk/penawaran perusahaan dikonfirmasi.
- Ukuran, sertifikasi, stok, dan klaim performa tidak diasumsikan. Grade hanya ditampilkan ketika ada pada nama listing.

## Visual

Enam gambar keluarga dibuat baru dengan **built-in ImageGen**. Tidak menggunakan foto pemasok sebagai target edit, tidak menghapus watermark, dan tidak menyalin komposisi foto sumber. Semua hasil: latar cool gray, pencahayaan kanan atas, sudut elevated, benda tersusun diagonal, tanpa logo atau teks. File diperiksa visual sebelum dipakai.

Direktori final: `public/images/products/catalog-v2/`.

| File | Listing yang memakai |
|---|---|
| tiles.webp | 1 |
| studs-strips.webp | 2, 3, 10 |
| black-studs.webp | 4, 5 |
| silver-pineapple.webp | 6 |
| silver-solid.webp | 7, 8, 9, 12 |
| silver-grooved.webp | 11 |

Listing yang belum memiliki pembeda teknis menggunakan visual keluarga yang sama. Ini disengaja agar tidak menciptakan bentuk/pengikat/tekstur fiktif untuk membedakan nama yang mirip. Ilustrasi tidak digunakan sebagai acuan dimensi, finishing, atau konstruksi final.

[Prompt lengkap final](CATALOG_V2_PROMPTS.json). Aset WebP sekitar 32–116 KB masing-masing. Beranda, pengantar pemilihan, kartu, kategori, dan detail memakai aset lokal yang sama.

## Penghapusan referensi pada tampilan

Foto pemasok dikeluarkan dari folder public dan tidak dirender lagi. Nama, atribusi, tautan, serta data source pemasok dihapus dari komponen produk dan dataset runtime. Modul referensi pemasok lama dihapus. Dokumen riwayat nonpublik tetap merupakan catatan implementasi, bukan konten situs.

## Pengujian

- Lint, TS strict, 13 tes dan production build lulus.
- Smoke produksi: 47 URL lulus; seluruh 12 detail dan tautan katalog diperiksa.
- Pengujian HTTP khusus: 12 hasil default; bentuk tiles 1, studs 8, kombinasi 3; guiding 4, warning 12. Semua gambar melalui Next Image merespons 200.
- Crawl memeriksa tidak ada nama/domain pemasok atau label foto referensi pada HTML publik.
- Pemeriksaan visual browser/keyboard langsung belum tersedia; inspeksi visual pada file gambar sudah dilakukan.
