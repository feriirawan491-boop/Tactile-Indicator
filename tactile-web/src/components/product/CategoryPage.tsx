import { getI18n } from "@/i18n/server";
import Link from "next/link";
import { ProductImage } from "./ProductImage";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductGrid } from "./ProductGrid";
import { PatternPreview } from "./PatternPreview";
import { Accordion } from "@/components/ui/Accordion";
import { WhatsAppCTA } from "@/components/conversion/WhatsAppCTA";
import type {
  FunctionCategoryView,
  MaterialCategoryView,
  ProductCardView,
} from "@/types/product";
import { demoSuffix, catalogUrl } from "@/lib/catalog";
export async function FunctionPageView({
  category,
  products,
  materials,
  demo,
}: {
  category: FunctionCategoryView;
  products: ProductCardView[];
  materials: MaterialCategoryView[];
  demo: boolean;
}) {
  const { t: tr, href: localizeHref } = await getI18n();

  return (
    <div className="container">
      <Breadcrumbs
        label={category.title}
        parents={[
          { label: "Produk", href: "/produk" },
          { label: "Berdasarkan fungsi" },
        ]}
      />
      <section className="category-hero">
        <div>
          <p className="eyebrow">
            {tr("FUNGSI /")}
            {tr(category.functionType.toUpperCase())}
          </p>
          <h1>{tr(category.title)}</h1>
          <p>{tr(category.definition)}</p>
          <Link
            className="text-link"
            href={localizeHref(
              catalogUrl({ fungsi: category.functionType, demo }),
            )}
          >
            {tr("Lihat di katalog ↗")}
          </Link>
        </div>
        <div>
          {products[0]?.image ? (
            <ProductImage image={products[0].image} />
          ) : (
            <PatternPreview type={category.functionType} />
          )}
          <small className="media-caption">
            {tr(
              products[0]?.image
                ? products[0].imageKind === "generated"
                  ? "ILUSTRASI AI · BUKAN FOTO PRODUK RESMI"
                  : "GAMBAR REFERENSI PRODUK"
                : "DIAGRAM POLA · BUKAN FOTO PRODUK",
            )}
          </small>
        </div>
      </section>
      <div className="category-facts">
        {[
          ["Ciri fisik", category.characteristics],
          ["Kegunaan", category.usage],
          ["Kapan dipilih", category.selection],
        ].map(([t, d]) => (
          <div key={t}>
            <h2>{tr(t)}</h2>
            <p>{tr(d)}</p>
          </div>
        ))}
      </div>
      {materials.length > 1 && (
        <section className="section">
          <h2>{tr("PILIHAN MATERIAL.")}</h2>
          <div className="category-links">
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
      )}
      {products.length > 0 && (
        <section className="section">
          <h2>
            {tr("PRODUK")}
            {tr(category.functionType.toUpperCase())}.
          </h2>
          <ProductGrid products={products} demo={demo} />
        </section>
      )}
      <section className="section category-help">
        <div>
          <p className="eyebrow">{tr("SEBELUM MENENTUKAN PILIHAN")}</p>
          <h2>{tr("PAHAMI FUNGSINYA.")}</h2>
          <Link className="text-link" href={localizeHref("/panduan")}>
            {tr("Panduan tactile indicator ↗")}
          </Link>
          <Link className="text-link" href={localizeHref("/faq")}>
            {tr("Pertanyaan umum ↗")}
          </Link>
          <WhatsAppCTA
            label={`Tanya produk ${category.functionType}`}
            message={`Halo, saya ingin konsultasi produk ${category.functionType}.`}
          />
        </div>
        <Accordion items={category.faq} />
      </section>
    </div>
  );
}
export async function MaterialPageView({
  material,
  products,
  demo,
}: {
  material: MaterialCategoryView;
  products: ProductCardView[];
  demo: boolean;
}) {
  const { t: tr, href: localizeHref } = await getI18n();

  return (
    <div className="container">
      <Breadcrumbs
        label={material.name}
        parents={[
          { label: "Produk", href: "/produk" },
          { label: "Berdasarkan material" },
        ]}
      />
      <section className="catalog-hero material-hero-visual">
        <div>
          <p className="eyebrow">
            {tr("MATERIAL /")}
            {tr(material.name.toUpperCase())}
          </p>
          <h1>
            {tr("TACTILE INDICATOR")}
            <br />
            {tr(material.name)}.
          </h1>
          <p>{tr(material.description)}</p>
        </div>
        {products[0]?.image && (
          <div>
            <ProductImage image={products[0].image} />
            <small className="media-caption">
              {tr(
                products[0].imageKind === "generated"
                  ? "ILUSTRASI AI · BUKAN SPESIFIKASI PRODUK RESMI"
                  : "GAMBAR REFERENSI PRODUK",
              )}
            </small>
          </div>
        )}
      </section>
      {material.considerations.some((item) => item.trim()) && (
        <section className="section">
          <h2>{tr("PERTIMBANGAN MATERIAL.")}</h2>
          <div className="category-facts">
            {material.considerations.map((item, i) => (
              <div key={item}>
                <span className="eyebrow">0{i + 1}</span>
                <p>{tr(item)}</p>
              </div>
            ))}
          </div>
          <p className="category-copy">
            {tr(
              "Pemilihan dan pemasangan perlu mengikuti spesifikasi produk serta kebutuhan proyek. Tidak ada klaim kecocokan universal untuk sebuah material.",
            )}
          </p>
        </section>
      )}
      {material.specs.length > 0 && (
        <section className="section">
          <h2>{tr("SPESIFIKASI UMUM.")}</h2>
          <div className="spec-scroll">
            <table>
              <caption>
                {tr("Spesifikasi")}
                {tr(material.name)}
              </caption>
              <tbody>
                {material.specs.map((s) => (
                  <tr key={s.label}>
                    <th scope="row">{tr(s.label)}</th>
                    <td>{tr(s.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
      {products.length > 0 && (
        <section className="section">
          <h2>{tr(demo ? "CONTOH PRODUK." : "PRODUK YANG TERSEDIA.")}</h2>
          <ProductGrid products={products} demo={demo} />
          <div className="category-links">
            <Link href={localizeHref("/produk/fungsi/guiding-block")}>
              {tr("Kenali fungsi guiding ↗")}
            </Link>
            <Link href={localizeHref("/produk/fungsi/warning-block")}>
              {tr("Kenali fungsi warning ↗")}
            </Link>
            <Link
              href={localizeHref(catalogUrl({ material: material.slug, demo }))}
            >
              {tr("Buka katalog terfilter ↗")}
            </Link>
          </div>
        </section>
      )}
      <section className="section category-help">
        <div>
          <h2>{tr("SESUAIKAN KEBUTUHAN.")}</h2>
          <Link className="text-link" href={localizeHref("/panduan")}>
            {tr("Panduan pemilihan ↗")}
          </Link>
          <WhatsAppCTA
            label={`Tanya produk ${material.name}`}
            message={`Halo, saya ingin konsultasi produk tactile indicator material ${material.name}.`}
          />
        </div>
        <Accordion items={material.faq} />
      </section>
    </div>
  );
}
