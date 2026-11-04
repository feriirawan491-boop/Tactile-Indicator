import { isPreview } from "@/config/site";
import { getI18n } from "@/i18n/server";
import Link from "next/link";
import { articles } from "@/data/articles";
import { ArticleCard } from "@/components/editorial/ArticleCard";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import type { SearchQuery } from "@/types/product";
export async function generateMetadata() {
  return pageMetadata(
    "Panduan tactile indicator",
    "Pengantar fungsi tactile indicator dan checklist untuk pembahasan kebutuhan proyek.",
    "/panduan",
  );
}
export default async function Guides({
  searchParams,
}: {
  searchParams: Promise<SearchQuery>;
}) {
  const { t: tr, href: localizeHref } = await getI18n();

  const query = await searchParams;
  const topic = typeof query.topik === "string" ? query.topik : "";
  const topics = [...new Set(articles.map((a) => a.topic))];
  const selected = topics.includes(topic as (typeof topics)[number])
    ? topic
    : "";
  const filtered = articles.filter((a) => !selected || a.topic === selected);
  const featured = !selected ? filtered.find((a) => a.featured) : undefined;
  return (
    <div className="container">
      <Breadcrumbs label="Panduan" />
      <section className="catalog-hero">
        <p className="eyebrow">{tr("JURNAL / BEKAL SEBELUM MEMILIH")}</p>
        <h1>
          {tr("PANDUAN")}
          <br />
          {tr("TACTILE INDICATOR.")}
        </h1>
        <p>
          {tr(
            "Pahami fungsi dan siapkan pertanyaan yang tepat sebelum menentukan pilihan.",
          )}
        </p>
        {isPreview && (
          <p className="draft-badge">
            {tr("KONTEN DRAFT · MENUNGGU REVIEW KLIEN")}
          </p>
        )}
      </section>
      <nav className="topic-nav" aria-label={tr("Topik panduan")}>
        <Link
          href={localizeHref("/panduan")}
          aria-current={!selected ? "page" : undefined}
        >
          {tr("Semua topik")}
        </Link>
        {topics.map((t) => (
          <Link
            key={t}
            href={localizeHref(`/panduan?topik=${encodeURIComponent(t)}`)}
            aria-current={selected === t ? "page" : undefined}
          >
            {tr(t)}
          </Link>
        ))}
      </nav>
      {featured && (
        <section className="featured-article">
          <p className="eyebrow">
            {tr("PILIHAN EDITORIAL /")}
            {tr(featured.topic.toUpperCase())}
          </p>
          <h2>{tr(featured.title)}</h2>
          <p>{tr(featured.summary)}</p>
          <Link
            className="text-link"
            href={localizeHref(`/panduan/${featured.slug}`)}
          >
            {tr("Mulai membaca ↗")}
          </Link>
        </section>
      )}
      <section className="section">
        <p className="eyebrow">
          {filtered.length} {tr("PANDUAN")}
          {tr(selected && `/ ${selected.toUpperCase()}`)}
        </p>
        <div className="guide-grid">
          {filtered
            .filter((a) => a.slug !== featured?.slug)
            .map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
        </div>
        {!filtered.length && <p>{tr("Belum ada panduan untuk topik ini.")}</p>}
      </section>
    </div>
  );
}
