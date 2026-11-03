import { catalogDemoEnabled } from "@/config/catalog";
import type { ProductCardView, MaterialCategoryView } from "@/types/product";
import { referenceMaterials, referenceProducts } from "./reference-products";
// Add only client-approved inventory here. Demo entries stay separate.
export const approvedProducts: ProductCardView[] = [];
export const approvedMaterials: MaterialCategoryView[] = [];
export function getCatalog(demo = catalogDemoEnabled) {
  const products = demo
    ? referenceProducts
    : approvedProducts.filter((p) => p.approved);
  const materials = (
    demo ? referenceMaterials : approvedMaterials.filter((m) => m.approved)
  ).filter((m) => products.some((p) => p.materialSlug === m.slug));
  return {
    products: products.filter((p) =>
      materials.some((m) => m.slug === p.materialSlug),
    ),
    materials,
  };
}
