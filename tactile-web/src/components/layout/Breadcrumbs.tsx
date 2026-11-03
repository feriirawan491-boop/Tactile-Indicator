import { getI18n } from "@/i18n/server";
import Link from "next/link";
export async function Breadcrumbs({
  label,
  parents = [],
}: {
  label: string;
  parents?: { label: string; href?: string }[];
}) {
  const { t: tr, href: localizeHref } = await getI18n();

  return (
    <nav className="breadcrumbs" aria-label={tr("Breadcrumb")}>
      <Link href={localizeHref("/")}>{tr("Beranda")}</Link>
      {parents.map((p) => (
        <span className="breadcrumb-parent" key={p.label}>
          <span aria-hidden="true">/</span>
          {p.href ? (
            <Link href={localizeHref(p.href)}>{tr(p.label)}</Link>
          ) : (
            <span>{tr(p.label)}</span>
          )}
        </span>
      ))}
      <span aria-hidden="true">/</span>
      <span aria-current="page">{tr(label)}</span>
    </nav>
  );
}
