# Menu FAQ

**Produk:** Tactile Indicator — Product Catalog + WhatsApp Commerce  
**Dokumen:** PRD Spesifik UI/UX & Frontend  
**Fase:** 09  
**Prioritas:** P0  
**Route:** `/faq`  
**Versi:** 1.0 • 2 November 2026  
**Acuan:** `PRD_UIUX_Frontend_Tactile_Indicator.md`  

> Hanya UI/UX dan frontend; seluruh contoh konten bersifat draft hingga disetujui klien.


## Goal
Menjawab pertanyaan pembeli awam dan procurement untuk mengurangi hambatan sebelum chat WhatsApp.

## Struktur halaman
1. Breadcrumb, H1 `Pertanyaan yang Sering Diajukan`, intro.
2. Topic chips atau heading grup: produk/fungsi, material, ukuran/varian, pemasangan, pemesanan/penawaran, pengiriman (hanya topik berjawaban valid).
3. Accordion list (atau `details/summary` native) dengan pertanyaan literal, jawaban ringkas, internal link bila relevan.
4. `Masih ada pertanyaan?` + WA CTA.

## Content requirements
Jawaban tidak berspekulasi tentang harga, garansi, MOQ, lead time, ongkir, aturan pemasangan, sertifikat. Cek terminologi guiding garis dan warning titik konsisten dengan katalog.

## UX interaction
- Accordion trigger keyboard-friendly dengan indikator `chevron-down`; `aria-expanded`/`aria-controls`, fokus jelas; single/multiple-open diputuskan saat desain dan diterapkan konsisten.
- Filter kategori jika dibuat menggunakan button, bukan tab palsu tanpa keyboard behavior.
- Plain HTML answer harus tersedia tanpa tergantung request dinamis; mencegah blank content bagi crawler.

## Layout
Container baca maksimal ~800–900px, list terbagi kategori, jarak besar dan border bawah 1px. Mobile target tap nyaman, multiline question tidak clipping.

## SEO
Title/meta/canonical unik; FAQ text menjawab intent, link ke panduan. Structured data FAQ optional dan hanya bila mematuhi kebijakan search engine saat publikasi; **jangan menjanjikan rich snippet**.

## States
Empty FAQ → konten default tidak dibuat-buat, tampil WA + katalog; all collapsed/one expanded; long question; no answer approved → item tidak tampil.

## Acceptance criteria
- **AC-Q-01:** semua accordion dapat dibuka dengan keyboard dan ditutup tanpa mouse.
- **AC-Q-02:** copy FAQ tidak bertentangan dengan spesifikasi produk.
- **AC-Q-03:** CTA WA mengirim konteks general FAQ, bukan nama produk random.
- **AC-Q-04:** konten jawaban ada dalam HTML page.


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
