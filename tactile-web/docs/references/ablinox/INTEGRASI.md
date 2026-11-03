# Integrasi katalog referensi

37 listing dari `src/data/references/ablinox/products.json` dipetakan oleh `src/data/reference-products.ts` dan digunakan pada katalog mode tinjauan (default lokal). Dataset mentah tetap disimpan tanpa perubahan. Mode inventaris resmi (`demo=0`) tetap terpisah.

- 12 URL produk awal dipertahankan; listing selanjutnya memakai slug dataset, dengan akhiran ID bila bertabrakan dengan URL lama. Nama sama tetap menjadi listing berbeda sesuai URL.
- Spesifikasi model dipecah menurut kolom (diameter, panjang, tinggi, pola, pengikat, material). Baris identik dihapus, variasi berbeda dipertahankan.
- Parameter teks produk 29 dibaca untuk warna, bahan dan ukuran. Data kosong tidak diisi dengan angka buatan.
- Informasi sertifikasi, tenggat, MOQ, asal dan pengiriman pemasok tidak dijadikan janji bisnis lokal.
- Gambar menggunakan enam ilustrasi keluarga lokal yang sudah tersedia. Produk strip memakai ilustrasi keluarga studs/strips, bukan foto spesifik model. Tidak ada gambar atau tautan pemasok pada UI.
- Penambahan filter strip memisahkan batang saja dari kombinasi studs/strips. Spesifikasi sumber yang tidak konsisten dengan judul perlu ditinjau sebelum pesanan.
- Untuk memperbarui data, ubah JSON lalu jalankan `npm run check`. Tes pemetaan ada pada `tests/reference-products.test.mjs`.
