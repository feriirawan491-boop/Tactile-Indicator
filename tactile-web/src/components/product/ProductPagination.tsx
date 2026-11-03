import Link from "next/link";
import { getI18n } from "@/i18n/server";
import { catalogUrl } from "@/lib/catalog";
import type { CatalogFilters } from "@/types/product";

export async function ProductPagination({
  page,
  totalPages,
  filters,
}: {
  page: number;
  totalPages: number;
  filters: CatalogFilters;
}) {
  const { t: tr, href: localizeHref } = await getI18n();
  if (totalPages <= 1) return null;
  const href = (number: number) => {
    const url = catalogUrl(filters);
    return localizeHref(
      `${url}${url.includes("?") ? "&" : "?"}page=${number}#catalog-results`,
    );
  };
  return (
    <nav className="product-pagination" aria-label={tr("Halaman katalog")}>
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev">
          ← {tr("Sebelumnya")}
        </Link>
      ) : (
        <span aria-disabled="true">← {tr("Sebelumnya")}</span>
      )}
      <div className="pagination-pages">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (number) => (
            <Link
              key={number}
              href={href(number)}
              aria-label={`${tr("Halaman")} ${number}`}
              aria-current={number === page ? "page" : undefined}
            >
              {number}
            </Link>
          ),
        )}
      </div>
      {page < totalPages ? (
        <Link href={href(page + 1)} rel="next">
          {tr("Berikutnya")} →
        </Link>
      ) : (
        <span aria-disabled="true">{tr("Berikutnya")} →</span>
      )}
    </nav>
  );
}
