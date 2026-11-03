import { getI18n } from "@/i18n/server";
export async function PatternPreview({
  type,
}: {
  type: "guiding" | "warning";
}) {
  const { t: tr } = await getI18n();

  return (
    <div
      className={`pattern-preview ${type === "guiding" ? "lines-pattern" : "dots-pattern"}`}
      role="img"
      aria-label={tr(
        `Diagram pola ${type === "guiding" ? "garis" : "titik"}, bukan foto produk`,
      )}
    >
      {Array.from({ length: type === "guiding" ? 5 : 35 }, (_, i) => (
        <i key={i} />
      ))}
    </div>
  );
}
