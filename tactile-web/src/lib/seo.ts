import type { Metadata } from "next";
import { getI18n } from "@/i18n/server";
import { localeHref } from "@/i18n/core";
export async function pageMetadata(
  title: string,
  description: string,
  path = "/",
): Promise<Metadata> {
  const { t, locale } = await getI18n();
  return {
    title: t(title),
    description: t(description),
    alternates: {
      canonical: localeHref(path, locale),
      languages: {
        id: localeHref(path, "id"),
        en: localeHref(path, "en"),
        "x-default": localeHref(path, "id"),
      },
    },
  };
}
