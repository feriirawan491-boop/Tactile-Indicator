import { isDemoQuery } from "@/lib/catalog";
import { notFound } from "next/navigation";
import { getCatalog } from "@/data/catalog";
import { MaterialPageView } from "@/components/product/CategoryPage";
import { pageMetadata } from "@/lib/seo";
import type { SearchQuery } from "@/types/product";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchQuery>;
};
async function resolve({ params, searchParams }: Props) {
  const { slug } = await params;
  const demo = isDemoQuery(await searchParams);
  const data = getCatalog(demo);
  return {
    slug,
    demo,
    material: data.materials.find((m) => m.slug === slug),
    products: data.products.filter((p) => p.materialSlug === slug),
  };
}
export async function generateMetadata(props: Props) {
  const d = await resolve(props);
  return d.material
    ? pageMetadata(
        `Tactile indicator ${d.material.name}`,
        d.material.description,
        `/produk/material/${d.slug}`,
      )
    : {};
}
export default async function MaterialCategory(props: Props) {
  const d = await resolve(props);
  if (!d.material) notFound();
  return (
    <MaterialPageView
      material={d.material}
      products={d.products}
      demo={d.demo}
    />
  );
}
