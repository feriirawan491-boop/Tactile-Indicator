import { getI18n } from "@/i18n/server";
import Link from "next/link";
import Image from "next/image";
import { catalogUrl, demoSuffix } from "@/lib/catalog";
import { materialEducation } from "@/data/product-education";
import type { MaterialCategoryView } from "@/types/product";
export async function ProductChooser({
  demo,
  materials,
}: {
  demo: boolean;
  materials: MaterialCategoryView[];
}) {
  const { t: tr, href: localizeHref } = await getI18n();

  return (
    <section className="product-chooser" aria-labelledby="choose-title">
      <div className="chooser-heading">
        <div>
          <p className="eyebrow">{tr("MULAI DARI FUNGSINYA")}</p>
          <h2 id="choose-title">{tr("APA YANG DIBUTUHKAN JALUR ANDA?")}</h2>
        </div>
        <p>
          {tr(
            "Kenali perbedaan pola, lalu bandingkan material. Ukuran dan pemasangan dikonfirmasi pada tahap berikutnya.",
          )}
        </p>
      </div>
      <div className="chooser-functions">
        {(["guiding", "warning"] as const).map((type) => (
          <Link
            key={type}
            href={localizeHref(catalogUrl({ fungsi: type, demo }))}
          >
            <div className="chooser-photo">
              <Image
                src={`/images/products/ablinox/model-${type === "guiding" ? "27" : "29"}.webp`}
                alt={tr(
                  `Foto referensi: tactile ${type === "guiding" ? "strip individual" : "stud individual"}`,
                )}
                width={300}
                height={300}
              />
              <span>{tr("FOTO REFERENSI")}</span>
            </div>
            <div>
              <p className="eyebrow">
                {tr(type === "guiding" ? "01 / GUIDING" : "02 / WARNING")}
              </p>
              <h3>
                {tr(
                  type === "guiding"
                    ? "Saya butuh petunjuk arah."
                    : "Saya butuh isyarat peringatan.",
                )}
              </h3>
              <p>
                {tr(
                  type === "guiding"
                    ? "Pola garis memanjang membantu mengenali arah perjalanan."
                    : "Pola titik berulang memberi isyarat kewaspadaan pada jalur.",
                )}
              </p>
              <span className="text-link">
                {tr("Lihat pilihan")}{" "}
                {tr(type === "guiding" ? "pemandu" : "peringatan")} ↗
              </span>
            </div>
          </Link>
        ))}
      </div>
      {materials.length > 0 && (
        <details className="material-comparison">
          <summary>
            {tr(
              "Belum tahu materialnya? Bandingkan tampilan & hal yang perlu diperiksa",
            )}
            <span aria-hidden="true">+</span>
          </summary>
          <div className="material-compare-grid">
            {materials.map((m) => (
              <div key={m.slug}>
                <h3>{tr(m.name)}</h3>
                <p>
                  {tr(materialEducation[m.slug]?.appearance ?? m.description)}
                </p>
                <ul>
                  {(materialEducation[m.slug]?.checks ?? m.considerations)
                    .slice(0, 2)
                    .map((c) => (
                      <li key={c}>{tr(c)}</li>
                    ))}
                </ul>
                <Link
                  className="text-link"
                  href={localizeHref(
                    `/produk/material/${m.slug}${demoSuffix(demo)}`,
                  )}
                >
                  {tr("Pelajari material ↗")}
                </Link>
              </div>
            ))}
          </div>
        </details>
      )}
    </section>
  );
}
