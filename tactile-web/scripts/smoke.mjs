import assert from "node:assert/strict";
import { writeFile, mkdir } from "node:fs/promises";
const base = new URL(process.env.BASE_URL || "http://127.0.0.1:3000");
assert.ok(
  ["127.0.0.1", "localhost", "[::1]"].includes(base.hostname),
  "Smoke test is restricted to localhost",
);
const queue = [
  "/",
  "/kontak",
  "/kebijakan-privasi",
  "/produk?demo=1",
  "/produk?demo=1&fungsi=guiding&bentuk=tiles",
  "/produk?demo=1&fungsi=guiding&bentuk=studs",
  "/panduan?topik=Fungsi",
];
const visited = new Set(),
  results = [],
  canonicals = new Map();
const decode = (s) =>
  s
    .replaceAll("&amp;", "&")
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"');
const meta = (html, key) =>
  [...html.matchAll(/<meta\b[^>]*>/g)].find(([tag]) =>
    tag.includes(`name="${key}"`),
  )?.[0];
while (queue.length) {
  const route = queue.shift();
  if (visited.has(route)) continue;
  visited.add(route);
  assert.ok(visited.size < 100, "Crawl exceeded safety limit");
  const start = performance.now();
  const response = await fetch(new URL(route, base), {
    signal: AbortSignal.timeout(20000),
  });
  const html = await response.text();
  assert.equal(response.status, 200, route);
  assert.equal(
    [...html.matchAll(/<h1(?:\s[^>]*)?>/g)].length,
    1,
    `${route}: one H1`,
  );
  assert.ok(/<title>[^<]+<\/title>/.test(html), `${route}: title`);
  assert.ok(meta(html, "description"), `${route}: description`);
  assert.ok(
    meta(html, "robots")?.includes("noindex"),
    `${route}: draft must stay noindex`,
  );
  assert.ok(
    html.includes('href="/kebijakan-privasi"'),
    `${route}: privacy link`,
  );
  for (const [, href] of html.matchAll(
    /<a\b[^>]*href="(https:\/\/wa.me\/[^"]+)"/g,
  )) {
    const wa = new URL(decode(href));
    assert.equal(
      wa.pathname,
      "/" + (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281222952857"),
      `${route}: approved WhatsApp destination`,
    );
    assert.ok(wa.searchParams.get("text"), `${route}: contextual message`);
  }
  const canonical = html.match(
    /<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/,
  )?.[1];
  assert.ok(canonical, `${route}: canonical`);
  assert.equal(
    new URL(canonical).pathname,
    new URL(route, base).pathname,
    `${route}: canonical path`,
  );
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  if (!route.includes("?")) {
    assert.ok(
      !canonicals.has(title) || canonicals.get(title) === canonical,
      `${route}: duplicate page title`,
    );
    canonicals.set(title, canonical);
  }
  if (route === "/kontak") {
    assert.ok(!html.includes("<form"), "Contact must not capture leads");
    assert.ok(!html.includes("mailto:"), "No unapproved email");
  }
  if (route.includes("fungsi=guiding&bentuk=tiles"))
    assert.equal([...html.matchAll(/class="product-card"/g)].length, 1);
  if (route.includes("fungsi=guiding&bentuk=studs"))
    assert.ok(html.includes("Tidak ada produk yang sesuai."));
  for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const decoded = decode(href);
    if (
      !decoded.startsWith("/") ||
      decoded.startsWith("//") ||
      decoded === "/en" ||
      decoded.startsWith("/en/") ||
      decoded.startsWith("/en?")
    )
      continue;
    const url = new URL(decoded, base);
    url.hash = "";
    const key = url.pathname + url.search;
    if (!visited.has(key)) queue.push(key);
  }
  results.push({
    route,
    status: response.status,
    responseMs: Math.round(performance.now() - start),
  });
  console.log(`PASS ${route}`);
}
for (const route of [
  "/404",
  "/tidak-ada",
  "/produk/tidak-ada",
  "/produk/fungsi/tidak-ada",
  "/produk/material/tidak-ada",
  "/produk/material/beton",
  "/produk/contoh-beton-guiding",
  "/panduan/tidak-ada",
]) {
  const response = await fetch(new URL(route, base));
  const html = await response.text();
  assert.equal(response.status, 404, route);
  assert.ok(html.includes("TIDAK DITEMUKAN"), route);
  for (const recovery of ["/", "/produk", "/kontak"])
    assert.ok(html.includes(`href="${recovery}"`));
  results.push({ route, status: 404 });
  console.log(`PASS 404 ${route}`);
}
const report = {
  runAt: new Date().toISOString(),
  baseUrl: base.origin,
  passed: results.length,
  results,
  limits: [
    "HTTP/source QA only; browser keyboard, screen reader, visual layouts and Core Web Vitals not measured.",
    "Preview remains noindex; WhatsApp destination checked against approved number.",
  ],
};
await mkdir("docs/qa", { recursive: true });
await writeFile(
  "docs/qa/latest-smoke.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(
  `\n${results.length} route checks passed. Report: docs/qa/latest-smoke.json`,
);
