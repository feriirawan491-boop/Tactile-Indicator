import { getI18n } from "@/i18n/server";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCatalog } from "@/data/catalog";
import { isDemoQuery, demoSuffix, catalogUrl } from "@/lib/catalog";
import { absoluteUrl } from "@/config/site";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductEducation } from "@/components/product/ProductEducation";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInquiry } from "@/components/product/ProductInquiry";
import { SpecTable } from "@/components/product/SpecTable";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { SearchQuery } from "@/types/product";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchQuery>;
};
async function resolve(props: Props) {
  const { slug } = await props.params;
  const query = await props.searchParams;
  const demo = isDemoQuery(query);
  const { products } = getCatalog(demo);
  return {
    demo,
    products,
    query,
    product: products.find((p) => p.slug === slug),
  };
}
export async function generateMetadata(props: Props) {
  const { product } = await resolve(props);
  return product
    ? pageMetadata(
        product.name,
        product.shortDescription,
        `/produk/${product.slug}`,
      )
    : {};
}
export default async function ProductDetail(props: Props) {
  const { t: tr, href: localizeHref } = await getI18n();

  const { demo, product, products, query } = await resolve(props);
  if (!product) notFound();
  const images = product.gallery?.length
    ? product.gallery
    : product.image
      ? [product.image]
      : [];
  const url = absoluteUrl(localizeHref(`/produk/${product.slug}`));
  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.functionType === product.functionType ||
          p.materialSlug === product.materialSlug),
    )
    .sort(
      (a, b) =>
        Number(b.shape === product.shape) - Number(a.shape === product.shape) ||
        Number(b.functionType === product.functionType) -
          Number(a.functionType === product.functionType),
    )
    .slice(0, 3);
  return (
    <div className="container">
      <JsonLd
        data={{
          "@type": "Product",
          name: tr(product.name),
          description: tr(product.shortDescription),
          url,
          image: product.image ? absoluteUrl(product.image.src) : undefined,
          material: product.materialLabel,
        }}
      />
      <Breadcrumbs
        label={product.name}
        parents={[{ label: "Produk", href: catalogUrl({ demo }) }]}
      />
      <section className="product-detail">
        <div>
          <ProductGallery images={images} />
          {product.imageKind === "official" && (
            <p className="product-image-caption">
              {tr(
                "Foto referensi pemasok · Konfirmasikan model dan spesifikasi sebelum pemesanan.",
              )}
            </p>
          )}
          {product.imageKind === "generated" && (
            <p className="product-image-caption">
              {tr(
                "ILUSTRASI AI · Bentuk, warna, dan proporsi bukan acuan spesifikasi produk resmi.",
              )}
            </p>
          )}
        </div>
        <div className="product-summary">
          <p className="eyebrow">
            {tr(product.functionType.toUpperCase())} /{tr(" ")}
            {tr(product.materialLabel.toUpperCase())}
          </p>
          <h1>{tr(product.name)}</h1>
          <p className="detail-description">
            {tr(product.description || product.shortDescription)}
          </p>
          <dl className="product-attributes">
            <div>
              <dt>{tr("Fungsi")}</dt>
              <dd>
                {tr(
                  product.functionTypes?.length === 2
                    ? "Arah & peringatan sesuai komponen"
                    : product.functionType === "guiding"
                      ? "Pemandu arah — batang memanjang"
                      : "Peringatan — titik individual",
                )}
              </dd>
            </div>
            <div>
              <dt>{tr("Material")}</dt>
              <dd>{tr(product.materialLabel)}</dd>
            </div>
            <div>
              <dt>{tr("Harga")}</dt>
              <dd>{tr("Minta penawaran")}</dd>
            </div>
          </dl>
          <ProductInquiry
            product={product}
            url={url}
            initialVariantId={
              typeof query.model === "string" ? query.model : undefined
            }
          />
        </div>
      </section>
      <ProductEducation product={product} />
      {product.specs?.some((s) => s.value.trim()) && (
        <section className="section detail-specs">
          <p className="eyebrow">{tr("01 / DATA PRODUK")}</p>
          <h2>{tr("SPESIFIKASI.")}</h2>
          <SpecTable specs={product.specs ?? []} />
          {product.variants?.map((model) => (
            <details className="model-data" key={model.id}>
              <summary>{tr(model.label)}</summary>
              <SpecTable specs={model.specs ?? []} />
              {model.sourceUrl && (
                <a
                  className="text-link"
                  href={model.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {tr("Lihat data model pada sumber")} ↗
                </a>
              )}
            </details>
          ))}
        </section>
      )}
      <section className="section detail-education">
        <div>
          <p className="eyebrow">{tr("02 / PENGGUNAAN")}</p>
          <h2>
            {tr("SESUAIKAN")}
            <br />
            {tr("DENGAN KONTEKS.")}
          </h2>
        </div>
        <div>
          {(product.applicationNotes ?? []).map((p) => (
            <p key={p}>{tr(p)}</p>
          ))}
          <Link
            className="text-link"
            href={localizeHref(`/produk/fungsi/${product.functionType}-block`)}
          >
            {tr("Pelajari fungsi")} {tr(product.functionType)} ↗
          </Link>
          <Link
            className="text-link"
            href={localizeHref(
              `/produk/material/${product.materialSlug}${demoSuffix(demo)}`,
            )}
          >
            {tr("Kenali material")} {tr(product.materialLabel)} ↗
          </Link>
          <Link
            className="text-link"
            href={localizeHref("/panduan/checklist-memilih-tactile-indicator")}
          >
            {tr("Checklist sebelum memilih ↗")}
          </Link>
        </div>
      </section>
      {related.length > 0 && (
        <section className="section">
          <p className="eyebrow">{tr("03 / LANJUTKAN EKSPLORASI")}</p>
          <h2>{tr("PRODUK TERKAIT.")}</h2>
          <ProductGrid products={related} demo={demo} />
        </section>
      )}
    </div>
  );
}
