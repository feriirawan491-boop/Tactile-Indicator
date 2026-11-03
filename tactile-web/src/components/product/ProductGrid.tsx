import { getI18n } from "@/i18n/server";
import Link from "next/link";
import type { ProductCardView } from "@/types/product";
import { ProductCard } from "./ProductCard";
export async function ProductGrid({
  products,
  demo = false,
  filtered = false,
  resetHref = "/produk",
}: {
  products: ProductCardView[];
  demo?: boolean;
  filtered?: boolean;
  resetHref?: string;
}) {
  const { t: tr, href: localizeHref } = await getI18n();

  return products.length ? (
    <div className="product-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} demo={demo} />
      ))}
    </div>
  ) : (
    <div className="catalog-empty">
      <span className="large-index">∅</span>
      <h3>
        {tr(
          filtered
            ? "Tidak ada produk yang sesuai."
            : "Data produk belum tersedia.",
        )}
      </h3>
      <p>
        {tr(
          filtered
            ? "Coba kurangi filter atau gunakan kata kunci lain."
            : "Produk akan ditampilkan setelah data resmi disetujui. Tidak ada stok atau spesifikasi yang diasumsikan.",
        )}
      </p>
      <Link className="text-link" href={localizeHref(resetHref)}>
        {tr(filtered ? "Reset semua filter" : "Kembali ke katalog")} ↗
      </Link>
    </div>
  );
}
