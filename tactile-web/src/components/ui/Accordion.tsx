import { getI18n } from "@/i18n/server";
export async function Accordion({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  const { t: tr } = await getI18n();

  return (
    <div className="accordion">
      {items.map((item, i) => (
        <details key={item.question}>
          <summary>
            <span className="question-number">0{i + 1}</span>
            {tr(item.question)}
            <span className="plus" aria-hidden="true">
              +
            </span>
          </summary>
          <p>{tr(item.answer)}</p>
        </details>
      ))}
    </div>
  );
}
