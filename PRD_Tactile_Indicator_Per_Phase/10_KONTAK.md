# Menu Kontak & Konsultasi

**Produk:** Tactile Indicator — Product Catalog + WhatsApp Commerce  
**Dokumen:** PRD Spesifik UI/UX & Frontend  
**Fase:** 10  
**Prioritas:** P0  
**Route:** `/kontak`  
**Versi:** 1.0 • 2 November 2026  
**Acuan:** `PRD_UIUX_Frontend_Tactile_Indicator.md`  

> Hanya UI/UX dan frontend; seluruh contoh konten bersifat draft hingga disetujui klien.


## Goal
Menampilkan jalur komunikasi sah dan sederhana tanpa form lead capture atau mekanisme penyimpanan data.

## Section detail
1. Breadcrumb + H1 `Hubungi Kami` + deskripsi opsi konsultasi produk dan permintaan penawaran.
2. Primary CTA `Konsultasi via WhatsApp` (nomor approved).
3. Company contact card: nama, WhatsApp, email (`mailto:`), alamat dan jam (jika diberikan).
4. `Cara Konsultasi`: pilih produk → kirim kebutuhan ukuran/jumlah/lokasi → diskusi penawaran. Copy sebagai panduan, bukan SLA.
5. (Opsional) embed/static map jika alamat diverifikasi, diperlukan, dan dampak privasi/performa diterima.
6. Link kembali ke katalog dan FAQ.

## UI spec
Desktop 2-column, informasi di kiri dan contact panel di kanan; mobile stack dengan CTA besar. Gunakan Lucide `phone`, `mail`, `map-pin`, `arrow-up-right`; untuk identitas WhatsApp tampilkan teks eksplisit, jangan mengklaim Lucide sebagai logo resmi.

## Interactions
- `wa.me` dengan template general; email melalui `mailto:` yang valid; alamat hanya dapat di-link jika disetujui.
- Tombol copy nomor (P1 opsional) memberi feedback *setelah* copy berhasil; jangan UI copy tanpa handler.
- No contact form pada P0; jangan ada fake submit success.

## SEO & accessibility
Title/meta unik; Company/contact information konsisten dengan footer dan About, `address` semantik bila sesuai; semua link mempunyai nama aksesibel.

## States
Nomor WA belum valid → jangan publikasikan CTA salah; jika email atau alamat tidak tersedia, sembunyikan item tanpa label kosong. Peta tidak tampil bila tidak didukung data.

## Acceptance criteria
- **AC-K-01:** semua nomor/email cocok dengan data approved.
- **AC-K-02:** WA CTA berlaku di desktop/mobile.
- **AC-K-03:** tidak ada form yang menyiratkan data telah disimpan.
- **AC-K-04:** contact info konsisten dengan footer.


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
