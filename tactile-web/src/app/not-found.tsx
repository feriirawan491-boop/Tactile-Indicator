import { getI18n } from "@/i18n/server";
import Link from "next/link";
import type { Metadata } from "next";
export async function generateMetadata(): Promise<Metadata> {
  const { t: tr } = await getI18n();
  return {
    title: tr("Halaman tidak ditemukan"),
    robots: { index: false, follow: false },
  };
}
export default async function NotFound() {
  const { t: tr, href: localizeHref } = await getI18n();

  return (
    <section className="container recovery-page">
      <p className="eyebrow">{tr("404 / PERIKSA KEMBALI ARAH ANDA")}</p>
      <h1>
        {tr("HALAMAN")}
        <br />
        {tr("TIDAK DITEMUKAN.")}
      </h1>
      <p>
        {tr(
          "Alamat mungkin sudah berubah atau halaman belum tersedia. Pilih langkah berikut untuk melanjutkan.",
        )}
      </p>
      <div className="recovery-actions">
        <Link className="button" href={localizeHref("/")}>
          {tr("Kembali ke beranda ↗")}
        </Link>
        <Link className="button outline" href={localizeHref("/produk")}>
          {tr("Lihat produk")}
        </Link>
        <Link className="text-link" href={localizeHref("/kontak")}>
          {tr("Hubungi kami ↗")}
        </Link>
      </div>
    </section>
  );
}
