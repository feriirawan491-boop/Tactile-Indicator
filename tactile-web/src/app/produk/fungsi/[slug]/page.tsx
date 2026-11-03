import { isDemoQuery } from "@/lib/catalog";
import { notFound } from "next/navigation";
import { functionCategories } from "@/data/function-categories";
import { getCatalog } from "@/data/catalog";
import { FunctionPageView } from "@/components/product/CategoryPage";
import { pageMetadata } from "@/lib/seo";
import type { SearchQuery } from "@/types/product";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchQuery>;
};
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const c = functionCategories.find((c) => c.slug === slug);
  return c
    ? pageMetadata(c.title, c.characteristics, `/produk/fungsi/${slug}`)
    : {};
}
export default async function FunctionCategory({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const c = functionCategories.find((c) => c.slug === slug);
  if (!c) notFound();
  const demo = isDemoQuery(await searchParams);
  const data = getCatalog(demo);
  const products = data.products.filter((p) =>
    (p.functionTypes ?? [p.functionType]).includes(c.functionType),
  );
  return (
    <FunctionPageView
      category={c}
      products={products}
      materials={data.materials.filter((m) =>
        products.some((p) => p.materialSlug === m.slug),
      )}
      demo={demo}
    />
  );
}
