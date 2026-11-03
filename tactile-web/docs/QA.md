# Catatan QA fase 0–3

## Pemeriksaan yang sudah dijalankan

- Helper WhatsApp: 4 pemeriksaan lulus (konfigurasi kosong, belum approved, format nomor salah, dan roundtrip encoding pesan).
- Source menggunakan satu H1 per halaman, elemen navigasi/link semantik, skip link, fokus visual, reduced motion, dialog native, serta accordion native.

## Batas konten

Identitas perusahaan, kontak, inventaris produk, foto resmi, dan bukti proyek belum tersedia. Seluruh data tersebut tidak dibuat-buat. Kontak dinonaktifkan sampai konfigurasi approved; halaman fase lanjutan memiliki status yang eksplisit. Sign-off konten tetap menunggu klien.

## Batas verifikasi visual

Host browser otomatis tidak tersedia pada sesi ini. Checklist ukuran layar dan audit keyboard dalam HANDOFF.md masih perlu dilakukan manual. Tidak ada klaim skor Lighthouse atau Core Web Vitals.

## Hasil otomatis

- `npm run lint`: lulus.
- `npm run typecheck`: lulus (`strict: true`).
- `npm run build`: lulus; beranda, profil, dan empat halaman status dirender statis.
- HTTP lokal: `/`, `/tentang-kami`, `/produk`, `/panduan`, `/faq`, `/kontak` mendapat 200, satu H1 per halaman.
- `/tidak-ada`: mendapat 404.
- Server produksi berhasil berjalan pada `127.0.0.1:3000` saat pengujian.
- Pemeriksaan visual melalui aplikasi Chrome tidak dapat dilakukan karena akses Computer Use ke Chrome tidak disetujui. Checklist visual dan keyboard tetap terbuka.

## Perbaikan error browser — 3 November 2026

- Log browser menunjukkan atribut `cz-shortcut-listen` disisipkan ekstensi ke body sebelum hydration. `suppressHydrationWarning` dibatasi pada body untuk mengabaikan perbedaan atribut eksternal tersebut; pemeriksaan elemen turunan tetap aktif.
- Menambahkan `data-scroll-behavior="smooth"` ke html sesuai konfigurasi Next.js 16 untuk CSS smooth scrolling.
- Menambahkan ikon SVG berbasis pola brand melalui konvensi metadata App Router.
- Lint dan build (termasuk TypeScript) lulus. Beranda, Tentang Kami, dan `/icon.svg` merespons HTTP 200; atribut scroll dan tautan ikon tersedia pada HTML server.
- Hilangnya peringatan di browser pengguna perlu dikonfirmasi setelah reload; sesi ini memverifikasi source, build, dan HTTP.

## Fase 04–06 — 3 November 2026

- `npm run lint`: lulus.
- `npm test`: 6 tes lulus (intersection, zero results, query invalid/berulang, search, URL/reset, fixture non-approved).
- `npm run build`: lulus, termasuk pemeriksaan TypeScript.
- HTTP: katalog resmi kosong, demo 5 kartu; guiding + beton 1 kartu; guiding + polyurethane 0 kartu dengan pesan reset.
- Kategori fungsi: guiding 2 contoh dan warning 3 contoh, tanpa salah klasifikasi.
- Material demo: beton 2 kartu, stainless steel 2 kartu, polyurethane 1 kartu.
- Seluruh tautan ringkasan kartu demo berhasil HTTP 200.
- Kategori material tanpa mode demo, material/fungsi tidak dikenal, dan slug produk tidak dikenal: HTTP 404.
- Judul dan canonical unik per kategori; query katalog tetap canonical `/produk`.
- Parameter mode demo berulang konsisten memakai nilai pertama.
- Pemeriksaan browser visual, history back/forward, dan keyboard langsung belum dilakukan; daftar review di PHASE_04_06.md.


## Fase 07–09 — 3 November 2026

- Lint dan build (termasuk TypeScript): lulus.
- `npm test`: 9 tes lulus; 3 tes baru memeriksa varian selected/unselected/invalid dan roundtrip pesan WhatsApp.
- HTTP 200: detail contoh dengan/tanpa varian, index panduan, filter topik, ketiga artikel, dan FAQ.
- Satu H1 setiap halaman; FAQ memiliki tujuh details dan jawaban pada HTML awal.
- Detail beton contoh memiliki tiga radio (belum memilih + dua varian); detail stainless tanpa varian tidak menampilkan selector.
- Semua anchor internal dari halaman tersebut diperiksa dan merespons 200.
- Slug artikel/produk invalid dan produk contoh tanpa `demo=1`: HTTP 404.
- QA interaksi browser dan responsivitas masih memerlukan pemeriksaan langsung; konten resmi dan nomor WhatsApp belum disetujui.


## Fase 10–12 — 3 November 2026

- Halaman kontak, draft privasi, global/local error recovery, skeleton gambar, dan 404 selesai diimplementasikan.
- `npm run check`: lint, TS strict, 11 unit tests, dan build lulus.
- Smoke build produksi: 40 URL lulus, termasuk 8 skenario 404. Recovery links tersedia dalam HTML awal setelah validasi route sebelum render ditambahkan.
- Detail hasil mesin: [qa/latest-smoke.json](qa/latest-smoke.json).
- Kontak tanpa form; email/nomor tak disetujui tidak menghasilkan link. Footer privasi diperiksa di seluruh route crawl.
- Batas audit visual, keyboard, screen reader, error UI, dan performa serta persetujuan konten tercatat di [RELEASE_HANDOFF.md](RELEASE_HANDOFF.md).


## Pembaruan pemahaman produk dan visual

13 tes lulus, 42 URL smoke lulus, lint/TS/build lulus. Lima aset WebP AI diperiksa secara visual dan melalui HTTP Next Image, klasifikasi fungsi/material konsisten. Pemeriksaan source/HTTP mencakup redirect pratinjau, mode resmi demo=0, alt, dan detail edukasi. Lihat PRODUCT_UX_UPDATE.md untuk cakupan serta batasnya.


## Katalog 12 listing — pembaruan terbaru

Katalog kini mengikuti 12 listing dari pengguna, memakai enam visual keluarga produk hasil ImageGen tanpa foto/atribusi pemasok pada tampilan. Ada filter bentuk dan fungsi campuran. Validasi terbaru: 13 tes, 47 URL produksi lulus. Lihat [CATALOG_12_HANDOFF.md](CATALOG_12_HANDOFF.md). Catatan dataset/foto referensi sebelumnya adalah riwayat implementasi.

## Aktivasi WhatsApp — 3 November 2026

Pengguna menyetujui nomor 081222952857. Seluruh CTA menggunakan 6281222952857 melalui config terpusat; .env.example diselaraskan. Pemeriksaan HTML pada beranda, kontak, FAQ, dan detail produk memastikan semua tautan wa.me menuju nomor tersebut dan membawa teks awal. Build/TS dan lint lulus. Tidak ada pesan dikirim saat pemeriksaan. Identitas legal, alamat, dan email masih menunggu data terpisah.

## Dummy aktif default — 3 November 2026

Sesuai instruksi pengguna, `NEXT_PUBLIC_CATALOG_DEMO` default true melalui src/config/catalog.ts. Normalisasi query, dataset, dan validasi route proxy memakai aturan yang sama. Semua route kategori/material/detail dapat dibuka tanpa flag demo dan tetap menampilkan data relevan. demo=0 tetap override eksplisit untuk inventaris approved.

HTTP: katalog 12 kartu, guiding 4, warning 12, material stainless steel 12, detail langsung 200. Bagian pilihan material terisi dan tabel spesifikasi contoh material tersedia. Empat belas unit tests dan build/TypeScript lulus; lint lulus pada pemeriksaan perubahan ini. Tidak menambah material di luar lingkup stainless hanya untuk mengisi layar.


## Indonesia / English

Pilihan ID/EN tersedia pada header dan menu mobile; English dapat diakses melalui `/en`. Locale bertahan pada navigasi dan filter. Lint, TS/build, 18 tests, serta 47 URL Indonesia dan 42 bilingual lulus. Lihat [panduan multilingual](MULTILINGUAL.md).

## Pemulihan error cache route lama

Log browser berulang menyebut ekspor `upcoming` dari `app/[section]/page.tsx`, sementara file tersebut sudah tidak ada di source. Server dimulai ulang, cache dev lama diarsipkan ke /tmp, dan output pengembangan dipisahkan ke `.next-local` melalui phase Next.js. Build/typegen produksi tetap memakai `.next`. ESLint dan .gitignore mengecualikan cache dev baru. Tidak menghidupkan kembali route atau ekspor usang.

Pemeriksaan setelah pemisahan: lint, TypeScript, 18 tes, build lulus; 42 URL bilingual lulus. Beranda/katalog/kontak/FAQ ID dan EN merespons 200 setelah production build selesai sementara dev server tetap berjalan. Browser yang menyimpan error overlay lama harus melakukan hard reload (Cmd+Shift+R) untuk membuang modul HMR di memori. Tampilan browser pengguna tidak diverifikasi langsung.
