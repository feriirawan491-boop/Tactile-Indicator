export type FunctionType = "guiding" | "warning";
export type SearchQuery = Record<string, string | string[] | undefined>;
export interface ProductCardView {
  id: string;
  slug: string;
  name: string;
  englishName?: string;
  legacySlugs?: string[];
  grades?: string[];
  finishes?: string[];
  functionType: FunctionType;
  functionTypes?: FunctionType[];
  shape?: "tiles" | "studs" | "studs-strips" | "strips";
  materialSlug: string;
  materialLabel: string;
  image: { src: string; alt: string } | null;
  shortDescription: string;
  approved: boolean;
  description?: string;
  education?: {
    purpose: string;
    pattern: string;
    appearance: string;
    selectionNotes: string[];
    confirmBeforeOrder: string[];
  };
  dataKind?: "reference";
  imageKind?: "generated" | "official";
  gallery?: { src: string; alt: string }[];
  specs?: { label: string; value: string }[];
  variants?: {
    id: string;
    label: string;
    specs?: { label: string; value: string }[];
    image?: { src: string; alt: string };
    sourceUrl?: string;
    finishOptions?: string[];
    grades?: string[];
    finishes?: string[];
  }[];
  preselectedVariantId?: string;
  variantRequired?: boolean;
  applicationNotes?: string[];
}
export interface MaterialCategoryView {
  slug: string;
  name: string;
  description: string;
  considerations: string[];
  specs: { label: string; value: string }[];
  approved: boolean;
  faq: { question: string; answer: string }[];
}
export interface FunctionCategoryView {
  slug: string;
  functionType: FunctionType;
  title: string;
  definition: string;
  characteristics: string;
  usage: string;
  selection: string;
  faq: { question: string; answer: string }[];
}
export interface CatalogFilters {
  fungsi: string;
  material: string;
  q: string;
  demo: boolean;
  bentuk?: string;
  grade?: string;
  finishing?: string;
  urutan?: string;
}
