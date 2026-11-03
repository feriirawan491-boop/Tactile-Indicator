# Menu Kategori Berdasarkan Material

**Produk:** Tactile Indicator — Product Catalog + WhatsApp Commerce  
**Dokumen:** PRD Spesifik UI/UX & Frontend  
**Fase:** 06  
**Prioritas:** P0  
**Route:** `/produk/material/[material-slug]`  
**Versi:** 1.0 • 2 November 2026  
**Acuan:** `PRD_UIUX_Frontend_Tactile_Indicator.md`  

> Hanya UI/UX dan frontend; seluruh contoh konten bersifat draft hingga disetujui klien.


## Goal
Membantu pengunjung membandingkan kesesuaian material berdasarkan kebutuhan lokasi dan spesifikasi, bukan klaim material terbaik secara mutlak.

## Route creation rule
Buat halaman hanya untuk material yang **benar tersedia dan dijual**. Kandidat: beton pracetak, keramik/porcelain, stainless steel, polyurethane, rubber, FRP; daftar final dari klien. Tidak membuat halaman kosong untuk ranking SEO.

## Section detail
1. Breadcrumb + H1 format `Tactile Indicator [Material]`.
2. Hero visual nyata material dan definisi singkat.
3. `Karakteristik Material`: tampilan, area aplikasi, kelebihan/hal yang perlu diperhatikan **berbasis spesifikasi valid**.
4. `Produk yang Tersedia`: grid fungsi guiding/warning yang tersedia dalam material tersebut.
5. `Spesifikasi Umum`: tabel fakta per material jika ada, bukan rata-rata yang ditebak.
6. `Pertimbangan Memilih`: indoor/outdoor, kondisi permukaan, kebutuhan maintenance; beri disclaimer bahwa pemasangan mengikuti spesifikasi proyek.
7. Related guides + FAQ material + CTA `Tanya Produk [Material]`.

## Layout & components
Editorial hero, feature cards, SpecTable, ProductCard, `Breadcrumbs`, `WhatsAppCTA`, `AccordionFAQ`; gunakan Preline Card/Table/Accordion patterns dan Lucide `layers`, `ruler`, `info` seperlunya.

## Data state & contracts
`MaterialCategoryView {slug,name,description,image,applications?,specs?,productIds,faqIds,seo}`. Nilai belum disuplai → hapus baris specs, jangan tampilkan angka placeholder di produksi. Material slug tidak ada → route 404 yang benar.

## SEO
Halaman material punya original helpful content, metadata/canonical unik, links ke fungsi dan detail produk. Hindari thin/duplicate page otomatis dari query katalog.

## Acceptance criteria
- **AC-M-01:** hanya material aktif yang dapat ditemukan dari navigasi.
- **AC-M-02:** tiap halaman hanya menampilkan produk bermaterial tersebut.
- **AC-M-03:** specs kosong tidak menjadi angka fiktif.
- **AC-M-04:** slug invalid berakhir 404, bukan generic material dummy.


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
