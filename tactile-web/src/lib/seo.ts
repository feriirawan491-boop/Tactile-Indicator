import type { Metadata } from "next";
import { getI18n } from "@/i18n/server";
import { localeHref } from "@/i18n/core";
import { absoluteUrl, siteIndexable } from "@/config/site";
export async function pageMetadata(
  title: string,
  description: string,
  path = "/",
  options: { draft?: boolean; image?: string } = {},
): Promise<Metadata> {
  const { t, locale } = await getI18n();
  const url = absoluteUrl(localeHref(path, locale));
  const image =
    options.image ||
    absoluteUrl(`/share?title=${encodeURIComponent(t(title))}`);
  return {
    title: t(title),
    description: t(description),
    robots: { index: siteIndexable && !options.draft, follow: true },
    alternates: {
      canonical: url,
      languages: {
        id: absoluteUrl(localeHref(path, "id")),
        en: absoluteUrl(localeHref(path, "en")),
        "x-default": absoluteUrl(localeHref(path, "id")),
      },
    },
    openGraph: {
      type: "website",
      title: t(title),
      description: t(description),
      url,
      siteName: "Tactile Indicator",
      locale: locale === "id" ? "id_ID" : "en_GB",
      alternateLocale: locale === "id" ? "en_GB" : "id_ID",
      images: [{ url: image, width: 1200, height: 630, alt: t(title) }],
    },
    twitter: {
      card: "summary_large_image",
      title: t(title),
      description: t(description),
      images: [image],
    },
  };
}
