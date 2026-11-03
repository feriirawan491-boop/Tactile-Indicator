# Indeks & Roadmap Implementasi

**Produk:** Tactile Indicator — Product Catalog + WhatsApp Commerce  
**Dokumen:** PRD Spesifik UI/UX & Frontend  
**Fase:** 00  
**Prioritas:** P0  
**Route:** `seluruh route`  
**Versi:** 1.0 • 2 November 2026  
**Acuan:** `PRD_UIUX_Frontend_Tactile_Indicator.md`  

> Hanya UI/UX dan frontend; seluruh contoh konten bersifat draft hingga disetujui klien.


## Tujuan
Menjadi peta eksekusi fase per halaman agar proses desain, review dan build frontend bisa dilakukan incrementally. Setiap file adalah spesifikasi modul terpisah, bukan instruksi membuat backend.

## Matriks fase dan keluaran
| Fase | File | Fokus | Dependensi | Exit gate |
|---|---|---|---|---|
| 01 | `01_DESIGN_SYSTEM_GLOBAL.md` | UI foundation, header/footer, komponen, WA utility | arah brand | Figma tokens + shell responsif approved |
| 02 | `02_HOMEPAGE.md` | Home, edukasi + discovery + CTA | 01 | user bisa masuk katalog/WA |
| 03 | `03_TENTANG_KAMI.md` | profil perusahaan + trust | 01 | informasi perusahaan faktual |
| 04 | `04_KATALOG_PRODUK.md` | daftar, filter, search opsional | 01, data produk | grid/filter dan empty state lulus QA |
| 05 | `05_KATEGORI_FUNGSI.md` | guiding/warning pages | 04 | unique content + filtered links valid |
| 06 | `06_KATEGORI_MATERIAL.md` | landing material aktif | 04 | konten material terverifikasi |
| 07 | `07_DETAIL_PRODUK.md` | specs, varian, gallery, inquiry WA | 04 | konversi contextual WA lulus QA |
| 08 | `08_PANDUAN_ARTIKEL.md` | article index/detail | 01 + content | SEO editorial dan internal link valid |
| 09 | `09_FAQ.md` | bantuan & keberatan pembeli | 01 + jawaban klien | accordion accessible |
| 10 | `10_KONTAK.md` | kontak & proses inquiry | 01 + data perusahaan | WA/email/address valid |
| 11 | `11_HALAMAN_PENDUKUNG.md` | privacy, 404, error/loading | 01 | no dead end & privasi approved |
| 12 | `12_QA_RELEASE_HANDOFF.md` | regresi lintas route | semua fase | DoD P0 terpenuhi |

## Menu navigasi yang disepakati
`Produk` → `/produk`; `Tentang Kami` → `/tentang-kami`; `Panduan` → `/panduan`; `FAQ` → `/faq`; `Kontak` → `/kontak`. Logo → `/`. CTA header → WhatsApp. Kategori fungsi/material dapat diakses dari katalog dan berfungsi sebagai landing SEO.

## Urutan kerja tiap fase
1. **UX:** review tujuan, content inventory, user flow, wireframe desktop/mobile, edge states.
2. **UI:** high fidelity, interactive prototype, component mapping dan handoff.
3. **Frontend:** typed fixture → layout/components → interaction → metadata dan SEO.
4. **QA:** keyboard, responsive, content, CTA, performance; catat bug P0/P1.
5. **Sign-off:** approval produk/UX/konten → merge fase berikutnya.

## Batas MVP (P0 vs lanjutan)
- **P0:** seluruh route publik di matriks, katalog/filter dasar, detail produk, CTA WhatsApp, SEO baseline, a11y.
- **P1:** site search, filter drawer enhancement, zoom gallery, sticky bottom CTA, pagination enhancement, TOC panjang.
- **P2:** compare, download datasheet, multilingual, dark-mode toggle; bukan komitmen MVP.

## Kontrak konten yang perlu diminta ke klien
Identitas perusahaan, logo, contact & nomor WA, daftar produk aktif, fungsi/material masing-masing produk, foto izin pakai, dimensi dan varian resmi, deskripsi, penggunaan dan metode pemasangan yang terverifikasi, FAQ, kebijakan privasi, bukti proyek bila ada, kebijakan harga dan pengiriman. **Jangan membangun klaim seolah sudah tersedia.**

## Kriteria selesai secara keseluruhan
Navigasi semua route berhasil via direct load, produk tidak salah klasifikasi, CTA pesan benar, title/meta dan canonical unik, layout keyboard/mobile lolos, tidak ada dummy claim, `tsc`/lint/test/build sukses, dan laporan QA tersedia.


## Standar UI/UX dan Frontend Bersama
- **Scope:** UI, komponen React, state frontend, routing, metadata SEO, aksesibilitas, performa, dan QA. **Di luar scope:** backend, database, CMS server, login admin, payment, checkout, webhook, penyimpanan lead, dan WhatsApp Business API.
- **Stack rekomendasi:** Next.js App Router + TypeScript `strict` + Tailwind CSS + pola/snippet Preline UI yang dibungkus komponen reusable + Lucide React. Pilih versi kompatibel saat implementasi; hindari ketergantungan JavaScript Preline bila React native lebih stabil.
- **Art direction:** minimalis, bold, tactical-industrial; layout editorial, garis pembatas tegas, whitespace luas, fotografi/macro tactile asli; hindari visualisasi produk palsu.
- **Palet:** Tailwind `neutral` konsisten: `neutral-50 #fafafa`, `white #fff`, `neutral-200 #e5e5e5`, `neutral-600 #525252`, `neutral-800 #262626`, `neutral-950 #0a0a0a`. Kontras teks minimal WCAG AA. Fokus keyboard tampak di light/dark.
- **Tipografi:** Bebas Neue untuk display/H1/H2 editorial saja; Plus Jakarta Sans untuk body/navigation/CTA/tabel, **Inter alternatif** (pilih satu font body saat implementasi). Body ≥16px, `line-height` 1.5–1.7. Font load dengan fallback dan `font-display: swap`.
- **Breakpoint pemeriksaan:** 320/375/390/768/1024/1440px; mobile-first. Container maksimal 1280–1360px, grid 12/8/4 konseptual, overflow horizontal tidak diperbolehkan kecuali tabel berpola scroll yang jelas.
- **Component quality:** default, hover, `focus-visible`, active, disabled, loading, empty, error; target sentuh minimal ~44×44px jika memungkinkan. Semantik HTML (link untuk navigasi, button untuk aksi), motion mengikuti `prefers-reduced-motion`.
- **SEO bersama:** metadata unik, heading hierarkis, `canonical`, internal link `<a href>`, gambar alt faktual, slug terbaca, server-rendered/indexable public content; structured data hanya berisi fakta valid. PageSpeed/Core Web Vitals diaudit bukan dijanjikan skor tanpa pengukuran.
- **Data:** menggunakan fixture/mock typed di frontend sebagai kontrak tampilan. Semua klaim, stok, harga, ukuran, sertifikasi, alamat dan jam operasional harus mendapat persetujuan klien sebelum publikasi.
- **WhatsApp:** `https://wa.me/<nomor-internasional>?text=<encodeURIComponent(pesan)>` dari config publik terverifikasi; buka via link nyata; klik **tidak** berarti pesan dikirim. Nomor tidak di-hardcode tersebar di komponen.
