import { getI18n } from "@/i18n/server";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { privacyDraft } from "@/data/privacy";
import { pageMetadata } from "@/lib/seo";
export async function generateMetadata() {
  return pageMetadata(
    "Informasi privasi — draft",
    "Ringkasan fitur frontend dan layanan eksternal untuk review kebijakan privasi sebelum publikasi.",
    "/kebijakan-privasi",
  );
}
export default async function Privacy() {
  const { t: tr, href: localizeHref } = await getI18n();

  return (
    <div className="container">
      <Breadcrumbs label="Kebijakan privasi" />
      <article className="privacy-page">
        <header>
          <p className="eyebrow">{tr("TRANSPARANSI / INFORMASI PRIVASI")}</p>
          <h1>
            {tr("KEBIJAKAN")}
            <br />
            {tr("PRIVASI.")}
          </h1>
          <p className="draft-badge">
            {tr("DRAFT · MEMERLUKAN PERSETUJUAN KLIEN")}
          </p>
          <p className="privacy-updated">
            {tr("Pembaruan draft:")}
            {tr(" ")}
            <time dateTime={privacyDraft.updated}>{tr("3 November 2026")}</time>
          </p>
        </header>
        {privacyDraft.sections.map((s) => (
          <section key={s.id} id={s.id}>
            <h2>{tr(s.title)}</h2>
            {s.paragraphs.map((p) => (
              <p key={p}>{tr(p)}</p>
            ))}
          </section>
        ))}
        <Link className="text-link" href={localizeHref("/kontak")}>
          {tr("Lihat informasi kontak ↗")}
        </Link>
      </article>
    </div>
  );
}
