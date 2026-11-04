import { NextResponse, type NextRequest } from "next/server";
import { legacyProductRoutes } from "@/data/core-products";
import { isPreview } from "@/config/site";
import { getCatalog } from "@/data/catalog";
import { functionCategories } from "@/data/function-categories";
import { articles } from "@/data/articles";
import { isDemoQuery } from "@/lib/catalog";
import { stripLocalePath } from "@/i18n/core";
export function proxy(request: NextRequest) {
  const original = request.nextUrl.pathname;
  const locale =
    original === "/en" || original.startsWith("/en/") ? "en" : "id";
  const path = stripLocalePath(original);
  const target = request.nextUrl.clone();
  let redirect = false;
  if (
    target.searchParams.has("demo") &&
    (!isPreview || target.searchParams.get("demo") === "1")
  ) {
    target.searchParams.delete("demo");
    redirect = true;
  }
  const legacy = /^\/produk\/([^/]+)$/.exec(path);
  const mapping =
    legacy && legacyProductRoutes.find((p) => p.slug === legacy[1]);
  if (mapping) {
    target.pathname = `${locale === "en" ? "/en" : ""}/produk/${mapping.target}`;
    target.searchParams.set("model", mapping.model);
    redirect = true;
  }
  if (redirect) return NextResponse.redirect(target, 301);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-tactile-path", path);
  requestHeaders.set("x-tactile-locale", locale);
  const parts = path.split("/").filter(Boolean),
    values = request.nextUrl.searchParams.getAll("demo");
  const catalog = getCatalog(
    isDemoQuery({ demo: values.length ? values : undefined }),
  );
  let exists = true;
  if (parts[0] === "produk" && parts.length > 1) {
    if (parts[1] === "fungsi")
      exists =
        parts.length === 3 &&
        functionCategories.some((c) => c.slug === parts[2]);
    else if (parts[1] === "material")
      exists =
        parts.length === 3 &&
        catalog.materials.some((m) => m.slug === parts[2]);
    else
      exists =
        parts.length === 2 && catalog.products.some((p) => p.slug === parts[1]);
  } else if (parts[0] === "panduan" && parts.length > 1)
    exists = parts.length === 2 && articles.some((a) => a.slug === parts[1]);
  const status = !exists || path === "/404" ? 404 : undefined;
  if (!exists) {
    const url = request.nextUrl.clone();
    url.pathname = locale === "en" ? "/en/404" : "/404";
    url.search = "";
    return NextResponse.rewrite(url, {
      status: 404,
      request: { headers: requestHeaders },
    });
  }
  return NextResponse.next({ status, request: { headers: requestHeaders } });
}
export const config = {
  matcher: [
    "/((?!_next/|images/|fonts/|share|sitemap.xml|robots.txt|favicon.ico|icon.svg).*)",
  ],
};
