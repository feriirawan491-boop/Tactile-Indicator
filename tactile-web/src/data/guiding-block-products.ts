import type { MaterialCategoryView, ProductCardView } from "../types/product";

const materials = [
  {
    slug: "beton",
    name: "Beton",
    englishName: "Concrete Guiding Block",
    summary: "Ubin pemandu beton dengan garis timbul dan tekstur berbutir.",
    description:
      "Guiding Block Beton berbentuk ubin persegi dengan garis timbul sejajar untuk membantu pengguna mengikuti arah jalur. Gambar referensi memperlihatkan permukaan kuning bertekstur dan sisi ubin yang terlihat jelas.",
    check:
      "Periksa ketebalan ubin dan lapisan dasar agar tepi modul sejajar dengan permukaan jalur.",
  },
  {
    slug: "granit",
    name: "Granit",
    englishName: "Granite Guiding Block",
    summary: "Ubin pemandu granit dengan garis timbul dan tampilan berbintik.",
    description:
      "Guiding Block Granit memiliki garis timbul sejajar pada ubin persegi untuk menandai arah perjalanan. Gambar referensi memperlihatkan bidang kuning dengan corak berbintik.",
    check:
      "Bandingkan contoh finishing granit dengan lantai sekitar untuk menilai kontras dan tekstur permukaan.",
  },
  {
    slug: "keramik",
    name: "Keramik",
    englishName: "Ceramic Guiding Block",
    summary: "Ubin pemandu keramik dengan garis timbul dan tampilan mengilap.",
    description:
      "Guiding Block Keramik memakai garis timbul sejajar pada ubin persegi untuk membantu pengguna mengikuti jalur. Pada gambar referensi, permukaan kuning terlihat halus dengan kilap pada bagian yang timbul.",
    check:
      "Periksa data ketahanan selip untuk kondisi area dan kecocokan sistem perekat dengan lantai dasar.",
  },
  {
    slug: "pvc-resin",
    name: "PVC / Resin",
    englishName: "PVC / Resin Guiding Block",
    summary: "Ubin pemandu PVC / resin dengan garis timbul berujung membulat.",
    description:
      "Guiding Block PVC / Resin berbentuk ubin persegi dengan garis timbul sejajar sebagai penunjuk arah. Gambar referensi memperlihatkan garis kuning berujung membulat di atas bidang bertekstur halus.",
    check:
      "Konfirmasikan komposisi material dan sistem perekat yang sesuai dengan lantai tempat ubin dipasang.",
  },
  {
    slug: "karet",
    name: "Karet (Rubber)",
    englishName: "Rubber Guiding Block",
    summary:
      "Ubin pemandu karet dengan garis timbul pada permukaan bertekstur.",
    description:
      "Guiding Block Karet berbentuk ubin persegi dengan garis timbul sejajar untuk menunjukkan arah jalur. Gambar referensi memperlihatkan permukaan kuning bertekstur halus dan sudut ubin yang membulat.",
    check:
      "Konfirmasikan ketebalan, tingkat kelenturan, dan cara memastikan tepi modul melekat rata pada lantai.",
  },
];

const form = "Ubin persegi";
const pattern = "Garis timbul sejajar";
const installation =
  "Susun garis timbul mengikuti arah jalur yang direncanakan dan periksa kontras ubin terhadap lantai sekitar.";
const confirmation =
  "Konfirmasikan ukuran, ketebalan, pilihan warna, dan metode pemasangan sebelum memesan.";

export const guidingBlockProducts: ProductCardView[] = materials.map(
  ({ slug, name, englishName, summary, description, check }) => ({
    id: `guiding-block-${slug}`,
    slug: `guiding-block-${slug}`,
    name: `Guiding Block ${name}`,
    englishName,
    shape: "tiles",
    functionType: "guiding",
    materialSlug: slug,
    materialLabel: name,
    approved: false,
    dataKind: "reference",
    imageKind: "supplied",
    image: {
      src: `/images/products/guiding-block/${slug}.webp`,
      alt: `Ubin ${name} kuning dengan pola garis timbul di kanan dan pola titik di kiri.`,
    },
    shortDescription: summary,
    description,
    specs: [
      { label: "Material", value: name },
      { label: "Bentuk produk", value: form },
      { label: "Pola permukaan", value: pattern },
    ],
    applicationNotes: [installation, check, confirmation],
  }),
);

export const guidingBlockMaterials: MaterialCategoryView[] = materials.map(
  ({ slug, name, description, check }) => ({
    slug,
    name,
    description,
    approved: false,
    considerations: [check, installation],
    specs: [
      { label: "Material", value: name },
      { label: "Bentuk produk", value: form },
      { label: "Pola permukaan", value: pattern },
    ],
    faq: [
      {
        question: "Apa yang perlu dikonfirmasi sebelum memesan?",
        answer: confirmation,
      },
    ],
  }),
);
