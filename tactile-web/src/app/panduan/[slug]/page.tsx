import { JsonLd } from "@/components/JsonLd";
import { absoluteUrl } from "@/config/site";
import { getI18n } from "@/i18n/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ArticleCard } from "@/components/editorial/ArticleCard";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const a = articles.find((a) => a.slug === slug);
  return a
    ? pageMetadata(a.title, a.summary, `/panduan/${slug}`, {
        draft: !a.approved,
      })
    : {};
}
export default async function ArticlePage({ params }: Props) {
  const { t: tr, href: localizeHref } = await getI18n();

  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();
  return (
    <div className="container">
      <JsonLd
        data={{
          "@type": "Article",
          headline: tr(article.title),
          description: tr(article.summary),
          url: absoluteUrl(localizeHref(`/panduan/${article.slug}`)),
        }}
      />
      <Breadcrumbs
        label={article.title}
        parents={[{ label: "Panduan", href: "/panduan" }]}
      />
      <article className="article-page">
        <header>
          <p className="eyebrow">
            {tr("PANDUAN /")}
            {tr(article.topic.toUpperCase())}
          </p>
          <h1>{tr(article.title)}</h1>
          <p className="article-lead">{tr(article.summary)}</p>
          <span className="draft-badge">
            {tr("DRAFT EDUKASI · BELUM DIREVIEW KLIEN")}
          </span>
        </header>
        <div className="article-layout">
          <nav className="article-toc" aria-label={tr("Daftar isi")}>
            <p className="eyebrow">{tr("DALAM PANDUAN INI")}</p>
            {article.sections.map((s) => (
              <a key={s.id} href={localizeHref(`#${s.id}`)}>
                {tr(s.title)}
              </a>
            ))}
          </nav>
          <div className="article-body">
            {article.sections.map((s) => (
              <section key={s.id} id={s.id}>
                <h2>{tr(s.title)}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p}>{tr(p)}</p>
                ))}
                {s.items && (
                  <ul>
                    {s.items.map((i) => (
                      <li key={i}>{tr(i)}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            {article.sources.length > 0 && (
              <section className="article-sources">
                <h2>{tr("Rujukan")}</h2>
                <ul>
                  {article.sources.map((s) => (
                    <li key={s.url}>
                      <a
                        href={localizeHref(s.url)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {tr(s.title)} ↗
                      </a>
                    </li>
                  ))}
                </ul>
                <p>
                  {tr(
                    "Rujukan luar negeri digunakan untuk pengantar. Persyaratan proyek dan regulasi setempat perlu ditinjau sebelum publikasi atau penerapan.",
                  )}
                </p>
              </section>
            )}
            <aside className="article-callout">
              <h2>{tr("Lanjutkan eksplorasi.")}</h2>
              {article.relatedLinks.map((l) => (
                <Link
                  key={l.href}
                  className="text-link"
                  href={localizeHref(l.href)}
                >
                  {tr(l.label)} ↗
                </Link>
              ))}
            </aside>
          </div>
        </div>
      </article>
      <section className="section">
        <h2>{tr("BACA JUGA.")}</h2>
        <div className="guide-grid">
          {articles
            .filter((a) => a.slug !== slug)
            .map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
        </div>
      </section>
    </div>
  );
}
