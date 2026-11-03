# Handoff frontend — fase 0–12

Tanggal laporan: **3 November 2026 (Asia/Jakarta)**.
Status: **implementasi frontend lokal tersedia; belum sign-off rilis publik**.

## Menjalankan dan memeriksa

Dari root workspace:

```sh
npm run setup      # hanya saat dependency belum terpasang
npm run dev        # http://127.0.0.1:3000
npm run check      # lint, TS strict, unit tests, production build
npm run test:smoke # perlu server lokal aktif, konfigurasi draft
```

Untuk smoke terhadap build produksi, dari `tactile-web/`:

```sh
npm run build
npm start -- --port 3001
# Terminal kedua, folder tactile-web:
BASE_URL=http://127.0.0.1:3001 npm run test:smoke
```

`docs/qa/latest-smoke.json` berisi hasil regresi terakhir. Script dibatasi localhost, memeriksa konfigurasi draft (noindex dan WhatsApp nonaktif), serta tidak mengunjungi atau mengirim data ke layanan eksternal. Jangan jalankan dengan server produksi lain yang bukan aplikasi ini.

## Peta halaman

| Route | Implementasi | Data/keterbatasan |
|---|---|---|
| `/` | Beranda | Brand sementara, featured produk disembunyikan |
| `/tentang-kami` | Profil editorial | Identitas/proyek/alamat belum approved |
| `/produk` | Search, filter URL, grid, empty | Inventaris resmi kosong |
| `/produk?demo=1` | Katalog contoh | 5 fixture terpisah |
| `/produk/fungsi/guiding-block` | Kategori fungsi garis | Konten draft |
| `/produk/fungsi/warning-block` | Kategori fungsi titik | Konten draft |
| `/produk/material/[slug]` | Kategori material aktif | Demo perlu query; tanpa produk resmi 404 |
| `/produk/[slug]` | Detail, varian, galeri, inquiry | Tidak mengarang foto atau spesifikasi |
| `/panduan` | Featured dan topik | 3 artikel draft |
| `/panduan/[slug]` | Artikel SSR, daftar isi, sumber | Review editorial/klien diperlukan |
| `/faq` | 3 grup, 7 jawaban | Tidak mengarang kebijakan pembelian |
| `/kontak` | CTA, contact card, alur diskusi | Detail kontak hanya jika approved |
| `/kebijakan-privasi` | Struktur dan ringkasan faktual | Naskah final harus disetujui klien |
| `/404` dan URL tidak dikenal | HTTP 404, 3 recovery links | Tanpa redirect ke home |

## Fase 10

ContactDetails memakai `config/company.ts` dan konfigurasi WhatsApp bersama. Email memerlukan format valid dan company approved. Address/jam disembunyikan jika belum approved/tersedia. Footer membaca data yang sama. Tidak ada form, peta, penyimpanan lead, atau janji SLA. `CompanyProfile.hours` opsional.

## Fase 11

- Footer selalu menyertakan kebijakan privasi. Halaman menjelaskan fitur aktual: parameter URL, state antarmuka, Google Fonts, tautan WhatsApp/email/rujukan. Identitas pengelola dan kebijakan hosting belum ditentukan. Bukan naskah legal final.
- Error boundary lokal/root/global menampilkan pesan umum dan retry yang mengambil ulang konten; detail exception tidak dirender.
- Root-layout error memiliki dokumen sendiri dan gaya dasar mandiri.
- Gambar menggunakan skeleton dimensi tetap saat loading dan fallback jika gagal. Motion mengikuti reduced-motion.
- Tidak memasang loading boundary di atas validasi slug agar status 404 tidak berubah menjadi 200 akibat streaming.
- `src/proxy.ts` memvalidasi URL dinamis memakai dataset yang sama sebelum render dan rewrite internal ke `/404` dengan status 404. Ini menangani early notFound Next 16 yang pada pengujian produksi hanya membawa UI recovery melalui payload client. Alamat asli tetap ada pada browser. Saat beralih ke CMS/backend kelak, sesuaikan validasi ini dengan sumber data baru; jangan memakai cache/global mutable terpisah.

## Fase 12 — hasil otomatis

- Lint: lulus.
- TypeScript strict: lulus.
- Unit tests: **11 lulus**, mencakup filter/URL, varian, pesan WhatsApp, serta gating/validasi email.
- Production build: lulus.
- Smoke produksi: **40 pemeriksaan route lulus**, termasuk 8 skenario 404.
- Crawl internal: privacy link, single H1, title/description/canonical, judul unik antarpath, noindex draft, direct-load, link kartu/artikel/filter, dan ketiadaan kontak tak disetujui diperiksa.
- Kontak tidak memuat form. 404 memuat ketiga jalur recovery di HTML awal.
- Angka responseMs pada laporan adalah waktu HTTP lokal, **bukan** Lighthouse atau Core Web Vitals.

## Release gate yang masih terbuka

| Gate | Status | Yang diperlukan |
|---|---|---|
| Identitas/kontak | Menunggu klien | Nama legal, nomor/email, alamat/jam dan approval |
| Inventaris | Menunggu klien | Produk aktif, material, foto berizin, varian/specs resmi |
| Editorial/privasi | Menunggu review | Persetujuan copy serta naskah privasi penanggung jawab |
| Browser visual/responsive | Belum diverifikasi | 320/375/390/768/1024/1440, overflow, wrap, touch |
| Keyboard/screen reader | Belum diverifikasi | Drawer/focus return, accordion, selector, gallery, CTA |
| Error retry/image fail | Implementasi tersedia, UI belum diuji | Simulasi gagal di browser, termasuk root error |
| Performa browser | Belum diukur | Lighthouse/CWV setelah aset dan font final |
| Indexability publik | Sengaja nonaktif | Tetapkan domain resmi dan ubah noindex setelah seluruh gate disetujui |

Browser host tidak tersedia dan akses Computer Use ke Chrome ditolak pada sesi ini. Tidak mengklaim audit manual atau skor performa telah lulus. Figma, prototype desain, dan aset approved belum disediakan dalam proyek ini; token visual berada di CSS.

## Kelanjutan developer

1. Isi data approved dan review konten tanpa mengubah fixture demo menjadi data resmi secara diam-diam.
2. Pastikan CompanyProfile, footer, About, dan privasi konsisten setelah identitas diisi.
3. Uji WhatsApp aktif di lingkungan uji yang dikonfigurasi khusus; periksa nama/varian/URL sebelum pesan dikirim pengguna.
4. Jalankan seluruh automated checks dan checklist browser di atas.
5. Tentukan hosting/logging serta font lokal/eksternal yang disetujui; perbarui privasi sesuai implementasi final.
6. Setelah sign-off, atur `NEXT_PUBLIC_SITE_URL`, robots/indexability, dan kebijakan demo sebelum deploy. Tidak ada deployment publik pada tugas lokal ini.

## P1/P2 deferred

Zoom galeri, compare, datasheet, multilingual, pagination dataset besar, serta dark-mode tidak dimasukkan. Pagination perlu ditambahkan saat dataset cukup besar. Tidak ada backend/CMS/auth/payment/checkout atau WhatsApp Business API.

Dependensi dan versi final dikunci di package-lock.json; `npm ls --depth=0` menampilkan versi instalasi. Source dikelompokkan ke app, components, styles, config, data, types, lib, scripts, tests, dan docs. Styles dipisahkan per area; globals.css hanya menjadi entry import berurutan.


## Pembaruan UI/UX dan gambar produk

Lihat [PRODUCT_UX_UPDATE.md](PRODUCT_UX_UPDATE.md) untuk perubahan terbaru: 5 visual AI konsisten, pengantar pemilihan, detail edukatif, dan pratinjau otomatis saat inventaris kosong. Hasil terkini: 13 unit tests dan 42 pemeriksaan URL lulus. Ini menggantikan jumlah tes serta keterangan gambar kosong pada catatan fase sebelumnya.


## Katalog 12 listing — pembaruan terbaru

Katalog kini mengikuti 12 listing dari pengguna, memakai enam visual keluarga produk hasil ImageGen tanpa foto/atribusi pemasok pada tampilan. Ada filter bentuk dan fungsi campuran. Validasi terbaru: 13 tes, 47 URL produksi lulus. Lihat [CATALOG_12_HANDOFF.md](CATALOG_12_HANDOFF.md). Catatan dataset/foto referensi sebelumnya adalah riwayat implementasi.


## Indonesia / English

Pilihan ID/EN tersedia pada header dan menu mobile; English dapat diakses melalui `/en`. Locale bertahan pada navigasi dan filter. Lint, TS/build, 18 tests, serta 47 URL Indonesia dan 42 bilingual lulus. Lihat [panduan multilingual](MULTILINGUAL.md).
