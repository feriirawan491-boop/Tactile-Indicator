# Pembaruan pemahaman produk dan visual — 3 November 2026

## Perubahan untuk audiens

- Beranda mengenalkan dua pola dengan gambar yang sama seperti katalog, sehingga pengguna bisa mengenali bentuk sebelum membaca istilah guiding/warning.
- Katalog dimulai dari pertanyaan kebutuhan: petunjuk arah atau isyarat peringatan. Pilihan tersebut membuka filter fungsi yang sesuai.
- Perbandingan material menjelaskan tampilan pada visual serta hal yang perlu diperiksa, bukan menentukan material terbaik tanpa data teknis.
- Kartu menggunakan label Pemandu Arah/Peringatan, pola permukaan, dan status konfirmasi spesifikasi. Ukuran font kartu/form diperbesar.
- Detail menambahkan peran produk, deskripsi bentuk, pola, tampilan material, pertimbangan pemilihan, dan checklist konfirmasi sebelum memesan.
- Pemisahan penting: bentuk/warna pada visual adalah ilustrasi; dimensi, ketebalan, ketersediaan, dan metode pemasangan tetap perlu data resmi.

## Perilaku pratinjau lokal

Bila inventaris resmi kosong dan pengunjung membuka `/produk` tanpa parameter demo, halaman mengarahkan ke `/produk?demo=1`, mempertahankan filter yang ada. Ini membuat produk contoh terlihat langsung untuk review UI. Banner selalu menjelaskan bahwa ini pratinjau dan visual AI. `/produk?demo=0` tetap tersedia untuk melihat inventaris resmi saja, saat ini kosong. Reset/form pada mode resmi mempertahankan `demo=0`.

Produk dan material contoh tetap memerlukan `demo=1` pada detail/kategori; tanpa mode itu hasilnya 404. Tidak ada fixture yang berubah menjadi approved. Saat menyiapkan publikasi, review perilaku pratinjau bersama kebijakan noindex dan inventaris resmi.

## Aset gambar

Dibuat menggunakan **built-in ImageGen**, lalu dikonversi ke WebP untuk pemuatan website. Bukan foto produk resmi. Kelima gambar memakai framing persegi, sudut elevated tiga perempat, latar abu-abu hangat, pencahayaan lembut dari kiri atas, serta objek tunggal. Hasil visual telah diperiksa: guiding menggunakan garis, warning menggunakan titik, dengan variasi tekstur untuk beton/stainless/polyurethane.

File final proyek:

- `public/images/products/beton-guiding-v1.webp`
- `public/images/products/beton-warning-v1.webp`
- `public/images/products/stainless-steel-guiding-v1.webp`
- `public/images/products/stainless-steel-warning-v1.webp`
- `public/images/products/polyurethane-warning-v1.webp`

Semua gambar 1254 × 1254 px; ukuran file sekitar 68–184 KB. Gambar memakai Next Image, alt deskriptif, label ILUSTRASI AI, rasio stabil, loading dan error fallback. Gambar yang sama dipakai lintas kartu/detail/kategori agar tidak berubah identitas. Tidak menciptakan sudut foto lain yang bisa mengubah bentuk produk.

[Prompt lengkap setiap aset](PRODUCT_IMAGE_PROMPTS.json). `src/data/product-education.ts` menyimpan copy material terpusat. `src/styles/product-discovery.css` berisi gaya pembaruan ini. Komponen baru: ProductChooser, ProductEducation, ProductShowcase.

## Validasi

- Lint, TypeScript strict, production build lulus.
- 13 tes lulus termasuk kecocokan path gambar/fungsi/material, file WebP tersedia, batas ukuran aset, dan reset mode resmi.
- 42 URL lolos smoke pada build produksi.
- HTTP gambar hasil Next Image diuji pada beranda, katalog, detail, dan kategori material; semuanya 200 dan memiliki alt.
- `/produk` mengarahkan ke pratinjau, sedangkan `demo=0` tetap mode resmi.
- QA visual browser langsung belum tersedia pada sesi ini. Inspeksi visual dilakukan terhadap file gambar hasil generasi; bukan klaim audit responsivitas/screen reader.


## Koreksi setelah referensi pemasok diberikan

Gambar dan parameter dua produk stainless diperbarui dari ABLinox: stud/strip individual, bukan panel. Lihat [ABLINox_REFERENCE.md](ABLINox_REFERENCE.md). Aset AI stainless lama dipertahankan sebagai arsip tetapi tidak lagi dipakai pada kartu/detail stainless. Beranda dan pengantar pemilihan juga memakai foto referensi berlabel.
