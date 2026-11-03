import { getI18n } from "@/i18n/server";
export async function SectionHeading({
  index,
  kicker,
  title,
  children,
}: {
  index: string;
  kicker: string;
  title: string;
  children?: React.ReactNode;
}) {
  const { t: tr } = await getI18n();

  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span>{tr(index)}</span> / {tr(kicker)}
        </p>
        <h2>{tr(title)}</h2>
      </div>
      {children && <div className="section-intro">{children}</div>}
    </div>
  );
}
