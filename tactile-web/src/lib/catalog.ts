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
    demo: first("demo") === "" ? catalogDemoEnabled : first("demo") === "1",
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
  return products.filter(
    (p) =>
      (!filters.fungsi ||
        (p.functionTypes ?? [p.functionType]).includes(
          filters.fungsi as "guiding" | "warning",
        )) &&
      (!filters.bentuk || p.shape === filters.bentuk) &&
      (!filters.material || p.materialSlug === filters.material) &&
      (!q ||
        `${p.name} ${p.materialLabel} ${p.shortDescription}`
          .toLocaleLowerCase("id")
          .includes(q)),
  );
}
export function catalogUrl(filters: Partial<CatalogFilters>) {
  const params = new URLSearchParams();
  if (filters.demo !== undefined) params.set("demo", filters.demo ? "1" : "0");
  for (const key of ["fungsi", "material", "q", "bentuk"] as const)
    if (filters[key]) params.set(key, filters[key]!);
  return `/produk${params.size ? "?" + params.toString() : ""}`;
}
export const demoSuffix = (demo: boolean) => (demo ? "?demo=1" : "");

export function isDemoQuery(query: SearchQuery) {
  return normalizeFilters(query, []).demo;
}
