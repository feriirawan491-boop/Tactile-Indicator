import { referenceProducts, referenceMaterials } from "./reference-products.ts";
import {
  guidingBlockMaterials,
  guidingBlockProducts,
} from "./guiding-block-products.ts";
import dataset from "./references/ablinox/products.json" with { type: "json" };
import type { ProductCardView } from "../types/product";
// Families organise similar catalogue listings, not a claim that technical models are identical.
const families: {
  slug: string;
  name: string;
  en: string;
  ids: number[];
  pattern: string;
}[] = [
  {
    slug: "pelat-tactile-stainless-steel",
    name: "Pelat Tactile Stainless Steel",
    en: "Stainless Steel Tactile Tiles",
    ids: [1, 25, 35, 36],
    pattern: "Pelat modular dengan pilihan pola garis atau titik sesuai model.",
  },
  {
    slug: "stud-strip-stainless-steel",
    name: "Tactile Stud & Strip Stainless Steel",
    en: "Stainless Steel Tactile Stud & Strip",
    ids: [2, 3, 13, 30, 34],
    pattern: "Komponen titik dan batang untuk peringatan dan petunjuk arah.",
  },
  {
    slug: "stud-strip-pola-nanas",
    name: "Tactile Stud & Strip Pola Nanas",
    en: "Pineapple Pattern Tactile Stud & Strip",
    ids: [10, 20],
    pattern: "Titik dan batang dengan tekstur pola nanas pada permukaan.",
  },
  {
    slug: "stud-pola-nanas-stainless-steel",
    name: "Tactile Stud Pola Nanas Stainless Steel",
    en: "Stainless Steel Pineapple Pattern Tactile Stud",
    ids: [4, 5, 6, 18, 19, 21, 29],
    pattern:
      "Titik individual bertekstur pola nanas, dengan tampilan sesuai model.",
  },
  {
    slug: "stud-stainless-steel",
    name: "Tactile Stud Stainless Steel",
    en: "Stainless Steel Tactile Stud",
    ids: [7, 8, 9, 12, 14, 15, 17, 22, 24, 26, 31, 32, 33],
    pattern:
      "Titik individual; detail permukaan dan pengikat berbeda menurut model.",
  },
  {
    slug: "stud-alur-stainless-steel",
    name: "Tactile Stud Alur Stainless Steel",
    en: "Stainless Steel Grooved Tactile Stud",
    ids: [11, 16],
    pattern: "Titik individual dengan alur pada permukaan atas.",
  },
  {
    slug: "stud-spiral-stainless-steel",
    name: "Tactile Stud Spiral Stainless Steel",
    en: "Stainless Steel Spiral Tactile Stud",
    ids: [23],
    pattern: "Titik individual dengan tekstur spiral pada permukaan.",
  },
  {
    slug: "strip-pola-nanas-stainless-steel",
    name: "Tactile Strip Pola Nanas Stainless Steel",
    en: "Stainless Steel Pineapple Pattern Tactile Strip",
    ids: [27, 28],
    pattern: "Batang memanjang bertekstur pola nanas untuk petunjuk arah.",
  },
  {
    slug: "stud-ulir-stainless-steel",
    name: "Tactile Stud Ulir Stainless Steel",
    en: "Stainless Steel Thread Pattern Tactile Stud",
    ids: [37],
    pattern:
      "Stud dengan pola ulir. Tanyakan detail bentuk dan sistem pengikat untuk model pilihan Anda.",
  },
];
const stainlessSteelProducts: ProductCardView[] = families.map((family) => {
  const models = family.ids.map((id) => ({
    source: dataset.products[id - 1],
    product: referenceProducts[id - 1],
  }));
  const first = models[0].product;
  const variants = models.map(({ source, product }) => {
    const materialText = [
      source.name,
      ...product
        .specs!.filter((s) => /material|grade/i.test(s.label))
        .map((s) => s.value),
    ].join(" ");
    const grades = [
      ...new Set(materialText.match(/\b(?:304|316L|316)\b/gi) || []),
    ].map((g) => g.toUpperCase());
    const finishOptions = product
      .specs!.filter((s) => /Finishing/.test(s.label))
      .flatMap((s) => s.value.split(/[,;]/).map((v) => v.trim()))
      .filter(Boolean);
    const finishes = [
      ...(/black/i.test(source.name) ? ["black"] : []),
      ...(finishOptions.some((f) => /^natural$/i.test(f)) ? ["natural"] : []),
    ];
    return {
      id: `model-${String(source.id).padStart(2, "0")}`,
      label: `Model ${String(source.id).padStart(2, "0")}${grades.length ? ` · ${grades.join(" / ")}` : ""}${finishes.length ? " · Hitam" : ""}`,
      specs: product.specs,
      sourceUrl: source.source_url,
      grades,
      finishes,
      finishOptions,
      image: {
        src: `/images/products/ablinox-cropped/model-${String(source.id).padStart(2, "0")}.webp`,
        alt: `${family.name} — model ${source.id}, foto referensi pemasok`,
      },
    };
  });
  return {
    ...first,
    id: family.slug,
    slug: family.slug,
    legacySlugs: models.map((m) => m.product.slug),
    name: family.name,
    englishName: family.en,
    imageKind: "official",
    image: variants[0].image,
    gallery: variants.map((v) => v.image),
    variants,
    grades: [...new Set(variants.flatMap((v) => v.grades))],
    finishes: [...new Set(variants.flatMap((v) => v.finishes))],
    specs: [{ label: "Material", value: "Stainless steel" }],
    shortDescription: `${family.pattern} Jelajahi ${variants.length} pilihan model, cek ukurannya, lalu tanyakan penawaran untuk kebutuhan Anda.`,
    description: `${family.pattern} Pilih model untuk melihat ukuran, material, dan cara pemasangannya. Jika masih ragu, kirim pilihan Anda melalui WhatsApp agar kita bisa membahas spesifikasinya sebelum memesan.`,
    applicationNotes: [
      "Penempatan mengikuti rancangan jalur dan kondisi permukaan proyek.",
      "Konfirmasikan dimensi, pengikat, grade, finishing, MOQ, lead time, sampel, serta dokumen teknis untuk model yang dipilih.",
    ],
  };
});
export const coreProducts = [
  ...stainlessSteelProducts,
  ...guidingBlockProducts,
];
export const legacyProductRoutes = referenceProducts.map((product, index) => ({
  slug: product.slug,
  target: stainlessSteelProducts.find((f) =>
    f.legacySlugs?.includes(product.slug),
  )!.slug,
  model: `model-${String(index + 1).padStart(2, "0")}`,
}));
export const coreMaterials = [...referenceMaterials, ...guidingBlockMaterials];
