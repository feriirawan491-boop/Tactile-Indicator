# Tactile Website

Dokumen PRD berada di folder `PRD_Tactile_Indicator_Per_Phase/`.
Source aplikasi berada di `tactile-web/`.

Jalankan dari folder utama workspace ini:

```sh
npm run dev
```

Buka **http://127.0.0.1:3000**. Biarkan terminal server tetap berjalan.
Untuk menghentikannya, tekan Ctrl+C pada terminal tersebut.

Pada komputer baru, jalankan `npm run setup` terlebih dahulu.

Dokumentasi pengembangan: [tactile-web/README.md](tactile-web/README.md).

## Verifikasi dan handoff

`npm run check` menjalankan lint, TypeScript, tes, dan build. Dengan server lokal aktif, jalankan `npm run test:smoke`. Lihat [laporan handoff akhir](tactile-web/docs/RELEASE_HANDOFF.md) untuk status QA dan gate rilis publik.
