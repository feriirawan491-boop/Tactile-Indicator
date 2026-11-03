# Halaman Pendukung: Privasi, 404 & States

**Produk:** Tactile Indicator — Product Catalog + WhatsApp Commerce  
**Dokumen:** PRD Spesifik UI/UX & Frontend  
**Fase:** 11  
**Prioritas:** P0  
**Route:** `/kebijakan-privasi | /404 | error/loading boundaries`  
**Versi:** 1.0 • 2 November 2026  
**Acuan:** `PRD_UIUX_Frontend_Tactile_Indicator.md`  

> Hanya UI/UX dan frontend; seluruh contoh konten bersifat draft hingga disetujui klien.


## Goal
Menjamin kepercayaan dan navigasi tetap baik pada edge cases, serta menyediakan informasi privasi yang sesuai fitur situs aktual.

## Privacy `/kebijakan-privasi`
- Judul, tanggal pembaruan (riil), identitas pengelola, jenis data yang diproses oleh frontend dan pihak ketiga **jika benar ada** (mis. analitik, external WA link), cara kontak dan rujukan kebijakan.
- Konten hukum **harus disediakan/disetujui klien atau penanggung jawab hukum**; frontend hanya menyajikan dan memelihara struktur tampilannya.
- Typography artikel lebar baca nyaman, heading hierarkis, link jelas, canonical unik; footer selalu link ke route ini.

## 404
- H1 jelas `Halaman tidak ditemukan`; deskripsi sederhana; tombol `Kembali ke Beranda`, `Lihat Produk`, `Hubungi Kami`.
- Jangan mengarahkan otomatis semua 404 ke home karena merusak pengalaman dan sinyal SEO.
- 404 HTTP status yang benar untuk slug tak dikenal.

## Loading/error frontend
- Route loading/skeleton menjaga ukuran card dan image agar CLS minimal.
- Error boundary menampilkan pesan umum, retry jika benar bisa dilakukan, navigasi ke katalog/home; jangan bocorkan detail internal.
- Image error fallback dengan teks alternatif, fokus keyboard tetap aman.

## SEO + QA
404 `noindex` sesuai kebutuhan, title/meta khusus error page, halaman privasi bisa crawlable, tidak ada stack trace pada publik.

## Acceptance criteria
- **AC-S-01:** `/produk/slug-tidak-ada` mengembalikan 404 valid.
- **AC-S-02:** privacy link footer berfungsi di semua route.
- **AC-S-03:** layar error tidak menampilkan exception/server detail.
- **AC-S-04:** link recovery dapat dioperasikan keyboard.


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
