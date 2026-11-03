export interface ProductInquiry {
  name: string;
  url: string;
  variantLabel?: string;
}
export function composeProductMessage({
  name,
  url,
  variantLabel,
}: ProductInquiry) {
  return `Halo, saya ingin konsultasi produk ${name}${variantLabel ? ` (varian ${variantLabel})` : ""}. Detail: ${url}`;
}
export function selectedVariant<T extends { id: string; label: string }>(
  variants: T[],
  id: string | undefined,
) {
  return variants.find((v) => v.id === id);
}
