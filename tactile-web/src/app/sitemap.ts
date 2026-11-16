import type { MetadataRoute } from "next";
import { absoluteUrl, siteIndexable } from "@/config/site";
import { getCatalog } from "@/data/catalog";
import { articles } from "@/data/articles";
import { localeHref } from "@/i18n/core";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteIndexable) return [];
  const { products, materials } = getCatalog();
  const paths = [
    "/",
    "/produk",
    "/kontak",
    "/faq",
    "/panduan",
    "/tentang-kami",
    ...products.map((p) => `/produk/${p.slug}`),
    ...materials.map((m) => `/produk/material/${m.slug}`),
    "/produk/fungsi/guiding-block",
    "/produk/fungsi/warning-block",
    ...articles
      .filter((article) => article.approved)
      .map((article) => `/panduan/${article.slug}`),
  ];
  return paths.flatMap((path) =>
    (["id", "en"] as const).map((locale) => ({
      url: absoluteUrl(localeHref(path, locale)),
      alternates: {
        languages: {
          id: absoluteUrl(path),
          en: absoluteUrl(localeHref(path, "en")),
          "x-default": absoluteUrl(path),
        },
      },
    })),
  );
}
