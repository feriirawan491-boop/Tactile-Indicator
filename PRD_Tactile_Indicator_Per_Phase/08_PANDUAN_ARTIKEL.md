# Menu Panduan & Detail Artikel

**Produk:** Tactile Indicator — Product Catalog + WhatsApp Commerce  
**Dokumen:** PRD Spesifik UI/UX & Frontend  
**Fase:** 08  
**Prioritas:** P0  
**Route:** `/panduan | /panduan/[article-slug]`  
**Versi:** 1.0 • 2 November 2026  
**Acuan:** `PRD_UIUX_Frontend_Tactile_Indicator.md`  

> Hanya UI/UX dan frontend; seluruh contoh konten bersifat draft hingga disetujui klien.


## Goal
Mengakuisisi traffic SEO informasional, memberikan edukasi yang dapat dipercaya dan mengarahkan pembaca secara relevan ke katalog/produk/WA.

## Index `/panduan`
| Section | UI | Perilaku |
|---|---|---|
| Hero | H1 `Panduan Tactile Indicator`, intro | H1 tunggal |
| Featured article | editorial card besar | hanya jika featured tersedia |
| Topic navigation | fungsi, material, pemilihan, pemasangan | filter/tags berdasarkan data aktif |
| Article grid | thumbnail, judul, ringkasan, tanggal bila benar ada | card anchor |
| Pagination | anchor navigation | SEO crawlable |
| CTA | `Lihat Katalog` dan WA | conversion soft |

## Article detail `/panduan/[slug]`
1. Breadcrumb, H1, intro editorial, metadata penulis/tanggal **hanya jika valid**.
2. Cover image, caption, alt; konten paragraf & heading H2/H3 semantik.
3. Table of contents P1 untuk artikel panjang; anchor IDs stabil.
4. Inline image/table/FAQ terbaca di mobile dan menyertakan sumber saat mengutip standar.
5. Callout internal link ke produk/kategori yang relevan; CTA tidak mengganggu alur membaca.
6. Related articles, CTA closing dan footer.

## Strategi konten awal (draft judul)
- Apa Itu Tactile Indicator dan Cara Kerjanya?
- Perbedaan Guiding Block dan Warning Block.
- Material Tactile Indicator untuk Indoor vs Outdoor.
- Checklist Memilih Tactile Indicator untuk Proyek.
**Artikel harus disusun dari sumber tepercaya dan ditinjau oleh klien; standar regulasi wajib dikonfirmasi saat publikasi.**

## SEO editorial
Title/meta + canonical unik; article URL semantik; `Article` schema hanya field valid; `BreadcrumbList` bila valid; internal link relevan dan deskriptif. Jangan mengklaim `FAQPage` rich-result otomatis.

## Engineering
Typed article fixture/portable static content; gunakan rendering aman untuk rich text (jangan `dangerouslySetInnerHTML` dari sumber tak tepercaya), responsive typography, image sizes, table overflow. Article detail default server-rendered.

## States
Tidak ada artikel → editorial empty state (sebaiknya tunda indeks hingga punya konten); missing cover → textual fallback; invalid slug → 404; featured tidak ada → hide.

## Acceptance criteria
- **AC-G-01:** index dan article URL dapat dibuka langsung.
- **AC-G-02:** semantik heading tidak lompat tanpa alasan; setiap artikel satu H1.
- **AC-G-03:** setiap internal CTA menuju kategori/produk yang sesuai.
- **AC-G-04:** tabel dan images tetap terbaca di mobile.
- **AC-G-05:** artikel tidak menerbitkan informasi regulasi tak terverifikasi.


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
