import type {
  ProductCardView,
  MaterialCategoryView,
  FunctionType,
} from "@/types/product";
export const demoMaterials: MaterialCategoryView[] = [
  {
    slug: "stainless-steel",
    name: "Stainless steel",
    approved: false,
    description:
      "Pilihan tactile berbahan stainless steel dalam bentuk pelat, titik individual, serta kombinasi titik dan batang. Tentukan bentuk dan fungsi sebelum memeriksa ukuran serta kebutuhan pemasangan.",
    considerations: [
      "Periksa kelas bahan pada setiap listing; tidak semua listing menyebut grade.",
      "Bedakan komponen individual dari pelat modular.",
      "Konfirmasikan dimensi, finishing, dan sistem pemasangan per model.",
    ],
    specs: [
      { label: "Material", value: "Stainless steel" },
      {
        label: "Pilihan grade pada katalog contoh",
        value: "304 dan 316 sesuai listing",
      },
      {
        label: "Bentuk tersedia pada contoh",
        value: "Pelat, studs individual, serta studs & strips",
      },
      {
        label: "Pilihan tampilan ilustrasi",
        value: "Perak dan hitam sesuai model",
      },
    ],
    faq: [
      {
        question: "Apakah semua produk memakai kelas stainless yang sama?",
        answer:
          "Tidak dapat diasumsikan sama. Grade 304 atau 316 hanya ditampilkan jika disebut pada nama listing. Periksa dokumen model sebelum menentukan pesanan.",
      },
    ],
  },
];
const listings = [
  [
    "316/304 Stainless Steel Tactile Paving Tiles",
    "stainless-steel-tactile-paving-tiles",
    "tiles",
    "tiles",
    "316 / 304",
    "Pelat modular",
    "Pola garis dan titik pada pelat",
    "Perak",
  ],
  [
    "Custom 304 Stainless Steel Tactile Studs & Strips",
    "custom-304-tactile-studs-strips",
    "studs-strips",
    "studs-strips",
    "304",
    "Titik & batang individual",
    "Komponen titik dan garis",
    "Perak",
  ],
  [
    "Custom 304/316 Stainless Steel Tactile Studs & Strips",
    "custom-304-316-tactile-studs-strips",
    "studs-strips",
    "studs-strips",
    "304 / 316",
    "Titik & batang individual",
    "Komponen titik dan garis",
    "Perak",
  ],
  [
    "Custom Black Stainless Steel Pineapple Pattern Tactile Studs",
    "black-pineapple-tactile-studs",
    "studs",
    "black-studs",
    "",
    "Titik individual",
    "Tekstur pineapple pada titik bulat",
    "Hitam",
  ],
  [
    "Custom Black Stainless Steel Pineapple Pattern Tactile Studs — Anti-Slip Blind Guide Pins",
    "black-pineapple-tactile-guide-pins",
    "studs",
    "black-studs",
    "",
    "Titik individual",
    "Tekstur pineapple pada titik bulat",
    "Hitam",
  ],
  [
    "Custom OEM Stainless Steel Pineapple Pattern Tactile Studs",
    "oem-pineapple-tactile-studs",
    "studs",
    "silver-pineapple",
    "",
    "Titik individual",
    "Tekstur pineapple pada titik bulat",
    "Perak",
  ],
  [
    "Custom OEM Stainless Steel Tactile Studs",
    "oem-stainless-steel-tactile-studs",
    "studs",
    "silver-solid",
    "",
    "Titik individual",
    "Titik bulat; tekstur perlu dikonfirmasi",
    "Perak",
  ],
  [
    "Custom Precision Casting Stainless Steel Tactile Guide Studs",
    "precision-casting-tactile-guide-studs",
    "studs",
    "silver-solid",
    "",
    "Titik individual",
    "Titik bulat; tekstur perlu dikonfirmasi",
    "Perak",
  ],
  [
    "Custom Precision Stainless Steel Tactile Indicator Stud",
    "precision-tactile-indicator-stud",
    "studs",
    "silver-solid",
    "",
    "Titik individual",
    "Titik bulat; tekstur perlu dikonfirmasi",
    "Perak",
  ],
  [
    "Custom Stainless Steel Pineapple Pattern Tactile Studs & Strips",
    "pineapple-tactile-studs-strips",
    "studs-strips",
    "studs-strips",
    "",
    "Titik & batang individual",
    "Tekstur pineapple pada titik dan batang",
    "Perak",
  ],
  [
    "Custom Stainless Steel Solid Grooved Tactile Studs",
    "solid-grooved-tactile-studs",
    "studs",
    "silver-grooved",
    "",
    "Titik individual",
    "Alur pada permukaan titik bulat",
    "Perak",
  ],
  [
    "Custom Stainless Steel Solid Tactile Studs",
    "solid-tactile-studs",
    "studs",
    "silver-solid",
    "",
    "Titik individual",
    "Titik solid; hasil akhir perlu dikonfirmasi",
    "Perak",
  ],
] as const;
export const demoProducts: ProductCardView[] = listings.map(
  ([name, slug, shape, asset, grade, form, pattern, color], index) => {
    const functions: FunctionType[] =
      shape === "studs" ? ["warning"] : ["guiding", "warning"];
    const purpose =
      shape === "studs"
        ? "Titik individual untuk menyusun isyarat kewaspadaan."
        : shape === "tiles"
          ? "Pelat untuk kebutuhan jalur berpola garis atau titik, sesuai model yang dipilih."
          : "Batang untuk petunjuk arah dan titik untuk isyarat kewaspadaan.";
    return {
      id: `listing-${String(index + 1).padStart(2, "0")}`,
      slug,
      name,
      shape,
      functionType: functions[0],
      functionTypes: functions,
      materialSlug: "stainless-steel",
      materialLabel: "Stainless steel",
      approved: false,
      imageKind: "generated",
      image: {
        src: `/images/products/catalog-v2/${asset}.webp`,
        alt: `Ilustrasi AI ${form.toLowerCase()} stainless steel ${color.toLowerCase()}; bukan foto produk final`,
      },
      shortDescription: `${form}. ${pattern}.`,
      description: `${purpose} Listing ini ditampilkan sebagai ${form.toLowerCase()} dengan ilustrasi yang membantu mengenali bentuknya. Warna dan detail kecil pada gambar bukan acuan produksi. Periksa ukuran, grade, dan metode pemasangan model yang dipilih sebelum meminta penawaran.`,
      specs: [
        { label: "Bentuk produk", value: form },
        { label: "Material", value: "Stainless steel" },
        ...(grade ? [{ label: "Grade pada nama listing", value: grade }] : []),
        { label: "Pola / tekstur", value: pattern },
      ],
      education: {
        purpose,
        pattern,
        appearance: `${color} pada ilustrasi; warna dan hasil akhir aktual perlu dikonfirmasi.`,
        selectionNotes: [
          "Pilih bentuk pelat atau komponen individual sesuai rancangan jalur.",
          ...(grade
            ? [`Periksa pilihan grade ${grade} pada dokumen model.`]
            : ["Grade material belum dicantumkan pada nama listing."]),
          "Tekstur pada ilustrasi bukan data dimensi atau hasil uji performa.",
        ],
        confirmBeforeOrder: [
          "Ukuran dan tinggi komponen yang dipesan.",
          "Grade, finishing, warna, dan sistem pengikat.",
          "Jumlah serta kombinasi stud/strip atau tipe pelat.",
          "Harga, ketersediaan, dan kebutuhan pengiriman.",
        ],
      },
      applicationNotes: [
        "Penempatan mengikuti rancangan jalur dan spesifikasi model yang ditinjau. Tidak ada klaim sertifikasi atau performa yang disimpulkan dari nama produk.",
        "Listing dengan bentuk serupa menggunakan ilustrasi keluarga yang sama. Perbedaan teknis antarlisting perlu dikonfirmasi; tidak dibuat-buat pada gambar.",
      ],
    };
  },
);
