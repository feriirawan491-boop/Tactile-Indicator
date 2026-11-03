import { getI18n } from "@/i18n/server";
import Image from "next/image";
export async function ProductShowcase() {
  const { t: tr } = await getI18n();

  return (
    <div className="hero-product-showcase">
      <p className="eyebrow">{tr("DUA POLA. DUA INFORMASI.")}</p>
      <div className="showcase-pair">
        {(["guiding", "warning"] as const).map((type) => (
          <div key={type}>
            <Image
              src={`/images/products/catalog-v2/${type === "guiding" ? "studs-strips" : "silver-pineapple"}.webp`}
              alt={tr(
                `Ilustrasi AI ${type === "guiding" ? "batang pemandu arah" : "stud peringatan bulat"} stainless steel individual`,
              )}
              width={650}
              height={650}
              sizes="(max-width:767px) 50vw, 25vw"
              preload={type === "guiding"}
            />
            <span>
              {tr(
                type === "guiding"
                  ? "GARIS / PEMANDU ARAH"
                  : "TITIK / PERINGATAN",
              )}
            </span>
          </div>
        ))}
      </div>
      <p className="showcase-caption">
        {tr(
          "Ilustrasi AI · Bentuk produk untuk pengenalan, bukan spesifikasi final",
        )}
      </p>
    </div>
  );
}
