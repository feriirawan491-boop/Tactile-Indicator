# Implementasi fase 07–09

## Fase 07 — detail produk

Route `/produk/[slug]` kini menampilkan galeri dan ringkasan dalam dua kolom desktop, ditumpuk pada mobile, atribut fungsi/material, pilihan varian, dua jalur inquiry, spesifikasi, catatan penggunaan, tautan edukasi, dan produk terkait. Data tetap dibatasi melalui `getCatalog`: produk contoh hanya bisa dibuka dengan `?demo=1`.

Kontrak `ProductCardView` diperluas dengan field opsional `gallery`, `description`, `specs`, `variants`, `preselectedVariantId`, `variantRequired`, dan `applicationNotes`. Perluasan ini menjaga kartu/filter yang sudah ada tetap kompatibel. Saat data berkembang, kontrak detail dapat dipisahkan tanpa mengubah URL.

- Gallery memakai Next Image, rasio stabil, thumbnail button dengan aria-pressed, dan fallback untuk gambar kosong/gagal. Tidak menggunakan foto rekaan. Thumbnail muncul hanya jika ada lebih dari satu foto.
- Tidak ada varian yang dipilih otomatis kecuali ID preselected benar-benar ditemukan dalam data.
- Konsultasi umum tidak dikunci saat varian kosong. Jika varian wajib, tombol permintaan penawaran menampilkan validasi inline sampai dipilih.
- `composeProductMessage` menyertakan nama produk, varian hanya jika dipilih, dan URL canonical produk. URL tidak menyertakan `demo=1` karena pesan menggunakan canonical; data contoh tidak ditujukan untuk inquiry nyata.
- Nomor WhatsApp tetap melalui config approved. Tidak ada pesan yang otomatis dikirim.
- Spesifikasi tanpa nilai dihilangkan. Fixture tidak mengarang ketebalan, harga, stok, atau SKU. Pilihan ukuran beton berlabel “contoh uji”, bukan produk resmi.
- Product schema dengan offers/reviews tidak dibuat karena belum ada data resmi yang memadai.

## Fase 08 — panduan

Route `/panduan` dan tiga artikel:

- `/panduan/apa-itu-tactile-indicator`
- `/panduan/perbedaan-guiding-dan-warning`
- `/panduan/checklist-memilih-tactile-indicator`

Index memiliki featured card, filter topik melalui query `topik`, dan kartu editorial. Dataset kecil tidak memerlukan pagination. Artikel memiliki heading, intro, daftar isi anchor, paragraf/list, sumber, tautan relevan, dan artikel terkait. Seluruh konten dirender sebagai React nodes dari kontrak typed; tidak ada raw HTML dari konten. Cover/penulis/tanggal tidak dibuat-buat; memakai tampilan editorial teks ketika aset belum tersedia.

Artikel masih draft untuk review klien dan website tetap noindex. Pengantar dirujukkan ke Active Travel England dan Department for Transport, dengan penjelasan bahwa sumber Inggris tidak menggantikan persyaratan lokal. Checklist adalah persiapan diskusi, tidak memberikan dimensi maupun instruksi pemasangan. Artikel material indoor/outdoor ditunda sampai data material resmi tersedia. Tidak ada klaim kepatuhan regulasi atau sertifikasi.

## Fase 09 — FAQ

Route `/faq` memiliki tiga grup dan tujuh jawaban: fungsi, material/varian, serta persiapan konsultasi. Topic links berupa anchor menuju grup; bukan fake tabs. Accordion memakai details/summary native, multiple-open, dan indikator chevron. Jawaban ada pada HTML awal; jawaban kosong tidak ditampilkan. CTA membawa pesan general FAQ. Harga, MOQ, garansi, ongkir, dan lead time tidak diasumsikan.

## Modul dan kelanjutan

- `src/components/product/{ProductGallery,ProductInquiry,SpecTable}.tsx`
- `src/lib/product-inquiry.ts`
- `src/components/editorial/ArticleCard.tsx`
- `src/components/faq/FaqGroup.tsx`
- `src/data/{articles,faq}.ts`
- `src/types/{article,faq}.ts`
- `tests/product-inquiry.test.mjs`

Saat data resmi tersedia, isi field opsional produk dari dokumen terverifikasi, ganti fixture dengan inventaris approved, lalu review semua copy artikel/FAQ. Tambahkan metadata penulis/tanggal/cover dan structured data hanya ketika nilainya nyata. Fase 10 tetap halaman kontak; fase 11 halaman pendukung; fase 12 QA rilis.

## Validasi dan batas

Lint dan build termasuk TypeScript lulus. Sembilan tes lulus, mencakup filter katalog dan pesan inquiry (selected/unselected/invalid variant, encoding nama dan URL). HTTP lokal memastikan satu H1, jawaban FAQ tersedia, tiga artikel dapat dibuka langsung, semua tautan internal halaman yang diuji merespons 200, slug invalid 404, dan produk demo tanpa mode contoh tetap 404.

Interaksi galeri, validasi varian, keyboard, dan viewport perlu review browser langsung. Konfigurasi WhatsApp aktif tidak dinyalakan karena nomor resmi belum tersedia. Tidak ada klaim skor performa ataupun sign-off konten klien.
