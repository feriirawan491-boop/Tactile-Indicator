"use client";
import { useI18n } from "@/i18n/client";

import Link from "next/link";
export default function GlobalError({ retry }: { retry: () => void }) {
  const { t: tr, href: localizeHref } = useI18n();

  return (
    <html lang="id">
      <head>
        <title>{tr("Terjadi kendala | Tactile Indicator")}</title>
        <meta name="robots" content="noindex" />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
          background: "#fafafa",
          color: "#0a0a0a",
        }}
      >
        <main style={{ maxWidth: 800, margin: "auto", padding: "64px 24px" }}>
          <p>{tr("TERJADI KENDALA")}</p>
          <h1>{tr("Halaman belum dapat dimuat.")}</h1>
          <p>{tr("Silakan coba lagi atau kembali ke beranda.")}</p>
          <button
            onClick={retry}
            style={{ padding: "14px 20px", fontSize: 16, marginRight: 24 }}
          >
            {tr("Coba lagi")}
          </button>
          <Link href={localizeHref("/")}>{tr("Kembali ke beranda")}</Link>
        </main>
      </body>
    </html>
  );
}
