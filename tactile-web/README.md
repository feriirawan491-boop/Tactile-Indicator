# Tactile Indicator — frontend lokal

Implementasi PRD fase **0–12**, terpisah dari dokumen sumber di direktori induk.

## Menjalankan

Gunakan Node.js 22.18+ dan npm agar aplikasi serta tes TypeScript native dapat dijalankan.

```sh
cd tactile-web
npm install
cp .env.example .env.local
npm run dev
```

Buka **http://localhost:3000**. Build produksi lokal: `npm run build` lalu `npm start`.

## Peta source

- `src/app/`: routing App Router, metadata dan komposisi halaman.
- `src/components/layout/`: header, dialog navigasi, footer, breadcrumb.
- `src/components/ui/`: komponen presentasi bersama.
- `src/components/home/`: ilustrasi pola yang jelas berlabel skematis.
- `src/components/conversion/`: satu pintu CTA WhatsApp.
- `src/styles/`: stylesheet terpisah menurut fondasi, layout, dan fitur; urutan import di globals.css.
- `src/config/`: identitas, konfigurasi publik, navigasi, status fase.
- `src/data/`: copy dan data tampilan.
- `src/types/`: kontrak data TypeScript.
- `src/lib/`: helper URL WhatsApp dan metadata.
- `docs/`: status fase, keputusan implementasi, dan handoff.

## Pemeriksaan

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm run test:smoke # perlu server aktif
```

## Konfigurasi konten

Identitas sementara terpusat di `src/config/company.ts`. Jangan mengisi data yang belum disetujui. Untuk mengaktifkan WhatsApp, isi `NEXT_PUBLIC_WHATSAPP_NUMBER` dengan nomor internasional tanpa `+` dan set `NEXT_PUBLIC_WHATSAPP_APPROVED=true` di `.env.local`, lalu restart/build ulang. URL dibentuk oleh `getWhatsAppUrl` dan hanya tersedia jika konfigurasi valid. Klik tautan membuka WhatsApp; tidak mengirim pesan otomatis.

Pratinjau memakai `noindex`. Setelah konten disetujui, developer perlu memperbarui robots di layout dan `NEXT_PUBLIC_SITE_URL` dengan domain resmi. Google Fonts dimuat melalui CSS dengan fallback lokal; tanpa internet aplikasi tetap memakai font fallback.

Fase 4–6 tersedia: katalog, kategori fungsi, dan template kategori material. Buka `/produk?demo=1` untuk mencoba 5 kartu fixture dan 3 material contoh. Katalog resmi tetap kosong sampai data disetujui. Detail produk, tiga panduan draft, dan FAQ berkelompok kini tersedia. Halaman kontak, draft privasi, dan pemulihan error kini tersedia. Featured product dan bukti perusahaan tetap menunggu data resmi. Tidak ada backend, checkout, atau penyimpanan lead. Lihat [catatan fase 4–6](docs/PHASE_04_06.md) dan [fase 7–9](docs/PHASE_07_09.md).

## Rilis dan handoff akhir

Lihat [RELEASE_HANDOFF.md](docs/RELEASE_HANDOFF.md) untuk matriks route, perintah pemeriksaan, hasil regresi, known issues, dan gate sebelum publikasi. `npm run check` menjalankan seluruh check statis, tes, dan build. Implementasi lokal tersedia; sign-off publik masih menunggu konten resmi dan QA browser.

## Pembaruan visual produk

Katalog lokal otomatis membuka pratinjau bila inventaris resmi kosong. Gunakan `/produk?demo=0` untuk data resmi saja. Lima gambar AI dan informasi pemilihan kini tersedia; lihat [catatan UI/UX dan aset](docs/PRODUCT_UX_UPDATE.md). Gambar bukan foto produk resmi.


## Katalog 12 listing — pembaruan terbaru

Katalog kini mengikuti 12 listing dari pengguna, memakai enam visual keluarga produk hasil ImageGen tanpa foto/atribusi pemasok pada tampilan. Ada filter bentuk dan fungsi campuran. Validasi terbaru: 13 tes, 47 URL produksi lulus. Lihat [CATALOG_12_HANDOFF.md](docs/CATALOG_12_HANDOFF.md). Catatan dataset/foto referensi sebelumnya adalah riwayat implementasi.

## Data dummy default

Katalog, kategori fungsi, material, dan detail kini otomatis memakai data contoh yang relevan. Tidak perlu menambahkan `?demo=1`. Konfigurasi berada di `src/config/catalog.ts`; set `NEXT_PUBLIC_CATALOG_DEMO=false` setelah inventaris resmi siap. `?demo=0` tetap tersedia sebagai override eksplisit. Gambar dan informasi contoh tetap berlabel.


## Indonesia / English

Pilihan ID/EN tersedia pada header dan menu mobile; English dapat diakses melalui `/en`. Locale bertahan pada navigasi dan filter. Lint, TS/build, 18 tests, serta 47 URL Indonesia dan 42 bilingual lulus. Lihat [panduan multilingual](docs/MULTILINGUAL.md).

## Cache development

`npm run dev` menggunakan `.next-local`; build/start produksi menggunakan `.next`. Pemisahan ini menjaga dev compiler tidak terganggu saat pemeriksaan build dijalankan. Setelah pergantian struktur route, jika browser masih menampilkan overlay dari file yang sudah dihapus, lakukan hard reload Cmd+Shift+R setelah server dimulai ulang.
