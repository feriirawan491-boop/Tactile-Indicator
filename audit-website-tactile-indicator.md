# Audit Website Tactile Indicator

4 November 2026

## Ringkasan

Fondasi website sudah kuat: struktur halaman rapi, ada versi ID/EN, alur WhatsApp jelas, dan copy-nya jujur. Yang menahan peluncuran adalah tiga hal: pengaturan development yang masih terbawa, katalog 37 produk yang mewarisi duplikasi dari ABLinox, dan kurangnya data serta bukti kepercayaan.

Audit mencakup 10 halaman di tactile-indicator.vercel.app (Beranda, Produk, satu halaman produk, Tentang Kami, Panduan, satu artikel panduan, FAQ, Kontak, Kebijakan Privasi, Beranda EN) dan dibaca dari isi HTML.

| Area | Nilai | Catatan singkat |
| --- | --- | --- |
| Struktur & navigasi | Baik | H1 tunggal, breadcrumb, skip link, alur jelas |
| SEO teknis | Kritis | Canonical ke localhost, noindex di semua halaman, tanpa schema/OG/hreflang |
| Katalog produk | Perlu kerja besar | 37 produk, banyak yang nyaris identik |
| Data produk | Kurang | Dimensi, pemasangan, MOQ, standar belum ada |
| Konten & panduan | Cukup | Arah bagus, tapi tipis dan masih draft |
| Kepercayaan & kontak | Lemah | Hanya WhatsApp, identitas usaha belum ada |
| Aksesibilitas | Cukup baik | Perlu cek FAQ, kontras, dan menu ganda |
| Privasi & legal | Draft | Pengendali data dan UU PDP belum dibahas |

**Lima prioritas utama:**

1. Bereskan sisa development: canonical, noindex, `?demo=1`, dan label draft.
2. Rampingkan katalog jadi produk + varian dengan nama pendek.
3. Lengkapi data teknis produk dan ganti ilustrasi AI dengan foto asli.
4. Tampilkan identitas usaha, alamat, email, dan portofolio proyek.
5. Tambahkan schema Product/FAQ/Breadcrumb, Open Graph, dan hreflang.

## 1. Pemblokir peluncuran

Masalah di tabel ini muncul di semua halaman yang diaudit dan harus beres sebelum domain resmi dibuka. Sebagian besar selesai lewat satu konfigurasi environment untuk production.

| Masalah | Dampak | Perbaikan |
| --- | --- | --- |
| Canonical `http://localhost:3000/...` | Google bisa mengabaikan halaman atau salah memilih URL asli | Ambil base URL dari `NEXT_PUBLIC_SITE_URL` (https, domain final) |
| Link produk di pesan WhatsApp mengarah ke localhost | Pelanggan menerima link mati | Gunakan base URL yang sama untuk pesan prefill |
| `noindex, nofollow` di semua halaman | Tidak ada halaman yang muncul di Google | Set robots berdasarkan environment: noindex hanya di preview |
| `?demo=1` di breadcrumb, filter, paginasi, dan pengalih bahasa | URL ganda dan data contoh ikut terindeks | Hapus mode demo di production, atau jangan teruskan parameternya di link |
| Label "Pratinjau lokal · Fase 0–12", "Identitas brand sementara" | Terlihat belum jadi | Tampilkan hanya di preview |
| Banner "DRAFT · MENUNGGU REVIEW KLIEN" di Panduan, FAQ, Tentang, Privasi | Mengurangi kepercayaan | Selesaikan review lalu hapus label |
| Gambar tertahan di "Memuat gambar…" | Kartu produk terlihat kosong | Render gambar di server (`next/image` dengan `priority` di atas lipatan) dan cek tampilan tanpa JavaScript |

Bug kecil yang sekalian dibereskan:

- Link "Kenali material Stainless steel" di halaman produk isinya hanya `?demo=1`, tanpa path.
- Spasi hilang: "Lihat pilihanpemandu", "Lihat pilihanperingatan", "300mmx300mm,customized".
- Typo "sementaraa" di footer katalog.
- Penanda nyasar "M /" di atas bagian material versi EN.
- robots.txt dan sitemap.xml belum bisa saya akses. Pastikan keduanya ada dan memakai domain final.

## 2. SEO teknis

Setelah pemblokir beres, website masih belum punya data terstruktur, preview untuk berbagi link, dan penanda bahasa. Ketiganya penting karena link akan sering dibagikan lewat WhatsApp.

| Item | Kondisi sekarang | Saran |
| --- | --- | --- |
| JSON-LD | Tidak ada | `Organization` di semua halaman; `Product` + `BreadcrumbList` di halaman produk; `FAQPage` di FAQ; `Article` (tanggal, penulis) di panduan |
| Open Graph & Twitter Card | Tidak ada | `og:title`, `og:description`, `og:image` 1200×630 per halaman, agar preview muncul di WhatsApp |
| hreflang | Tidak ada, padahal ada /en | Pasangan `id`, `en`, dan `x-default` di setiap halaman |
| Title beranda | "Jalur yang lebih terarah" tanpa brand | "Tactile Indicator Stainless Steel untuk Jalur Aksesibilitas \| [Brand]" |
| Title & H1 produk | Bahasa Inggris di versi ID | Nama Indonesia di /produk, nama Inggris di /en/produk |
| Meta description produk | Sama di 6 produk: "Titik individual. Pilihan dimensi dan finishing sesuai model." | Tulis unik per produk, 140–160 karakter |
| Meta description Kontak | Menyebut perusahaan "telah disetujui", padahal halaman bilang masih menunggu | Samakan dengan isi halaman |
| Slug versi EN | Masih Indonesia: /en/produk, /en/tentang-kami, /en/panduan/perbedaan-guiding-dan-warning | Pilih satu kebijakan. Slug Inggris lebih baik untuk pasar ekspor |
| `nofollow` di artikel | Menahan nilai link internal | Hapus bersama noindex |
| Fonts | Google Fonts dari server luar | Self-host via `next/font`, lebih cepat dan menghindari isu privasi |

Yang perlu dicek dengan Lighthouse atau PageSpeed Insights setelah deploy final: Core Web Vitals (LCP, CLS, INP), ukuran gambar hero, dan atribut `lang` di tag `<html>`.

## 3. Katalog dan struktur produk

Katalog berisi 37 produk dalam 5 halaman, dan nama serta isinya masih diambil langsung dari listing ABLinox. Akibatnya, masalah ABLinox ikut terbawa: produk yang nyaris sama, nama yang penuh kata kunci, dan deskripsi yang identik.

Contoh duplikasi di halaman 1:

| Produk sekarang | Bedanya | Saran |
| --- | --- | --- |
| Custom 304 Stainless Steel Tactile Studs & Strips | Hanya grade | Gabung: **Tactile Stud & Strip Stainless Steel**, varian grade 304 / 316 |
| Custom 304/316 Stainless Steel Tactile Studs & Strips | Hanya grade | (gabung ke atas) |
| Custom Black Stainless Steel Pineapple Pattern Tactile Studs | – | Gabung: **Tactile Stud Pola Nanas**, varian finishing natural / hitam PVD |
| Custom Black … Pineapple … – Anti-Slip Blind Guide Pins | Hanya akhiran nama | (gabung ke atas) |
| Custom OEM … Pineapple … – Anti-Slip Blind Guide Pins | Hanya kata "OEM" | (gabung ke atas) |
| Custom OEM Stainless Steel Tactile Studs – Precision Casting Manufacturer | Kata kunci, bukan produk | Gabung ke stud polos |
| Custom Precision … Tactile Guide Studs – Anti‑Slip Wayfinding Pins | Kata kunci, bukan produk | Gabung ke stud polos |
| Custom Precision Stainless Steel Tactile Indicator Stud | – | Gabung ke stud polos |

Perkiraan saya, 37 produk bisa diringkas menjadi sekitar 8–12 produk inti dengan varian. Angka pastinya baru bisa dihitung setelah seluruh daftar dipetakan.

**Aturan penamaan.** Gunakan pola [Jenis] + [Pembeda utama] + [Material], maksimal sekitar 50 karakter. Contoh: "Tactile Stud Pola Nanas – Stainless Steel". Kata seperti Custom, OEM, Manufacturer, dan Precision Casting dipindah ke deskripsi atau halaman Tentang Kami, karena berlaku untuk semua produk.

**Filter dan tampilan katalog:**

- Tambahkan filter material (304 / 316L) dan finishing (natural, hitam, kuningan).
- Tambahkan pilihan urutkan, misalnya "paling banyak diminta" dan "A–Z".
- Panel filter muncul dua kali di HTML. Pastikan hanya satu yang terbaca screen reader.
- "Bandingkan tampilan & hal yang perlu diperiksa+" masih teks biasa. Jadikan tombol jika memang bisa diklik.
- Seragamkan tanda hubung: ada "–", "-", dan "‑" di nama produk.

## 4. Halaman produk

Tata letak halaman produk sudah bagus (fakta kunci, Data Produk, Penggunaan, Produk Terkait). Kekurangannya ada di isi: data yang dibutuhkan kontraktor untuk memutuskan belum tersedia. Halaman yang diaudit: Black Pineapple Tactile Studs.

| Data | Sekarang | Yang perlu ditambahkan |
| --- | --- | --- |
| Dimensi | Tidak ada (produk terkait menyebut 35 mm) | Diameter, tinggi, panjang pin/ulir, jarak antar-stud dalam mm |
| Grade | "304 / 316L" tanpa penjelasan | Kapan pakai 304 (dalam ruangan) dan 316L (luar ruangan, pesisir) |
| Pemasangan | Tidak ada | Metode (bor + epoxy, ulir, cor) dan diagram sederhana |
| Standar | Tidak ada | Rujukan yang berlaku, misalnya ISO 23599 dan Permen PUPR 14/PRT/M/2017, setelah dikonfirmasi |
| Pemesanan | "Minta penawaran" saja | MOQ, lead time, opsi sampel, garansi |
| Uji | Tidak ada | Data anti-slip atau uji material jika tersedia |
| Gambar | Satu ilustrasi AI | Foto produk asli dari beberapa sudut, foto terpasang, dan gambar teknik |
| Unduhan | Tidak ada | Datasheet PDF untuk dilampirkan ke dokumen tender |

**Perbaikan lain:**

- Tombol "Diskusikan kebutuhan proyek" di bawah masih mengirim pesan umum. Sertakan nama produk seperti tombol lain.
- Tampilkan varian (finishing, grade) sebagai pilihan yang ikut masuk ke pesan WhatsApp. Kontraktor jadi tidak perlu mengetik ulang.
- Dua dari tiga produk terkait nyaris identik (Custom 304 dan Custom 304/316). Masalah ini hilang setelah katalog digabung.

## 5. Konten dan copywriting

Nada tulisannya sudah enak dibaca: kalimat pendek, dan penjelasan guiding (garis) vs warning (titik) mudah dipahami. Masalahnya ada di kedalaman konten panduan, rujukan yang belum lokal, dan beberapa kata yang terlalu sering dipakai.

**Panduan**

- Baru ada 3 artikel, 2 di antaranya masih "DRAFT EDUKASI".
- Artikel "Perbedaan guiding dan warning" hanya sekitar 180 kata, dan rujukannya dari Inggris (Active Travel England, Department for Transport). Tambahkan rujukan Indonesia (Permen PUPR 14/PRT/M/2017, SNI terkait) dan ISO 23599, setelah dicek oleh ahli aksesibilitas.
- Tambahkan tanggal terbit, tanggal pembaruan, dan nama penulis atau peninjau.
- Ide artikel berikutnya untuk menangkap pencarian umum: "Apa itu guiding block", "Ukuran dan jarak pemasangan tactile", "Stainless vs karet vs keramik untuk jalur tunanetra", "Contoh penerapan di stasiun, rumah sakit, dan trotoar".

**FAQ**

- Isinya 7 pertanyaan. Jawaban "Pilihan pada mode contoh" masih menyebut mode demo. Ganti dengan data resmi.
- Jadikan setiap pertanyaan heading (H3) atau tombol `<button>`/`<details>`, lalu tambahkan schema `FAQPage`.

**Copy beranda**

- "Kenali" muncul sekitar 9 kali dan "terarah" di title, hero, dan footer. Variasikan.
- "Pilihan grade 304/316 mengikuti listing" membingungkan. Contoh perbaikan: "Grade 304 atau 316 tergantung model produk."
- "Profil resmi perusahaan akan dilengkapi…" masih berupa catatan draft.
- Heading huruf kapital semua lebih sulit dibaca. Pertimbangkan sentence case.
- Istilah campur: Stud/Studs, Guiding/Pemandu, Warning/Peringatan. Tentukan satu glosarium dan pakai konsisten.

**Versi EN**

- Terjemahannya lengkap, tapi H1 bilang "MEANINGFUL DIRECTION", sedangkan footer "MEANINGFUL ROLES". Samakan.
- Label "UNDERSTANDING TACTILE" dan "DIRECTIONAL GUIDANCE+WARNING CUES+ACCESSIBLE SPACES" terasa kaku.
- Ejaan British (catalogue, recognise). Tidak masalah, asal sesuai target pasar.

## 6. Kepercayaan dan kontak

Ini celah terbesar dibanding pesaing. Pembeli proyek, terutama instansi pemerintah dan kontraktor, perlu yakin bahwa penjualnya badan usaha nyata sebelum menghubungi.

| Sinyal | Status | Saran |
| --- | --- | --- |
| Nama badan usaha | Belum ada, "Identitas brand sementara" | Nama PT/CV dan logo final |
| Alamat & peta | Belum ada | Alamat kantor atau gudang + Google Maps, sekaligus untuk Google Business Profile |
| Email | Belum ada | Email domain sendiri, misalnya sales@domain.co.id |
| Telepon | Hanya WhatsApp +62 812-2295-2857 | Cukup, tapi tambahkan jam layanan |
| Portofolio proyek | Belum ada | 3–6 studi kasus dengan foto, lokasi, dan jenis produk |
| Klien / logo | Belum ada | Tampilkan jika ada izin |
| Sertifikat & legalitas | Belum ada | NIB, sertifikat material (mill certificate), TKDN atau e-Katalog jika ada |
| Testimoni | Belum ada | Kutipan singkat dari kontraktor atau pengelola gedung |

**Kontak dan formulir**

- Halaman Kontak punya 5 tombol WhatsApp dengan pesan berbeda. Kurangi jadi 2–3 dengan tujuan yang jelas: tanya produk, minta penawaran, kirim gambar proyek.
- Pertimbangkan formulir permintaan penawaran (nama, instansi, lokasi, luas area, unggah denah). Tidak semua pembeli tender mau pakai WhatsApp. Jika ditambahkan, kebijakan privasi perlu diperbarui.

## 7. Aksesibilitas dan UX

Untuk website tentang aksesibilitas, standar di sini harus lebih tinggi dari biasanya, karena pembeli bisa menilai kredibilitas dari situsnya sendiri. Dasarnya sudah ada: skip link, satu H1 per halaman, dan alt text yang deskriptif di hero.

- **Menu ganda.** Navigasi desktop dan mobile sama-sama ada di HTML. Sembunyikan yang tidak aktif dengan `hidden` atau `inert`, bukan hanya CSS visual.
- **FAQ akordeon.** Pastikan memakai `<button aria-expanded>` atau `<details>` dan bisa dioperasikan dengan keyboard.
- **Teks link generik.** "Baca panduan", "Lihat detail", dan "Ke katalog" berulang. Tambahkan konteks atau `aria-label`, misalnya "Lihat detail Tactile Stud Pola Nanas".
- **Kontras.** Cek teks di atas hero gelap dan label kecil terhadap WCAG 2.2 AA (4,5:1).
- **Alt text produk.** Belum terlihat di kartu katalog. Isi per gambar, jangan diulang.
- **Uji nyata.** Coba dengan NVDA atau TalkBack, dan kalau bisa minta masukan pengguna tunanetra. Ini juga bisa jadi cerita yang kuat di halaman Tentang Kami.

## 8. Privasi dan legal

Halaman privasi sekarang masih ringkasan teknis untuk review internal, belum kebijakan yang bisa dipublikasikan. Isinya sudah jujur soal data: tidak ada akun, formulir, analytics, atau cookie pelacak.

- Sebutkan pengendali data: nama badan usaha dan kontak untuk pertanyaan privasi.
- UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi belum disebut. Minta konsultan hukum memastikan apa yang wajib dicantumkan.
- Jelaskan data yang mengalir ke pihak ketiga: Google Fonts (atau hilangkan dengan self-hosting), WhatsApp, dan log hosting (Vercel).
- Jika nanti menambah analytics atau formulir, tambahkan bagian tujuan, masa simpan, dan hak pengguna.
- Hapus kata "draft" dari title setelah disetujui.

Catatan ini bukan nasihat hukum.

## 9. Rencana kerja

Urutan di bawah mendahulukan hal yang memblokir peluncuran, lalu hal yang paling memengaruhi keputusan pembeli.

1. **Sebelum launch (teknis).** Canonical dan base URL dari environment, robots per environment, hapus `?demo=1` dan label preview, render gambar di server, robots.txt + sitemap.xml, perbaiki bug kecil di bagian 1.
2. **Sebelum launch (konten wajib).** Identitas usaha, alamat, email, kebijakan privasi final, review klien atas Panduan dan FAQ.
3. **Katalog.** Petakan 37 produk ke produk inti + varian, tetapkan nama dan slug baru, pasang redirect 301 dari slug lama jika sempat terindeks.
4. **Data produk.** Dimensi, pemasangan, standar, MOQ, foto asli, datasheet PDF.
5. **SEO.** JSON-LD, Open Graph, hreflang, title dan meta unik, slug EN.
6. **Pertumbuhan.** Portofolio proyek, artikel panduan baru, Google Business Profile, formulir penawaran.
7. **Ukur.** Lighthouse dan PageSpeed setelah deploy, uji screen reader, lalu daftar ke Google Search Console.

**Belum diaudit:** tampilan visual desktop dan mobile, kecepatan muat, robots.txt dan sitemap.xml (tidak bisa diakses dari sini), serta isi halaman /en selain beranda.

## Sumber

Halaman yang dibuka saat audit:

- [Beranda](https://tactile-indicator.vercel.app/?demo=1) · [Beranda EN](https://tactile-indicator.vercel.app/en?demo=1)
- [Katalog produk](https://tactile-indicator.vercel.app/produk?demo=1)
- [Black Pineapple Tactile Studs](https://tactile-indicator.vercel.app/produk/black-pineapple-tactile-studs?demo=1)
- [Tentang Kami](https://tactile-indicator.vercel.app/tentang-kami?demo=1)
- [Panduan](https://tactile-indicator.vercel.app/panduan?demo=1) · [Perbedaan guiding dan warning](https://tactile-indicator.vercel.app/panduan/perbedaan-guiding-dan-warning?demo=1)
- [FAQ](https://tactile-indicator.vercel.app/faq?demo=1)
- [Kontak](https://tactile-indicator.vercel.app/kontak?demo=1)
- [Kebijakan privasi](https://tactile-indicator.vercel.app/kebijakan-privasi)
