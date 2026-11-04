import { headers } from "next/headers";
import { absoluteUrl } from "@/config/site";
import { JsonLd } from "@/components/JsonLd";
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

  const path = (await headers()).get("x-tactile-path") || "/";
  const entries = [
    { label: "Beranda", href: "/" },
    ...parents.filter((p) => p.href),
    { label, href: path },
  ];
  return (
    <nav className="breadcrumbs" aria-label={tr("Breadcrumb")}>
      <JsonLd
        data={{
          "@type": "BreadcrumbList",
          itemListElement: entries.map((e, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: tr(e.label),
            item: absoluteUrl(localizeHref(e.href!)),
          })),
        }}
      />
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
