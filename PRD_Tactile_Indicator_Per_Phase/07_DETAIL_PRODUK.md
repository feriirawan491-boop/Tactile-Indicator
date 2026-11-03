# Menu Detail Produk

**Produk:** Tactile Indicator — Product Catalog + WhatsApp Commerce  
**Dokumen:** PRD Spesifik UI/UX & Frontend  
**Fase:** 07  
**Prioritas:** P0 CRITICAL  
**Route:** `/produk/[product-slug]`  
**Versi:** 1.0 • 2 November 2026  
**Acuan:** `PRD_UIUX_Frontend_Tactile_Indicator.md`  

> Hanya UI/UX dan frontend; seluruh contoh konten bersifat draft hingga disetujui klien.


## Goal
Meyakinkan pembeli proyek dengan foto, spesifikasi akurat, dan mempermudah inquiry WhatsApp yang membawa konteks produk/varian.

## Layout hirarki
| Area | Desktop | Mobile | Prioritas |
|---|---|---|---|
| Breadcrumb | top full-width | horizontal wrapping | P0 |
| Gallery | kiri 55–60%, thumbnails | full-width atas, rasio stabil | P0 |
| Product summary | kanan 40–45% | setelah gallery | P0 |
| Attributes | fungsi, material, SKU opsional | compact rows | P0 |
| Selector varian | pilih ukuran/warna bila ada | accessible radios/select | P0 jika data varian |
| CTA | `Tanya Produk Ini via WhatsApp`, `Minta Penawaran` | tombol full-width | P0 |
| Spec table | bawah full-width | table scroll/card rows | P0 |
| Edukasi/aplikasi | copy faktual, mounting note bila valid | stack | P0 |
| Related + guides | 3–4 cards | scroll/grid | P0 jika data |

## Content specification
H1 nama produk nyata; subtitle fungsi + material; deskripsi manfaat faktual; daftar spesifikasi **hanya**: ukuran, ketebalan, permukaan/motif, warna, metode pemasangan, penggunaan, SKU bila diberikan. Harga tampil hanya bila diizinkan, default `Minta Penawaran`; stok tidak diasumsikan ready.

## Gallery interaction
Foto utama dengan `alt`; thumbnails berupa button dengan state terpilih; next/previous & zoom opsional P1; gambar gagal dimuat → fallback dengan ruang dimensi tetap. Hindari lightbox trap focus yang tidak bisa keluar.

## Selector interaction
- Varian hanya dirender jika benar ada; atribut tersedia dari data produk.
- Pilihan default boleh ada **hanya jika** produk punya varian preselected yang valid dan jelas terlihat.
- Jika belum dipilih, pesan WA **tidak menyebut varian** yang tidak dipilih.
- Jika varian wajib ditentukan menurut klien, validasi inline yang jelas sebelum aksi; jangan tanpa sebab mengunci konsultasi umum.

## WA message contract
```ts
type ProductInquiry = { name: string; url: string; variantLabel?: string };
function composeMessage({name,url,variantLabel}: ProductInquiry) {
  return `Halo, saya ingin konsultasi produk ${name}${variantLabel ? ` (varian ${variantLabel})` : ''}. Detail: ${url}`;
}
const href = `https://wa.me/${phone}?text=${encodeURIComponent(composeMessage(inquiry))}`;
```
`phone` dari public company config yang diverifikasi. URL produk canonical; fungsi normal jika WA tidak terinstal (web fallback). Tidak ada sistem chat internal.

## SEO detail
Metadata unik per SKU/slug; H1 tunggal, descriptive image alt, internal links kategori/panduan, breadcrumb schema valid. Product structured data hanya properti diketahui; jangan menyertakan price/availability/review/rating jika tidak tersedia. Public detail harus readable dari HTML response.

## States
Produk ada/slug invalid→404; 1/multiple/no photo; specs ada/sebagian; selected/unselected variant; WA config error; related 0; long title; image load slow.

## UX deliverables
Desktop 2-column wireframe, mobile conversion-first, gallery/select states, specs component, annotated WA examples dan focus order.

## Acceptance criteria (Given/When/Then)
- **AC-D-01:** Given product dengan ukuran, when dipilih `30×30 cm` lalu klik WA, then pesan mengandung nama produk, varian terpilih, URL.
- **AC-D-02:** Given tidak memilih varian, when klik WA, then pesan tidak memasukkan varian palsu.
- **AC-D-03:** Given spesifikasi ketebalan tidak tersedia, when render, then tidak ada nilai tebak-tebakan.
- **AC-D-04:** Given foto gagal, when load error, then layout tetap stabil dan CTA bisa digunakan.
- **AC-D-05:** Given crawler meminta product URL, then HTML memuat judul dan deskripsi produk.
- **AC-D-06:** WA CTA tetap bisa diakses via keyboard dan mobile tanpa tertutup sticky element.


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
