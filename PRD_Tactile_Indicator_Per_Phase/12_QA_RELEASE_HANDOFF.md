# QA Lintas Fase & Handoff Frontend

**Produk:** Tactile Indicator — Product Catalog + WhatsApp Commerce  
**Dokumen:** PRD Spesifik UI/UX & Frontend  
**Fase:** 12  
**Prioritas:** P0  
**Route:** `semua route`  
**Versi:** 1.0 • 2 November 2026  
**Acuan:** `PRD_UIUX_Frontend_Tactile_Indicator.md`  

> Hanya UI/UX dan frontend; seluruh contoh konten bersifat draft hingga disetujui klien.


## Tujuan
Verifikasi fungsi visual/SEO/accessibility frontend dan menyampaikan artefak ke tim proyek; **bukan** setup layanan backend/server application.

## Matrix pengujian
| Area | Skenario minimal | Exit condition |
|---|---|---|
| Routes | direct load, refresh, deep link, invalid slug | correct page/404 |
| Global nav | mouse, touch, keyboard, Escape, focus return | tidak ada focus trap bocor |
| Catalog | filter function/material, URL sync, reset, empty | dataset & UI konsisten |
| Detail | variant, gallery fallback, specs missing | tidak ada fakta karangan |
| WhatsApp | general/product/context/encoding desktop mobile | link membuka tujuan yang benar, tidak mengklaim terkirim |
| Responsive | 320, 375, 390, 768, 1024, 1440 | no accidental horizontal overflow |
| Accessibility | semantic headings/links/buttons, labels, alt, contrast | isu blocker diselesaikan |
| SEO | titles/metas/canonical/breadcrumbs/crawlable links | unik & valid per route |
| Performance | optimized image/font, CWV snapshots | deviasi diukur & ditindak |
| Integrity | no placeholder, no unverified claims | content sign-off |
| Build | TS strict, lint, tests, production build | pass |

## Pengujian manual prioritas
- Keyboard-only pada header drawer, filter drawer, accordion, varian, galeri dan seluruh CTA.
- Screen reader spot-check: heading order, link purpose, alternative text dan filter changes.
- Mobile: safe-area CTA, viewport 320px, browser resize, slow network, image missing.
- WA: pesan varian ada/tidak ada dan URL encoding untuk `×`, `&`, spasi, karakter Indonesia.
- SEO: HTML response mengandung title/H1/deskripsi; robots/canonical tidak memblokir route publik secara tidak sengaja.

## Handoff artefak
Figma page designs + component variants/tokens, prototype, aset approved, matriks route, typed content contracts, README frontend, daftar dependency, checklist content validity, laporan hasil QA dan daftar known issues.

## Release gate P0
Semua blocker navigasi, konversi, SEO indexability, keyboard access dan informasi produk terselesaikan. Fitur P1/P2 ditandai deferred, bukan diam-diam dianggap selesai.


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
