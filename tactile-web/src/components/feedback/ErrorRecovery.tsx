"use client";
import { useI18n } from "@/i18n/client";

import Link from "next/link";
export function ErrorRecovery({
  retry,
  title = "Halaman belum dapat dimuat.",
}: {
  retry: () => void;
  title?: string;
}) {
  const { t: tr, href: localizeHref } = useI18n();

  return (
    <section className="container recovery-page" role="alert">
      <title>{tr("Terjadi kendala | Tactile Indicator")}</title>
      <p className="eyebrow">{tr("TERJADI KENDALA")}</p>
      <h1>{tr(title)}</h1>
      <p>{tr("Silakan coba lagi atau lanjutkan melalui halaman lain.")}</p>
      <div className="recovery-actions">
        <button className="button" onClick={retry}>
          {tr("Coba lagi")}
        </button>
        <Link className="button outline" href={localizeHref("/produk")}>
          {tr("Lihat produk")}
        </Link>
        <Link className="text-link" href={localizeHref("/")}>
          {tr("Kembali ke beranda ↗")}
        </Link>
      </div>
    </section>
  );
}
