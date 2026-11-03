import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const base = new URL(process.env.BASE_URL || "http://127.0.0.1:3000");
assert.ok(["127.0.0.1", "localhost"].includes(base.hostname));
const queue = [
  "/en",
  "/en/produk?demo=1&fungsi=warning&bentuk=studs",
  "/en/faq",
  "/en/kontak",
  "/en/kebijakan-privasi",
  "/en/tentang-kami",
  "/en/panduan",
];
const seen = new Set(),
  rows = [];
const decode = (s) =>
  s
    .replaceAll("&amp;", "&")
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"');
while (queue.length) {
  const path = queue.shift();
  if (seen.has(path)) continue;
  seen.add(path);
  assert.ok(seen.size < 90);
  const r = await fetch(new URL(path, base), {
    signal: AbortSignal.timeout(15000),
  });
  const html = await r.text();
  assert.equal(r.status, 200, path);
  assert.ok(html.includes('<html lang="en"'), path);
  assert.equal([...html.matchAll(/<h1(?:\s[^>]*)?>/g)].length, 1, path);
  const canonical = html.match(
    /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/,
  )?.[1];
  assert.ok(canonical, path);
  assert.equal(new URL(canonical).pathname, new URL(path, base).pathname, path);
  assert.ok(
    html.includes('hrefLang="id"') || html.includes('hreflang="id"'),
    path,
  );
  assert.ok(
    html.includes('hrefLang="en"') || html.includes('hreflang="en"'),
    path,
  );
  assert.ok(
    !html.includes(">Lihat produk<") &&
      !html.includes(">Reset semua<") &&
      !html.includes(">DATA CONTOH · 12 PRODUK<"),
    path,
  );
  for (const [tag, raw] of html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)) {
    const link = decode(raw);
    if (
      link.startsWith("/") &&
      !link.startsWith("//") &&
      !/hreflang="id"/i.test(tag)
    )
      assert.ok(
        link === "/en" || link.startsWith("/en/") || link.startsWith("/en?"),
        `${path}: locale leak ${link}`,
      );
  }
  for (const [, raw] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
    const href = decode(raw);
    if (href.startsWith("https://wa.me/")) {
      const wa = new URL(href);
      assert.equal(wa.pathname, "/6281222952857");
      const message = wa.searchParams.get("text");
      assert.ok(message?.startsWith("Hello"), `${path}: ${message}`);
    }
    if (!href.startsWith("/en")) continue;
    const next = new URL(href, base);
    next.hash = "";
    queue.push(next.pathname + next.search);
  }
  if (path === "/en/produk?demo=1&fungsi=warning&bentuk=studs") {
    assert.equal([...html.matchAll(/class="product-card"/g)].length, 8);
    assert.ok(
      html.includes(
        'href="/produk?demo=1&amp;fungsi=warning&amp;bentuk=studs"',
      ),
      "ID switch preserves filters",
    );
    assert.ok(html.includes('action="/en/produk"'));
  }
  rows.push({ path, status: 200 });
  console.log("PASS", path);
}
for (const path of [
  "/en/404",
  "/en/produk/missing",
  "/en/produk/material/missing",
  "/en/panduan/missing",
]) {
  const r = await fetch(new URL(path, base));
  const h = await r.text();
  assert.equal(r.status, 404, path);
  assert.ok(h.includes("NOT FOUND."), path);
  assert.ok(h.includes('href="/en/produk"'), path);
  rows.push({ path, status: 404 });
  console.log("PASS 404", path);
}
const id = await fetch(new URL("/", base));
const idHtml = await id.text();
assert.ok(
  idHtml.includes('<html lang="id"') && idHtml.includes("PERMUKAAN KECIL."),
);
rows.push({ path: "/", status: 200 });
await mkdir("docs/qa", { recursive: true });
await writeFile(
  "docs/qa/latest-i18n-smoke.json",
  JSON.stringify(
    { runAt: new Date().toISOString(), checks: rows.length, rows },
    null,
    2,
  ),
);
console.log(rows.length, "bilingual route checks passed");
