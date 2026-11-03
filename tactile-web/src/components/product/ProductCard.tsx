import { getI18n } from "@/i18n/server";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProductCardView } from "@/types/product";
import { demoSuffix } from "@/lib/catalog";
import { ProductImage } from "./ProductImage";
export async function ProductCard({
  product,
  demo = false,
}: {
  product: ProductCardView;
  demo?: boolean;
}) {
  const { t: tr, href: localizeHref } = await getI18n();

  return (
    <article
      className="product-card"
      data-function={product.functionType}
      data-functions={(product.functionTypes ?? [product.functionType]).join(
        ",",
      )}
      data-shape={product.shape}
      data-material={product.materialSlug}
    >
      <Link href={localizeHref(`/produk/${product.slug}${demoSuffix(demo)}`)}>
        <div className="product-card-visual">
          <ProductImage image={product.image} />
          {product.imageKind === "generated" && (
            <span className="ai-image-label">{tr("ILUSTRASI AI")}</span>
          )}
        </div>
        <div className="product-card-body">
          <span className="product-tag">
            {tr(
              product.functionTypes?.length === 2
                ? "ARAH & PERINGATAN"
                : product.functionType === "guiding"
                  ? "PEMANDU ARAH"
                  : "PERINGATAN",
            )}
            {tr(" ")}/ {tr(product.materialLabel)}
          </span>
          <h3>{tr(product.name)}</h3>
          <p>{tr(product.shortDescription)}</p>
          {product.education && (
            <dl className="card-facts">
              <div>
                <dt>{tr("Pola")}</dt>
                <dd>{tr(product.education.pattern)}</dd>
              </div>
              <div>
                <dt>{tr("Spesifikasi")}</dt>
                <dd>{tr("Konfirmasi sebelum memilih")}</dd>
              </div>
            </dl>
          )}
          {demo && product.dataKind !== "reference" && (
            <span className="draft-badge">
              {tr("CONTOH · BUKAN INVENTARIS")}
            </span>
          )}
          <span className="text-link">
            {tr(
              demo && product.dataKind !== "reference"
                ? "Lihat detail contoh"
                : "Lihat detail",
            )}
            <ArrowUpRight size={17} />
          </span>
        </div>
      </Link>
    </article>
  );
}
