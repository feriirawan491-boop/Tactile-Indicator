import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import {
  coreProducts,
  legacyProductRoutes,
} from "../src/data/core-products.ts";
const base = new URL(process.env.BASE_URL || "http://127.0.0.1:3104");
assert.ok(
  ["localhost", "127.0.0.1"].includes(base.hostname),
  "Local release QA only",
);
const results = [];
for (const locale of ["", "/en"]) {
  for (const legacy of legacyProductRoutes) {
    const r = await fetch(
      new URL(`${locale}/produk/${legacy.slug}?demo=1`, base),
      { redirect: "manual" },
    );
    assert.equal(r.status, 301);
    const target = new URL(r.headers.get("location"), base);
    assert.equal(target.pathname, `${locale}/produk/${legacy.target}`);
    assert.equal(target.searchParams.get("model"), legacy.model);
    assert.equal(target.searchParams.has("demo"), false);
  }
  for (const path of [
    "/",
    "/produk",
    "/faq",
    "/kontak",
    ...coreProducts.map((p) => `/produk/${p.slug}`),
  ]) {
    const r = await fetch(
      new URL(locale + (path === "/" ? "" : path) || "/", base),
      { headers: { "user-agent": "Twitterbot" } },
    );
    const html = await r.text();
    assert.equal(r.status, 200);
    const canonical = html.match(
      /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/,
    )[1];
    assert.ok(
      canonical.startsWith("https://") && !canonical.includes("localhost"),
    );
    assert.ok(/<meta name="robots" content="index, follow"/.test(html));
    assert.ok(
      html.includes('property="og:image"') &&
        html.includes('name="twitter:card"'),
    );
    assert.ok(
      html.includes('hrefLang="x-default"') ||
        html.includes('hreflang="x-default"'),
    );
    assert.equal(/href="[^"]*[?&](?:amp;)?demo=/.test(html), false);
    const schemas = [
      ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g),
    ].map((m) => JSON.parse(m[1]));
    assert.ok(schemas.some((s) => s["@type"] === "WebSite"));
    if (path.startsWith("/produk/")) {
      assert.ok(schemas.some((s) => s["@type"] === "Product"));
      assert.ok(schemas.some((s) => s["@type"] === "BreadcrumbList"));
    }
    if (path === "/faq")
      assert.ok(schemas.some((s) => s["@type"] === "FAQPage"));
    for (const s of schemas) {
      assert.equal("offers" in s, false);
      assert.equal("aggregateRating" in s, false);
    }
    results.push({ path: locale + path, status: 200 });
  }
}
const robots = await fetch(new URL("/robots.txt", base));
assert.equal(robots.status, 200);
assert.ok(
  (await robots.text()).includes(
    "https://tactile-indicator.vercel.app/sitemap.xml",
  ),
);
const sitemap = await fetch(new URL("/sitemap.xml", base));
assert.equal(sitemap.status, 200);
const xml = await sitemap.text();
assert.ok(!xml.includes("localhost") && !xml.includes("demo="));
assert.ok(
  !xml.includes("/kebijakan-privasi") &&
    !xml.includes("/panduan/perbedaan-guiding-dan-warning"),
);
for (const p of coreProducts) assert.ok(xml.includes(`/produk/${p.slug}`));
const og = await fetch(new URL("/share?title=Tactile%20Indicator", base));
assert.equal(og.status, 200);
assert.equal(og.headers.get("content-type"), "image/png");
const bytes = new Uint8Array(await og.arrayBuffer());
assert.deepEqual([...bytes.slice(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10]);
for (const draft of [
  "/kebijakan-privasi",
  "/panduan/perbedaan-guiding-dan-warning",
]) {
  const h = await (await fetch(new URL(draft, base))).text();
  assert.ok(/<meta name="robots" content="noindex, follow"/.test(h));
}
await mkdir("docs/qa/audit-2026-11-04", { recursive: true });
await writeFile(
  "docs/qa/audit-2026-11-04/release-report.json",
  JSON.stringify(
    {
      runAt: new Date().toISOString(),
      redirects: 74,
      pageChecks: results.length,
      robots: "passed",
      sitemap: "passed",
      socialPng: "passed",
      draftIndexPolicy: "passed",
      results,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  `PASS: 74 redirects, ${results.length} metadata/schema pages, robots, sitemap, social PNG and draft index policy`,
);
