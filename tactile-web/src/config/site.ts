// One origin for canonical URLs, sitemaps, social cards and inquiry links.
export const isPreview = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV !== "production"
  : process.env.NODE_ENV !== "production";
export function resolveSiteUrl(value?: string) {
  const fallback = "https://tactile-indicator.vercel.app";
  try {
    const url = new URL(value || fallback);
    if (!["http:", "https:"].includes(url.protocol)) return fallback;
    if (
      !isPreview &&
      (url.protocol !== "https:" ||
        /^(localhost|127\.0\.0\.1|\[::1\])$/.test(url.hostname))
    )
      return fallback;
    return url.origin;
  } catch {
    return fallback;
  }
}
export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const siteIndexable =
  !isPreview && process.env.SITE_INDEXABLE !== "false";
export const absoluteUrl = (path = "/") => new URL(path, siteUrl).toString();
