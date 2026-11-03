import { getI18n } from "@/i18n/server";
import type { ProductCardView } from "@/types/product";
export async function ProductEducation({
  product,
}: {
  product: ProductCardView;
}) {
  const { t: tr } = await getI18n();

  const e = product.education;
  if (!e) return null;
  return (
    <section className="section product-education">
      <div className="education-heading">
        <p className="eyebrow">{tr("KENALI SEBELUM MEMILIH")}</p>
        <h2>
          {tr("FUNGSI JELAS.")}
          <br />
          {tr("DETAIL LEBIH TERARAH.")}
        </h2>
      </div>
      <div className="education-columns">
        <div>
          <span className="education-index">01</span>
          <h3>{tr("Peran produk ini")}</h3>
          <p>{tr(e.purpose)}</p>
          <dl>
            <div>
              <dt>{tr("Pola permukaan")}</dt>
              <dd>{tr(e.pattern)}</dd>
            </div>
            <div>
              <dt>{tr("Tampilan contoh")}</dt>
              <dd>{tr(e.appearance)}</dd>
            </div>
          </dl>
        </div>
        <div>
          <span className="education-index">02</span>
          <h3>{tr("Pertimbangan material")}</h3>
          <ul>
            {e.selectionNotes.map((n) => (
              <li key={n}>{tr(n)}</li>
            ))}
          </ul>
        </div>
        <div>
          <span className="education-index">03</span>
          <h3>{tr("Konfirmasi sebelum memesan")}</h3>
          <ul>
            {e.confirmBeforeOrder.map((n) => (
              <li key={n}>{tr(n)}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
