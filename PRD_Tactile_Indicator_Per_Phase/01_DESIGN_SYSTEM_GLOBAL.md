# Design System, Global Shell & Komponen

**Produk:** Tactile Indicator — Product Catalog + WhatsApp Commerce  
**Dokumen:** PRD Spesifik UI/UX & Frontend  
**Fase:** 01  
**Prioritas:** P0  
**Route:** `semua route`  
**Versi:** 1.0 • 2 November 2026  
**Acuan:** `PRD_UIUX_Frontend_Tactile_Indicator.md`  

> Hanya UI/UX dan frontend; seluruh contoh konten bersifat draft hingga disetujui klien.


## Outcome
Menyediakan fondasi visual industrial yang konsisten di seluruh menu, mengurangi duplikasi UI dan risiko perubahan global.

## UI specification
| Elemen | Desktop | Mobile | Komponen/pola | Catatan |
|---|---|---|---|---|
| Top nav | logo kiri, link tengah, WA CTA kanan | logo + menu button + drawer | Preline navbar/overlay adapted, Lucide `menu`, `x` | sticky hanya jika tidak menutupi konten |
| Footer | 3–4 kelompok link, kontak, legal | stack | custom grid/Preline layout | link valid |
| Button | primary dark, outline, text | full-width bila sesuai | Preline button patterns | link WA harus `<a>` |
| Breadcrumb | horizontal | wrap/ellipsis aman | Preline breadcrumb | label `<nav aria-label>` |
| Cards | image/title/meta/action | stack responsif | Preline card adapted | seluruh card hanya clickable jika semantik valid |
| Accordion | keyboard buttons | sama | Preline accordion adapted | `aria-expanded`, `aria-controls` |
| Drawer | modal panel untuk mobile nav/filter | full/partial safe viewport | Preline overlay/React control | Escape & focus return |
| Feedback | skeleton, empty, error | sama | Preline skeleton/alert | tidak mengarang status |

## Token desain
- Background `white/neutral-50`; teks `neutral-950`; teks sekunder `neutral-600`; border `neutral-200`; dark section `neutral-950` + teks putih.
- Spacing skala 4/8/12/16/24/32/48/64/96; border 1px; radius 0–8px; shadow minimal.
- Display Bebas Neue: hero `clamp(2.5rem, 7vw, 6rem)`, H2 `clamp(2rem, 4.5vw, 4rem)`; body Plus Jakarta Sans 16–18px.
- Gunakan token CSS semantik, bukan menerapkan kode warna secara acak ke tiap halaman.

## Struktur komponen frontend (usulan)
```text
src/
  app/(site)/layout.tsx
  components/layout/{SiteHeader,MobileNav,SiteFooter,Breadcrumbs}.tsx
  components/ui/{Button,SectionHeading,Accordion,EmptyState,Skeleton}.tsx
  components/product/{ProductCard,ProductGallery,SpecTable,ProductFilters}.tsx
  components/conversion/WhatsAppCTA.tsx
  config/{navigation,company}.ts
  lib/{whatsapp,seo}.ts
  types/{product,article}.ts
  data/fixtures/*
```

## Aturan frontend
- Link navigasi HTML nyata, prefetch sesuai strategi Next.js, `next/image` dengan `sizes` dan ukuran eksplisit, fallback gambar.
- Pilih komponen server secara default; client component hanya untuk interaksi filter, galeri, menu, accordion apabila diperlukan.
- Gunakan lifecycle plugin Preline secara hati-hati; jika bersinggungan dengan hydration React, pilih implementasi React native yang aksesibel.
- `config/company` berisi placeholder **bukan** nomor aktif sebelum persetujuan; pada produksi wajib terisi.
- Hindari nested interactive elements dan aksesibilitas hover-only.

## Interaction states
Header open/closed/scrolled; WA CTA ready/error-config; cards hover/focus; drawer opening/open/closing; skeleton image; empty/no data; long product name; nav active route.

## Deliverable desain
Tokens Figma, style guide, type scale, component variants, header/footer responsive, dark/light section, prototype navigasi dan dokumentasi states.

## Acceptance criteria
- **AC-01** 320px tidak ada overflow horizontal pada global shell.
- **AC-02** Menu mobile: Enter/Space membuka, Escape menutup, fokus kembali ke pemicu.
- **AC-03** Active nav terbaca dan jelas tanpa mengandalkan warna semata.
- **AC-04** CTA WhatsApp menggunakan URL yang valid hanya saat nomor sudah disetujui.
- **AC-05** Minimal automated lint/TS/build + audit keyboard navigasi komponen inti.


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
