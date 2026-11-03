import english from "./en.json" with { type: "json" };
export type Locale = "id" | "en";
const dictionary: Record<string, string> = english;
const normalize = (text: string) => text.replace(/\s+/g, " ").trim();
const escape = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const fragments = Object.keys(dictionary)
  .filter((k) => k.length > 4)
  .sort((a, b) => b.length - a.length);
const fragmentPattern = new RegExp(
  String.raw`(?<![\p{L}\p{N}_])(?:` +
    fragments.map(escape).join("|") +
    String.raw`)(?![\p{L}\p{N}_])`,
  "gu",
);
export function translateText(text: string, locale: Locale): string {
  if (locale === "id") return text;
  const exact = dictionary[normalize(text)];
  if (exact) return exact;
  const urls: string[] = [];
  const protectedText = text.replace(/https?:\/\/[^\s]+/g, (url) => {
    const id = urls.push(url) - 1;
    return `__URL_${id}__`;
  });
  return protectedText
    .replace(fragmentPattern, (key) => dictionary[key])
    .replace(/__URL_(\d+)__/g, (_, index) => urls[Number(index)]);
}
export function stripLocalePath(path: string) {
  return path === "/en" ? "/" : path.startsWith("/en/") ? path.slice(3) : path;
}
export function localeHref(href: string, locale: Locale) {
  if (
    !href.startsWith("/") ||
    href.startsWith("//") ||
    href.startsWith("/_next/") ||
    href.startsWith("/images/")
  )
    return href;
  const path = stripLocalePath(href);
  return locale === "en" ? "/en" + (path === "/" ? "" : path) : path;
}
