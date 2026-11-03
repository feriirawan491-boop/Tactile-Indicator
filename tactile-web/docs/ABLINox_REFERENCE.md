# Referensi produk ABLinox — 3 November 2026

Sumber yang diberikan pengguna:
https://www.ablinoxprecision.com/product/custom-304-stainless-steel-tactile-studs-strips/

Halaman berhasil dibaca melalui HTTP langsung setelah web fetch awal mengalami 502. Data adalah informasi pemasok pada saat ditinjau, bukan approval stok, harga, sertifikasi, atau hubungan bisnis perusahaan pengguna.

## Koreksi bentuk

Stainless di halaman sumber berupa **stud dan strip individual**. Ilustrasi AI panel persegi sebelumnya tidak digunakan lagi sebagai gambar dua produk stainless di katalog. Beton/polyurethane tetap merupakan ilustrasi contoh terpisah.

Dua kartu stainless kini memakai foto sumber, galeri, model/ukuran referensi, dan tautan atribusi di detail. Jalur detail lama dipertahankan agar tautan tidak rusak:

- `/produk/contoh-stainless-steel-guiding?demo=1`
- `/produk/contoh-stainless-steel-warning?demo=1`

Foto milik sumber disimpan lokal tanpa crop, penghapusan logo, atau generative editing:

| File lokal (public/images/products/ablinox/) | Sumber CDN |
|---|---|
| studs-strips-overview.webp | https://icdn.ablinoxprecision.com/2026/07/59.webp |
| studs-strips-detail-01.webp | https://icdn.ablinoxprecision.com/2026/07/cd646290d414ccffe9eebf6a894062c9-1.webp |
| studs-strips-detail-02.webp | https://icdn.ablinoxprecision.com/2026/07/c64c1f6c38dce930d363453d3eee9c0e-1.webp |
| studs-strips-detail-03.webp | https://icdn.ablinoxprecision.com/2026/07/f32bc688145a4d94fcf2d264cee12dbb.webp |

Gambar pertama/galeri dipilih setelah inspeksi visual: foto detail-02 menampilkan studs; detail-03 menampilkan strips dan sisi pengikat. Gambar tidak diklaim sebagai hasil produksi atau foto milik perusahaan pengguna. Hak penggunaan untuk publikasi perlu diselaraskan dengan pemilik aset sebelum rilis; saat ini dipakai pada review lokal beratribusi.

## Pemetaan data

`src/data/references/ablinox.ts` memetakan informasi pemasok ke kontrak produk. `imageKind: reference` dan `source` membedakan foto pemasok dari generated/official. Semua entry tetap `approved: false` sampai katalog perusahaan dikonfirmasi.

Model dan parameter ditampilkan per baris dengan nama model yang berlaku; tidak menggabungkan diameter/tinggi dari model berbeda. Varian tidak dipilih otomatis. Foto yang memperlihatkan perekat tidak dijadikan klaim bahwa semua model memiliki perekat. Tidak menyalin klaim kualitas, kepatuhan, atau data kontak pemasok sebagai identitas website pengguna.

Beranda dan pengantar fungsi katalog kini memakai stud/strip individual dari sumber yang sama, agar audiens tidak menyamakan produk dengan ubin panel.
