import { getI18n } from "@/i18n/server";
export async function TactileStudy({
  variant = "both",
}: {
  variant?: "both" | "guiding" | "warning";
}) {
  const { t: tr } = await getI18n();

  return (
    <div
      className={`tactile-study ${variant}`}
      role="img"
      aria-label={tr(
        "Ilustrasi skematis pola tactile garis dan titik, bukan foto atau spesifikasi produk",
      )}
    >
      <div className="study-grid" />
      <div className="tile tile-lines">
        {Array.from({ length: 6 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
      <div className="tile tile-dots">
        {Array.from({ length: 36 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
      <span className="study-coordinate">{tr("T / 01 — POLA PERMUKAAN")}</span>
      <span className="study-caption">
        {tr("ILUSTRASI POLA · BUKAN FOTO PRODUK")}
      </span>
    </div>
  );
}
