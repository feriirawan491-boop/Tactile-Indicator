import dataset from "./references/ablinox/products.json" with { type: "json" };
import { demoProducts, demoMaterials } from "./fixtures/products.ts";
import type { ProductCardView } from "../types/product";

// Reference data is reviewable product information, not approved local inventory.
// Vendor URLs, images and commercial promises deliberately stay in the raw archive.
const labels: Record<string, string> = {
  Material: "Material",
  Materials: "Material",
  Size: "Ukuran",
  Thickness: "Ketebalan",
  "Net weight": "Berat bersih",
  Detail: "Detail pola",
  Used: "Area penggunaan",
  Application: "Area penggunaan",
  Applicastion: "Area penggunaan",
  Finish: "Finishing",
  "Surface Finish": "Finishing permukaan",
  "Surface Pattern": "Pola permukaan",
  "Surface Type": "Tipe permukaan",
  "Pattern Options": "Pilihan pola",
  "Pattern Type": "Tipe pola",
  Patterns: "Pola",
  "Casting Process": "Proses pengecoran",
  "Casting Tolerance": "Toleransi pengecoran",
  "Surface Roughness": "Kekasaran permukaan",
  "Model No.": "Kode model",
  Type: "Tipe pemasangan",
  Specification: "Spesifikasi",
  Diameter: "Diameter",
  Height: "Tinggi",
  Length: "Panjang",
  Width: "Lebar",
  Pattern: "Pola",
  Fixing: "Pengikat",
  "Standard Stud": "Stud standar",
  "Compact Stud": "Stud kompak",
  "Standard Strip": "Strip standar",
  "Custom Stud": "Stud kustom",
  "Custom Strip": "Strip kustom",
  Custom: "Kustom",
};
const omit =
  /^(certification|detr|lead time|delivery|moq|origin|transport package|product name|corrosion resistance|anti-slip surface)/i;
const clean = (value: string) =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
const labelOf = (value: string) => labels[value.replace(/:$/, "")] ?? value;

export function normalizeReferenceSpecs(
  rows: { label: string; values: string[] }[],
) {
  const result: { label: string; value: string }[] = [];
  const seen = new Set<string>();
  let columns: string[] = [];
  for (const row of rows) {
    const label = clean(row.label).replace(/:$/, "");
    const values = row.values.map(clean);
    if (omit.test(label)) continue;
    if (
      ["Model", "Feature", "Parameter", "Application Area"].includes(label) &&
      values.length &&
      /^(Diameter|Length|Benefit|Our Capability|Typical Use Case)$/.test(
        values[0],
      )
    ) {
      columns = values.length > 1 ? values : [];
      continue;
    }
    if (columns.length === values.length && values.length > 1) {
      values.forEach((value, index) =>
        add(`${labelOf(label)} · ${labelOf(columns[index])}`, value),
      );
    } else {
      columns = [];
      add(labelOf(label), values.join("; "));
    }
  }
  function add(label: string, value: string) {
    const key = `${label}\u0000${value}`;
    if (value && !seen.has(key)) {
      result.push({ label, value });
      seen.add(key);
    }
  }
  return result;
}

const usedSlugs = new Set(demoProducts.map((product) => product.slug));
export const referenceProducts: ProductCardView[] = dataset.products.map(
  (entry, index) => {
    const legacy = demoProducts[index < 12 ? index : 11];
    const name = entry.name;
    const mixed = /studs?\s*(?:&|\/)\s*strips?/i.test(name) || entry.id === 34;
    const shape: NonNullable<ProductCardView["shape"]> = /tiles/i.test(name)
      ? "tiles"
      : mixed
        ? "studs-strips"
        : /strips/i.test(name)
          ? "strips"
          : "studs";
    const asset =
      shape === "tiles"
        ? "tiles"
        : shape === "strips" || mixed
          ? "studs-strips"
          : /black/i.test(name)
            ? "black-studs"
            : /pineapple/i.test(name)
              ? "silver-pineapple"
              : /grooved|spiral|thread/i.test(name)
                ? "silver-grooved"
                : "silver-solid";
    const form = {
      tiles: "Pelat modular",
      studs: "Titik individual",
      "studs-strips": "Titik & batang individual",
      strips: "Batang pemandu arah",
    }[shape];
    const purpose =
      shape === "studs"
        ? "Titik individual untuk menyusun isyarat kewaspadaan."
        : shape === "strips"
          ? "Batang memanjang untuk membantu mengenali arah perjalanan."
          : "Komponen tactile untuk kebutuhan jalur berpola garis atau titik, sesuai model yang dipilih.";
    const specs = normalizeReferenceSpecs(entry.specifications);
    let slug =
      index < 12
        ? legacy.slug
        : entry.source_url.split("/").filter(Boolean).at(-1)!;
    if (index >= 12 && usedSlugs.has(slug)) slug = `${slug}-${entry.id}`;
    usedSlugs.add(slug);
    // This entry only supplies its dimensions in a plain-text Parameter section.
    if (entry.id === 29) {
      const parameter =
        entry.content_sections.find((s) => s.heading === "Parameter")?.text ??
        "";
      for (const match of parameter.matchAll(
        /-(Color|Material|Size):([\s\S]*?)(?=-(?:Color|Material|Size):|$)/g,
      ))
        specs.push({
          label: labelOf(match[1] === "Color" ? "Warna" : match[1]),
          value: clean(match[2]),
        });
    }
    const size = specs.find(
      (s) => s.label === "Ukuran" || /· (Diameter|Panjang)$/.test(s.label),
    );
    return {
      ...legacy,
      id: `reference-${String(entry.id).padStart(2, "0")}`,
      slug,
      name,
      shape,
      approved: false,
      dataKind: "reference",
      functionType: shape === "studs" ? "warning" : "guiding",
      functionTypes:
        shape === "studs"
          ? ["warning"]
          : shape === "strips"
            ? ["guiding"]
            : ["guiding", "warning"],
      image: {
        src: `/images/products/catalog-v2/${asset}.webp`,
        alt: `${form} stainless steel`,
      },
      shortDescription: `${form}.${size ? ` ${size.label}: ${size.value}.` : " Pilihan dimensi dan finishing sesuai model."}`,
      description: `${purpose} Pilih ukuran, tekstur permukaan, dan sistem pemasangan sesuai kebutuhan proyek. Rincian model tersedia pada spesifikasi di bawah.`,
      specs,
      education: undefined,
      applicationNotes: [
        "Sesuaikan penempatan dengan rancangan jalur, kondisi permukaan, dan kebutuhan aksesibilitas proyek.",
        "Konfirmasikan model, ukuran, finishing, dan metode pemasangan sebelum pemesanan.",
      ],
    };
  },
);
export const referenceMaterials = demoMaterials;
