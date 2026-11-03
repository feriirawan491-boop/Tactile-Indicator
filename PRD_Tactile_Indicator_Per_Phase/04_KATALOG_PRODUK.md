# Menu Katalog Produk

**Produk:** Tactile Indicator — Product Catalog + WhatsApp Commerce  
**Dokumen:** PRD Spesifik UI/UX & Frontend  
**Fase:** 04  
**Prioritas:** P0 filter; P1 search enhancement  
**Route:** `/produk`  
**Versi:** 1.0 • 2 November 2026  
**Acuan:** `PRD_UIUX_Frontend_Tactile_Indicator.md`  

> Hanya UI/UX dan frontend; seluruh contoh konten bersifat draft hingga disetujui klien.


## Goal
Memungkinkan pembeli menemukan produk berdasarkan fungsi dan material sebelum membuka spesifikasi dan konsultasi.

## Struktur halaman
1. Breadcrumb + H1 `Katalog Tactile Indicator` + intro ringkas.
2. Category quick links guiding/warning dan material aktif.
3. Filter bar desktop / drawer filter mobile; opsi `Fungsi`, `Material`, `Penggunaan` hanya jika datanya tersedia.
4. (P1) search kata kunci produk; pencarian UI terhadap dataset yang tersedia.
5. Hasil: jumlah produk, chips filter aktif, `Reset semua`.
6. Grid product card: foto/aspect fixed, nama, fungsi, material, atribut kunci valid, `Lihat Detail`.
7. Pagination link nyata jika dataset besar; CTA ke WA untuk kebutuhan khusus.

## Typed data view contract
```ts
type FunctionType = 'guiding' | 'warning';
type ProductCardView = {
  id: string; slug: string; name: string;
  functionType: FunctionType; materialSlug: string;
  materialLabel: string; image: { src: string; alt: string } | null;
  shortDescription?: string;
};
```
Dataset mock hanya untuk membangun view, bukan mengaku stock tersedia.

## Filter interaction
- Multi-filter **AND** antar kelompok dan **OR** jika multiple pilihan dalam kelompok (jika multiple select disetujui). P0 dapat menggunakan single-select fungsi + material lebih sederhana.
- Sync state ke URL query (`?fungsi=guiding&material=beton`) + back/forward history. Ubah query hanya setelah user action, hindari race/hydration.
- Reset all mengosongkan query dan memperbarui hasil; chips removable; tampilkan message jika 0 hasil.
- Drawer filter: trap focus, close Escape, return trigger, apply/reset jelas; count hasil hanya bila diketahui.
- Katalog cards pakai `<a href="/produk/[slug]">` agar deep-link dan SEO bekerja.

## Layout
Desktop: sidebar 240–280px atau top filter + 3 kolom grid; tablet 2; mobile 1 atau 2 berdasarkan kerapatan copy (rekomendasi 1 untuk keterbacaan). Tidak gunakan hover sebagai satu-satunya cara akses CTA.

## SEO
Canonical `/produk` dan metadata unik. Kombinasi query filter default **bukan halaman indeks baru**; hindari duplikat konten. Pagination jika ada gunakan URL crawlable; jangan bergantung infinite-scroll saja.

## States
Default/results/selected/zero/empty-data/loading/image-error/long-name/URL-invalid-query. Query tidak dikenal diabaikan atau dibersihkan secara konsisten.

## Acceptance criteria
- **AC-P-01:** filter fungsi + material menghasilkan intersection yang benar.
- **AC-P-02:** zero results menampilkan pesan dan reset yang berfungsi.
- **AC-P-03:** filter dapat dibagikan via link dan kembali melalui browser back.
- **AC-P-04:** no broken card link, image fail tidak merusak card.
- **AC-P-05:** grid utuh di 320/375/768/1440px.


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
