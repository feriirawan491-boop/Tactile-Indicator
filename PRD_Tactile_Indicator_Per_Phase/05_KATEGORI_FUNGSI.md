# Menu Kategori Berdasarkan Fungsi

**Produk:** Tactile Indicator — Product Catalog + WhatsApp Commerce  
**Dokumen:** PRD Spesifik UI/UX & Frontend  
**Fase:** 05  
**Prioritas:** P0  
**Route:** `/produk/fungsi/guiding-block | /produk/fungsi/warning-block`  
**Versi:** 1.0 • 2 November 2026  
**Acuan:** `PRD_UIUX_Frontend_Tactile_Indicator.md`  

> Hanya UI/UX dan frontend; seluruh contoh konten bersifat draft hingga disetujui klien.


## Goal
Menjelaskan perbedaan dua fungsi tactile indicator dengan visual tekstur dan daftar produk relevan, sehingga pemula tidak salah memilih.

## Template & route
- `/produk/fungsi/guiding-block`: H1 `Guiding Block (Ubin Pemandu)`; motif garis dan fungsi menunjukkan arah.
- `/produk/fungsi/warning-block`: H1 `Warning Block (Ubin Peringatan)`; motif titik dan fungsi memperingatkan kondisi tertentu.
- Template sama, tetapi paragraf, gambar, FAQ dan metadata **unik**, bukan sekadar mengganti keyword.

## Section detail
1. Breadcrumb `Beranda / Produk / Berdasarkan Fungsi / [Fungsi]`.
2. Hero label, H1, intro 60–120 kata yang ditinjau klien, visual pola yang benar.
3. `Ciri Fisik` (garis/titik), `Kegunaan` dan `Kapan Dipilih` tanpa membuat klaim teknis berlebihan.
4. `Pilihan Material` berdasarkan produk aktif; link ke category material yang valid.
5. Grid produk terkait (reuse katalog cards, hanya functionType sesuai).
6. Link panduan edukasi dan FAQ berkaitan.
7. CTA WhatsApp kontekstual `Saya ingin konsultasi produk [fungsi]`.

## Responsive & interaction
Desktop visual split; mobile visual mendahului grid, tiap kartu tetap terbaca. Link kategori material bisa membuka landing atau katalog dengan filter tergantung route yang tersedia. Tidak ada filter yang berpura-pura punya hasil.

## Data & states
`FunctionCategoryView {slug,title,definition,patternImage,usageNotes,productIds,faqIds,seo}`; missing product → edukasi tetap bisa tampil, empty listing + link katalog; missing explanation → jangan publish page sebagai SEO landing sebelum isi terverifikasi.

## SEO
Title/description/canonical unik per fungsi, H1 tunggal, structured breadcrumbs hanya jika valid, internal links ke artikel perbandingan dan produk spesifik.

## Acceptance criteria
- **AC-F-01:** guiding selalu berasosiasi dengan garis dan warning dengan titik dalam copy dan media.
- **AC-F-02:** kedua route direct load benar dan memiliki metadata unik.
- **AC-F-03:** listing tidak menampilkan produk fungsi lain.
- **AC-F-04:** WA CTA menyebut fungsi yang sedang dibuka.


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
