import { getI18n } from "@/i18n/server";
import Link from "next/link";
import { ProductChooser } from "@/components/product/ProductChooser";
import { getCatalog } from "@/data/catalog";
import {
  normalizeFilters,
  filterProducts,
  catalogUrl,
  demoSuffix,
  isDemoQuery,
} from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductFilters } from "@/components/product/ProductFilters";
import { paginateProducts } from "@/lib/pagination";
import { ProductPagination } from "@/components/product/ProductPagination";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { SearchQuery } from "@/types/product";
export async function generateMetadata() {
  return pageMetadata(
    "Katalog Tactile Indicator Stainless Steel",
    "Jelajahi pelat tactile, stud, dan strip stainless steel. Pilih pola guiding atau warning, bandingkan model, dan tanyakan spesifikasi serta penawaran.",
    "/produk",
  );
}
export default async function Catalog({
  searchParams,
}: {
  searchParams: Promise<SearchQuery>;
}) {
  const { t: tr, href: localizeHref } = await getI18n();

  const query = await searchParams;
  const demo = isDemoQuery(query);
  const { products, materials } = getCatalog(demo);
  const filters = normalizeFilters(
      query,
      materials.map((m) => m.slug),
    ),
    results = filterProducts(products, filters);
  const pagination = paginateProducts(results, query.page);
  const chips = [
    ["fungsi", filters.fungsi],
    ["bentuk", filters.bentuk ?? ""],
    ["material", filters.material],
    ["q", filters.q],
    ["grade", filters.grade ?? ""],
    ["finishing", filters.finishing ?? ""],
  ].filter(([, v]) => v);
  return (
    <div className="container">
      <Breadcrumbs label="Produk" />
      <section className="catalog-hero">
        <p className="eyebrow">{tr("KATALOG / FUNGSI & MATERIAL")}</p>
        <h1>
          {tr("KATALOG")}
          <br />
          {tr("TACTILE INDICATOR.")}
        </h1>
        <p>
          {tr(
            "Cari tactile indicator yang sesuai untuk area Anda. Jelajahi pelat siap susun, stud bulat, dan strip memanjang berbahan stainless steel. Gunakan filter untuk mempersempit pilihan, lalu cek detail model yang Anda suka.",
          )}
        </p>
        <div className="category-links">
          <Link href={localizeHref("/produk/fungsi/guiding-block")}>
            {tr("Guiding / Garis ↗")}
          </Link>
          <Link href={localizeHref("/produk/fungsi/warning-block")}>
            {tr("Warning / Titik ↗")}
          </Link>
          {materials.map((m) => (
            <Link
              key={m.slug}
              href={localizeHref(
                `/produk/material/${m.slug}${demoSuffix(demo)}`,
              )}
            >
              {tr(m.name)} ↗
            </Link>
          ))}
        </div>
      </section>
      <p className="category-copy">
        {tr(
          "Sudah menemukan pilihan? Tanyakan ukuran, grade material, dan ketersediaan model melalui WhatsApp sebelum memesan.",
        )}
      </p>
      <ProductChooser demo={demo} materials={materials} />
      <div className="catalog-layout">
        <ProductFilters
          key={JSON.stringify(filters)}
          filters={filters}
          materials={materials}
        />
        <section
          id="catalog-results"
          className="catalog-results"
          aria-label={tr("Hasil katalog")}
        >
          <div className="results-heading">
            <p>
              <strong>{results.length}</strong>
              {tr(" ")}
              {tr("produk")} {tr("ditemukan")}
            </p>
            <span>{tr("FUNGSI SEBELUM BENTUK")}</span>
          </div>
          {results.length > 0 && (
            <p className="pagination-summary">
              {tr("Menampilkan")} {pagination.from}–{pagination.to} {tr("dari")}{" "}
              {results.length} {tr("produk")}
            </p>
          )}
          {chips.length > 0 && (
            <div className="filter-chips">
              {chips.map(([key, value]) => (
                <Link
                  key={key}
                  aria-label={tr(`Hapus filter ${key}: ${value}`)}
                  href={localizeHref(catalogUrl({ ...filters, [key]: "" }))}
                >
                  {tr(key)}: {tr(value)} ×
                </Link>
              ))}
              <Link href={localizeHref(catalogUrl({ demo }))}>
                {tr("Reset semua")}
              </Link>
            </div>
          )}
          <ProductGrid
            products={pagination.items}
            demo={demo}
            filtered={products.length > 0 && chips.length > 0}
            resetHref={catalogUrl({ demo })}
          />
          <ProductPagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            filters={filters}
          />
        </section>
      </div>
    </div>
  );
}
