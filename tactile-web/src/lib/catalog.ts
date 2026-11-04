import { isPreview } from "../config/site.ts";
import { catalogDemoEnabled } from "../config/catalog.ts";
import type {
  CatalogFilters,
  ProductCardView,
  SearchQuery,
} from "../types/product";
export function normalizeFilters(
  query: SearchQuery,
  materialSlugs: string[],
): CatalogFilters {
  const first = (key: string) => {
    const value = query[key];
    return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
  };
  const fungsi = first("fungsi"),
    material = first("material");
  return {
    fungsi: ["guiding", "warning"].includes(fungsi) ? fungsi : "",
    material: materialSlugs.includes(material) ? material : "",
    q: first("q").trim().slice(0, 100),
    grade: ["304", "316", "316L"].includes(first("grade"))
      ? first("grade")
      : "",
    finishing: ["black", "natural"].includes(first("finishing"))
      ? first("finishing")
      : "",
    urutan: ["az", "za"].includes(first("urutan")) ? first("urutan") : "",
    demo:
      !isPreview || first("demo") === ""
        ? catalogDemoEnabled
        : first("demo") === "1",
    bentuk: ["tiles", "studs", "studs-strips", "strips"].includes(
      first("bentuk"),
    )
      ? first("bentuk")
      : "",
  };
}
export function filterProducts(
  products: ProductCardView[],
  filters: CatalogFilters,
) {
  const q = filters.q.toLocaleLowerCase("id");
  const results = products.filter(
    (p) =>
      (!filters.fungsi ||
        (p.functionTypes ?? [p.functionType]).includes(
          filters.fungsi as "guiding" | "warning",
        )) &&
      (!filters.bentuk || p.shape === filters.bentuk) &&
      (!(filters.grade || filters.finishing) ||
        (p.variants ?? []).some(
          (v) =>
            (!filters.grade || v.grades?.includes(filters.grade)) &&
            (!filters.finishing || v.finishes?.includes(filters.finishing)),
        )) &&
      (!filters.material || p.materialSlug === filters.material) &&
      (!q ||
        `${p.name} ${p.materialLabel} ${p.shortDescription}`
          .toLocaleLowerCase("id")
          .includes(q)),
  );
  return filters.urutan
    ? results.sort(
        (a, b) =>
          (filters.urutan === "za" ? -1 : 1) *
          a.name.localeCompare(b.name, "id"),
      )
    : results;
}
export function catalogUrl(filters: Partial<CatalogFilters>) {
  const params = new URLSearchParams();
  if (isPreview && filters.demo === false) params.set("demo", "0");
  for (const key of [
    "fungsi",
    "material",
    "q",
    "bentuk",
    "grade",
    "finishing",
    "urutan",
  ] as const)
    if (filters[key]) params.set(key, filters[key]!);
  return `/produk${params.size ? "?" + params.toString() : ""}`;
}
export const demoSuffix = (demo: boolean) =>
  isPreview && !demo ? "?demo=0" : "";

export function isDemoQuery(query: SearchQuery) {
  return normalizeFilters(query, []).demo;
}
