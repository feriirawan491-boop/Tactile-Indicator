# Menu Tentang Kami / Company Profile

**Produk:** Tactile Indicator — Product Catalog + WhatsApp Commerce  
**Dokumen:** PRD Spesifik UI/UX & Frontend  
**Fase:** 03  
**Prioritas:** P0  
**Route:** `/tentang-kami`  
**Versi:** 1.0 • 2 November 2026  
**Acuan:** `PRD_UIUX_Frontend_Tactile_Indicator.md`  

> Hanya UI/UX dan frontend; seluruh contoh konten bersifat draft hingga disetujui klien.


## Goal
Membangun kepercayaan pembeli B2B/B2G/proyek tanpa membuat klaim perusahaan yang belum disetujui.

## Spesifikasi section
| ID | Section | Isi wajib | Ketentuan |
|---|---|---|---|
| A-01 | Hero | H1 `Tentang [Nama Perusahaan]`, value proposition | nama perusahaan approved |
| A-02 | Profil | ringkasan bisnis dan fokus tactile indicator | 1–3 paragraf faktual |
| A-03 | Produk & layanan | guiding/warning, material aktif, konsultasi | link ke kategori, tanpa katalog palsu |
| A-04 | Cara kami membantu | diskusi kebutuhan → pemilihan produk → penawaran via WA | ini alur komunikasi, bukan janji layanan tak tersedia |
| A-05 | Bukti kepercayaan | portofolio/proyek/testimoni jika ada izin | sembunyikan section jika tak tersedia |
| A-06 | Lokasi & kontak | kota, alamat bila disetujui, WA/email | jangan mengarang lokasi |
| A-07 | CTA | `Diskusikan Kebutuhan Proyek` | general WA |

## Layout & perilaku
Editorial full-bleed type + image arsip resmi, 2-column narrative desktop dan stack mobile. Breadcrumb `Beranda / Tentang Kami`. Foto tim dan sertifikasi **opsional dengan approval**. Gunakan image placeholder hanya di staging.

## SEO & content
Title unik dengan nama perusahaan; meta description menjelaskan fokus produk dan kontak; H1 tunggal; anchor internal ke katalog, panduan, kontak. Organization schema hanya jika identitas dan data pendukung lengkap.

## States
Tidak ada project showcase → hilangkan card seluruhnya; tidak ada alamat → tampilkan WA/email yang benar. Jangan tampilkan `Lorem ipsum` atau logo klien tanpa izin.

## Deliverables
Copy deck tervalidasi, wireframe, hi-fi desktop/mobile, resource image list, typed `CompanyProfile` view contract.

## Acceptance criteria
- **AC-A-01:** seluruh nama, alamat, layanan dan bukti benar-benar disetujui.
- **AC-A-02:** tautan profil → produk dan WA aktif.
- **AC-A-03:** page terbaca mobile dan semua gambar punya alt faktual.


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
