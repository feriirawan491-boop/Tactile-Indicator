import "server-only";
import { headers } from "next/headers";
import { translateText, localeHref, type Locale } from "./core";
export async function getI18n() {
  const locale: Locale =
    (await headers()).get("x-tactile-locale") === "en" ? "en" : "id";
  return {
    locale,
    t: (text: string) => translateText(text, locale),
    href: (path: string) => localeHref(path, locale),
  };
}
