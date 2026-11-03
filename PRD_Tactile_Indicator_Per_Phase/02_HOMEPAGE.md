# Menu Homepage

**Produk:** Tactile Indicator — Product Catalog + WhatsApp Commerce  
**Dokumen:** PRD Spesifik UI/UX & Frontend  
**Fase:** 02  
**Prioritas:** P0  
**Route:** `/`  
**Versi:** 1.0 • 2 November 2026  
**Acuan:** `PRD_UIUX_Frontend_Tactile_Indicator.md`  

> Hanya UI/UX dan frontend; seluruh contoh konten bersifat draft hingga disetujui klien.


## Goal, audience, conversion
Dalam 5–10 detik pengunjung memahami tactile indicator, perbedaan guiding/warning, dan cara mengeksplorasi produk atau konsultasi. CTA primer katalog; sekunder WhatsApp.

## Struktur halaman (urutan vertikal)
| ID | Section | Isi/komponen | Perilaku/responsive | SEO |
|---|---|---|---|---|
| H-01 | Header | global nav + WA | nav drawer mobile | semantic nav |
| H-02 | Hero | eyebrow, satu H1 Bebas Neue, subcopy, `Lihat Produk`, `Konsultasi WhatsApp`, foto macro asli | desktop editorial split, mobile stacked | LCP image prioritas |
| H-03 | Intro | definisi singkat tactile + `Pelajari Lebih Lanjut` | body lebar baca nyaman | internal link panduan |
| H-04 | Fungsi | 2 category tiles: guiding garis, warning titik | mobile 1 kolom | anchor halaman kategori |
| H-05 | Material | grid material aktif saja | 2 mobile / 3–4 desktop sesuai layout | link landing material |
| H-06 | Produk pilihan | kartu produk yang memang di-feature | fallback sembunyikan jika kosong | link detail |
| H-07 | Cara memilih | fungsi → material → penggunaan → spesifikasi | step editorial | helpful copy |
| H-08 | Bukti perusahaan | proyek/sertifikat/layanan *jika tervalidasi* | tanpa klaim dummy | trust content |
| H-09 | Panduan | 2–3 article cards | grid responsif | link editorial |
| H-10 | FAQ ringkas | 3–5 pertanyaan | accordion | text HTML |
| H-11 | CTA penutup + footer | pertanyaan proyek? konsultasi WA | dark band | anchor/contact |

## Hierarki & microcopy
H1 contoh: `TACTILE INDICATOR UNTUK JALUR YANG LEBIH TERARAH`. Jelaskan fungsi dan opsi material dengan istilah awam. Jangan gunakan klaim kualitas absolut tanpa bukti.

## Interaction & state
- CTA katalog ke `/produk`, guiding/warning ke slug yang tepat, card material hanya jika material aktif.
- Featured kosong → section tidak dirender. Foto tidak ada → fallback produk generik berlabel, bukan visual palsu.
- WhatsApp general: `Halo, saya ingin konsultasi tentang produk tactile indicator.`
- Mobile: jarak CTA jelas, hero tidak menenggelamkan info produk, nav tetap dapat digunakan.

## UX deliverables
Wireframe mobile/desktop, hi-fi hero + 11 section, prototype CTA, annotated fold/scroll, content priority matrix.

## Acceptance criteria
- **AC-H-01:** hanya satu H1 dan ada penjelasan produk sebelum/bersamaan visual hero.
- **AC-H-02:** kedua fungsi berbeda secara teks + pola, tidak hanya warna.
- **AC-H-03:** CTA katalog/WA terlihat jelas pada viewport standar mobile.
- **AC-H-04:** semua tile dan artikel menuju route aktual, tidak ada dead link.
- **AC-H-05:** hero tidak menyebabkan CLS; media penting dioptimasi.


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
