import { getI18n } from "@/i18n/server";
export async function SpecTable({
  specs,
}: {
  specs: { label: string; value: string }[];
}) {
  const { t: tr } = await getI18n();

  const rows = specs.filter((s) => s.value.trim());
  if (!rows.length) return null;
  return (
    <div className="spec-scroll">
      <table>
        <caption>{tr("Informasi produk yang tersedia")}</caption>
        <tbody>
          {rows.map((s, index) => (
            <tr key={`${s.label}-${index}`}>
              <th scope="row">{tr(s.label)}</th>
              <td>{tr(s.value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
