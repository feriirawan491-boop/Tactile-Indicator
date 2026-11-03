import { getI18n } from "@/i18n/server";
import Link from "next/link";
import type { Article } from "@/types/article";
export async function ArticleCard({ article }: { article: Article }) {
  const { t: tr, href: localizeHref } = await getI18n();

  return (
    <article className="guide-card">
      <Link href={localizeHref(`/panduan/${article.slug}`)}>
        <div className="guide-top">
          <span>{tr(article.topic.toUpperCase())}</span>
          <span>{tr("DRAFT EDUKASI")}</span>
        </div>
        <h3>{tr(article.title)}</h3>
        <p>{tr(article.summary)}</p>
        <span className="text-link">{tr("Baca panduan ↗")}</span>
      </Link>
    </article>
  );
}
